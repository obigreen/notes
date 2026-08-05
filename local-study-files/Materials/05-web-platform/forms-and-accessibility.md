# HTML-формы, модалки и доступность

**Приоритет:** P1  
**Основа:** локальная статья о формах, скриншоты/видеоконспект о модалке  
**Важно:** полезные идеи источников сохранены, но несколько исходных формулировок исправлены.

## 1. Базовая форма сначала работает средствами HTML

```html
<form action="/api/profile" method="post">
  <div>
    <label for="full-name">Имя</label>
    <input
      id="full-name"
      name="fullName"
      type="text"
      autocomplete="name"
      required
      aria-describedby="full-name-hint"
    />
    <p id="full-name-hint">Как к вам обращаться</p>
  </div>

  <div>
    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
    />
  </div>

  <button type="submit">Сохранить</button>
</form>
```

У поля должны быть:

- понятная видимая подпись;
- `name`, если значение должно попасть в form submission/FormData;
- подходящий `type`;
- `autocomplete`, когда браузер может помочь пользователю;
- native constraints (`required`, `min`, `max`, `minlength`, `pattern`) только там, где они соответствуют задаче;
- связанная подсказка или ошибка, если без неё назначение/формат непонятны.

Placeholder показывает пример, но не заменяет label: он исчезает при вводе и может быть плохо различим.

## 2. `label`

Надёжный вариант — `for` совпадает с уникальным `id`.

```html
<label for="phone">Телефон</label>
<input id="phone" name="phone" type="tel" autocomplete="tel" />
```

Можно вложить control внутрь label, но явная связь `for`/`id` часто удобнее для разметки, тестов и интеграции компонентов.

Accessible name должен сообщать назначение, а не визуальное положение:

- хорошо: «Рабочий email»;
- плохо: «Поле справа»;
- icon-only button: видимый скрытый текст или корректный `aria-label`.

## 3. Выбор типа поля

| Задача | Элемент | Нюанс |
|---|---|---|
| Одна строка | `input type="text"` | `input` без `type` тоже text, но явность полезна |
| Email | `input type="email"` | браузер проверяет базовый формат, но не существование адреса |
| Телефон | `input type="tel"` | помогает интерфейсу ввода, но сам по себе не проверяет формат номера |
| Пароль | `input type="password"` | продумать autocomplete и show/hide control |
| Числовая величина | `input type="number"` | не использовать для почтовых индексов, карт и других «цифровых строк» |
| Многострочный текст | `textarea` | не растёт по высоте от контента автоматически; обычно лишь допускает ручной resize |
| Строго один вариант из списка | `select` | native и предсказуемый |
| Подсказки с возможностью своего значения | `input` + `datalist` | не заменяет строгий select |
| Связанная группа radio/checkbox | `fieldset` + `legend` | legend даёт группе понятную подпись |

`<input type="submit">` не устарел и валиден. `<button type="submit">` обычно гибче, потому что допускает сложное содержимое, но это выбор компонента, а не «старый против нового».

Опоры: [MDN — input type=submit](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/submit), [MDN — textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea).

## 4. `fieldset` и `legend`

```html
<fieldset>
  <legend>Способ связи</legend>

  <label>
    <input type="radio" name="contactMethod" value="email" />
    Email
  </label>

  <label>
    <input type="radio" name="contactMethod" value="phone" />
    Телефон
  </label>
</fieldset>
```

`legend` — caption группы и лучший базовый способ назвать связанный набор controls. Формулировка из исходной статьи «обязательный дочерний элемент» слишком абсолютна: практическое правило здесь — использовать legend, когда группе нужна общая accessible label, а не приписывать браузеру несуществующую обязательную валидацию.

## 5. Что реально отправляет форма

Успешные controls отправляются как `name=value`.

Не попадут или ведут себя особо:

- control без `name`;
- disabled control;
- unchecked checkbox/radio;
- button, который не был submitter;
- file input передаёт `File`, а не строковый путь;
- одинаковые `name` могут дать несколько значений — использовать `FormData.getAll`.

```js
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  console.log(data.get('email'));
  console.log(data.getAll('interests'));
});
```

Не ставить `Content-Type: multipart/form-data` вручную для FormData: браузер сам добавит boundary.

## 6. Native validation и серверная проверка

HTML validation улучшает UX, но не является security boundary. Разметку можно изменить, а запрос — отправить вне браузерной формы. Сервер проверяет всё заново.

`required` создаёт реальное constraint validation. `aria-required="true"` только сообщает состояние assistive technology и не добавляет поведение; на native control обычно не надо дублировать им `required`.

Для кастомной ошибки:

```html
<label for="password">Пароль</label>
<input
  id="password"
  name="password"
  type="password"
  aria-invalid="true"
  aria-describedby="password-error"
/>
<p id="password-error">Минимум 12 символов</p>
```

Правила:

- ставить `aria-invalid` после обнаружения ошибки, а не заранее;
- текст ошибки должен объяснять действие;
- при множестве ошибок можно добавить summary и перевести к нему focus после неуспешного submit;
- цвет не должен быть единственным сигналом;
- `aria-live` использовать точечно для динамического сообщения, не превращать всю форму в live region.

## 7. Controlled forms в React

Controlled input нужен, когда UI зависит от текущего значения:

```tsx
function EmailField() {
  const [email, setEmail] = useState('');

  return (
    <label>
      Email
      <input
        name="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
    </label>
  );
}
```

Но не вся форма обязана хранить каждый символ в глобальном state. Выбор между local controlled state, uncontrolled/FormData и form library зависит от:

- условных полей;
- live validation;
- количества полей;
- повторного использования;
- серверных ошибок;
- производительности и удобства тестирования.

## 8. Доступная modal dialog

Предпочтительный базовый примитив современного браузера — `<dialog>` с `showModal()`, если его поведение подходит продукту.

```html
<button id="open-settings" type="button">Открыть настройки</button>

<dialog id="settings-dialog" aria-labelledby="settings-title">
  <h2 id="settings-title">Настройки</h2>
  <form method="dialog">
    <button value="cancel">Закрыть</button>
  </form>
</dialog>
```

```js
const dialog = document.querySelector('#settings-dialog');
const openButton = document.querySelector('#open-settings');

openButton.addEventListener('click', () => {
  dialog.showModal();
});
```

Проверить руками:

- focus перемещается внутрь;
- `Tab`/`Shift+Tab` не уводят на фон;
- `Escape` закрывает, если сценарий допускает отмену;
- после закрытия focus возвращается логично;
- есть видимая кнопка закрытия;
- title даёт accessible name;
- фон действительно неинтерактивен;
- scroll и mobile viewport ведут себя ожидаемо.

Для custom dialog нужны `role="dialog"`, `aria-modal="true"`, accessible name, управление focus и inert background. Сам `aria-modal` только описывает модальность assistive technology — он не реализует focus trap и не блокирует мышь.

Не стоит хранить самодельный focus trap из десяти строк как универсально корректный: он должен учитывать отсутствие focusable controls, динамический DOM, disabled/hidden элементы, nested dialogs и возврат focus. Для production-компонента предпочтительны native dialog или проверенная библиотека с тестами.

Опоры: [WAI-ARIA APG — Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) и [W3C H102 — HTML dialog](https://www.w3.org/WAI/WCAG21/Techniques/html/H102).

## 9. Общая клавиатурная и визуальная доступность

- использовать native button/link/input прежде, чем имитировать их через `div`;
- не удалять `outline` без равноценного `:focus-visible`;
- сохранять логичный DOM/tab order;
- не использовать положительные `tabindex`;
- touch target делать достаточно удобным, но не воспринимать одну цифру как абсолют для любого стандарта;
- соблюдать контраст;
- учитывать `prefers-reduced-motion`;
- тестировать клавиатурой и хотя бы одним screen reader, а не только DevTools accessibility tree.

## Исправления исходной статьи

| Исходная формулировка | Корректная версия |
|---|---|
| `textarea` автоматически растёт с текстом | по умолчанию это многострочное поле; автоподстройка высоты требует CSS/JS, ручной resize — другое поведение |
| `legend` — обязательный ребёнок каждого `fieldset` | это caption группы и сильная accessibility-практика, но не универсальная обязательность, делающая разметку невалидной без него |
| `input type="submit"` устарел | элемент валиден; `button` просто гибче |
| `aria-required` нужно добавлять к required | native `required` уже даёт семантику и validation; ARIA не заменяет поведение |
| Enter всегда отправляет форму из single-line field | implicit submission зависит от состава формы и submit controls; сценарий нужно проверять |
| `tel` проверяет телефон | тип не задаёт универсальный формат номера |

## Практический критерий

Собрать форму регистрации в React/TypeScript:

1. пройти её только клавиатурой;
2. получить все controls через accessible names;
3. показать native и server error;
4. связать подсказки/ошибки с полями;
5. открыть подтверждение в доступной dialog;
6. протестировать успешный submit и focus после ошибки через Testing Library.
