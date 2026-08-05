# REST API глазами frontend-разработчика

**Приоритет:** P0  
**Назначение:** связать в одну картину browser, frontend, `fetch`, Promise, HTTP и API  
**Граница:** это frontend-facing минимум, а не отдельный курс по backend

Подробности об асинхронности и сетевых крайних случаях находятся в
[«Асинхронность, сеть и загрузка данных»](async-network-browser.md).
Здесь важна прежде всего связь двух приложений: frontend-клиента и API-сервера.

## 1. Главная схема

```text
пользователь нажал кнопку
  → обработчик в React вызвал fetch()
  → browser отправил HTTP request
  → API server принял request
  → server проверил данные и права
  → server прочитал или изменил данные
  → server отправил HTTP response
  → await получил Response
  → frontend обновил state
  → React отобразил новый UI
```

Frontend и backend обычно являются разными программами.

- **Client** — приложение, которое запрашивает данные. В нашем случае это
  frontend-код в browser.
- **Server** — программа, которая принимает запросы, выполняет серверную
  логику и возвращает ответы.
- **API** — публичный договор о том, какие запросы server принимает и какие
  ответы возвращает.
- **HTTP** — протокол, то есть формат передачи request и response.
- **REST** — архитектурный стиль проектирования API вокруг ресурсов и
  стандартной семантики HTTP.

Коротко:

```text
REST описывает устройство API
HTTP переносит request и response
fetch создаёт HTTP request из JavaScript
Promise представляет будущий результат операции
async/await помогает работать с этим Promise
```

JSON — лишь распространённый формат body. Наличие URL и JSON ещё не делает API
RESTful.

## 2. Как REST связан с Promise, `async/await` и `fetch`

Это разные уровни одной операции:

```js
async function loadTasks() {
  const response = await fetch('/api/tasks');
  const tasks = await response.json();

  return tasks;
}
```

Что здесь происходит:

1. вызов `loadTasks()` сразу возвращает Promise;
2. `fetch()` просит browser начать HTTP request и возвращает
   `Promise<Response>`;
3. `await` приостанавливает только выполнение `loadTasks`, а не весь browser;
4. после получения HTTP response выполнение функции продолжается;
5. `response.json()` асинхронно читает body и тоже возвращает Promise;
6. итоговый Promise выполняется массивом задач или отклоняется с ошибкой.

Сам REST ничего не знает о JavaScript, Promise или React. Тот же API может
использовать мобильное приложение, другой server или Postman.

Важно: `fetch()` обычно не отклоняет Promise из-за HTTP-статуса `404` или
`500`. Server ответил, поэтому browser создал объект `Response`. Статус нужно
проверить отдельно через `response.ok`.

## 3. Анатомия HTTP request и response

### Request

```text
PATCH /api/tasks/42?notify=false
Authorization: Bearer <token>
Content-Type: application/json

{ "completed": true }
```

Request может содержать:

- **method** — намерение: прочитать, создать, изменить или удалить;
- **URL/path** — адрес ресурса;
- **query parameters** — дополнительные параметры выбора;
- **headers** — метаданные, например формат body или данные аутентификации;
- **body** — отправляемые данные; у `GET` body обычно не используют.

### Response

```text
HTTP 200 OK
Content-Type: application/json

{ "id": 42, "title": "Изучить REST", "completed": true }
```

Response содержит:

- **status** — результат обработки request;
- **headers** — метаданные ответа;
- **body** — данные или описание ошибки; body может отсутствовать.

## 4. Resource, endpoint, path и query

**Resource** — предметная сущность, с которой работает API: задача,
пользователь, заказ.

Для ресурса `task` типичные адреса выглядят так:

```text
/api/tasks       коллекция задач
/api/tasks/42    одна задача с id 42
```

**Endpoint** — конкретная доступная операция API. На практике её удобно
обозначать парой `method + path`:

```text
GET /api/tasks
PATCH /api/tasks/42
```

Один path может поддерживать разные операции, поэтому одного URL недостаточно,
чтобы точно назвать endpoint.

### Path parameter

Path обычно идентифицирует конкретный ресурс:

```text
GET /api/tasks/42
```

Здесь `42` — path parameter `id`.

### Query parameters

Query обычно управляет фильтрацией, сортировкой, поиском или пагинацией:

```text
GET /api/tasks?completed=false&limit=20
```

В JavaScript query удобно собирать через `URLSearchParams`:

```js
const query = new URLSearchParams({
  completed: 'false',
  limit: '20',
});

fetch(`/api/tasks?${query}`);
```

Query является частью URL: туда нельзя помещать пароли, tokens и другие
секреты.

## 5. Один ресурс: `/api/tasks`

Предположим, API использует такую форму задачи:

```js
const task = {
  id: 42,
  title: 'Изучить REST',
  completed: false
};
```

Его минимальный CRUD-контракт:

| Задача frontend | Method и path | Обычный успешный ответ |
|---|---|---|
| получить список | `GET /api/tasks` | `200` и массив |
| создать задачу | `POST /api/tasks` | `201` и созданная задача |
| частично изменить | `PATCH /api/tasks/:id` | `200` и обновлённая задача |
| удалить | `DELETE /api/tasks/:id` | `204` без body |

CRUD — это удобное соответствие:

```text
Create → POST
Read   → GET
Update → PATCH или PUT
Delete → DELETE
```

Это распространённые соглашения, но источником истины всегда остаётся
документация конкретного API.

Семантика HTTP точнее простой CRUD-таблицы:

- `GET` является safe и idempotent: client не просит изменить состояние
  ресурса, хотя server всё равно может, например, записать технический log;
- `POST` просит resource-specific обработку; создание — частый, но не
  единственный сценарий, и метод не считается idempotent по умолчанию;
- `PUT` создаёт или полностью заменяет состояние target resource и является
  idempotent;
- `PATCH` применяет patch document; это обычно частичное изменение, но формат
  и идемпотентность определяет контракт;
- `DELETE` idempotent по ожидаемому конечному эффекту, хотя повторный response
  может отличаться. Метод не обещает физически стереть строку из database.

### Общая обработка ответа

```js
async function readApiResponse(response) {
  const hasBody = response.status !== 204 && response.status !== 205;
  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const body = hasBody && isJson ? await response.json() : null;

  if (!response.ok) {
    const message = body?.message ?? `HTTP ${response.status}`;
    throw new Error(message);
  }

  if (hasBody && !isJson) {
    throw new Error('API вернул неожиданный формат ответа');
  }

  return body;
}
```

Helper учитывает два важных случая:

- HTTP-ошибка не становится rejection автоматически;
- после `204 No Content` нельзя вызывать `response.json()`.

В рабочем TypeScript-приложении распарсенный JSON дополнительно проверяют
согласно ожидаемой runtime-схеме: один TypeScript-тип не может проверить данные,
пришедшие из сети.

### `GET`: получить задачи

```js
async function getTasks() {
  const response = await fetch('/api/tasks', {
    headers: { Accept: 'application/json' },
  });

  return readApiResponse(response);
}
```

### `POST`: создать задачу

```js
async function createTask(title) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  return readApiResponse(response);
}
```

`Content-Type` описывает формат отправляемого body. Сам объект JavaScript
нужно явно преобразовать в JSON-строку через `JSON.stringify`.

### `PATCH`: изменить часть задачи

```js
async function updateTask(id, changes) {
  const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  });

  return readApiResponse(response);
}

updateTask(42, { completed: true });
```

`PATCH` передаёт только изменяемые поля. `PUT` по обычной семантике заменяет
представление ресурса целиком, но точное поведение определяет контракт API.

### `DELETE`: удалить задачу

```js
async function deleteTask(id) {
  const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });

  return readApiResponse(response); // null при 204
}
```

После успешной mutation frontend должен синхронизировать UI: обновить локальный
state либо инвалидировать соответствующий query cache.

## 6. Статусы и ошибки

`response.ok` равен `true` для диапазона `200–299`.

Группы статусов:

| Диапазон | Значение для frontend |
|---|---|
| `2xx` | request успешно обработан |
| `3xx` | перенаправление или работа HTTP cache |
| `4xx` | request, данные, auth или права не подходят |
| `5xx` | server или зависимый service не смог выполнить операцию |

Часто встречаются:

- `200 OK` — успешный ответ с body;
- `201 Created` — ресурс создан;
- `204 No Content` — успех без body;
- `400 Bad Request` — request не соответствует требованиям;
- `401 Unauthorized` — обычно нужна или не прошла аутентификация;
- `403 Forbidden` — действие запрещено;
- `404 Not Found` — endpoint или ресурс не найден;
- `409 Conflict` — конфликт с текущим состоянием;
- `422 Unprocessable Content` — данные не прошли предметную валидацию;
- `500 Internal Server Error` — непредвиденная ошибка на server.

Полезно различать:

```text
network/CORS/abort error → fetch Promise rejected
HTTP 4xx/5xx             → fetch Promise fulfilled, response.ok === false
invalid JSON             → response.json() rejected
unexpected data shape    → runtime-проверка данных failed
```

Error body тоже является частью контракта. Например:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Название обязательно",
  "fields": {
    "title": "Введите название"
  }
}
```

UI может показать `fields.title` рядом с полем, но не должен предполагать такую
структуру, если она не описана API.

## 7. API contract и OpenAPI

**API contract** отвечает на вопросы:

- какой `method + path` использовать;
- какие path/query parameters допустимы;
- какие headers обязательны;
- какое request body и media type отправлять;
- какие success/error statuses возможны;
- какую форму имеют success и error body для каждого статуса;
- какой base URL/environment использовать;
- требуется ли authentication;
- как устроены pagination, sorting и filtering.

OpenAPI — машиночитаемое описание HTTP API. Swagger UI — один из интерфейсов,
в котором это описание удобно читать и пробовать.

Контракт не нужно угадывать по названию endpoint. Перед реализацией frontend
сначала читает документацию, затем проверяет запрос в browser Network panel или
API-клиенте и только потом связывает его с UI.

Более инженерный чек-лист находится в
[разделе API contract](../06-engineering/engineering-basics.md#10-api-contract).

## 8. CORS и auth — отдельные границы

### CORS

CORS — browser-механизм, который ограничивает чтение ответа от другого origin.
Origin определяется сочетанием scheme, host и port.

```text
http://localhost:3000  frontend
http://localhost:4000  API
```

Это разные origins из-за разных ports. Разрешение на такой запрос настраивает
API server через HTTP headers.

Важно:

- CORS не является аутентификацией или авторизацией;
- blocked для JavaScript response не означает, что server обязательно не
  получил и не выполнил request;
- Postman и server-to-server запросы не подчиняются browser CORS так же, как
  страница;
- `mode: 'no-cors'` не открывает доступ к данным: response становится opaque;
- dev proxy может упростить локальную разработку, но не заменяет корректную
  production-конфигурацию.

### Authentication и authorization

- **Authentication** отвечает: «кто пользователь?»
- **Authorization** отвечает: «разрешено ли ему это действие?»

API может использовать, например:

```js
fetch('/api/tasks', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

или cookie-based session:

```js
fetch('/api/tasks', {
  credentials: 'include',
});
```

Конкретный вариант определяет auth-контракт. Cookie, CORS, CSRF и token storage
нельзя настраивать случайным копированием примера. Секреты server и пароли
никогда не помещают в frontend bundle.

Граница между browser, API и database подробнее показана в
[«Backend later»](../90-later/backend-later.md#что-frontend-разработчику-нужно-знать-уже-сейчас).

## 9. Пошаговая практика

Практиковаться лучше на одном ресурсе `task`, не меняя предметную область на
каждом шаге.

1. Нарисовать от руки цепочку `button → fetch → API → response → state → UI`.
2. Выполнить `GET /api/tasks` и найти в DevTools → Network method, URL, status,
   request headers и response body.
3. Вывести состояния `loading`, `success`, `empty`, `error`.
4. Реализовать `POST` и добавить возвращённую server задачу в UI.
5. Реализовать `PATCH` для checkbox `completed`.
6. Реализовать `DELETE` и корректно обработать `204`.
7. Искусственно получить `400`, `404` и `500`; показать понятные сообщения.
8. Открыть два быстрых запроса и изучить race condition и отмену через
   `AbortController` в
   [материале по асинхронности](async-network-browser.md#6-abortcontroller-и-react-cleanup).
9. После ручного понимания повторить CRUD через TanStack Query или RTK Query и
   сравнить cache invalidation с ручным обновлением state.

## 10. Критерий освоения

Тема освоена на базовом frontend-уровне, если ты можешь без подсказки:

1. объяснить разницу между REST, HTTP, `fetch`, Promise и `async/await`;
2. нарисовать путь данных от React-кнопки до API server и обратно;
3. прочитать контракт endpoint: method, path, parameters, headers, body,
   statuses и response schema;
4. реализовать `GET`, `POST`, `PATCH`, `DELETE` для одного ресурса;
5. объяснить, почему `fetch` не бросает ошибку автоматически при `404/500`;
6. корректно обработать JSON, error body и `204 No Content`;
7. найти запрос в Network panel и определить, на какой границе возникла ошибка;
8. отличить CORS от authentication и authorization;
9. связать request с `loading/error/empty/success` состояниями React UI.

Этого достаточно, чтобы уверенно работать с REST API со стороны frontend.
Проектирование database, серверная auth-архитектура и инфраструктура остаются
отдельным будущим треком, а не условием начала React-практики.

## Первичные опоры

- [Roy Fielding — REST architectural style](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [RFC 5789 — PATCH Method for HTTP](https://www.rfc-editor.org/rfc/rfc5789.html)
- [MDN — Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN — Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
- [MDN — CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
