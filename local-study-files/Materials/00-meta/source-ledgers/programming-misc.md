# Ledger S05: market, mixed, Preax и вакансии

Сокращение:

`P = local-study-files/materials/PROGRAMMING`

Проверялось только:

- корень `P`;
- `АКТУАЛЬНЫЕ ЗНАНИЯ НА РЫНКЕ ТРУДА, СКРИНЫ ИЗ ВИДЕО`;
- `СОБРАННЫЕ МАТЕРИАЛЫ В РАЗНОМ ФОРМАТЕ И КОНТЕКСТЕ`;
- `Тест скила на фронтент в preax`;
- `требования из вакансий`.

Notion и BOOKS относятся к отдельному S03/S04 ledger.

## Покрытие

- 66/66 файлов;
- 59/59 изображений декодированы, распознаны и визуально проверены;
- 4/4 текстовых файла прочитаны;
- 3 `.DS_Store`;
- битых/нечитаемых/непроверенных: 0;
- exact binary duplicates: 0.

Preax содержит только экраны 12–55 из 56. Экраны 1–11 и 56 отсутствуют в исходной папке; это не ошибка чтения.

## Файлы вне Preax

| Путь относительно `P` | Содержание | Решение |
|---|---|---|
| `.DS_Store` | Finder metadata | drop |
| `АКТУАЛЬНЫЕ…/README.md` | происхождение четырёх кадров из видео про найм frontend в 2026 | provenance; исходная ссылка не сохранена |
| `АКТУАЛЬНЫЕ…/ЗНАНИЕ 1.png` | client → HTTP → API/server/DB → response; methods | merge в HTTP/data note |
| `АКТУАЛЬНЫЕ…/ЗНАНИЕ 2.png` | GET/query, request/response, JSON | merge; не копировать неточный JSON/лишние language labels |
| `АКТУАЛЬНЫЕ…/ЗНАНИЕ 3.png` | code → build → test → deploy → monitor/operate | merge кратко в engineering |
| `АКТУАЛЬНЫЕ…/ЗНАНИЕ 4.png` | monolith vs microservices | defer; слишком буквальная схема «service обязательно со своей DB» |
| `СОБРАННЫЕ…/.DS_Store` | metadata | drop |
| `СОБРАННЫЕ…/README.md` | provenance mixed collection | archive |
| `СОБРАННЫЕ…/СКРИНШОТ ИЗ ПРОЕКТА…jpg` | ошибочный class `User` | practice/debug; не справка |
| `СОБРАННЫЕ…/Какие методы НТТР-запросов есть?.png` | GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS/CONNECT/TRACE | correct-merge; CONNECT/TRACE не P1 |
| `СОБРАННЫЕ…/вроде как база которую нужно знать фронтендеру.png` | callbacks → Promise → async/await → Fetch | correct-merge P0 |
| `СОБРАННЫЕ…/Статусы НТТР-запросов.png` | 2xx/3xx/4xx/5xx | merge с конкретными статусами/`response.ok` |
| `СОБРАННЫЕ…/ПРИЛОЖЕНИЕ…/.DS_Store` | metadata | drop |
| `…/README.md` | provenance mini-CRM | archive |
| `…/кнопка send.png` | Postman POST register crop | project artifact; знаний нет |
| `…/продолжить схему…png` | ручная server ↔ CRM ↔ DB | correct/defer: browser → API → DB |
| `…/Вопросы по бэку.txt` | Mongo/ports/env/Node/service/auth/hash/JWT/Postman/Fastify/Zod | partial merge HTTP/auth; остальное backend-later; secret-like value не копировать |
| `СОБРАННЫЕ…/СКРИНШОТ ИЗ ДЕАЛОГА…png` | sparse array: запись в index 7 | interview practice P0, личный диалог не переносить |
| `требования из вакансий/1.png` | JS async, React hooks/state/router, HTML/CSS, HTTP/API/DevTools, SQL, metrics | merge market sample |
| `требования из вакансий/2.png` | async/fetch/errors/Git; Angular/PHP/Symfony | transferable merge; чужой stack defer/drop |
| `требования из вакансий/3.png` | strict TS/generics/utility, Vue/Pinia, Vite, REST/OpenAPI, SQL | transferable merge; Vue stack не активный |
| `требования из вакансий/4.png` | React/Context/RTK/query, complex UI, tooling/CI, REST/network states, monitoring/review | главный target-stack sample |

## Preax: что это

Это self-rating от 3 июля 2026 года, а не тест с правильными ответами.

Шкала:

1. не знаком;
2. читал/слышал;
3. применял;
4. понимаю и уверенно применяю.

Результат:

- level 1: 10;
- level 2: 14;
- level 3: 19;
- level 4: 1;
- среднее: 2.25.

Self-rating не подтверждает навык. Каждую P0/P1 тему нужно проверять объяснением и кодом.

## Preax: полная карта 44 файлов

| Файл | Экран | Тема | Оценка | Решение |
|---|---:|---|---:|---|
| `1.png` | 12/56 | CSS triggers/parsing/styles/rendering | 2 | P2; rendering note |
| `2.png` | 13/56 | variables/operators/conditions/loops | 3 | route-app + practice check |
| `3.png` | 14/56 | types/conversions | 3 | route-app + practice check |
| `4.png` | 15/56 | arrays/methods | 3 | route-app + practice check |
| `5.png` | 16/56 | objects/references | 2 | P0 JS gap |
| `6.png` | 17/56 | RegExp | 3 | route-app, P2 |
| `7.png` | 18/56 | error handling/try-catch | 2 | P0 |
| `8.png` | 19/56 | Date | 3 | route-app, P2 |
| `9.png` | 20/56 | DOM | 3 | route-app + practice |
| `10.png` | 21/56 | arguments/return | 3 | P0 verification |
| `11.png` | 22/56 | scope | 3 | P0 verification |
| `12.png` | 23/56 | declaration/expression/arrow | 1 | P0 |
| `13.png` | 24/56 | `this`, bind/apply/call | 1 | P0 |
| `14.png` | 25/56 | recursion/call stack | 1 | stack P0/P1; deep recursion later |
| `15.png` | 26/56 | constructors/classes | 2 | P1 |
| `16.png` | 27/56 | closures/HOF | 2 | P0 |
| `17.png` | 28/56 | timers/events | 3 | P1 verification |
| `18.png` | 29/56 | Promise/Fetch basics | 1 | P0 |
| `19.png` | 30/56 | XHR/HTTP request | 1 | HTTP P0/P1; XHR overview |
| `20.png` | 31/56 | Promise combinators | 1 | P0 |
| `21.png` | 32/56 | Event Loop | 2 | P0 |
| `22.png` | 33/56 | React state/props | 3 | P1 verification |
| `23.png` | 34/56 | class lifecycle | 1 | Later: legacy/interview overview |
| `24.png` | 35/56 | hooks including effect/callback | 3 | P1, app incomplete |
| `25.png` | 36/56 | custom hooks | 2 | P1 |
| `26.png` | 37/56 | Context/Redux/MobX | 3 | Context+RTK; MobX reference |
| `27.png` | 38/56 | React Router/History | 3 | P1 |
| `28.png` | 39/56 | Virtual DOM | 2 | P2 mental model |
| `29.png` | 40/56 | Profiler/useMemo/useCallback | 2 | P2 after correctness |
| `30.png` | 41/56 | TS types | 2 | P1/P0 current route |
| `31.png` | 42/56 | function arguments typing | 2 | P1 |
| `32.png` | 43/56 | return typing | 3 | P1 verification |
| `33.png` | 44/56 | inheritance | 2 | P2 |
| `34.png` | 45/56 | interfaces | 2 | P1 |
| `35.png` | 46/56 | access modifiers | 1 | P2 |
| `36.png` | 47/56 | unions | 1 | P1/P0 |
| `37.png` | 48/56 | generics | 2 | P1 |
| `38.png` | 49/56 | repo/commit/branch | 3 | P1 parallel |
| `39.png` | 50/56 | local/remote repo | 3 | P1 parallel |
| `40.png` | 51/56 | add/remove files | 3 | P1 verification |
| `41.png` | 52/56 | merge conflicts | 1 | P1 |
| `42.png` | 53/56 | branches/commit/revert | 3 | P1 |
| `43.png` | 54/56 | `.gitignore` | 4 | P2/known |
| `44.png` | 55/56 | clone/push/pull | 3 | P1 verification |

## Конкретные исправления

### Recursive accessor

Исходный вариант:

```js
get age() {
  return this.age;
}

set age(value) {
  this.age = value;
}
```

Оба accessor вызывают себя. Корректный учебный вариант:

```js
class User {
  #age;

  constructor(age) {
    this.age = age;
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError('age must be a non-negative number');
    }

    this.#age = value;
  }
}
```

### Sparse array

```js
const values = [1, 2, 3];
values[7] = 4;

values.length; // 8
3 in values;   // false: hole
values[3];     // undefined при чтении
```

Нельзя путать hole и explicit `values[3] = undefined`.

## Агрегат четырёх локальных вакансий

Это sample, не статистика всего рынка:

- JS/TS + один основной framework: 4/4;
- API/HTTP/frontend-backend: 4/4;
- async/error/network states: 3/4;
- HTML/CSS/complex UI: минимум 3/4;
- Git/tooling/Vite/CI: 3/4;
- React: 2/4; Vue: 1/4; Angular: 1/4;
- SQL/data literacy: 2/4;
- analytics/monitoring: 2/4;
- decomposition/review/docs: 2/4.

Для React-трека переносится общее ядро:

- JS/async/errors;
- TS strict/unions/generics/utility;
- React hooks/context/router;
- Redux Toolkit + один query tool;
- REST/OpenAPI и network states;
- Vite/lint/format/CI basics;
- forms/tables/filters;
- Git branches/conflicts/rebase;
- базовое чтение SQL;
- analytics/monitoring на уровне frontend integration.

Angular, Vue/Pinia/PrimeVue и PHP/Symfony не становятся новыми учебными треками.

## Backend questions

Сохранённый frontend-минимум:

- request/response, method, headers, body/status;
- browser → API server → database;
- разные процессы и порты;
- password hash ≠ token;
- Postman как API client;
- OpenAPI contract;
- public frontend config ≠ backend secret.

Отложено:

- Mongo administration/service/auth;
- Mongo shell;
- Fastify/Zod internals;
- Node backend;
- глубокая JWT architecture;
- monolith/microservices;
- SQL beyond basic reading.

Подробный destination: [`backend-later.md`](../../90-later/backend-later.md).
