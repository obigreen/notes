# React core: от JSX к mental model

**Приоритет:** P0  
**Пересечение с приложением:** `useState` и базовый `useRef` уже разобраны подробно. Здесь — связи, без которых отдельные hooks превращаются в рецепты.

## 1. Компонент — вычисление UI

Функциональный компонент получает props и возвращает описание UI для текущего render.

```tsx
type UserCardProps = {
  name: string;
  isOnline: boolean;
};

function UserCard({ name, isOnline }: UserCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{isOnline ? 'online' : 'offline'}</p>
    </article>
  );
}
```

### JSX transform

JSX — синтаксическое расширение, которое toolchain преобразует в JavaScript-вызовы, создающие React element descriptions.

- classic runtime обычно генерирует `React.createElement(...)`;
- automatic runtime обычно импортирует `jsx`/`jsxs` из `react/jsx-runtime`;
- конкретный output зависит от настройки и transformer: это не обязан быть Babel.

Поэтому ответ «Babel всегда превращает JSX в `React.createElement`» исторически узнаваем, но не универсален.

Render должен оставаться чистым:

- не менять внешнюю переменную;
- не отправлять запрос;
- не подписываться на событие;
- не мутировать props/state;
- одинаковые входы должны описывать одинаковый UI.

Event handlers выполняются из-за действия пользователя. Effects синхронизируют компонент с внешней системой после commit. Это разные места для side effects.

## 2. Props, state и обычные переменные

- **props:** вход компонента от родителя;
- **state:** память конкретной позиции компонента в tree;
- **derived value:** вычисляется из props/state во время render;
- **ref:** mutable container, изменение которого не вызывает render;
- **module variable:** общая на все instances — использовать осознанно.

Не хранить derived state без причины:

```tsx
// Лишний state:
const [fullName, setFullName] = useState('');

// Обычно достаточно:
const fullName = `${firstName} ${lastName}`.trim();
```

## 3. State — snapshot

Каждый render видит свой snapshot state. Setter планирует следующий render, но не меняет переменную внутри уже выполняющегося handler.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  function addThree() {
    setCount((current) => current + 1);
    setCount((current) => current + 1);
    setCount((current) => current + 1);
  }

  return <button onClick={addThree}>{count}</button>;
}
```

Functional updater нужен, когда следующее значение зависит от предыдущего.

## 4. Иммутабельные обновления

React сравнивает references и ожидает новый объект/массив для изменившегося state.

```tsx
setUsers((users) =>
  users.map((user) =>
    user.id === changedId
      ? { ...user, isActive: !user.isActive }
      : user,
  ),
);
```

Новый только внешний объект недостаточен, если вложенная изменённая ветка была мутирована. Но бессмысленно глубококопировать всё дерево: копируются только изменившиеся уровни.

## 5. State принадлежит позиции в tree

React связывает state с:

- component type;
- позицией среди siblings;
- `key`, если он задан.

Изменение key может осознанно сбросить state:

```tsx
<ProfileForm key={selectedUserId} userId={selectedUserId} />
```

Но случайный key или array index для изменяемого списка приводит к потере/перепутыванию локального state.

Хороший key:

- стабилен между renders;
- уникален среди siblings;
- приходит из identity данных;
- не генерируется во время render.

## 6. Controlled inputs

```tsx
function Search() {
  const [query, setQuery] = useState('');

  return (
    <label>
      Поиск
      <input
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
    </label>
  );
}
```

Source of truth — React state. Не переключать один input между controlled/uncontrolled из-за `undefined`.

Это не автоматическая two-way binding: данные явно идут `state → value`, а пользовательское событие — `onChange → setter → следующий render`. Однонаправленный поток сохраняется.

Подробная семантика и доступность формы: [`forms-and-accessibility.md`](../05-web-platform/forms-and-accessibility.md).

## 7. Lifting state up

Если два sibling-компонента должны видеть согласованное значение:

1. найти ближайшего общего родителя;
2. хранить state там;
3. передать значение и callbacks вниз.

Не поднимать state «на всякий случай» до `App`. State должен жить как можно ближе к тем, кому он действительно нужен.

## 8. `useEffect`

Effect нужен для синхронизации с внешней системой:

- network/connection;
- browser API;
- third-party widget;
- subscription/timer;
- analytics, когда событие связано с показом.

Не нужен:

- для вычисления значения из props/state;
- для обработки click;
- чтобы по очереди обновлять несколько state;
- чтобы зеркалить один state в другой.

```tsx
useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleChange() {
    setReducedMotion(media.matches);
  }

  handleChange();
  media.addEventListener('change', handleChange);

  return () => {
    media.removeEventListener('change', handleChange);
  };
}, []);
```

Lifecycle Effect:

```text
setup → dependency changed → cleanup old → setup new → unmount → cleanup
```

В development Strict Mode React дополнительно проверяет симметрию setup/cleanup. Исправлять нужно cleanup, а не пытаться «запретить второй запуск».

Опора: [React — useEffect](https://react.dev/reference/react/useEffect).

## 9. Dependency array

Dependencies не выбираются по желанию: туда входят reactive values, которые использует Effect. Если dependency вызывает нежелательные перезапуски, нужно изменить структуру:

- перенести чистое вычисление в render;
- вынести event-specific логику в handler;
- стабилизировать действительно нужную функцию;
- убрать лишний object/function dependency через декомпозицию;
- использовать updater, если читается только предыдущее state.

Не отключать lint rule как основной способ «починить цикл».

## 10. `useReducer`

Reducer удобен, когда у state:

- несколько связанных полей;
- много переходов;
- важны явные events/actions;
- update logic хочется тестировать отдельно.

```tsx
type State = {
  query: string;
  status: 'idle' | 'loading' | 'error';
};

type Action =
  | { type: 'queryChanged'; query: string }
  | { type: 'requestStarted' }
  | { type: 'requestFailed' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'queryChanged':
      return { ...state, query: action.query };
    case 'requestStarted':
      return { ...state, status: 'loading' };
    case 'requestFailed':
      return { ...state, status: 'error' };
  }
}
```

Reducer остаётся чистым; request выполняется вне него.

## 11. Context

Context передаёт значение глубоко без ручного prop drilling. Хорошие кандидаты:

- theme;
- locale;
- auth/session view;
- scoped shared state с понятным provider.

Context не означает автоматически «глобальный state manager». Любое изменение value уведомляет consumers, поэтому:

- не складывать в один provider весь изменяемый мир;
- стабилизировать architecture до микрооптимизации;
- разделять независимые контексты;
- server state хранить в query cache, а не дублировать в context.

## 12. Custom hooks

Custom hook извлекает stateful logic, а не «переиспользует один state между компонентами». Каждый вызов hook имеет собственное состояние, если оно не подключено к общему внешнему store/context.

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);

    window.addEventListener('online', online);
    window.addEventListener('offline', offline);

    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  }, []);

  return isOnline;
}
```

Это только client-side учебный пример. `navigator` недоступен во время server render, а `navigator.onLine` — эвристический сигнал сети, не доказательство доступности интернета или API. В SSR-приложении нужен безопасный server snapshot/client subscription; продукт не должен блокировать действие только по этому флагу.

## 13. `useMemo` и `useCallback`

Они не должны быть нужны для корректности.

- `useMemo` кэширует результат вычисления между renders;
- `useCallback` кэширует function reference;
- оба имеют стоимость и усложняют dependencies;
- применять после понимания причины перерендера/дорогого вычисления или API memoized child/library.

Не оборачивать автоматически каждую функцию.

## 14. Router

Маршрут — часть состояния URL. Для React-приложения нужно уметь:

- declarative routes;
- nested routes/layout;
- params и search params;
- navigation;
- not-found/error/loading boundaries;
- route-level code splitting;
- deep link и browser history.

Не хранить filter/page в локальном state, если пользователь ожидает shareable/back-forward URL.

## Что знать про reconciliation

Для junior/middle достаточно:

- render создаёт новое описание UI;
- React сопоставляет elements по type/position/key;
- commit применяет необходимые изменения;
- state привязан к позиции;
- изменение parent state обычно запускает render descendants, если нет механизма пропуска;
- hook order должен быть стабильным.

Глубокое устройство Fiber полезно позже и не должно задерживать практику с state/effects/keys.

## Что уметь сказать на собеседовании

> Render должен быть чистым. Handler выполняет логику конкретного действия, Effect синхронизируется с внешней системой и имеет cleanup.

> State — snapshot конкретного render и позиции в tree. Functional updater нужен, когда новое значение зависит от предыдущего.

> `key` задаёт identity sibling-элемента; index опасен в изменяемом списке, потому что state может привязаться к другой сущности.

## Практический критерий

Собрать React-приложение без глобального store:

1. список с фильтром в URL;
2. controlled form;
3. редактирование элемента без мутации;
4. modal с выбранным item;
5. Effect с подпиской и cleanup;
6. reducer для сложного form/workflow state;
7. тест, который ловит неправильный key или stale effect.
