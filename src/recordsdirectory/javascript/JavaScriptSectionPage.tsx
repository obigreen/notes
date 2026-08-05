import React from "react";
import {
    Link,
    NoteBlock,
    NoteLi,
    NoteUl,
    ParagraphTitle,
    Text,
    TextP,
    TypeTitle,
    VideoContainer
} from "../RecordsDirectory_Style";
import {S} from "../regex/Regex_Styles";
import {HighlightedCodeBlock} from "../regex/regexComponents/HighlightedCodeBlock";
import {JsPopupItem, JsPopupList} from "./JsPopupList";

type TheoryRow = {
    left: string;
    middle: string;
    right: string;
};

type SectionTheory = {
    heading: string;
    intro: string;
    bullets: string[];
    tableTitle: string;
    tableRows: TheoryRow[];
    practiceTitle: string;
    practiceCode: string;
    links: Array<{ label: string; href: string }>;
    videoUrl?: string;
};

type TopicKey = "syntax" | "functions" | "objects" | "async" | "dom" | "network" | "modules";

const theoryMap: Record<TopicKey, SectionTheory> = {
    syntax: {
        heading: "Конспект по синтаксису",
        intro: "Синтаксис — это фундамент. Ошибки здесь редко «сложные», но они ломают всё остальное: условия, циклы, работу с данными.",
        bullets: [
            "`const` по умолчанию, `let` когда реально нужно переопределение.",
            "`===` вместо `==` почти во всех кейсах.",
            "`??` для дефолтов по null/undefined, чтобы не ломать 0/false/''.",
            "Сначала нормализуй данные (trim/toLowerCase/Number), потом сравнивай."
        ],
        tableTitle: "Частые ошибки и корректный подход",
        tableRows: [
            {left: "`if (value)`", middle: "теряем валидный `0`", right: "`value !== null && value !== undefined` или бизнес-проверка"},
            {left: "`value || fallback`", middle: "перезапишет `0`/`''`/`false`", right: "`value ?? fallback`"},
            {left: "`==`", middle: "неявное приведение типов", right: "`===`"}
        ],
        practiceTitle: "Практический шаблон: безопасный парсинг и дефолты",
        practiceCode: `
function toPositiveInteger(value, fallback) {
  const normalized = typeof value === 'string' ? value.trim() : value;
  if (normalized === '' || normalized == null) return fallback;

  const number = Number(normalized);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function parsePagination(query) {
  return {
    page: toPositiveInteger(query.page, 1),
    limit: toPositiveInteger(query.limit, 20)
  };
}

console.log(parsePagination({ page: ' 2 ', limit: '10' }));
console.log(parsePagination({ page: '', limit: 'bad' }));
console.log(parsePagination({ page: '-3', limit: '2.5' }));
        `,
        links: [
            {label: "MDN: Expressions and operators", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators"},
            {label: "MDN: nullish coalescing", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing"}
        ]
    },
    functions: {
        heading: "Конспект по функциям",
        intro: "Функция в JavaScript — одновременно исполняемый код и значение, которое можно сохранить, передать или вернуть.",
        bullets: [
            "`fn` — сама функция; `fn()` — её вызов и результат `return`.",
            "Параметр — имя в объявлении; аргумент — значение в конкретном вызове.",
            "Function Declaration создаётся до выполнения строк; Function Expression и Arrow Function доступны после присваивания.",
            "У стрелочной функции неявный `return` работает только без фигурных скобок.",
            "Вложенная функция видит внешнюю лексическую область и может сохранить доступ к её переменным.",
            "Каждый вызов функции создаёт новое окружение с собственными параметрами и локальными переменными."
        ],
        tableTitle: "Как читать запись с функцией",
        tableRows: [
            {left: "const saved = fn", middle: "вызова нет", right: "сохранить или передать функцию"},
            {left: "const result = fn()", middle: "функция выполняется сейчас", right: "сохранить результат `return`"},
            {left: "const factory = makeMultiplier", middle: "сохранили внешнюю функцию", right: "`factory(4)` вызовет её с `factor = 4`"},
            {left: "const double = makeMultiplier(2)", middle: "вызвали внешнюю функцию", right: "сохранили возвращённую внутреннюю"},
            {left: "function sum(a, b)", middle: "Function Declaration; `a`, `b` — параметры", right: "доступна до строки объявления"},
            {left: "const sum = function (a, b)", middle: "Function Expression", right: "доступна после присваивания"},
            {left: "const sum = (a, b) => a + b", middle: "Arrow Function; неявный `return`", right: "нет собственного `this`"},
            {left: "sum(2, 3)", middle: "`2`, `3` — аргументы", right: "значения этого вызова"}
        ],
        practiceTitle: "Практический шаблон: фабрика с закрытым состоянием",
        practiceCode: `
function createRateLimiter(limitPerMinute) {
  let count = 0;
  let windowStart = Date.now();

  return function canProceed() {
    const now = Date.now();

    if (now - windowStart >= 60_000) {
      windowStart = now;
      count = 0;
    }

    if (count >= limitPerMinute) {
      return false;
    }

    count += 1;
    return true;
  };
}

const canSend = createRateLimiter(3);
console.log(canSend(), canSend(), canSend(), canSend());
        `,
        links: [
            {label: "MDN: Functions", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"},
            {label: "MDN: this", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"}
        ]
    },
    objects: {
        heading: "Конспект по объектной модели",
        intro: "Объекты в JS — это динамические структуры. Важно понимать разницу между plain-object, Map и прототипной моделью.",
        bullets: [
            "Object удобен для JSON-структур и сериализации.",
            "Map удобен для ключей любого типа, явного API коллекции и предсказуемого обхода.",
            "Иммутабельные обновления (`{...obj}`) делают состояние предсказуемее.",
            "Классы — синтаксический сахар над прототипами."
        ],
        tableTitle: "Object vs Map",
        tableRows: [
            {left: "Object", middle: "JSON-friendly", right: "конфиги, payload, DTO"},
            {left: "Map", middle: "любой тип ключа", right: "кэши, индексы, lookup"},
            {left: "Set", middle: "уникальные значения", right: "dedupe, membership"}
        ],
        practiceTitle: "Практический шаблон: нормализация по id",
        practiceCode: `
const users = [
  { id: 1, name: 'Ann', role: 'editor' },
  { id: 2, name: 'Bob', role: 'viewer' }
];

const byId = Object.fromEntries(users.map((user) => [user.id, user]));
console.log(byId[1].name); // Ann

const byRole = users.reduce((acc, user) => {
  const list = acc[user.role] ?? [];
  return { ...acc, [user.role]: [...list, user] };
}, {});

console.log(byRole.editor.length); // 1
        `,
        links: [
            {label: "MDN: Working with objects", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects"},
            {label: "MDN: Map", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"}
        ]
    },
    async: {
        heading: "Конспект по асинхронности",
        intro: "Асинхронный код — частый источник неожиданных багов. Нужны четкие правила: где await, где выполнять операции конкурентно, как отменять и как ловить ошибки.",
        bullets: [
            "Для линейного чтения используй async/await + try/catch.",
            "Независимые запросы можно создать вместе и ожидать через Promise.all.",
            "Promise.all не запускает и не отменяет операции: он агрегирует уже созданные Promise и отклоняется при первой ошибке.",
            "Не забывай про AbortController для отмены stale-запросов.",
            "Понимай порядок: sync -> microtask -> macrotask."
        ],
        tableTitle: "Async-паттерны",
        tableRows: [
            {left: "await one-by-one", middle: "последовательно", right: "когда шаги зависят друг от друга"},
            {left: "Promise.all", middle: "ожидание группы, fail-fast", right: "когда операции независимы и уже запущены"},
            {left: "AbortController", middle: "отмена запроса", right: "поиск, автокомплит, смена страницы"}
        ],
        practiceTitle: "Практический шаблон: safe fetch с отменой",
        practiceCode: `
let activeController = null;

async function searchUsers(query) {
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  try {
    const response = await fetch('/api/users?q=' + encodeURIComponent(query), {
      signal: activeController.signal
    });

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') return null;
    throw error;
  }
}
        `,
        links: [
            {label: "MDN: async function", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"},
            {label: "MDN: Promise", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"}
        ],
        videoUrl: "https://www.youtube.com/embed/8aGhZQkoFbQ"
    },
    dom: {
        heading: "Конспект по DOM",
        intro: "DOM-слой отвечает за интерфейс. Главные задачи: выбор элементов, безопасный рендер, обработка событий и производительность.",
        bullets: [
            "Пользовательский текст через textContent, а не через innerHTML.",
            "Делегируй события на контейнер там, где много однотипных элементов.",
            "Минимизируй частые layout-операции в scroll/resize.",
            "Отделяй data-слой от слоя рендера."
        ],
        tableTitle: "DOM-практика",
        tableRows: [
            {left: "textContent", middle: "безопасный текст", right: "UI из пользовательских данных"},
            {left: "innerHTML", middle: "парсит и заменяет HTML-содержимое", right: "только доверенный или санитизированный HTML"},
            {left: "event delegation", middle: "один listener на список", right: "таблицы, чаты, меню"}
        ],
        practiceTitle: "Практический шаблон: делегирование + data-атрибуты",
        practiceCode: `
const list = document.querySelector('#todoList');

list?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest('[data-action]');
  if (!button || !list.contains(button)) return;

  const row = button.closest('[data-id]');
  if (!row || !list.contains(row)) return;

  const action = button.dataset.action;
  const id = row.dataset.id;

  if (action === 'remove') {
    row.remove();
  }

  if (action === 'pin') {
    row.classList.toggle('is-pinned');
  }

  console.log('action:', action, 'id:', id);
});
        `,
        links: [
            {label: "MDN: DOM Introduction", href: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"},
            {label: "MDN: EventTarget.addEventListener", href: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"}
        ]
    },
    network: {
        heading: "Конспект по сети и хранению",
        intro: "Сеть и storage — это зона reliability: retries, ошибки, валидность данных, синхронизация состояния между вкладками.",
        bullets: [
            "Всегда проверяй `response.ok` после fetch.",
            "Не храни чувствительные данные в localStorage.",
            "URLSearchParams удобнее ручной сборки query-строк.",
            "Слой API оборачивай в небольшие утилиты с единым контрактом."
        ],
        tableTitle: "Инструменты слоя данных",
        tableRows: [
            {left: "fetch", middle: "HTTP в браузере", right: "REST/JSON API"},
            {left: "FormData", middle: "multipart payload", right: "upload файлов"},
            {left: "localStorage", middle: "персистентный ключ-значение", right: "theme, ui-settings"}
        ],
        practiceTitle: "Практический шаблон: apiClient",
        practiceCode: `
// json — явный JSON-body, body — FormData/Blob/другой BodyInit
async function apiClient(path, options = {}) {
  const { json, headers: initialHeaders, ...fetchOptions } = options;
  const headers = new Headers(initialHeaders);
  let body = fetchOptions.body;

  if (json !== undefined) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(json);
  }

  // Для FormData Content-Type вручную не задаем:
  // браузер сам добавит multipart boundary.
  const response = await fetch(path, {
    ...fetchOptions,
    headers,
    body
  });

  const isJson = response.headers.get('content-type')?.includes('json');
  const raw = response.status === 204 || response.status === 205
    ? ''
    : await response.text();
  const payload = raw ? (isJson ? JSON.parse(raw) : raw) : null;

  if (!response.ok) {
    throw new Error(
      typeof payload === 'string'
        ? payload
        : payload?.message ?? \`Request failed (\${response.status})\`
    );
  }

  return payload;
}

apiClient('/api/profile').then(console.log).catch(console.error);
        `,
        links: [
            {label: "MDN: Fetch API", href: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"},
            {label: "MDN: Web Storage API", href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"}
        ]
    },
    modules: {
        heading: "Конспект по модулям",
        intro: "Модульность делает проект масштабируемым: проще искать код, переиспользовать функции и подключать части по требованию.",
        bullets: [
            "Named export для набора утилит, default — для главной сущности модуля.",
            "Barrel-файл (`index.ts`) упрощает импорты в feature-слоях.",
            "Dynamic import применяй для тяжелых и редких сценариев.",
            "Держи зависимости модуля явными, избегай скрытых global side-effects."
        ],
        tableTitle: "Модульные решения",
        tableRows: [
            {left: "named export", middle: "много функций", right: "utils/helpers"},
            {left: "default export", middle: "одна сущность", right: "component/service"},
            {left: "import()", middle: "ленивая загрузка", right: "charts, editors, admin pages"}
        ],
        practiceTitle: "Практический шаблон: feature-модуль",
        practiceCode: `
// profile/api.js
export async function fetchProfile() {
  const response = await fetch('/api/profile');
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  return response.json();
}

// profile/model.js
export function normalizeProfile(raw) {
  return {
    id: raw.id,
    fullName: [raw.firstName, raw.lastName].filter(Boolean).join(' '),
    role: raw.role ?? 'viewer'
  };
}

// profile/index.js
export * from './api.js';
export * from './model.js';

// usage
import {
  fetchProfile as importedFetchProfile,
  normalizeProfile as importedNormalizeProfile
} from './profile/index.js';

importedFetchProfile().then(importedNormalizeProfile).then(console.log);
        `,
        links: [
            {label: "MDN: JavaScript modules", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"},
            {label: "MDN: import", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import"}
        ]
    }
};

type JavaScriptSectionPageProps = {
    title: string;
    sectionTitle: string;
    description: string;
    items: JsPopupItem[];
    topic: TopicKey;
};

export const JavaScriptSectionPage = ({title, sectionTitle, description, items, topic}: JavaScriptSectionPageProps) => {
    const theory = theoryMap[topic];

    return (
        <>
            <TypeTitle>{title}</TypeTitle>

            <JsPopupList
                title={sectionTitle}
                description={description}
                items={items}
            />

            <NoteBlock>
                <Text>
                    <ParagraphTitle>{theory.heading}</ParagraphTitle>
                    <TextP>{theory.intro}</TextP>
                    <NoteUl>
                        {theory.bullets.map((bullet) => (
                            <NoteLi key={bullet}>{bullet}</NoteLi>
                        ))}
                    </NoteUl>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>{theory.tableTitle}</ParagraphTitle>
                    <S.TableWrap>
                        <S.NoteTable>
                            <thead>
                            <tr>
                                <S.TableHeadCell>Паттерн</S.TableHeadCell>
                                <S.TableHeadCell>Риск / нюанс</S.TableHeadCell>
                                <S.TableHeadCell>Рабочий выбор</S.TableHeadCell>
                            </tr>
                            </thead>
                            <tbody>
                            {theory.tableRows.map((row) => (
                                <tr key={row.left}>
                                    <S.TableCell><S.TableToken>{row.left}</S.TableToken></S.TableCell>
                                    <S.TableCell>{row.middle}</S.TableCell>
                                    <S.TableCell>{row.right}</S.TableCell>
                                </tr>
                            ))}
                            </tbody>
                        </S.NoteTable>
                    </S.TableWrap>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>{theory.practiceTitle}</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {theory.practiceCode}
                    </HighlightedCodeBlock>

                    <TextP>
                        Доп.материалы:
                        {" "}
                        {theory.links.map((link, index) => (
                            <React.Fragment key={link.href}>
                                {index > 0 ? " · " : ""}
                                <Link target="_blank" href={link.href}>{link.label}</Link>
                            </React.Fragment>
                        ))}
                    </TextP>
                </Text>
            </NoteBlock>

            {theory.videoUrl && (
                <NoteBlock>
                    <Text>
                        <ParagraphTitle>Видео по теме</ParagraphTitle>
                        <VideoContainer>
                            <iframe
                                src={theory.videoUrl}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </VideoContainer>
                        <TextP>
                            Видео оставлено как дополнительный материал к конспекту и к спискам выше.
                        </TextP>
                    </Text>
                </NoteBlock>
            )}
        </>
    );
};
