# Рынок и карта собеседования

**Цель:** связать обучение с выходом во frontend, не превращая четыре вакансии и набор интервью-вопросов в бесконечный roadmap.

## Граница данных

Локальный архив содержит четыре снимка вакансий за июнь–июль 2026 года. Это полезная качественная выборка, но не статистика рынка: нет полной методологии, ссылок на все объявления и репрезентативного объёма.

Дополнительная живая проверка выполнена 29 июля 2026 года по нескольким React/TypeScript-вакансиям и поисковым страницам. Такие страницы меняются, поэтому они подтверждают направление, а не вечный список требований:

- [React-вакансия Morizo на hh.ru](https://hh.ru/vacancy/129929854);
- [пример TypeScript-вакансии на hh.ru](https://hh.ru/vacancy/130041986);
- [пример React/Redux-вакансии на hh.ru](https://hh.ru/vacancy/129913186);
- [frontend-стажировка X5 на hh.ru](https://hh.ru/vacancy/128545960);
- [поиск React-вакансий без опыта на hh.ru](https://hh.ru/vacancies/frontend-developer-react/bez_opyta_raboty);
- [пример junior React/Next.js на Хабр Карьере](https://career.habr.com/vacancies/1000164999).

## Устойчивое ядро сигналов

В локальной выборке повторяются:

- JavaScript/TypeScript;
- React или другой основной framework;
- асинхронность, обработка ошибок и сетевых состояний;
- HTTP/API и взаимодействие frontend/backend;
- HTML/CSS и сложные интерфейсы;
- Git и современный build/tooling;
- управление состоянием;
- самостоятельная декомпозиция, review и документация.

В отдельных вакансиях встречаются React Router, Context, Redux Toolkit, RTK Query/React Query, Vite, CI, OpenAPI/Swagger, SQL, аналитика и monitoring. Это следующий рабочий слой, а не причина отложить первую практику до изучения всего списка.

Чужой стек из выборки — Angular, Vue/Pinia, PHP/Symfony — не включается в текущий маршрут «на всякий случай». Переносимы JS/TS, HTTP, Git, тестирование и инженерное мышление.

## Приоритет для этого профиля

| Сейчас | Следующим слоем | Позже/по вакансии |
|---|---|---|
| самостоятельный JavaScript | React Router | Next.js |
| функции, scope, closure, `this` | Context/Redux Toolkit | GraphQL |
| Promise, event loop, Fetch | TanStack Query или RTK Query | WebSocket |
| TypeScript strict core | Testing Library | Storybook/design system |
| React props/state/effects | доступность и безопасность | глубокий backend |
| формы, списки, фильтры | Vite/lint/CI | второй framework |
| Git branch/conflict | OpenAPI и базовое SQL-чтение | микросервисы/DevOps |

Сильная HTML/CSS/Figma-база — преимущество: её надо соединить с логикой, состояниями и доступностью, а не начинать путь заново.

## Карта frontend-собеседования

Это не банк готовых ответов и не замена отдельно отложенной Obsidian-базе. Это карта тем, по которой AI-ментор выбирает проверку.

### 1. JavaScript foundations

- типы, coercion, `===`, truthy/falsy;
- scope, hoisting и TDZ;
- declaration/expression/arrow;
- closure;
- `this`, `call`/`apply`/`bind`;
- ссылки, мутация и поверхностное копирование;
- массивы/объекты и оценка сложности типичных операций;
- prototype chain и class;
- error handling.

Проверка: предсказать код, объяснить модель, исправить баг, написать маленькую функцию без autocomplete.

### 2. Async и браузер

- call stack, task/microtask, event loop;
- Promise lifecycle и combinators;
- `async/await`;
- Fetch: rejection против HTTP error;
- HTTP methods/statuses/headers/body;
- race condition, AbortController, retry;
- DOM events, bubbling/delegation;
- storage/cookies и History API.

Проверка: объяснить порядок вывода и спроектировать UI для slow/error/empty/race.

### 3. TypeScript

- inference и явные границы;
- union/literal/narrowing;
- `any`, `unknown`, `never`;
- object contracts, optional/nullable;
- generics и utility types;
- runtime validation внешних данных;
- React props/events/state;
- strict mode.

Проверка: типизировать существующий JS-flow и не скрыть проблему через `as`/`any`.

### 4. React

- компонент/render snapshot;
- JSX transform: classic `createElement` против automatic `jsx/jsxs`, с учётом toolchain;
- props/state, controlled inputs;
- controlled input как явный однонаправленный flow, а не встроенная two-way binding;
- batching и functional update;
- списки и `key`;
- lifting/colocation;
- effects, dependencies и cleanup;
- refs, reducer, context, custom hooks;
- routing;
- причины render и измеренная memoization.

Проверка: построить маленький feature и объяснить каждый effect.

### 5. State и data

- local/client/server/URL state;
- loading/error/empty/success/refreshing;
- reducer для явных переходов;
- Redux Toolkit — когда нужен;
- query keys, cache, invalidation, mutations;
- optimistic update и rollback.

Проверка: выбрать владельца состояния и защититься от устаревшего ответа.

### 6. HTML/CSS/accessibility

- семантическая форма;
- label, fieldset/legend, validation;
- keyboard/focus;
- modal dialog;
- адаптивность;
- CSS layout;
- базовая rendering cost.

Здесь имеющийся опыт должен проявляться как сильная сторона, но доступность и edge states нужно уметь доказывать, а не предполагать.

### 7. Security и performance

- безопасный текст против HTML sink;
- XSS, CSRF, cookie/token boundary;
- HTTPS и mixed content;
- layout/paint/composite;
- DevTools trace;
- bundle/code splitting.

Проверка: назвать threat/performance hypothesis, выбрать защиту/измерение и ограничения.

### 8. Testing и Git

- unit/component/E2E;
- запросы Testing Library по role/name;
- ветка/commit/PR;
- конфликт и revert/rebase;
- typecheck/lint/test/build.

Проверка: написать один поведенческий тест и разобрать небольшой diff.

### 9. Проект и коммуникация

- какую проблему решает feature;
- как разбита задача;
- почему выбран такой state owner/data layer;
- какие ошибки и компромиссы;
- как проверялось качество;
- что было сделано лично;
- что улучшить следующим шагом.

## Как рассказывать проект

Структура на 2–3 минуты:

1. **Контекст:** кто пользователь и какая у него задача.
2. **Моя зона:** что именно сделано самостоятельно.
3. **Сложность:** один реальный технический риск.
4. **Решение:** модель состояния/контракт/архитектурная граница.
5. **Проверка:** тесты, DevTools, accessibility, error paths.
6. **Компромисс:** почему не выбран более сложный инструмент.
7. **Результат и следующий шаг.**

Плохой рассказ перечисляет библиотеки. Хороший показывает ход мысли и проверяемый результат.

## Как читать новую вакансию

Разделить требования на четыре корзины:

1. **Core match:** JS/TS/React, HTML/CSS, API.
2. **Закрываемый gap:** router, state library, tests, tooling.
3. **Domain/company-specific:** аналитика, карты, финансы, конкретная UI-library.
4. **Не текущая цель:** другой framework, глубокий backend/infra.

После этого выбрать максимум один практический gap. Не превращать каждое объявление в новый учебный план.

## Готовность откликаться

Не ждать знания «всего». Практический ориентир:

- один законченный React + TypeScript проект;
- код центрального сценария написан и объясняется самостоятельно;
- есть форма, список, запрос и все основные UI states;
- понятны Promise/event loop/Fetch;
- нет систематического `any`;
- есть несколько поведенческих тестов;
- доступность и ошибки не забыты;
- Git history читаема;
- можно честно объяснить сильные стороны, пробелы и следующий шаг.

Отклики и mock interview могут идти параллельно доработке проекта: обратная связь рынка — данные, а не финальный экзамен.

## Формат работы с AI-интервьюером

1. Один вопрос без ответа.
2. Устный ответ ученика.
3. Один уточняющий вопрос или контрпример.
4. Маленький код/debugging.
5. Разбор: факт, ход мысли, ясность речи.
6. Повтор вопроса через несколько дней.

AI не должен заранее выдавать эталон и засчитывать узнавание за знание.
