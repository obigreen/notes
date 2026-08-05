# TypeScript: рабочее ядро для React

**Приоритет:** P0  
**Почему отдельный файл:** в приложении TypeScript используется для реализации, но почти не объясняется как учебная система.

## 1. Mental model

TypeScript проверяет программу до запуска и удаляет типы при сборке. Он не:

- меняет JavaScript runtime;
- проверяет ответ сервера автоматически;
- делает ошибочный `as SomeType` истинным;
- заменяет тесты и обработку ошибок.

Главная ценность — описать допустимые состояния и получить обратную связь при изменении кода.

## 2. Начинать с inference

```ts
let title = 'Dashboard'; // string
let retries = 3;         // number
let isOpen = false;      // boolean

const tags = ['react', 'typescript']; // string[]
const fixedTitle = 'Dashboard';       // literal type "Dashboard"
```

Не нужно аннотировать всё. Явный тип особенно полезен:

- на границе функции/module;
- для props/API domain model;
- когда пустое значение не даёт нужного inference;
- когда нужно ограничить более узкий контракт.

Использовать `string`, `number`, `boolean`, а не boxed `String`, `Number`, `Boolean`.

Опора: [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

## 3. Объекты, `type` и `interface`

```ts
type UserId = string;

interface User {
  id: UserId;
  name: string;
  email?: string;
}

type UserCardProps = {
  user: User;
  onSelect: (id: UserId) => void;
};
```

Практическое правило:

- `interface` удобно для object contract и расширения;
- `type` умеет описывать union, tuple, primitive alias, function и composition;
- не превращать выбор в религию; соблюдать один понятный стиль проекта.

`?` означает, что property может отсутствовать. Это не то же самое, что property всегда присутствует со значением `undefined`, хотя чтение часто даёт `T | undefined`.

## 4. Union и narrowing

```ts
type LoadState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; message: string };

function renderState(state: LoadState): string {
  switch (state.status) {
    case 'idle':
      return 'Начните поиск';
    case 'pending':
      return 'Загрузка…';
    case 'success':
      return `${state.data.length} users`;
    case 'error':
      return state.message;
    default:
      return assertNever(state);
  }
}
```

Discriminated union лучше набора независимых booleans:

```ts
// Плохо: можно получить нелогичное isLoading=true и error!=null.
type BadState = {
  isLoading: boolean;
  data: User[] | null;
  error: Error | null;
};
```

Narrowing происходит через `typeof`, `in`, `instanceof`, equality, `Array.isArray`, discriminant и type predicate.

## 5. `any`, `unknown`, `never`

### `any`

Выключает проверку и распространяется по коду. Допустим как временная миграционная метка с задачей на удаление, но не как способ «починить типы».

### `unknown`

Значение существует, но использовать его до проверки нельзя.

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
```

### `never`

Показывает невозможное состояние или функцию, которая не возвращается. Полезен для exhaustive check:

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}
```

## 6. Функции

```ts
type SortDirection = 'asc' | 'desc';

function sortUsers(
  users: readonly User[],
  direction: SortDirection = 'asc',
): User[] {
  return [...users].sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return direction === 'asc' ? result : -result;
  });
}
```

Здесь зафиксировано:

- входной массив не мутируется;
- допустимы только два направления;
- результат — новый `User[]`;
- default parameter виден в контракте.

Различать:

- optional parameter `value?: T`;
- default parameter `value: T = defaultValue`;
- parameter `value: T | undefined`;
- callback, который возвращает `void`, и функция, которая реально ничего не возвращает.

## 7. Generics

Generic связывает типы, а не просто заменяет их на букву.

```ts
function groupById<T extends { id: string }>(
  items: readonly T[],
): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}
```

`T` здесь гарантирует, что:

- каждый элемент имеет string `id`;
- в значениях результата остаётся точный исходный тип элемента.

`Map#get` честно возвращает `T | undefined`, если ключа нет. При повторяющемся `id` последнее значение перезапишет предыдущее. Если вместо `Map` выбран объект, безопаснее описать его как `Partial<Record<string, T>>` либо включить `noUncheckedIndexedAccess`: обычный `Record<string, T>` ошибочно обещает значение для любой строки.

Generic без связи между входом и выходом часто не нужен. Опора: [TypeScript Handbook — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).

## 8. Utility types

Рабочий минимум:

```ts
type UserDraft = Omit<User, 'id'>;
type UserPatch = Partial<UserDraft>;
type PublicUser = Pick<User, 'id' | 'name'>;
type UserById = Partial<Record<UserId, User>>;
type RequiredUser = Required<User>;
type ReadonlyUser = Readonly<User>;
```

Не строить глубокую цепочку type gymnastics, если явный domain type читается лучше.

## 9. API boundary: тип не валидирует JSON

Плохо:

```ts
const users = (await response.json()) as User[];
```

Assertion только заставляет compiler поверить.

Минимальная проверка:

```ts
function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    (
      candidate.email === undefined ||
      typeof candidate.email === 'string'
    )
  );
}

const payload: unknown = await response.json();

if (!Array.isArray(payload) || !payload.every(isUser)) {
  throw new Error('Invalid users response');
}
```

Type predicate обязан проверять весь контракт, который он обещает compiler: даже optional property нужно проверить, если она присутствует. В большом проекте удобна runtime schema library, но сначала нужно понять саму границу `unknown → validated domain`.

## 10. DOM и события

```ts
const form = document.querySelector('#profile-form');

if (!(form instanceof HTMLFormElement)) {
  throw new Error('Profile form not found');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
});
```

Не ставить `!` после каждого selector. Non-null assertion убирает ошибку compiler, но не предотвращает runtime `null`.

В React:

```tsx
function NameField() {
  const [name, setName] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  return (
    <label>
      Имя
      <input value={name} onChange={handleChange} />
    </label>
  );
}
```

Generic-параметр `querySelector<HTMLFormElement>(...)` сообщает compiler ожидаемый тип, но не проверяет его во время выполнения. `instanceof` одновременно проверяет отсутствие элемента и его реальный DOM-класс.

## 11. Strict mode

Для нового учебного кода ориентир — `strict: true`, особенно:

- `strictNullChecks`;
- `noImplicitAny`.

Если старый проект не готов, миграция может быть пошаговой, но учебные примеры не должны нормализовать implicit `any`.

## Антипаттерны из накопленных материалов

- добавлять `any`, чтобы исчезла красная линия;
- утверждать тип API через `as`, не проверяя runtime;
- писать типы `String`/`Object`;
- дублировать очевидный inference;
- делать все properties optional;
- использовать enum по привычке там, где literal union проще;
- копировать старые `@types/...` инструкции, не проверив, не поставляет ли современный пакет типы сам;
- считать TypeScript отдельным языком, который можно хорошо знать без JavaScript.

## Что уметь сказать на собеседовании

> `any` отключает проверку, `unknown` требует narrowing, `never` помогает выразить невозможное состояние.

> TypeScript не валидирует JSON во время выполнения: на внешней границе данные остаются `unknown`, пока схема/type guard их не проверит.

> Union со status-discriminant запрещает нелогичные комбинации loading/data/error лучше, чем независимые booleans.

## Практический критерий

Взять JS-задачу со списком пользователей и:

1. типизировать входы/выходы без `any`;
2. сделать filter/sort direction literal union;
3. представить loading states discriminated union;
4. принять API JSON как `unknown`;
5. проверить данные;
6. типизировать React props и события;
7. специально сломать контракт и объяснить сообщение compiler.
