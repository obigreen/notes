# Практика: активный backlog JS → TS → React

Этот backlog превращает архив в действия. Здесь нет готовых решений: исходные Telegram/Notion/CodePen-примеры открываются только после самостоятельной попытки.

## Правила одной учебной сессии

1. Выбрать одну задачу, а не новую тему.
2. До AI-подсказки записать понимание, входы/выходы и первый план.
3. Написать код руками.
4. Зафиксировать баг и гипотезу до исправления.
5. Просить сначала направление или один hint, а не готовое решение.
6. После успеха закрыть исходник и воспроизвести ключевую часть заново.
7. Объяснить trade-off голосом как на собеседовании.

Статус темы определяется кодом и объяснением, а не количеством просмотренных материалов.

## Этап A — JavaScript core (P0)

### J1. Пайплайн данных

Дан массив пользователей с `id`, `name`, `age`, `isActive`, `skills`.

Сделать:

- валидацию минимальной формы объекта;
- фильтр активных пользователей;
- поиск без учёта регистра;
- сортировку по имени/возрасту без мутации входа;
- группировку по skill;
- итоговую статистику через `reduce`;
- обработку пустого массива и дубликатов `id`.

Ограничение: сначала без library и без копирования цепочки из конспекта.

Проверяет: функции, массивы, объекты, ссылки, shallow copy, условия, ошибки.

### J2. Debugging: ссылки и sparse array

Получить небольшой набор фрагментов, для каждого:

1. предсказать вывод;
2. запустить;
3. объяснить отличие;
4. переписать в понятный production-вариант.

Обязательные случаи:

- alias двух объектов;
- shallow spread с вложенным объектом;
- `values[7] = 4`;
- hole против `undefined`;
- `delete array[index]` против `splice`;
- рекурсивный getter/setter.

### J3. Functions, closure и `this`

Реализовать:

- counter factory;
- `once(fn)`;
- `debounce(fn, delay)` с отменой;
- объект с методом, который ломается после detach;
- исправление через wrapper и `bind`;
- маленький emitter `on/off/emit`.

Нужно объяснить, что именно хранит каждое closure и кто является `this` в каждом вызове.

### J4. Event loop laboratory

Без запуска предсказать порядок 10 коротких примеров с:

- синхронным кодом;
- `setTimeout`;
- `Promise.then`;
- `queueMicrotask`;
- `async/await`;
- ошибкой до и после `await`.

Затем нарисовать для двух примеров call stack, task и microtask queues. Цель — модель, а не заучивание букв.

### J5. Поиск с конкурирующими запросами

Сделать vanilla JS autocomplete:

- input + debounce;
- URL через `URL`/`URLSearchParams`;
- состояния idle/loading/empty/success/error;
- проверка `response.ok`;
- отмена предыдущего запроса;
- защита от устаревшего ответа;
- retry только для выбранных временных ошибок;
- кнопка повторить;
- сообщение без `innerHTML`.

Acceptance test: медленный первый ответ не может перезаписать быстрый второй.

## Этап B — TypeScript core (P0, после этапа A)

### T1. Перенос J1 без `any`

- domain types;
- literal union для sort direction;
- readonly input;
- корректный return type;
- `unknown` на внешней границе;
- runtime guard/schema;
- ошибки compiler, намеренно вызванные и объяснённые.

### T2. State machine запроса

Представить `idle | pending | success | error` как discriminated union. Добавить exhaustive check через `never`.

В минимальной модели проверить, что невозможно случайно создать состояния:

- loading и data как одновременно независимые флаги;
- success без data;
- error без сообщения.

Если старые данные должны оставаться во время обновления, добавить это явно: `{ status: 'refreshing'; data: User[] }`, а не получать комбинацию случайных booleans.

### T3. Типизированная форма

Форма профиля:

- DOM/React events без `any`;
- отдельные raw values и validated data;
- ошибки по полям;
- optional/nullable различия;
- payload, который соответствует API contract.

## Этап C — React core (P0, после этапа B)

### R1. Список лидов

Мини-CRM slice:

- список;
- search/filter/sort;
- loading/error/empty/success;
- controlled form создания/редактирования;
- устойчивые `key`;
- URL search params;
- detail route;
- удаление с подтверждением;
- сохранение draft только там, где это оправдано.

Начать с local fake API. Backend не нужен, чтобы освоить frontend-state.

### R2. Effects audit

Для каждого effect в R1 ответить:

1. с какой внешней системой он синхронизируется;
2. почему это не вычисление во время render и не event handler;
3. какие dependencies читает;
4. что делает cleanup;
5. можно ли effect удалить.

Исправить один намеренно созданный stale closure и одну request race.

### R3. Reducer, context и server state

- локальный state оставить локальным;
- сложные переходы формы/редактора вынести в reducer;
- через context передать только действительно общее значение;
- сначала реализовать ручной fetch-flow;
- затем заменить server state на TanStack Query **или** RTK Query;
- сравнить количество собственного lifecycle-кода.

Не подключать одновременно Redux Toolkit, RTK Query и TanStack Query ради демонстрации технологий.

### R4. Доступный dialog

- предпочтительно native `<dialog>` или проверенная библиотека;
- понятное accessible name/description;
- открытие с клавиатуры;
- фокус внутри;
- Escape/явное закрытие;
- возврат фокуса инициатору;
- background недоступен во время modal;
- тесты через role/name и keyboard.

## Этап D — рабочее качество (P1)

### Q1. Тесты

Добавить:

- unit tests для фильтра/сортировки/reducer;
- component tests loading/error/empty/success;
- form validation и server error;
- race: последний query остаётся в UI;
- modal keyboard/focus;
- один E2E happy path.

### Q2. Безопасность

Создать безопасный и небезопасный preview пользовательского текста. Объяснить:

- почему `textContent`/React text interpolation безопаснее HTML sink;
- когда нужен sanitizer;
- почему HttpOnly cookie не делает XSS безвредным;
- где требуется CSRF-защита.

Не воспроизводить реальный exploit вне локальной учебной страницы.

### Q3. Производительность

- записать DevTools trace до изменения;
- найти реальный long task/layout/write-read loop;
- исправить один bottleneck;
- добавить route-level lazy boundary;
- сравнить initial bundle и navigation waterfall;
- записать результат и компромисс.

Без измерения задача считается не начатой.

### Q4. Git и доставка

- feature branch;
- небольшие осмысленные commits;
- намеренно созданный и разрешённый conflict;
- pull-request-like self-review;
- typecheck/lint/test/build в CI;
- README с запуском и решениями.

## Проектный маршрут

```text
J1–J5
  → T1–T3
  → R1–R4
  → Q1–Q4
  → портфолио-разбор и mock interview
```

Не требуется выполнить все подпункты сразу. Рабочий sprint — одна вертикаль, например:

```text
поиск лидов
  → чистая JS-функция
  → TS contract
  → React UI
  → запрос/race/error
  → тест
  → объяснение решения
```

## Definition of done для портфолио-проекта

- проект доступен по инструкции;
- нет необъяснимого `any`;
- обработаны loading/error/empty/success;
- форма доступна с клавиатуры;
- данные не выводятся через небезопасный HTML sink;
- критичная логика протестирована;
- нет случайно закоммиченных secrets;
- README описывает не список технологий, а проблему, решения и trade-offs;
- ученик может заново написать центральный flow и ответить на вопросы без просмотра готового кода.
