# Асинхронность, сеть и загрузка данных

**Приоритет:** P0  
**Основа:** видеоконспект, Notion/Telegram-материалы, вопросы из практики  
**Пересечение с приложением:** синтаксис Promise, `async/await`, `fetch`, AbortController и FormData уже есть; здесь хранится mental model и крайние случаи.

## 1. Модель event loop

JavaScript в браузере выполняет один текущий фрагмент кода в call stack. Браузер отдельно обслуживает таймеры, сеть, события и рендеринг, а готовые продолжения ставит в очереди.

Упрощённый порядок одной итерации:

1. выполняется текущая task: скрипт, timer callback, обработчик события;
2. когда stack пуст, выполняются microtasks до опустошения их очереди;
3. браузер получает возможность выполнить rendering/служебную работу;
4. выбирается следующая task.

Promise handlers, продолжение после `await` и `queueMicrotask` относятся к microtasks. `setTimeout` callback — новая task.

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');

// A, D, C, B
```

Важно:

- `await` не блокирует браузер; async-функция приостанавливается, а её продолжение выполняется позже;
- бесконечная или постоянно пополняемая цепочка microtasks тоже может задержать интерфейс;
- точные моменты rendering — ответственность браузера, поэтому модель не стоит превращать в обещание «рендер строго после каждой task».

## 2. Promise и `async/await`

`async`-функция всегда возвращает Promise. `return value` превращается в fulfilled Promise, `throw error` — в rejected Promise.

```js
async function loadUser(id) {
  if (id == null) {
    throw new Error('id is required');
  }

  return { id, name: 'Ann' };
}

loadUser(1).then(console.log).catch(console.error);
```

`await` делает линейным синтаксис одной async-операции, но не устраняет:

- параллелизм нескольких запросов;
- race condition;
- необходимость ловить rejection;
- необходимость отмены/cleanup;
- необходимость явно описывать loading/error/empty states.

Независимые операции не надо случайно сериализовать:

```js
// Параллельно:
const [user, permissions] = await Promise.all([
  fetchUser(),
  fetchPermissions(),
]);
```

### Promise combinators

| API | Когда завершается | Подходит для |
|---|---|---|
| `Promise.all` | fulfilled, когда выполнены все; rejected при первом rejection | все результаты обязательны |
| `Promise.allSettled` | после settlement всех, возвращает status каждого | нужен отчёт по каждой независимой операции |
| `Promise.race` | как только первый Promise fulfilled **или** rejected | соревнование исходов; timeout требует отдельной отмены операции |
| `Promise.any` | при первом fulfillment; если rejected все — `AggregateError` | подходит любой успешный результат |

`Promise.resolve(value)` возвращает Promise, разрешённый переданным значением: для обычного значения он fulfilled, а для Promise/thenable принимает его состояние. `Promise.reject(error)` возвращает rejected Promise.

Короткое завершение `all`, `race` или `any` не отменяет оставшиеся операции. Если сеть/таймер нужно остановить, это проектируется отдельно через `AbortSignal` или другой механизм владельца.

## 3. Правильный минимум `fetch`

Promise от `fetch` обычно не отклоняется из-за HTTP 404/500. Нужно отдельно проверить статус ответа.

```js
async function getJsonOrNull(url, { signal } = {}) {
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}
```

Это helper для API, где любой другой успешный ответ по контракту содержит JSON. Пустой, malformed или неожиданный non-JSON body должен стать отдельной ошибкой контракта, а не «успешными данными».

Разделяй:

- transport/network error;
- HTTP error response;
- ошибка разбора JSON;
- ошибка схемы данных;
- ожидаемая отмена;
- бизнес-ошибка, которую API вернул валидным JSON.

Первичная опора: [MDN — Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

## 4. Состояния запроса в UI

Минимальная модель:

```text
idle → pending → success
               ↘ error
               ↘ aborted
```

Дополнительно могут понадобиться:

- empty — успешный ответ без элементов;
- refreshing — старые данные показаны, свежие грузятся;
- stale — данные есть, но срок свежести вышел;
- partial — часть параллельных источников не загрузилась.

Один boolean `isLoading` не описывает все эти ситуации.

## 5. Race condition и устаревший ответ

Сценарий: пользователь выбрал A, затем B. Ответ B пришёл первым, ответ A — последним и ошибочно перезаписал UI.

Варианты защиты:

1. отменять предыдущий запрос;
2. присваивать операции sequence/request id и принимать только последнюю;
3. использовать query-библиотеку, которая связывает результат с query key;
4. для мутаций проектировать порядок и optimistic update отдельно.

```js
let latestRequestId = 0;

async function loadItems(filter) {
  const requestId = ++latestRequestId;
  const data = await getJsonOrNull(
    `/api/items?filter=${encodeURIComponent(filter)}`,
  );

  if (requestId !== latestRequestId) return;

  if (!Array.isArray(data)) {
    throw new Error('Invalid items response');
  }

  renderItems(data);
}
```

## 6. AbortController и React cleanup

AbortController отменяет операцию, которой передан его `signal`. Отмена может прервать не только ожидание headers, но и чтение response body.

```jsx
useEffect(() => {
  const controller = new AbortController();
  let ignore = false;

  async function load() {
    setState({ status: 'pending', data: null, error: null });

    try {
      const response = await fetch(
        `/api/items?filter=${encodeURIComponent(filter)}`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!ignore) {
        setState({ status: 'success', data, error: null });
      }
    } catch (error) {
      if (!ignore && error.name !== 'AbortError') {
        setState({ status: 'error', data: null, error });
      }
    }
  }

  load();

  return () => {
    ignore = true;
    controller.abort();
  };
}, [filter]);
```

Почему есть и `abort`, и `ignore`: не вся async-работа обязана поддерживать AbortSignal, а continuation мог уже перейти к следующему этапу. Cleanup должен гарантировать, что устаревшая операция не обновит state.

React отдельно предупреждает, что ручной fetch в Effect легко приводит к waterfalls и отсутствию кэша; в приложениях с роутером/framework или query-библиотекой часто лучше использовать их data layer: [React — useEffect, Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects).

## 7. Дедупликация запросов

Хранить in-flight Promise по ключу можно, но учебный пример имеет ограничения.

```js
const inFlight = new Map();

function getDeduped(key, requestFactory) {
  if (inFlight.has(key)) {
    return inFlight.get(key);
  }

  const request = requestFactory().finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, request);
  return request;
}
```

Ключ должен учитывать не только URL, но при необходимости:

- HTTP method;
- query/body;
- пользователя/tenant/auth-контекст;
- заголовки, влияющие на ответ.

Нельзя бездумно передать signal одного компонента в общий запрос: один consumer сможет отменить работу всем остальным. Для общего запроса нужен владелец отмены, reference counting либо библиотека, где этот lifecycle уже спроектирован.

## 8. Retry policy

Ретрай — политика, а не `catch` с тремя одинаковыми повторами.

Обычно можно рассматривать повтор для:

- сетевого временного сбоя;
- `408`;
- `429` с учётом `Retry-After`;
- отдельных `5xx`.

Обычно не нужно автоматически повторять большинство `4xx`. Мутации нельзя ретраить вслепую: операция могла выполниться на сервере, а ответ потеряться. Нужна идемпотентность или idempotency key.

Задержка:

```js
const base = 250 * 2 ** attempt;
const jitter = Math.random() * 100;
const delay = Math.min(base + jitter, 5_000);
```

Также нужны:

- предел попыток;
- поддержка AbortSignal во время запроса и ожидания;
- логирование причины;
- уважение server hint;
- отсутствие повторов, когда пользователь уже ушёл со страницы.

Смысл заголовка: [MDN — Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After).

## 9. Cache и stale-while-revalidate

Кэш отвечает как минимум на четыре вопроса:

1. какой key идентифицирует данные;
2. когда данные считаются свежими;
3. когда их удалить;
4. что инвалидирует их после mutation.

Функция, которая возвращает stale value и в фоне меняет обычный `Map`, ещё не реализует обновление UI. Нужны подписчики/observer state, новый render или библиотека, связывающая cache с компонентами.

Для рабочего React-приложения после понимания механики разумны TanStack Query или RTK Query. Они решают cache lifecycle, dedupe, background refetch, retry и invalidation, но всё равно требуют осмысленных query keys и политики свежести.

Опора: [TanStack Query — overview](https://tanstack.com/query/latest) и [Redux Toolkit — RTK Query](https://redux-toolkit.js.org/rtk-query/overview).

## 10. HTTP и REST — необходимый минимум

Цельная схема `frontend → fetch → HTTP → API server → response → UI` и CRUD-примеры
вынесены в [`rest-api-for-frontend.md`](rest-api-for-frontend.md). Здесь остаются
сетевые semantics и крайние случаи, связанные с асинхронностью.

- `GET` читает и должен быть safe.
- `POST` обычно создаёт/запускает действие и не обязан быть idempotent.
- `PUT` обычно заменяет представление ресурса и проектируется idempotent.
- `PATCH` частично изменяет.
- `DELETE` удаляет; повтор должен приводить к тому же конечному состоянию, но конкретный ответ API может отличаться.
- `2xx` — успешный класс; `3xx` — redirect/cache; `4xx` — проблема запроса/прав; `5xx` — сервер не смог обработать.
- REST — архитектурный стиль; URL с JSON сам по себе ещё не гарантирует «RESTful».
- CORS — браузерное ограничение чтения cross-origin ответа; разрешение выдаёт сервер. Это не система авторизации.

Практические статусы:

| Статус | Рабочая интерпретация для frontend |
|---|---|
| `200 OK` | успешный ответ |
| `201 Created` | ресурс создан; API может вернуть его и/или `Location` |
| `204 No Content`, `205 Reset Content` | успешный ответ без JSON-body; не вызывать безусловно `response.json()` |
| `304 Not Modified` | cache revalidation: клиент использует сохранённое представление; это не обычный JSON-ответ приложения |
| `400 Bad Request` | запрос синтаксически/контрактно неприемлем |
| `401 Unauthorized` | обычно отсутствует или не подходит аутентификация |
| `403 Forbidden` | личность может быть известна, но действие запрещено |
| `404 Not Found` | ресурс/route не найден |
| `409 Conflict` | конфликт с текущим состоянием ресурса |
| `422 Unprocessable Content` | синтаксис принят, но данные не проходят предметную обработку/валидацию |
| `429 Too Many Requests` | rate limit; учитывать policy и `Retry-After` |
| `500`, `502`, `503` | server/upstream/service failure; retry только по осознанной политике |

Конкретный API должен документировать свой error body и semantics; UI не выводит пользователю один только номер.

## Что уметь сказать на собеседовании

> `async/await` — синтаксис работы с Promise. Продолжение после `await` выполняется асинхронно; это не отменяет конкурирующие запросы и обработку ошибок.

> `fetch` отклоняет Promise при сетевом сбое, отмене или когда запрос заблокирован/некорректен на уровне Fetch. HTTP 404/500 всё равно дают `Response`, поэтому их проверяю через `response.ok`/`status`.

> Для быстро меняющегося фильтра я защищаю UI от stale response через AbortController или request id; в React cleanup не даёт старой операции обновить state.

> Retry применяю только к временным и безопасно повторяемым операциям, с backoff, jitter, пределом попыток и `Retry-After`.

## Практический критерий

Собрать поиск/фильтры с искусственно меняющейся задержкой API и показать:

1. воспроизводимый stale-response bug;
2. исправление через request id;
3. исправление через AbortController;
4. loading/error/empty/success;
5. тест, где быстрый второй запрос остаётся в UI после медленного первого.
