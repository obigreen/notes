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
            {left: "`if (value)`", middle: "теряем валидный `0`", right: "`if (value ?? false)` или явная проверка"},
            {left: "`value || fallback`", middle: "перезапишет `0`/`''`/`false`", right: "`value ?? fallback`"},
            {left: "`==`", middle: "неявное приведение типов", right: "`===`"}
        ],
        practiceTitle: "Практический шаблон: безопасный парсинг и дефолты",
        practiceCode: `
function parsePagination(query) {
  const rawPage = query.page?.trim();
  const rawLimit = query.limit?.trim();

  const page = Number(rawPage ?? '1');
  const limit = Number(rawLimit ?? '20');

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: Number.isFinite(limit) && limit > 0 ? limit : 20
  };
}

console.log(parsePagination({ page: ' 2 ', limit: '10' }));
console.log(parsePagination({ page: '', limit: 'bad' }));
        `,
        links: [
            {label: "MDN: Expressions and operators", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators"},
            {label: "MDN: nullish coalescing", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing"}
        ]
    },
    functions: {
        heading: "Конспект по функциям",
        intro: "Функции — центр JavaScript. Большинство багов здесь связано с `this`, замыканиями и смешением pure/side-effect логики.",
        bullets: [
            "Делай маленькие функции с одним уровнем ответственности.",
            "Для callback лучше стрелочные функции, если не нужен собственный `this`.",
            "Guard clause сокращает вложенность и улучшает читаемость.",
            "Для повторяемой логики — фабрики и замыкания."
        ],
        tableTitle: "Выбор формы функции",
        tableRows: [
            {left: "function declaration", middle: "базовая логика, hoisting", right: "универсальный дефолт"},
            {left: "arrow function", middle: "callbacks/map/filter", right: "когда не нужен свой this"},
            {left: "bind/call/apply", middle: "явный контекст", right: "интеграции, классы, legacy API"}
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
            "Map удобен для частых вставок/удалений и ключей любого типа.",
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
        intro: "Асинхронный код — источник 80% неожиданных багов. Нужны четкие правила: где await, где параллелить, как отменять и как ловить ошибки.",
        bullets: [
            "Для линейного чтения используй async/await + try/catch.",
            "Независимые запросы запускай через Promise.all.",
            "Не забывай про AbortController для отмены stale-запросов.",
            "Понимай порядок: sync -> microtask -> macrotask."
        ],
        tableTitle: "Async-паттерны",
        tableRows: [
            {left: "await one-by-one", middle: "последовательно", right: "когда шаги зависят друг от друга"},
            {left: "Promise.all", middle: "параллельно", right: "когда шаги независимы"},
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
            {left: "innerHTML", middle: "быстрый HTML-рендер", right: "только trusted шаблоны"},
            {left: "event delegation", middle: "один listener на список", right: "таблицы, чаты, меню"}
        ],
        practiceTitle: "Практический шаблон: делегирование + data-атрибуты",
        practiceCode: `
const list = document.querySelector('#todoList');

list.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const row = button.closest('[data-id]');
  if (!row) return;

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
async function apiClient(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(typeof payload === 'string' ? payload : payload?.message ?? 'Request failed');
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
  return fetch('/api/profile').then((res) => res.json());
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
import { fetchProfile, normalizeProfile } from './profile/index.js';
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
