# Ledger S01/S02: video notes и HTML forms article

## S01 — `notes from video`

### Покрытие

- 48/48 файлов;
- 44 PNG визуально проверены;
- transcript TXT прочитан;
- YouLearn outline TXT прочитан;
- generated HTML-конспект извлечён и прочитан;
- `.DS_Store` классифицирован как noise;
- битых/нечитаемых: 0.

Локальные screenshots, transcript и HTML описывают один источник: видео PurpleSchool «5 вопросов, которые зададут на собеседовании Frontend Middle/Senior», id `BMqW6CH1XOk`.

Generated `frontend-middle-senior-konspekt.html` уже объединяет материал, но не переносится как есть из-за абсолютов и нескольких code bugs. Его executable copy-button JS — export functionality, не учебное знание.

### Карта всех 44 screenshots

#### XSS/CSRF — 8

```text
Вопрос 1.png
Вопрос 1.2.png
Вопрос 1.3.png
Вопрос 1.4.png
Вопрос 1.5.png
Вопрос 1.6.png
Вопрос 1.7.png
Вопрос 1.8.png
```

Destination: `05-web-platform/security.md`.

#### Modal/accessibility — 8

```text
Вопрос 2 доступность сайта.png
Воспрос 2.1 правильная модалка вроде.png
Вопрос 2.2 aria.png
Вопрос 2.3 доступность с лавиатуры.png
Вопрос 2.3 продолжение.png
Вопрос 2.4.png
Вопрос 2.5.png
Вопрос 2.6 outline желательно должен быть, как его стилизовать + как стелизовать ролик прокрутки страницы.png
```

Destination: `05-web-platform/forms-and-accessibility.md`.

#### Code splitting — 14

```text
Вопрос 3 бандл и так далее.png
Вопрос 3.png
Вопрос 3.1.png
Вопрос 3.2.png
Вопрос 3.3.png
Вопрос 3.4.png
Вопрос 3.5.png
Вопрос 3.6.png
Вопрос 3.7.png
то что должен занть (ВОТ ТУТ ВАЖНО ...).png
то что должен занть.png
то что должен занть 2.png
то что должен занть 3.png
то что должен занть 4 и 5.png
```

Ненумерованный screenshot относится к code splitting/Middle-vs-Senior: React.lazy, routes/features/vendors, preload/prefetch, analyzer.

Destination: `05-web-platform/rendering-and-delivery.md`.

#### Rendering/DevTools — 10

```text
Вопрос 4.png
Вопрос 4.1.png
Вопрос 4.2.png
Вопрос 4.3.png
Вопрос 5.png
Вопрос 5.1.png
Вопрос 5.2 вроде как лучшее решение.png
Тест в devtools.png
Вызывает баг.png
Исправление.png
```

`Вызывает баг`/`Исправление` также связаны с layout reads/writes. Destination: rendering note.

#### Data loading — 4

```text
Дедубликация.png
Разобрать.png
минимальный fetch слой что это.png
что за конструкция.png
```

Destination: `02-javascript/async-network-browser.md`.

Итого: 8 + 8 + 14 + 10 + 4 = 44.

### Text files

| Файл | Содержание | Решение |
|---|---|---|
| `Транскрипция видео сделанная через youlearn.txt` | полный noisy transcript, около 50 KB | provenance; ошибки speech-to-text не переносить |
| `Оглавления видео сделанные через youlearn.txt` | outline/timestamps | source map |
| `frontend-middle-senior-konspekt.html` | объединённые chapters: data, modal, rendering, splitting, security, audit/practice | correct-merge по тематическим notes |
| `.DS_Store` | metadata | drop |

### Исправления S01

- React Effect example обязан проверять `response.ok`.
- Retry не повторяет любые 4xx/unsafe mutations.
- Shared in-flight request не должен принадлежать signal одного consumer.
- `Map`-cache без subscribers не обновляет React UI.
- Короткий focus trap не production-universal.
- `aria-modal` не реализует modal behavior.
- Layout invalidation не обязательно охватывает всё дерево.
- Geometry read форсирует layout только при нужной актуализации.
- transform/opacity/GPU/compositor — не абсолют.
- route/vendor splitting и prefetch — measured trade-offs.
- HTTP/1.1 connection count, bundle/image numbers и conversion statistics — illustrative, не вечные факты.

## S02 — `статья по html form`

### Покрытие

- 66/66 файлов;
- 1 main HTML полностью text-extracted;
- 1 README прочитан;
- 14 raster images + 1 SVG визуально/по назначению классифицированы;
- 45 CSS и 3 JS классифицированы как site/export assets;
- `.DS_Store` — noise;
- нечитаемых: 0.

### Форматы

| Формат | Количество | Решение |
|---|---:|---|
| HTML | 1 | извлечь полезное содержание |
| TXT | 1 | provenance: совместить с form validation practice |
| WEBP | 13 | article/recommendation/ad images; не содержат уникального учебного текста |
| PNG | 1 | logo/site asset |
| SVG | 1 | after-post decoration |
| CSS | 45 | export presentation noise |
| JS | 3 | page/tracking/code helper noise |
| `.DS_Store` | 1 | drop |

Raster contact review показал:

- одну декоративную иллюстрацию формы;
- logos/ads;
- generic thumbnails о tooling, AI, debugging, meetup и статьях;
- уникального form code/knowledge в картинках нет.

### Полезные topics

- `input` types;
- label association;
- textarea;
- select vs datalist;
- fieldset/legend;
- ARIA hints/errors;
- submit controls;
- native validation;
- form checklist.

Destination: `05-web-platform/forms-and-accessibility.md`.

### Исправления S02

| Тезис статьи | Нормализованная версия |
|---|---|
| textarea сама растёт по контенту | autosize требует реализации; manual resize — отдельное поведение |
| legend — обязательный child | лучший caption для логической группы, но не универсальная required validation |
| input submit устарел | валиден; button гибче |
| aria-required нужен вместо/рядом с required | ARIA не создаёт native behavior |
| Enter всегда одинаково submits | implicit submission зависит от структуры |
| tel проверяет номер | tel даёт semantics/input affordance, universal validation нет |
| browser email validation достаточно | только basic syntax; server validation нужна |
| форма без JS всегда конечная цель | progressive enhancement полезен, но SPA/API forms могут осознанно требовать JS |

## Почему media не копируется

Все screenshots/images остаются в originals. В `Materials New` переносится:

- нормализованный факт;
- code example;
- caveat;
- source path;
- practice.

Это уменьшает шум и сохраняет возможность визуально вернуться к исходнику через этот ledger.
