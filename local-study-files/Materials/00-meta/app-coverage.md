# Сопоставление с приложением-конспектом

Цель этого файла — не хранить ещё одну копию синтаксиса, а показывать, когда нужно открыть существующее приложение, а когда материал из `Materials` действительно закрывает новый пробел.

Первичное сопоставление выполнено по `src/recordsdirectory/**`. Карта актуализирована 30 июля 2026 года после согласованного переноса атомарных карточек Async, TypeScript и React Hooks.

## Граница версий

Текущий manifest/lockfile приложения фиксирует:

- React `18.2`;
- диапазон TypeScript `^4.4.2` в `package.json`, фактически TypeScript `4.9.5` в `yarn.lock`;
- `react-scripts` `5.0.1` / Create React App;
- `@testing-library/react` `13.4.0` и `@testing-library/user-event` `13.5.0` из lockfile.

Это не обесценивает карточки стабильного JavaScript/DOM/React-синтаксиса, но toolchain и версии приложения нельзя выдавать за рекомендацию для нового проекта в 2026 году. На дату аудита официальная документация называет актуальной ветку React 19.2, а Create React App deprecated.

Правило:

- приложение использовать как словарь существующего проекта;
- новые учебные примеры сверять с текущей документацией;
- новый проект начинать на актуальном framework/build tool;
- миграцию самого приложения обсуждать отдельной задачей, не менять его незаметно во время реорганизации материалов.

Опоры: [React versions](https://react.dev/versions) и [Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).

## Уже хорошо покрыто: не дублировать

| Область | Что уже есть | Основные файлы приложения |
|---|---|---|
| Базовый JS | `let`/`const`, примитивы, equality, optional chaining, nullish coalescing, destructuring, spread/rest, template literals, truthy/falsy | `javascript/JavaScript.tsx`, `JavaScriptTypes.tsx`, `JavaScriptOperators.tsx` |
| Условия и циклы | `if`, `switch`, guard clauses, short-circuit, `for`, `while`, `for...of`, `for...in`, `break`/`continue` | `JavaScriptConditions.tsx`, `JavaScriptLoops.tsx` |
| Функции и объекты | declaration/arrow, `this`, `call`/`apply`/`bind`, closure, hoisting, class, `Map`, `Set`, JSON; у prototype есть только короткие синтаксические примеры | `javascript/JavaScript.tsx` |
| Вложенные данные | доступ, optional chaining, destructuring, immutable update, поиск, безопасный helper пути | `JavaScriptNestedData.tsx` |
| Ошибки | `try/catch/finally`, `throw`, custom errors, Promise rejection, глобальные error events, debugger | `JavaScriptErrors.tsx` |
| Асинхронный синтаксис | timers, Promise, `async/await`, `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any`, `queueMicrotask` | `javascript/JavaScript.tsx`, `JavaScriptSectionPage.tsx` |
| DOM и события | выбор/создание элементов, текст/HTML, classes/dataset/style, listener, preventDefault/propagation; большой каталог событий | `javascript/JavaScript.tsx`, `events/**` |
| Сеть и хранение | `fetch`, URL, AbortController, FormData, local/session storage, cookies, History API | `javascript/JavaScript.tsx`, `JavaScriptSectionPage.tsx` |
| REST API | связь `fetch`/Promise/HTTP/Response/UI, resource/endpoint/path/query, GET/POST/PUT/PATCH/DELETE, `response.ok`, статусы и пустой `204/205` | `restapi/RestApi.tsx` |
| Модули | named/default export, barrel, dynamic `import()` | `javascript/JavaScript.tsx`, `JavaScriptSectionPage.tsx` |
| Методы | массивы, строки, объекты, числа, даты; мутация, возвращаемые значения, практические примеры | `methods/**` |
| DOM-свойства | формы, файлы, checked/disabled, navigation, dataset, дерево DOM, геометрия и scroll | `propertys/**` |
| RegExp | синтаксис, флаги, рецепты, tester/replace/sanitize demos | `regex/**` |
| TypeScript | inference/annotation, `type`/`interface`, literal и discriminated unions, narrowing, `any`/`unknown`/`never`, generics, utility types | `typescript/TypeScript.tsx` |
| React | подробный `useState`, формы/списки на state, базовый `useRef`; краткие карточки `useEffect`, `useReducer`, `useContext`, custom hook | `hooks/**` |

Следствие: исходные Notion-страницы про типы, destructuring, базовые массивы/объекты, `target/currentTarget`, `useState`, `useRef`, простые Promise/fetch и большинство карточек методов не переносятся в новые теоретические файлы дословно.

## Частично покрыто: сохранить только недостающий слой

| Тема | В приложении есть | В новой базе нужен пробел |
|---|---|---|
| Асинхронность | Promise, `async/await`, `queueMicrotask` | целостная модель event loop; race condition; ownership отмены; retry policy; cache/server state |
| Fetch | синтаксис, `response.ok`, AbortController, FormData | состояния UI; конкурирующие запросы; dedupe; backoff/jitter; invalidation; React cleanup |
| XSS | предупреждения рядом с `innerHTML` | контекстное экранирование, sanitization, CSP/Trusted Types, связь с cookie/session |
| Формы | events, FormData, controlled React form | семантика, native validation, доступные ошибки, autocomplete, focus management |
| Производительность | `requestAnimationFrame`, geometry properties, dynamic import | rendering pipeline, layout thrashing, измерение, bundle strategy, React lazy/Suspense |
| Объекты/прототипы | синтаксис `prototype`, class, Object methods | mental model prototype chain и типовые вопросы без ошибочных рекурсивных accessors |
| React state | `useState`, `useRef`, краткие примеры effect/reducer/context/custom hook | render mental model, dependency reasoning, component composition и выбор владельца state |
| Типизация | отдельная азбука базовых конструкций TypeScript | runtime-валидация API, типизация DOM/React-событий, strict-настройки и практика на цельной задаче |

## Практически не покрыто: кандидаты новой базы

- TypeScript как последовательная учебная система поверх краткой азбуки.
- React props/render/reconciliation, `key`, lifting state и подробная модель effects.
- Границы локального state, context и внешнего state manager.
- Redux Toolkit, TanStack Query/RTK Query и различие client state/server state.
- React Router как актуальная модель маршрутизации.
- Testing Library и тестирование поведения.
- Доступные dialog/form patterns.
- Browser rendering, layout/paint/composite и DevTools-профилирование.
- Code splitting на уровне маршрута/фичи, analyzer и loading/error boundaries.
- XSS/CSRF/CSP и frontend-часть auth.
- Tooling, Git workflow, CI/CD минимум, архитектурная декомпозиция.
- Проектное объяснение решений и подготовка к собеседованию.

## Что разумно позже добавить именно в приложение

Приложение задумано как быстрый словарь, поэтому туда подходят короткие карточки, а не главы из этой базы.

### Уже добавлено 30 июля 2026

- Async: `Promise.allSettled`, `Promise.race`, `Promise.any`.
- TypeScript: inference, `type`/`interface`, union, narrowing, `unknown`, generics, utility types.
- React: `useEffect`, `useReducer`, `useContext`, custom hook.
- REST API: frontend/server mental model и семь атомарных HTTP/fetch-карточек.

### Высокий приоритет после практической необходимости

- React: `useMemo` и `useCallback` только вместе с реальным примером причины оптимизации, а не как рецепт «оборачивать всё».
- React Router: route, params, navigation, nested routes.
- React data: корректный effect cleanup, query states, mutation/invalidation.

### Средний приоритет

- `dialog.showModal()`/`close()`, `inert`, focus return.
- `React.lazy` + `Suspense`.
- Testing Library: `render`, `screen.getByRole`, `userEvent`, async queries.
- Security recipes: safe text, sanitizer boundary, CSRF header contract.

### Не переносить в формат словаря

- длинные карьерные roadmap;
- пересказ книги;
- списки вакансий;
- история Telegram-диалогов;
- серверная настройка и backend-дневник;
- полные архитектурные эссе;
- коллекции CodePen/видео без конкретной учебной цели.

## Правило маршрутизации

Если запрос звучит как «покажи синтаксис/метод/короткий пример», сначала использовать приложение. Если вопрос звучит как «почему», «какие крайние случаи», «как спроектировать», «что спросит интервьюер» или «какую практику сделать», использовать `Materials New`.
