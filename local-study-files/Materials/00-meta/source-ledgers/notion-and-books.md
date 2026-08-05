# Ledger S03/S04: книга и Notion Programming

Сокращение:

`P = local-study-files/materials/PROGRAMMING`

## Покрытие

### S03 — `BOOKS`

- 2/2 файла;
- `README.md` прочитан;
- PDF «Выразительный JavaScript», 3-е русское издание, проверен структурно и текстово;
- 482 страницы, 44 309 426 bytes, PDF 1.6, без шифрования;
- текст извлечён с 480/482 страниц; первые две страницы — графические обложка/авантитул без текстового слоя;
- обложка, содержание, главы о модулях/async/HTTP и финальные страницы дополнительно сверены рендерингом;
- битых страниц не обнаружено.

PDF не проходил построчную фактологическую редактуру всех 482 страниц: для маршрутизации проверены полный text layer/оглавление и выборочные главы/рендеры. Поэтому отдельные browser/Node/tooling формулировки 3-го издания всё равно требуют current docs.

### S04 — `EXPORT NOTION PROGRAMMING`

- 50/50 локальных файлов;
- 1 Markdown/README;
- 20 HTML полностью извлечены и прочитаны;
- 28 изображений декодированы и визуально классифицированы;
- 1 `.DS_Store`;
- 170 external content-link occurrences, 165 unique; 16 повторных `cdnjs.cloudflare.com` stylesheet refs шаблона export исключены;
- 65 внутренних `href/src`: 63 разрешаются в локальные файлы, ещё две записи указывают на один и тот же отсутствующий export-image про визуальную тень слайдера;
- существующих битых локальных файлов: 0.

Текст внешних CodePen, YouTube, Habr, документаций и статей не считается прочитанным только из-за сохранённой ссылки; доступность всех 165 URL также не проверялась. GIF REST Client классифицирован по первому кадру и контексту HTML, не покадрово. Отсутствующее изображение — потерянный visual reference, а не уникальный учебный текст.

## S03 — зачем сохранена книга

`BOOKS/README.md` говорит, что это «актуальная на данный момент книга, которую надо внедрить в процесс». Это историческое намерение, а не текущий факт: локально лежит русское 3-е издание 2019 года, а официальный сайт автора сейчас публикует [4-е издание 2024 года](https://eloquentjavascript.net/).

Книга всё ещё ценна:

- последовательно связывает JS-синтаксис с программным мышлением;
- даёт упражнения и проекты;
- подробно проходит функции, данные, prototype model, ошибки, модули, async, DOM, events, HTTP/forms.

Но она:

- не содержит TypeScript и React;
- местами описывает browser/Node/module/tooling-среду 3-го издания;
- не должна превращаться в 482-страничный блокер до первой практики.

### Маршрут по главам

| Главы | Тема | Решение |
|---|---|---|
| 1–4 | значения/типы/операторы, структура программы, функции, объекты/массивы | P0: читать выборочно вместе с задачами; синтаксис также `route-app` |
| 5–6 | higher-order functions, prototype/object model | P0/P1: использовать для closures/HOF/prototypes |
| 7 | проект «Робот» | optional practice после функций/коллекций |
| 8 | ошибки и дефекты | P0: связать с debugging/error contracts |
| 9 | RegExp | `route-app`; углублять по реальной задаче |
| 10 | модули | P1 concept; CommonJS/npm/tooling детали сверять с текущими docs |
| 11 | async programming | P0, но сопоставлять с современной Fetch/Event Loop документацией |
| 12 | проект «Язык программирования» | P2: интересная, но не обязательная задача до frontend-проекта |
| 13–15 | browser, DOM, events | P0/P1 practice; значительная часть синтаксиса уже есть в приложении |
| 16–17 | platform game, Canvas | P2/reference по интересу |
| 18 | HTTP и формы | P1; сверять с текущими MDN/security/accessibility правилами |
| 19 | pixel-art editor | P1/P2 project option |
| 20–21 | Node.js и skill-sharing site | Later/backend |
| советы к упражнениям | методика решения | использовать: сначала попытка, затем hints/solution |

Практическая интеграция: одна глава/фрагмент → один вопрос на воспроизведение → одна задача → объяснение. Не читать всё подряд «для допуска» к TypeScript/React.

## S04 — назначение Notion

`EXPORT NOTION PROGRAMMING/README.md` честно описывает источник: почти вся старая база знаний, курсов, заметок, решений и статей была сложена вместе, и было непонятно, как встроить её в единый процесс.

Главная ценность export:

- история реальных учебных вопросов;
- готовый набор debugging/interview prompts;
- project context Todo/Tetris/mini-CRM;
- ссылки, к которым можно вернуться по конкретному пробелу.

Главная опасность:

- готовые решения и AI-пояснения легко подменяют самостоятельное воспроизведение;
- часть ответов ошибочна или слишком абсолютна;
- версии React Router, Redux, CRA, Jest, Storybook и tools меняются;
- визуальные/курсовые ссылки создают ложный backlog.

## Полный ledger 20 HTML

| Путь относительно S04 | Содержание | Решение → destination |
|---|---|---|
| `Programming.html` | корневой Notion-index: учебные страницы, школы, книги, docs, tools, backend и 36 external links | `archive/reference`; не roadmap |
| `Programming/1 JS Типы данных Объекты Деструктуризация….html` | типы, ссылки, shallow/deep copy, destructuring | `route-app` + `correct-merge` в JS gaps; исходные memory/deep-clone/destructuring ошибки не копировать |
| `Programming/Callbacks….html` | callback, React events, fetch, Promise/async-await | `route-app` + `correct-merge` async/React; callback не обязательно async |
| `Programming/Counter….html` | две строки постановки счётчика | `practice`, но слишком неполно для отдельного active item |
| `Programming/Destructuring….html` | базовая destructuring-шпаргалка | `route-app`; дублирует приложение и первую JS-страницу |
| `Programming/Homeworks….html` | HW4 reusable inputs/buttons/checkbox, HW7 select/radio, HW8 sorting; много готовых объяснений | `practice/archive`; брать acceptance criteria, не solution |
| `Programming/Practice code….html` | 62 external links: CodePen/видео, UI, games, React/Angular/Redux, snippets | `reference`; только выбранная постановка может стать practice |
| `Programming/Programming articles….html` | VS Code/extensions, Postman, SQLite, Docker, CSS/HTML/React/JS/Git articles; 55 external links | `reference`; tools/articles проверять заново по задаче |
| `Programming/Questions for HR/Собесы [с созвонов]….html` | реальные вопросы: operators, constructor/prototype, arrays/Promise-like, filter/map, loops, ternary, increments | `practice` + `correct-merge`; не готовый банк истин |
| `Programming/Questions for HR….html` | JSX transform, library/framework, two-way binding | `correct-merge` в interview map; ответы version/context dependent |
| `Programming/React-route….html` | Routes/Route/Navigate/NavLink/params/GitHub Pages | P1 `correct-merge/reference`; учить по текущей React Router docs |
| `Programming/Reducer….html` | личная аналогия и правила reducer/pure function | `merge/correct-merge` в state-data note |
| `Programming/Redux….html` | store/action/reducer/dispatch и legacy `createStore` | `correct-merge`; современный путь Redux Toolkit |
| `Programming/Server….html` | подробный DigitalOcean/Ubuntu/Node/Mongo/deploy/Postman/auth журнал | `sensitive + defer`; frontend boundary → backend-later, команды/версии проверять заново |
| `Programming/Story book….html` | ранняя mental model Storybook/component isolation | P2 `correct/reference`; Storybook — component workshop/tool, не Git-like сайт |
| `Programming/Tests….html` | unit/integration/E2E, Jest matchers, TDD | `merge` engineering basics; runner/API зависит от project versions |
| `Programming/Tetris….html` | подробный solution/explanation Canvas Tetris | P2 `practice/archive`; не активное JS-ядро и не читать до попытки |
| `Programming/Todolists….html` | 127k chars учебной истории: objects, events, React props/state, reducer, Material UI, API/useEffect, spoilers | `practice/archive`; ценный сценарий, но готовый код не выдавать первым |
| `Programming/mini-crm….html` | fullstack project history: native JS, Fastify/Zod/Mongo/auth, leads UI/roadmap | project context; frontend vertical → practice, server/auth/deploy → `sensitive/defer` |
| `Programming/Ассоциативный array….html` | object как dictionary по id | `correct-route-app`: в JS это Object/Map, не особый array |

## Вложения S04

| Группа | Файлы | Проверка/содержание | Решение |
|---|---:|---|---|
| `Programming/` | 12 | logos, avatars, covers/decorative previews | `drop` как знания |
| `Programming/Programming articles/` | 10 | VS Code/extensions/Postman/SQLite/Docker/article illustrations | `reference`; текст HTML важнее картинки |
| `Programming/Questions for HR/` | 2 | декоративные interview/chatbot covers | `drop` |
| `Programming/Tests/` | 1 | схема Red → Green → Refactor | concept `merge`, картинку не копировать |
| `Programming/Todolists/` | 3 | component/API/Postman project screenshots | `practice/provenance`, не самостоятельная теория |
| `.DS_Store` | 1 | Finder metadata | `drop` |

Итого: 12 + 10 + 2 + 1 + 3 = 28 изображений.

## External links

| Страница | Вхождений | Unique | Роль |
|---|---:|---:|---|
| `Practice code` | 62 | 61 | в основном CodePen/video solution bank |
| `Programming articles` | 55 | 54 | статьи и extensions/tools |
| `React-route` | 2 | 2 | documentation pointers |
| `Tests` | 3 | 3 | Jest documentation |
| `Todolists` | 12 | 12 | docs/course/project links |
| `Programming.html` | 36 | 35 | общий каталог |
| **Всего** | **170** | **165** | content links; 16 template CDN stylesheet refs не считаются материалом |

Самые частые domains: CodePen (40), YouTube (20 с `youtu.be`), VS Code Marketplace (17), Habr (15). Их наличие не создаёт 165 обязательных учебных задач.

## Исправления S04

### JavaScript

- Деление «примитивы всегда в stack, reference types всегда в heap» — не гарантия языка, а implementation-level упрощение.
- `class`, array, function, Map и Set не отдельные `typeof`-категории; в нужном контексте это functions/objects.
- `structuredClone` — не универсальный clone любой сущности; функции и часть platform objects не клонируются, semantics prototypes/descriptors отличаются.
- Самодельный recursive `for...in deepClone` не является общим решением: inherited enumerable keys, symbols, cycles, Date/Map/Set, descriptors и prototypes не обработаны.
- `const result = [...users].pop()` не мутирует `users`, но `result` — удалённый элемент копии, а не новый массив.
- `[redColor, greenColor]` не пропускает средний элемент; для этого нужен `[redColor, , greenColor]`.
- Callback — функция, переданная как значение для вызова другим кодом; она может выполниться синхронно, несколько раз или никогда.
- Promise-like проверка по `.then` находит thenable, а `instanceof Promise` имеет cross-realm/subclass ограничения.
- `!!value` выполняет boolean coercion, а не проверяет «существование»: `0`, `''` и `NaN` существуют, но дают `false`.
- `localeCompare` гарантирует отрицательное/нулевое/положительное значение, а не ровно `-1/0/1`.
- Чтобы остановить `for` на 50 без `break`, корректнее выразить границу в условии цикла; присвоение `i = 100` внутри исходного примера ещё и выводит 100.
- `throw` может быть пойман; он не обязан «завершить весь процесс», но expected loop control через исключение здесь неуместен.
- «Все объекты наследуются от Object» неверно хотя бы для `Object.create(null)`.
- Object — не «ассоциативный array»; Object/Map имеют разные key semantics. Порядок own keys современных объектов определён, хотя dictionary model не должен маскировать нужду в упорядоченном массиве.

### React/TypeScript/tooling

- JSX не всегда превращается в `React.createElement`: modern automatic JSX runtime может генерировать `jsx/jsxs`, а transformer не обязан быть Babel.
- «Библиотека вызывает/фреймворк вызывает вас» — полезная inversion-of-control эвристика, но не строгая универсальная классификация.
- React controlled input — явный state → UI + event → state flow, а не встроенная магия two-way binding.
- Routes импортируются из `react-router-dom`, не `react-dom`.
- Hook называется `useParams`, не `useParam`.
- В исходнике есть mismatched `<Link>…</NavLink>` и `.hover` вместо CSS `:hover`.
- `@types/react-router-dom` для modern v6+ не нужен: package поставляет типы.
- HashRouter — возможный обход отсутствующего SPA fallback на static hosting, не универсальное требование GitHub Pages.
- `as const` создаёт compile-time readonly/literal types, но не замораживает object runtime.
- Reducer возвращает next state, но при неизвестном action правильно вернуть ту же ссылку; «всегда новый объект» неверно.
- Redux не требует переносить буквально весь state в store; Redux Toolkit — рекомендованный современный путь, а Immer позволяет безопасный draft-mutation syntax.
- `DetailedHTMLProps` не «добавляет focus methods»: ARIA/HTML props приходят через соответствующие attributes types, ref/instance — отдельная модель.
- `onKeyPress` устарел; для клавиш использовать `onKeyDown`/`onKeyUp` по сценарию.
- Storybook — component workshop/dev tool и отдельная build, а не Git-подобный сайт.
- «Jest идёт по умолчанию в CRA» относится к legacy CRA baseline, не к новому проекту.
- В `Todolists` setter ошибочно описан как перезапись той же переменной; state текущего render — snapshot, setter планирует следующий render.
- Там же встречаются прямая мутация `tasks[todolistId] = ...` и object spread с literal key вместо computed key; использовать только как debugging material.

### Sensitive/versioned

- `Server` содержит реальные IP/token-like/config данные; literal values не переносить.
- `mini-crm` содержит project/server context, который нужно очищать перед публикацией.
- DigitalOcean/Ubuntu/NodeSource/Mongo/PM2/firewall команды зависят от актуальной версии и инфраструктуры; старый журнал — provenance, не runbook 2026.
- `toBe` использует `Object.is`; тесты/TDD снижают риск, но не гарантируют хорошую архитектуру автоматически.
- `picturefill` относится к старому polyfill-пути: современную responsive-image практику начинать с native `picture`/`srcset`/`sizes`.
- Ссылку на нелегальную активацию JetBrains и старый конкретный Webhook.site identifier не переносить.
- «PUT меняет весь объект, PATCH одно поле» — только вводное упрощение; точный representation/API contract определяет server.

## Дубли с приложением

Уже покрыты в `src/recordsdirectory`:

- types/coercion, objects/arrays, destructuring, spread/rest;
- functions, closure, `this`, prototype/class;
- array/string/object methods;
- DOM/events и `target/currentTarget`;
- Promise/`async`/Fetch basics;
- errors;
- `useState` и `useRef`.

Поэтому Notion-копии не переносятся дословно. Уникальный недостающий слой уже разложен:

- JS edge models → `02-javascript/`;
- TypeScript → `03-typescript/`;
- React/router/reducer/state → `04-react/`;
- tests/tooling → `06-engineering/`;
- Todo/mini-CRM/task ideas → `07-practice/`;
- interview prompts → `08-career/`;
- server context → `90-later/`.
