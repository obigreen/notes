# Рендеринг браузера, производительность и доставка кода

**Приоритет:** P1  
**Основа:** видеоконспект и скриншоты о reflow/repaint/code splitting  
**Принцип:** сначала измерить, затем менять.

## 1. Rendering pipeline

Полезная модель:

```text
JavaScript → Style → Layout → Paint → Composite
```

- **Style:** браузер определяет применённые CSS-правила.
- **Layout:** вычисляет размеры и положение затронутых boxes.
- **Paint:** создаёт визуальные фрагменты — текст, фон, border, shadow и т. п.
- **Composite:** собирает подготовленные слои в итоговый кадр.

Не каждый кадр проходит все стадии:

- изменение геометрии может потребовать layout → paint → composite;
- цвет/тень часто обходятся без layout, но требуют paint;
- некоторые изменения transform/opacity могут выполняться на стадии composite.

Это модель, а не контракт для каждого свойства и браузера. Область перерасчёта может быть локальной, promotion в отдельный слой зависит от движка, а даже compositor-анимация имеет стоимость подготовки/памяти.

Опора: [web.dev — Rendering performance](https://web.dev/articles/rendering-performance).

## 2. Forced synchronous layout

Браузер старается группировать style/layout. Проблема появляется, когда код:

1. меняет DOM/style;
2. тут же читает геометрию, для которой нужны актуальные расчёты;
3. повторяет это в цикле.

```js
// Плохо: чередование write/read.
for (const card of cards) {
  card.style.width = `${nextWidth}px`;
  console.log(card.offsetWidth);
}
```

Чтение geometry API не «всегда вызывает reflow». Оно может заставить браузер синхронно обновить layout, если предыдущее изменение сделало расчёт устаревшим и актуальное значение действительно требуется.

Группировка:

```js
const widths = Array.from(cards, (card) => card.offsetWidth); // reads

requestAnimationFrame(() => {
  cards.forEach((card, index) => {
    card.style.width = `${widths[index] + 20}px`; // writes
  });
});
```

Это не универсальный optimizer: сначала нужно увидеть bottleneck в профиле.

## 3. Анимации

Для движения/масштаба часто стоит начинать с `transform`, для прозрачности — с `opacity`. Они чаще дают браузеру шанс обойти layout/paint.

Но фраза «transform всегда работает на GPU и ничего не перерисовывает» неверна:

- layer promotion зависит от браузера;
- содержимое всё равно нужно однажды нарисовать;
- слишком много layers расходует память;
- большие полупрозрачные области могут дорого композиться;
- выбранный эффект может требовать paint по другим причинам.

`will-change` — временная подсказка для измеренного hot path, а не правило для всех карточек.

## 4. Что смотреть в DevTools

### Performance

- long tasks на main thread;
- Style/Layout/Paint в flame chart;
- события, вызывающие частый JavaScript;
- layout shifts;
- before/after trace одного и того же сценария.

### Rendering

- Paint flashing;
- layout shift regions;
- FPS/frame rendering stats, когда уместно.

### Network

- initial JavaScript;
- waterfall и приоритеты;
- повторная навигация с cache;
- throttling CPU/network;
- загрузка chunk только при открытии route/feature.

### Coverage/bundle analyzer

- большой пакет, который почти не используется;
- дубли версий;
- locale/icon packs;
- editor/chart/PDF viewer в initial bundle;
- модуль с side effects, мешающий tree shaking.

Lighthouse — сигнал для расследования, а не замена профилированию конкретного пользовательского сценария.

## 5. Почему JavaScript-бандл особенно чувствителен

JavaScript нужно не только скачать, но и декодировать/распаковать, распарсить/скомпилировать и выполнить. Движок может вынести часть подготовки в background threads, однако выполнение page JavaScript и часть compilation всё ещё конкурируют за main thread. Сравнение «1 MB JS всегда в N раз хуже 1 MB image» без устройства, compression и runtime-профиля — лишь иллюстрация, не универсальное число.

Опоры: [V8 — Background compilation](https://v8.dev/blog/background-compilation) и [The cost of JavaScript in 2019](https://v8.dev/blog/cost-of-javascript-2019).

Цель code splitting — сократить критический код первого сценария и не переносить стоимость в неудобную задержку следующего действия.

## 6. Dynamic import

```js
async function openEditor() {
  const { createEditor } = await import('./heavy-editor.js');
  return createEditor();
}
```

`import()` возвращает Promise и позволяет загрузить модуль по требованию. Бандлер может создать отдельный chunk.

Статический import предпочтительнее для зависимостей первого экрана: его проще анализировать и оптимизировать. Dynamic import нужен там, где модуль действительно условный или поздний.

Опора: [MDN — import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import).

## 7. React lazy

```tsx
import { lazy, Suspense } from 'react';

const ReportsPage = lazy(() => import('./ReportsPage'));

export function ReportsRoute() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ReportsPage />
    </Suspense>
  );
}
```

- объявлять lazy component вне render;
- обычный вариант ожидает module default export;
- выбрать fallback, который не вызывает layout jump;
- предусмотреть error boundary для chunk load failure;
- помнить: Suspense не начинает автоматически понимать любой fetch внутри `useEffect`.

Опоры: [React — lazy](https://react.dev/reference/react/lazy) и [React — Suspense](https://react.dev/reference/react/Suspense).

## 8. Где проводить границы

Хорошие кандидаты:

- route, который не нужен первому экрану;
- тяжёлая фича по явному действию: editor, chart builder, PDF viewer;
- редко открываемая admin/settings часть;
- независимый большой workflow.

Плохая цель: превратить каждый небольшой компонент в отдельный chunk.

Стратегия:

1. записать baseline;
2. открыть analyzer;
3. выбрать одну крупную границу;
4. проверить initial load и переход;
5. проверить waterfall/cache/error;
6. оставить изменение только при измеримом выигрыше.

Route splitting часто полезен для SPA, но не «обязателен в 100% проектов». Manual vendor chunks тоже trade-off: они могут улучшить cache stability, а могут создать лишнюю связанность, дубли или waterfall. Современный bundler сначала заслуживает шанс применить defaults.

Vite поддерживает lazy glob imports и dynamic import constraints: [Vite — Features](https://vite.dev/guide/features.html#glob-import).

## 9. Preload, modulepreload и prefetch

- `preload` — высокий приоритет для ресурса текущей страницы, который браузер иначе обнаружит поздно;
- `modulepreload` — ранняя загрузка/подготовка JS module для текущей страницы;
- `prefetch` — низкоприоритетная подсказка о вероятной будущей навигации/ресурсе.

Нельзя preload всё: это конкурирует с действительно критичными ресурсами. Prefetch может потратить трафик на то, что пользователь не откроет.

Опоры: [MDN — modulepreload](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/modulepreload) и [MDN — Speculative loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Speculative_loading).

## 10. Сетевые абсолюты, которых лучше избегать

- «У HTTP/1.1 всегда ровно шесть соединений» — типичное browser/origin ограничение, а не переносимый закон.
- «HTTP/2 устраняет цену любых мелких chunks» — multiplexing помогает, но headers, scheduling, parse/execute и waterfalls остаются.
- «Vendor chunk всегда лучше» — зависит от change frequency, cache и graph.
- «Prefetch всегда ускоряет» — зависит от вероятности перехода и сети.

## Что уметь сказать на собеседовании

> Layout считает геометрию, paint рисует пиксели, composite собирает слои. Я не называю любое изменение «полным reflow всей страницы»: смотрю область invalidation в DevTools.

> Layout thrashing появляется при повторяющемся чередовании DOM writes и geometry reads; я группирую операции и проверяю trace.

> Code splitting начинаю с analyzer и пользовательского маршрута. Границы по route/тяжёлой фиче обычно осмысленнее, чем lazy каждого компонента.

## Практический критерий

1. Сделать drawer через `left`, записать trace.
2. Сделать тот же drawer через `transform`, записать trace.
3. Объяснить реальное отличие по Layout/Paint/Composite, не по догадке.
4. Добавить тяжёлую route в React-приложение.
5. Зафиксировать initial bundle и navigation waterfall до/после `lazy`.
6. Проверить медленную сеть и ошибку загрузки chunk.
