# Базовая web-безопасность для frontend

**Приоритет:** P1  
**Основа:** видеоконспект/скриншоты о XSS и CSRF, проектный auth-контекст  
**Граница:** frontend участвует в защите, но session policy, CSRF verification, validation и authorization не могут существовать только на клиенте.

## 1. XSS

Cross-Site Scripting возникает, когда недоверенные данные превращаются в исполняемую разметку/код в контексте приложения.

Основные формы:

- **stored:** payload сохранён в базе и показывается другим пользователям;
- **reflected:** данные из запроса отражаются в ответ;
- **DOM-based:** опасная операция происходит в клиентском JavaScript.

Риск не ограничен кражей cookie. Код в origin приложения может:

- менять DOM и подменять форму;
- читать доступные JavaScript данные;
- слушать ввод;
- отправлять authenticated requests;
- извлекать данные из ответов, доступных приложению.

## 2. Source → transformation → sink

При анализе ищут цепочку:

```text
URL / API / storage / user input
              ↓
       преобразование данных
              ↓
innerHTML / insertAdjacentHTML / document.write /
dangerouslySetInnerHTML / eval-подобный sink / опасный URL
```

Безопасный вывод обычного текста:

```js
message.textContent = untrustedText;
```

Обычная React interpolation экранирует текст:

```jsx
return <p>{comment.text}</p>;
```

Но безопасность зависит от контекста. HTML body, attribute, URL, CSS и JavaScript string требуют разных правил. Фраза «просто экранируй символы везде одинаково» недостаточна.

Опора: [OWASP — Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).

## 3. Если продукту действительно нужен HTML

Rich text требует явной trust boundary и проверенного sanitizer.

```tsx
import DOMPurify from 'dompurify';

function RichComment({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

Нужно определить:

- откуда приходит HTML;
- какая конфигурация sanitizer;
- разрешены ли links/images;
- кто тестирует bypass payloads;
- не модифицируется ли sanitized HTML после очистки;
- не устаревает ли sanitizer.

Regex не является полноценным HTML sanitizer.

## 4. CSP и Trusted Types

Content Security Policy ограничивает допустимые источники/способы выполнения ресурсов и уменьшает ущерб, но не заменяет безопасный вывод.

Зрелый rollout:

1. инвентаризация inline scripts/styles и внешних origin;
2. `Content-Security-Policy-Report-Only`;
3. отчёты и устранение нарушений;
4. nonce/hash вместо широкого `'unsafe-inline'`;
5. enforce policy;
6. для DOM XSS — рассмотрение Trusted Types.

Не копировать один CSP header в любой проект: policy зависит от ресурсов и инфраструктуры.

## 5. Cookies, tokens и storage

### HttpOnly cookie

- JavaScript не может прочитать значение;
- браузер всё равно может автоматически приложить cookie к подходящему запросу;
- поэтому XSS всё ещё может выполнять действия от лица пользователя;
- нужны `Secure`, разумный `SameSite`, узкие Domain/Path и серверные меры.

### localStorage/sessionStorage

- доступны JavaScript origin;
- XSS может прочитать содержимое;
- удобство хранения token не делает его безопасным;
- выбор auth architecture должен учитывать threat model, backend и UX, а не правило «JWT всегда хранить в X».

Нельзя переносить реальные IP, credentials, access/refresh tokens или `.env` значения из учебного архива в новую базу/README/репозиторий.

## 6. CSRF

Cross-Site Request Forgery использует ambient credentials: браузер прикладывает сессионную cookie, хотя пользователь инициировал действие через чужой сайт.

Защита обычно комбинирует:

- synchronizer token;
- signed double-submit cookie pattern в подходящей архитектуре;
- проверку `Origin`/`Referer` для state-changing requests;
- `SameSite` как defense in depth;
- запрет state changes через safe methods;
- повторную аутентификацию/подтверждение для критичных действий.

Frontend:

- получает token предусмотренным сервером способом;
- отправляет его в ожидаемом header/body;
- не логирует secrets;
- корректно использует credentials mode;
- не строит URL мутации из недоверенного ввода.

Server:

- генерирует и проверяет token;
- проверяет origin/session/authorization;
- не считает наличие кастомного header достаточным без своей проверки.

`SameSite` не стоит считать универсальной единственной защитой. OWASP описывает его как дополнительный слой для большинства deployments: [CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

## 7. XSS и CSRF — не взаимоисключающие темы

- CSRF обычно не требует выполнить чужой JavaScript внутри origin жертвы.
- XSS выполняет код внутри доверенного origin и часто может обходить многие CSRF-механизмы, потому что приложение само прочитает/добавит token.
- HttpOnly мешает прочитать cookie, но не мешает отправить authenticated request из заражённой страницы.

Защита строится слоями.

## 8. CORS — не authorization

CORS управляет тем, может ли frontend одного origin читать response другого origin в браузере. Он:

- не заменяет login/roles/permissions;
- не мешает всем видам отправки запроса;
- не защищает API от curl/server-to-server клиента;
- конфигурируется ответом сервера.

С `credentials` нельзя бездумно сочетать произвольный origin и широкую политику.

## 9. HTTPS, secure context и mixed content

HTTPS — HTTP поверх TLS. При корректной проверке сертификата TLS даёт:

- шифрование данных в пути;
- контроль целостности;
- аутентификацию сервера для запрошенного hostname.

Это не делает приложение автоматически безопасным: XSS, уязвимая авторизация и утечка на endpoint остаются возможны.

Практически для frontend:

- production-страница и API должны использовать HTTPS;
- cookie с `Secure` не отправляется по обычному HTTP;
- многие мощные browser APIs доступны только в secure context;
- HTTPS-страница не должна загружать активный HTTP-контент: mixed content может быть заблокирован или обновлён браузером;
- локальный `http://localhost` имеет специальные послабления для разработки, но не является production-моделью;
- HSTS может потребовать от браузера использовать HTTPS для домена.

Опоры: [MDN — Transport Layer Security](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security) и [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security).

## 10. Внешние зависимости

Frontend supply-chain минимум:

- не устанавливать пакет только ради маленькой функции;
- проверить владельца, release history и dependency tree;
- фиксировать lockfile;
- обновлять security fixes;
- не исполнять непроверенный snippet из CodePen/Telegram;
- bundle analyzer и audit — сигналы, но не доказательство безопасности.

## Что уметь сказать на собеседовании

> React экранирует обычные значения в JSX, но `dangerouslySetInnerHTML`, сторонние DOM APIs и опасные URL создают отдельные sinks. Rich HTML проходит через поддерживаемый sanitizer.

> HttpOnly защищает значение cookie от чтения JavaScript, но XSS всё ещё может посылать запросы в origin. Поэтому нужны безопасный вывод, CSP и корректная session/authorization модель.

> CSRF token должен проверяться сервером. SameSite и Origin checks — дополнительные слои; CORS не является системой авторизации.

## Практический критерий

В локальной учебной песочнице:

1. показать, почему `innerHTML` превращает ввод в markup;
2. заменить на `textContent`;
3. отдельно реализовать допустимый rich text через sanitizer;
4. найти все sinks статическим поиском;
5. объяснить, какие части CSRF flow принадлежат frontend, а какие backend;
6. написать security checklist для формы login/profile без копирования секретов.
