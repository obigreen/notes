# Аудит исходной папки Materials

## Граница задачи

Проверялась только папка:

`local-study-files/materials`

Намеренно не открывались и не использовались:

- `local-study-files/obsidian-interview-questions-and-information`;
- `local-study-files/Roadmap_frontend_new`.

Оригиналы в `Materials` не удалялись и не переписывались. `Materials New` — curated view поверх сохранённого архива.

## Исходный baseline до создания новой базы

- **1 662 файла**;
- **1 861 546 786 bytes** содержимого файлов;
- около **1.7 GiB** на диске;
- 4 содержательных верхнеуровневых группы и один `.DS_Store`.

### По верхнему уровню

| Группа | Файлы | Размер на диске | Роль |
|---|---:|---:|---|
| `Save_from_tg` | 1 429 | 1 729 320 KiB | Telegram-export/индекс закладок, voice и проектный контекст |
| `PROGRAMMING` | 118 | 65 892 KiB | Notion, книга, skill-map, вакансии, mixed/project |
| `notes from video` | 48 | 22 556 KiB | transcript, outline, 44 screenshots и собранный HTML-конспект |
| `статья по html form` | 66 | 3 560 KiB | сохранённая HTML-статья и web-assets |
| корень `Materials` | 1 | — | `.DS_Store` |

### Форматы

| Формат | Количество | Формат | Количество |
|---|---:|---|---:|
| JPG | 1 114 | MP4 | 161 |
| PNG | 156 | CSS | 47 |
| TGS | 36 | WEBP | 26 |
| HTML | 24 | OGG | 16 |
| WEBM | 15 | MOV | 11 |
| без расширения | 9 | Markdown | 8 |
| JS | 6 | HEIC | 5 |
| TXT | 4 | PDF | 4 |
| JSON | 4 | JPEG | 3 |
| XML/PY/PYC/CSV | по 2 | SVG/MP3/IML/GIF/EPUB | по 1 |

## Source IDs

| ID | Источник | Подробный ledger |
|---|---|---|
| S01 | `notes from video` | [`video-and-forms.md`](source-ledgers/video-and-forms.md) |
| S02 | `статья по html form` | [`video-and-forms.md`](source-ledgers/video-and-forms.md) |
| S03 | `PROGRAMMING/BOOKS` | [`notion-and-books.md`](source-ledgers/notion-and-books.md) |
| S04 | `PROGRAMMING/EXPORT NOTION PROGRAMMING` | [`notion-and-books.md`](source-ledgers/notion-and-books.md) |
| S05 | market/mixed/Preax/vacancies | [`programming-misc.md`](source-ledgers/programming-misc.md) |
| S06 | `Save_from_tg` | [`telegram.md`](source-ledgers/telegram.md) |

## Как проверялось содержание

Использовались разные уровни, и они не смешиваются в одну ложную отметку «прочитано»:

- **Full text:** Markdown/TXT/HTML/JSON/CSV извлечены и прочитаны.
- **Visual:** изображение/страница PDF просмотрены; OCR использовался как поиск, а низкая уверенность сверялась глазами.
- **Media transcript:** релевантный voice распознан, смысл сверялся по контексту.
- **Metadata/linkage:** media классифицировано по сообщению, caption, thumbnail, stream metadata и связи с каталогом.
- **External pointer:** URL сохранён как указатель, но текст внешней страницы не объявляется изученным, если он не был отдельно открыт.

Это особенно важно для Telegram: он в основном является индексом внешних статей/видео, а не их локальной копией.

## Система решений

| Статус | Значение |
|---|---|
| `route-app` | тема уже достаточно покрыта приложением; новая копия не нужна |
| `merge` | уникальный полезный слой перенесён в тематический Markdown |
| `correct-merge` | идея полезна, но исходная ошибка/абсолют исправлены |
| `practice` | источник превращён в задачу без показа готового решения |
| `reference` | сохранить как указатель, не делать обязательным |
| `defer` | полезно позже, сейчас мешает JS→TS→React |
| `archive` | provenance сохранён, учебного действия нет |
| `drop` | технический мусор, личное, gaming, promo или нерелевантный stack |
| `sensitive` | не переносить приватные данные, secrets, receipts, contact ids |

## Дедупликация

SHA-проверка всех исходных файлов нашла только три exact duplicate groups:

1. два одинаковых TGS-стикера;
2. две одинаковые пары thumbnails для разных video entries.

Это **3 лишние копии**, но они не содержат знаний. Главная проблема архива — не бинарные дубли, а смысловые:

- одни и те же JS/HTTP/async темы в Notion, Preax, вакансиях, Telegram и видео;
- десятки готовых visual/practice snippets;
- повторяющиеся ссылки;
- одна идея, разбитая export-приложением на разные сообщения/категории.

Поэтому новая база дедуплицирует по теме и назначению, а не копирует «уникальный файл» только из-за другого hash.

## Что исключено без потери учебной информации

- `.DS_Store`, `.idea`, caches, compiled Python, CSS/JS web-export assets, stickers и thumbnails;
- рекламные/декоративные картинки внешних статей;
- gaming, музыка, бытовое, здоровье и финансы;
- Python/ML, affiliate marketing и чужие backend-курсы вне текущего трека;
- повторные URL/визуальные вариации одной practice-идеи;
- salary/benefits/контактные детали вакансий;
- реальные IP, tokens, secret-like strings, receipt и личные identifiers;
- готовые CodePen-решения как «учебная истина».

Исходники остаются на месте, а решение фиксируется в ledgers.

## Что потребовало исправления

Ключевые ошибки/устаревшие абсолюты:

- рекурсивные getter/setter `age` в классе `User`;
- array holes названы обычными `undefined`;
- `let`/`const` названы «не hoisted» без TDZ;
- `textarea` якобы растёт с контентом автоматически;
- `input type="submit"` назван устаревшим;
- `legend` назван универсально обязательным;
- Fetch якобы полностью «заменил устаревший XHR»;
- retry повторяет любые HTTP-ошибки;
- простой `Map`-cache объявлен полноценным SWR с обновлением UI;
- `transform`/`opacity` и GPU/composite описаны как абсолют;
- route/vendor splitting и prefetch представлены универсальным правилом;
- старый Redux `createStore` — как основной путь;
- «associative array» — как особый вид JS array;
- SPA/MPA и monolith/microservices слишком противопоставлены;
- прямое browser/CRM → database соединение в проектной схеме;
- Postman назван frontend приложения;
- password hash и JWT смешаны.

Полный список с источниками: [`decisions-and-corrections.md`](decisions-and-corrections.md).

## Что остаётся внешним указателем

В Notion-export:

- 170 external content-link occurrences, 165 unique, после исключения 16 template CDN stylesheet refs;
- 40 ссылок ведут на CodePen, 20 — на YouTube/`youtu.be`;
- содержание внешних страниц не считается локально изученным;
- две HTML-ссылки указывают на один отсутствующий export-image с visual reference, уникального учебного текста в нём нет.

В Telegram:

- 163 уникальных внешних URL;
- большинство локальных media — preview/обложка;
- caption и title пригодны для маршрутизации, но не заменяют содержание статьи.

В новой базе P0/P1-концепции переписаны по первичным документациям, а не по рекламному caption. Practice/reference URLs остаются в ledger, чтобы их можно было осознанно открыть позже.

## Полнота по группам

| Группа | Локальное покрытие | Нечитаемое | Ограничение |
|---|---|---:|---|
| S01 video notes | transcript/outline/HTML + 44/44 screenshots | 0 | исходное видео отдельно не требовалось: локальные материалы покрывают его тезисы |
| S02 form article | HTML text + все article/recommendation images/assets классифицированы | 0 | web-assets исключены как export noise |
| S03 book | 482/482 pages structurally checked; text layer 480/482, первые 2 visual front-matter pages проверены render | 0 | 3-е издание полезно выборочно; официальный current release — 4-е |
| S04 Notion | 1 README + 20/20 HTML + 28/28 images + metadata классифицированы | 0 существующих файлов | 165 unique external URLs — pointers; один referenced export-image отсутствует в исходнике |
| S05 misc | 59/59 изображений + 4/4 text, 0 непроверенных | 0 | Preax содержит только screens 12–55/56; отсутствующих файлов в папке нет |
| S06 Telegram | 699/699 messages связаны; 169/169 programming posts размечены; relevant voice проверены | 0 локальных битых | тексты 163 внешних URL не являются частью local export |

## Куда ушло полезное ядро

- JS gaps → `02-javascript/`
- TypeScript → `03-typescript/`
- React/data/state → `04-react/`
- forms/accessibility/rendering/security → `05-web-platform/`
- tests/Git/tooling/architecture → `06-engineering/`
- practice/project ideas → `07-practice/`
- vacancies/interview themes → `08-career/`
- backend/fullstack → `90-later/`
- точные пути и решения → `00-meta/source-ledgers/`

## Гарантия против «молчаливой потери»

Новая папка не является физической миграцией архива. Это индекс + нормализованное знание. Любой отброшенный объект остаётся в исходном `Materials`; для каждой содержательной группы есть:

- provenance;
- способ проверки;
- решение;
- destination или причина исключения;
- отметка о внешнем/непроверенном содержании.
