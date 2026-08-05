# Журнал решений и исправлений

Этот файл нужен, чтобы ошибочный или устаревший исходник не вернулся позже как «факт из моей папки».

## JavaScript и TypeScript

| Источник | Проблема | Решение |
|---|---|---|
| S05, screenshot класса `User` | getter/setter `age` обращаются к `this.age` и вызывают бесконечную рекурсию; комментарий про private неверен | не переносить как пример; использовать как debugging-задачу с `#age`/backing field |
| S05, sparse array interview screenshot | holes описаны как явно записанные `undefined` | сохранить вопрос, объяснить: `length === 8`, indices 3–6 — empty slots; чтение даёт `undefined`, но iteration semantics отличаются |
| S06 `message95222` | `let`/`const` названы «не hoisted» | correct-merge: declarations hoisted, доступ до initialization запрещён TDZ |
| S06 `message111641` | spread/`Array.from` представлены решением Unicode целиком | correct-merge: работают по code points, но не гарантируют grapheme clusters; для пользовательских символов нужен `Intl.Segmenter`/осознанная модель |
| S06 `message165027/165028` | вопрос про `this` имеет один ответ без указания среды | correct-merge: browser classic, ESM, Node CJS и strict call отличаются |
| S04 `Ассоциативный array` | object назван associative array | route/correct: в JS обычные arrays индексные; key-value model — Object/Map |
| S04 callbacks | smart quotes дают невалидный JS; callback hell объяснён как свойство callbacks | не копировать код; callback hell — проблема глубокой вложенности/структуры |
| S04/API examples | `as Type` воспринимается как runtime validation | TypeScript note: external JSON остаётся `unknown` до проверки |
| S04 JS types/copy | stack/heap поданы как гарантия языка; recursive `for...in` clone — как общий deep clone | memory placement — engine detail; явно описывать ограничения `structuredClone`/custom clone |
| S04 destructuring | `[redColor, greenColor]` якобы пропускает средний элемент | для пропуска нужен elision: `[redColor, , greenColor]` |
| S04 Homeworks | `localeCompare` якобы возвращает ровно `-1/0/1` | контракт — отрицательное число, `0` или положительное число |

## Async, HTTP и data

| Источник | Проблема | Решение |
|---|---|---|
| S01 React fetch Effect | нет `response.ok` | исправлено в async note |
| S01 retry | повторяет любой non-OK, включая большинство 4xx и потенциально unsafe operation | retry только по policy; transient status/network, idempotency, Retry-After, abort |
| S01 dedupe | signal одного caller может стать владельцем общего request | явно описан cancellation ownership |
| S01 «SWR» | `Map` обновляется в фоне, но UI не подписан и не узнает о свежих данных | не называть полноценным UI SWR; нужны observer/state/query library |
| S05 async screenshot | «Fetch заменил устаревший XHR» | Fetch — основной современный API; XHR существует и исторически применялся для некоторых progress-сценариев |
| S05 HTTP methods | POST/PUT описаны слишком примитивно; CONNECT/TRACE включены в обязательное ядро | сохранить semantics GET/POST/PUT/PATCH/DELETE; остальное только обзор |
| S05 statuses | 3xx сведены к redirect | добавить cache semantics вроде 304 и не заучивать только классы |
| S05/S04 project | Postman назван frontend для backend | Postman — API/HTTP client для проверки контракта |
| S04/S05 project | browser/CRM показан соединённым напрямую с MongoDB | нормальная граница: browser → HTTP API → database |
| S04/S05 project | password hash, access token/JWT смешаны | hash хранится сервером для password verification; token выдаётся auth flow и представляет session/claims |

## React и state

| Источник | Проблема | Решение |
|---|---|---|
| S04 Redux | старый `createStore`/manual switch показан как основной путь | концепцию reducer оставить; рабочий путь — Redux Toolkit |
| S04 reducer | reducer якобы обязан всегда вернуть новый object | unknown/no-op action возвращает прежнюю ссылку; RTK Immer разрешает draft-mutation syntax |
| S04 JSX | Babel якобы всегда превращает JSX в `React.createElement` | classic runtime может так делать; automatic runtime использует `jsx/jsxs`, transformer не обязан быть Babel |
| S04 React Router | импорт из `react-dom`, `useParam`, mismatched tags, обязательный HashRouter и отдельные v6 types | учить по текущим `react-router-dom` docs; hosting fallback — отдельное решение |
| S04 Todolists | setter описан как изменение той же переменной; встречаются direct state mutation и неверный literal object key | state текущего render — snapshot; превратить фрагменты в debugging practice, не копировать |
| S06 custom `useState` implementation | может восприниматься как точное описание React internals | только учебная mental model; не переносить как реализацию React |
| S05 Preax class lifecycle | низкая самооценка может создать ложный приоритет legacy lifecycle | modern hooks/effects — P1; class lifecycle — обзор для legacy/interview |
| S05 React optimization | `useMemo`/`useCallback` идут рядом с core | после корректной state/effect model и измеренной причины |
| S06 SPA/MPA | SPA якобы сразу грузит весь JS, MPA не имеет client JS | современные системы гибридны; splitting/SSR/hydration меняют картину |

## HTML и accessibility

| Источник | Проблема | Решение |
|---|---|---|
| S02 textarea | якобы автоматически увеличивает высоту с текстом | многострочное поле; manual resize и autosize — разные возможности |
| S02 legend | назван универсально обязательным child | использовать как caption связанной группы; не приписывать несуществующую универсальную validation rule |
| S02 submit | `<input type="submit">` назван устаревшим | элемент валиден; `<button>` только гибче по содержимому |
| S02 ARIA required | `aria-required` предлагается как обычная замена/добавка | native `required` даёт behavior; ARIA не заменяет constraint validation |
| S02 implicit submit | Enter описан как всегда одинаковый submit | зависит от controls/submitter/browser algorithm; тестировать сценарий |
| S02 tel/email | `tel` подразумевает validation, email — достаточную проверку | tel не задаёт universal format; email проверяет базовый syntax, server validation обязательна |
| S01 modal | короткий hand-made focus trap выглядит универсальным | предпочесть native dialog/проверенную library; custom pattern тестировать на empty/dynamic/nested cases |
| S01 aria-modal | атрибут представлен как блокировка background | он сообщает semantics; interaction/focus/inert реализуются отдельно |

## Rendering и delivery

| Источник | Проблема | Решение |
|---|---|---|
| S01 reflow | создаётся впечатление, что layout всегда пересчитывает всё дерево | invalidation может быть scoped; проверять trace |
| S01 geometry reads | любое чтение `offsetWidth` якобы всегда вызывает reflow | forced sync layout возникает, когда актуальный layout нужен после invalidation |
| S01 transform/GPU | `transform`/`opacity` якобы гарантированно только GPU/composite | browser-dependent; layer promotion, paint preparation и memory остаются |
| S01 code splitting | route splitting/vendor chunks представлены универсальным правилом | analyzer → user flow → measured boundary; defaults/manualChunks — trade-off |
| S01 prefetch/preload | воспринимаются как бесплатное ускорение | конкурируют за bandwidth/priority; применять стратегически |
| S01 HTTP/1.1 | «ровно шесть соединений» | типичное ограничение на origin/browser, не закон |
| S01 sizes/conversion | иллюстративные числа поданы как устойчивые | не переносить цифры без измерения конкретного проекта |
| S05 microservices diagram | сервис = своя DB как обязательное правило | это возможный autonomy pattern, не definition; тема later |

## Security

| Источник | Проблема | Решение |
|---|---|---|
| S01 cookies | HttpOnly может восприниматься как полная XSS-защита | значение не читается JS, но XSS может выполнять authenticated actions |
| S01 CSRF | SameSite может восприниматься как единственная защита | defense in depth: token/origin + корректные methods + SameSite |
| S04/S05 server notes | реальные host/token/secret-like данные рядом с учебным текстом | не переносить literal values; только placeholders и concepts |
| S06 `message164014` AMP | устаревшие SEO/молния/CTR обещания | drop как текущий guide |
| S06 API key post | совет полезен, но требует точного разделения public frontend config и server secret | сохранить principle: секрет нельзя shipping в client bundle/repo |
| S04 Server/mini-CRM | реальные IP/token-like/config данные смешаны с учебным журналом | только sanitized concepts; старые deployment-команды не считать runbook |

## Карьера и методика

| Источник | Проблема | Решение |
|---|---|---|
| S05 вакансии | 4 screenshots могут выглядеть полной статистикой рынка | называть sample; сверять с живыми вакансиями |
| S05 Preax | self-rating может выглядеть тестом/доказательством знания | использовать только как historical baseline; проверять задачей/объяснением |
| S06 links | 162/169 Telegram posts ведут наружу, preview выглядит как локальный конспект | title/caption — index only; факты сверять с primary docs |
| S04/S06 ready-made practice | готовый CodePen/solution провоцирует копирование | извлекать постановку и acceptance criteria; solution открывать после попытки |
| S06 AI-learning study | passive AI use может заменить retrieval/struggle | встроить rule: ученик сначала думает/пишет, AI даёт progressive hints |
| S03 BOOKS README | 3-е издание 2019 названо «актуальным» | историческая отметка; текущий официальный выпуск — 4-е издание 2024, старую книгу использовать выборочно |
| S04 Storybook | описан как Git-подобный отдельный сайт | component workshop/dev tool с отдельной build/deploy-возможностью |
| S04 Homeworks | `DetailedHTMLProps` якобы добавляет ARIA/focus; используется deprecated `onKeyPress` | сверять React types; keyboard handler — `onKeyDown`/`onKeyUp` по сценарию |
| S04 links | нелегальная activation-ссылка и конкретный старый Webhook.site id лежат рядом с ресурсами | `drop`; не переносить небезопасные/неэтичные или приватно-одноразовые ссылки |

## Как добавлять новую коррекцию

Формат:

```text
source id/path → исходный тезис → почему опасен → нормализованная версия → destination
```

Не удалять старую запись после исправления тематического файла: журнал нужен, чтобы ошибка не вернулась при повторном аудите оригиналов.
