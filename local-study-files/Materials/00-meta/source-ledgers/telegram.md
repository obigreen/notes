# Ledger S06: Save_from_tg

Источник:

`local-study-files/materials/Save_from_tg`

## Что это

Telegram HTML-export «Избранного» с производным каталогом и локальным navigation app.

- 1 429 файлов;
- 1 767 827 385 bytes;
- период сообщений: 2024-01-30 — 2026-03-01;
- `messages.html`: 1 004 блока = 699 messages + 305 date/service dividers;
- 509 сгруппированных app-posts;
- 169 app-posts в разделе «Программирование», покрывающих 171 исходное сообщение.

Главный вывод: это **индекс закладок**, а не автономный конспект.

- 162/169 programming posts имеют external URL;
- 166 URL occurrences, 163 unique;
- 166/169 имеют attachment, обычно cover/preview;
- локально содержательны лишь несколько text cards, poll, voice и project notes.

Caption/title/preview нельзя переносить как истинное содержание внешней статьи.

## Проверка целостности

- 662 фактических attachments: 463 photos, 161 video, 16 voice, 11 GIF, 10 files, 1 audio;
- все 1 353 unique local paths из каталога существуют;
- 13 «orphans» после сверки оказались 4 Unicode NFC/NFD path mismatches и 9 unused sidecar thumbnails;
- 3 hash duplicate groups — sticker и thumbnails, без знаний;
- локальных битых/нечитаемых файлов: 0.

## Ограничения существующего app-analysis

Отметка `coverage 699/699` означает сохранённые message IDs, а не корректную семантику.

Найдены проблемы:

- связанные voice/messages распались, потому что grouping требует одинаковые sender + timestamp;
- poll `message165027` отделён от картинки `message165028`;
- HTTPS, Telegram Mini App, resume, take-home, API secret, AI-learning research, clickjacking и poll `this` попали не в programming;
- нерелевантные promo/Python/visual items попали в programming;
- broken duplicated URLs у `message98961` и `message100428`.

Поэтому эта разметка пересобрана по содержанию.

## Итог по 169 programming posts

| Класс | Количество |
|---|---:|
| P0 core/correct/practice | 26 |
| P1 extract/practice/React reference | 43 |
| P2/later | 34 |
| exact URL duplicates | 3 |
| drop/out-of-track | 63 |
| Всего | 169 |

## P0 core — 16

Формат: `order / message-id · date · тема → URL`.

```text
055/message93163 · 2024-10-18 · Event Loop → https://youtu.be/vIZs5tH-HGQ
064/message93520 · 2024-10-29 · Arrow functions → https://youtu.be/qVkJQr46UIM
066/message93704 · 2024-11-01 · ES modules → https://www.youtube.com/watch?v=pgID-YDiS6A
072/message94269 · 2024-11-12 · Callbacks → https://youtu.be/a6GAC4Ir9f8
103/message95946 · 2024-12-20 · 9 JS interview questions → https://thecode.media/9-js-questions/
130/message97356 · 2025-01-23 · JSON → https://tproger.ru/articles/kak-rabotat-s-json-v-veb-razrabotke-
139/message97842 · 2025-01-31 · 25 JS concepts → https://youtu.be/__OZEJIeu4c
162/message98651 · 2025-02-17 · Event Loop supplementary → Tproger article
226/message103310 · 2025-04-02 · Chrome DevTools → https://habr.com/ru/companies/intec_balance/articles/884482/
233/message104044 · 2025-04-08 · cookies/localStorage/sessionStorage → Tproger article
261/message107946 · 2025-05-19 · useState learning model → https://github.com/VictorTrumpel/useState-baza
287/message111631 · 2025-06-23 · async/await → https://thecode.media/async-await-v-javascript/
339/message116221 · 2025-08-22 · setTimeout → https://thecode.media/settimeout-v-javascript/
375/message140177 · 2025-10-23 · TypeScript any → https://habr.com/ru/articles/859114/
407/message152071 · 2025-12-16 · mentor: native JS/event loop/promises · local text
446/message159915 · 2026-01-19 · try/catch + async → https://thecode.media/try-catch-v-javascript/
```

Destination:

- JS syntax already in app → `route-app`;
- event loop/async/network → `02-javascript/async-network-browser.md`;
- TypeScript any/unknown → `03-typescript/typescript-core.md`;
- React useState source is a model, not actual internals → `04-react/react-core.md`;
- external articles remain pointers; normalized facts use primary docs.

## P0 correct-before-use — 3

```text
082/message95222 · 2024-11-30 · ES5 vs ES6 · local text
401/message151479 · 2025-12-13 · SPA vs MPA · local text
498/message165027 + message165028 · 2026-02-24 · poll this/arrow/strict mode
```

Corrections:

- `let`/`const` are hoisted, but inaccessible in TDZ before initialization;
- SPA does not require one initial monolithic JS file; modern SPA/MPA can mix splitting, SSR and hydration;
- `this` answer depends on classic browser script/ESM/Node CJS/strict call.

## P0 practice — 7

```text
111/message96418 · 35 JS pet projects
144/message97905 · Dictionary App
166/message98962 · multi-step form validation
170/message99325 · autocomplete
187/message100559 · shopping cart
193/message100940 · tabs
230/message103618 · form validation
```

Решение: извлечь постановку/acceptance criteria, не показывать готовый source до самостоятельной попытки.

## P1 extract — 16

```text
094/message95828 · cookies
137/message97702 · binary vs text formats
138/message97841 · Push notifications
165/message98961 · reading foreign code · broken duplicated URL
200/message101754 · loading optimization
218/message102612 · memory leaks
227/message103311 · BroadcastChannel/tab sync
289/message111641 · Unicode/emoji
322/message115246 · web platform Baseline 2025
363/message132028 · keyboard events
365/message133764 · mouse events
366/message133765 · performance checklist
384/message146377 · fast sites
412/message153936 · Date
484/message163329 · how computer executes JS
491/message164168 · OAuth/PKCE
```

Decisions:

- browser events/Date mostly `route-app`;
- memory/performance → engineering/rendering;
- OAuth/PKCE → reference after auth basics;
- Unicode correction: code points ≠ grapheme clusters;
- Baseline 2025 is time-sensitive reference, not memorization task.

## P1 practice — 22

```text
077/message94738 Clipboard API
112/message96576 draggable/sortable grid
114/message96660 Russian pluralization
127/message97263 currency calculator
132/message97467 React Button
133/message97468 show/hide password
136/message97528 phone mask
149/message98014 dark theme
154/message98180 live password validation
155/message98288 JS calendar
164/message98942 tags input
209/message102289 browser extension
222/message103135 temperature converter
229/message103402 rock-paper-scissors
234/message104063 calculator
237/message104651 Cipher Quest
279/message110048 OTP input
286/message111630 WhatItPrints
295/message111986 card-number field
300/message112409 Pros & Cons list
313/message114078 math game
347/message116985 Pomodoro
```

Все external solution links/media остаются в original `content.js`. В активный backlog переносится только небольшая выборка задач, закрывающая текущий пробел.

## P1 React/reference — 5

```text
148/message97990 MobX + React
303/message112510 Next.js Telegram clone
344/message116674 React Bits
379/message143508 advanced React techniques
502/message165580 React animations
```

MobX/Next/animations — reference/later. Они не заменяют последовательную React core базу.

## P2 practice later — 20

```text
070/message94188 Google Sheets form
092/message95798 educational game case
124/message97140 typing effect
182/message100325 browser Paint
184/message100327 analog clock
213/message102412 QR generator
236/message104650 random color
277/message110046 animate-on-scroll timeline
292/message111645 Infinite Runner
293/message111646 Fortune Card
320/message114884 product card
335/message115819 multiplication game
349/message120572 movie carousel
350/message120687 balloon game
357/message124690 Sudoku
359/message126204 Snake
445/message159900 Super Hopper
447/message160041 Desert Horse
462/message161232 browser game engine
496/message164862 animated slider
```

Archive of ideas, not active queue.

## P2 reference later — 14

```text
048/message92829 WebP
054/message93120 Tauri
069/message93911 SVG recipes
104/message95957 Obsidian plugins
125/message97158 FastAPI
181/message100312 microfrontends
201/message101755 CSS 2025
273/message109170 FastAPI second source
348/message116986 AsyncAPI
381/message145271 HTML/CSS bad habits
383/message145429 Docker/Flask
418/message157299 CSS Grid Lanes
458/message160816 Web Components
492/message164436 backend concepts
```

## Exact URL duplicates — 3

```text
178/message99954 → duplicate 163/message98814 · AI-for-web
304/message112511 → duplicate 277/message110046 · animate-on-scroll
373/message138996 → duplicate 365/message133764 · mouse events
```

## Drop/outside current track — 63

IDs/titles retained for reproducibility:

```text
016 Mojo
042 Python async
050 hide/remove scroll
053 signature animation
062 running Python
068 CSS-only slider
071 Pygame
073 Python libraries infographic
074 CSS rating
078 Python VS Code
080 tooltip
091 FastUI
118 Python solitaire
120 Python ML libraries
128 CSS cube
141 Python/YooKassa bot
145 Nuxt async
147 401 visual
153 Python bot registration
159 LED switch visual
163 AI-for-web
168 glass button
169 Python YouTube bot
171 Python subscription bot
175 preloader
186 Bugs animation/broken URL
188 Code Galaxies
194 Python Ping-Pong
198 Coddy promo
202 3D gallery
203 Python booking bot
204 Python crypto bot
207 Django
208 CSS text hacks
216 gradient shadows
228 hover effects
278 weather visual
280 Aura AI
283 Moon toggle
291 Three.js butterflies
319 AI/job-risk news
324 Steroids
329 Python AI assistant
333 AI-for-frontend trends
337 Python file sorter
341 attractiveness service
345 Python cheat sheets
352 gradient border
355 confetti
360 scrollbar styling
368 menu animations
378 ocean visual
386 Python Photoshop
399 CSS trigonometry
413 lava effect
427 CSS progress bar
456 CSS rating
461 CSS 3D carousel
469 feedback visual
475 Valentine animation
479 CSS colors
493 Telegram Bot API
499 business-card visual
```

Причина: Python/game/AI/promo/decorative visual или слишком низкая отдача относительно текущего JS→TS→React.

## Полезное вне app-раздела Programming

| Message | Тема | Решение |
|---|---|---|
| `message97512` | HTTPS | P1 web basics |
| `message100762` | Telegram Mini App fullstack | P2 reference |
| `message107038` | resume principles | P1 career; merge с двумя похожими |
| `message114079` | remote companies/interview repo | P2 reference |
| `message137750` | API keys нельзя хранить в GitHub/client | P1 security |
| `message160403` | Anthropic performance take-home | P2 practice reference |
| `message161749` | passive AI use ухудшает усвоение | P0 teaching method |
| `message161281`, `message164167` | AI coding tools/ownership | P2 tools |
| `message163281` | clickjacking | P2 security |
| `message165027` | poll `this` | объединён с `message165028` |

Consolidate:

```text
message106164 + message107038 + message161747 → resume advice cluster
```

Exclude:

```text
message96782 mass auto-applications
message102351 crowdfunding promo
message105847 Cluely
message115566 Cheating Daddy
message150596 GhostGPT
message164014 outdated/absolute AMP claims
```

Инструменты обмана на интервью намеренно не сохраняются как карьерная стратегия.

## Voice ledger

Проверены 15/16 voice локальным speech-to-text. Financial voice намеренно не транскрибировался по privacy/scope.

| Voice | Содержание | Решение |
|---|---|---|
| `audio_1` | пользователь воспринимает `await` как задержку | P0 gap; async note |
| `audio_2` | бессодержательный звук | drop |
| `audio_3` | Lingva auto-repeat: filters, interval/random, original/translation, modal, speech, responsive type | project backlog |
| `audio_4` | server/DB/hosting/auth, путаница Postman/server/service | correct; backend-later |
| `audio_5`–`audio_11` | Lingva: difficult words, groups/categories, DB/auth, PWA/mobile, modal scroll, colors | consolidated product backlog |
| `audio_12` | mini-CRM: SSH/Node/Mongo/Postman/health/register/login/leads/token | project experience; concepts split frontend/backend-later |
| `audio_13` | воспроизвести requests в Postman, затем сверить методичку | сохранить как active-recall pattern |
| `audio_14` | private finance | sensitive/drop, не транскрибировать |
| `audio_15` | music idea | drop |
| `audio_16` | game/visual idea | drop |

Пять JPEG + пять HEIC от 16 января — повторные снимки одного рукописного Lingva mockup. Сохранён один product-context, не десять учебных элементов.

## Private/sensitive и out-of-track attachments

Не переносятся:

- health/household/private home photo;
- music MP3;
- finance links/voice;
- personal order/receipt PDF;
- Telegram contact identifier;
- gaming walkthroughs/ideas;
- affiliate marketing PDF/EPUB;
- ML rules PDF;
- secrets/credentials.

## Что локально не изучалось как текст

Это не скрытая потеря, а зафиксированная boundary:

- содержимое 163 external URLs;
- 144 article preview images, потому что это обложки;
- две Python cheatsheet images вне scope;
- 19 programming video/GIF previews: metadata проверена; у 18 нет audio, React Bits audio не содержит речи;
- private financial voice;
- general 161 Telegram videos вне тематически релевантной выборки;
- out-of-track PDF/EPUB.

P0/P1 knowledge в тематических notes проверяется по primary documentation. External Telegram URL остаётся reference pointer, а не обязательным чтением.
