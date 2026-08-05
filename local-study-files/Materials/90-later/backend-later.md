# Backend later: нужная граница без второго учебного трека

**Статус:** Later, кроме frontend-facing HTTP/auth/API-минимума  
**Источник:** заметки о mini-CRM, вопросы по серверу и схемы из Materials

Главная цель сейчас — JavaScript → TypeScript → React. Backend сохраняется как будущий контекст fullstack с упором на frontend, но не конкурирует с этой целью.

## Что frontend-разработчику нужно знать уже сейчас

### Нормальная граница

```text
browser UI
  → HTTPS request
  → API server
  → database
  → API response
  → UI state
```

Браузерный React-клиент обычно не подключается напрямую к MongoDB. Server:

- проверяет данные и права;
- выполняет business logic;
- читает/изменяет database;
- скрывает secrets;
- возвращает публичный API contract.

### Разные процессы и порты

`localhost:3000` и `localhost:27017` — не «две части одного файла». Это endpoints разных процессов.

- web/API server слушает свой port;
- процесс MongoDB слушает свой port и хранит данные в выбранном `dbpath`;
- server подключается к MongoDB по connection URI;
- browser обращается к API, а не к database port.

Порт слушает процесс, а не файл базы данных.

### HTTP contract

Нужно уметь читать и проверять:

- method и path;
- path/query parameters;
- headers;
- request body;
- success/error schemas;
- authentication;
- pagination;
- OpenAPI/Swagger-описание.

Postman — HTTP/API-клиент для проверки контракта. Он помогает понять, проблема на server/API или в запросе frontend, но не является frontend продукта.

### Auth: не смешивать сущности

- password передаётся только по защищённому соединению;
- server хранит не исходный пароль, а результат подходящего password hashing;
- password hash не является JWT;
- после аутентификации server может создать session или выдать tokens;
- browser получает только то, что предусмотрено публичным auth-flow;
- HttpOnly cookie не читается JavaScript, но требует продуманной CSRF-защиты;
- секрет server нельзя помещать в client bundle.

Конкретная архитектура access/refresh tokens, rotation и revocation зависит от threat model и откладывается до backend-этапа.

## Исправленные ответы из старых вопросов

### Что делает `mongod --dbpath ...`

Запускает процесс MongoDB с указанным каталогом хранения данных. Команда не «открывает файл, который слушает порт».

### Зачем `.env`

Это один из способов передать configuration процессу. Файл `.env` не является защитой сам по себе:

- секрет не коммитится;
- production secrets приходят из среды/secret manager;
- frontend env values, попавшие в bundle, считаются публичными;
- пример использует placeholders, а не реальные значения.

### Зачем `package.json`

Он описывает package metadata, scripts и dependency constraints. Фактические версии воспроизводятся совместно с lockfile.

### Что делают Fastify и Zod

- Fastify — server framework для Node.js;
- Zod — runtime schema validation/parsing library;
- TypeScript сам не проверяет HTTP JSON во время выполнения.

Это полезно для будущего проекта, но сейчас достаточно понимать границу request → validation → domain → response.

### Что такое JWT

JWT — формат передачи claims. В auth обычно используют подписанный JWS, иногда зашифрованный JWE; сам JWT не является password hash или автоматической полной auth-системой. Безопасность определяется всем lifecycle: транспортом, хранением, сроком жизни, проверкой защиты/claims, обновлением и отзывом.

## Что сознательно отложено

- администрирование MongoDB;
- Mongo shell-команды как отдельный курс;
- Node event loop/server internals глубже frontend-потребности;
- Fastify/NestJS architecture;
- глубокий Zod/schema design;
- password hashing implementation;
- access/refresh token rotation;
- SQL/database design;
- monolith/microservices;
- Docker/Kubernetes и server operations.

Эти пункты не удалены: они остаются в original archive и source ledger со статусом `defer`.

## Когда возвращаться к backend

После того как ученик может:

1. самостоятельно написать JavaScript data flow;
2. типизировать его в TypeScript без маскировки через `any`;
3. собрать React feature с формой, списком, маршрутом и API;
4. обработать loading/error/empty/race;
5. протестировать ключевое поведение;
6. объяснить HTTP и auth boundary со стороны клиента.

Тогда mini-CRM можно расширить вертикально:

```text
typed React form
  → documented HTTP endpoint
  → runtime validation
  → service/domain logic
  → database
  → tests
```

Одна вертикаль полезнее, чем параллельно читать весь backend stack.

## Безопасность архива

В исходных server-заметках встречается значение, похожее на secret. В новую базу оно намеренно не перенесено. Перед будущим использованием старого проекта нужно считать такие значения скомпрометированными, заменить/отозвать их при необходимости и проверить историю репозитория.
