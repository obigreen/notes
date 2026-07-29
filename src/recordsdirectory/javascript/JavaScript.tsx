import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {
    ParagraphTitle,
    Link,
    Marker,
    NoteBlock,
    NoteLi,
    NoteUl,
    Text,
    TextP,
    TypeTitle,
    VideoContainer
} from "../RecordsDirectory_Style";
import {S as RegexS} from "../regex/Regex_Styles";
import {HighlightedCodeBlock} from "../regex/regexComponents/HighlightedCodeBlock";

type JsItem = {
    highlight: string;
    content: string;
    code: string;
    isTop?: boolean;
};

type GuideRow = {
    situation: string;
    avoid: string;
    best: string;
    why: string;
};

const GuideTableWrap = styled.div`
    width: 100%;
    overflow-x: auto;
    border-radius: 12px;
    margin-bottom: 20px;
`;

const GuideTable = styled.table`
    width: 100%;
    min-width: 720px;
    border-collapse: collapse;
    background-color: #ffffff;
`;

const GuideHead = styled.th`
    background-color: #1e1f22;
    color: white;
    font-weight: 600;
    text-align: left;
    padding: 12px;
    border: 1px solid #d9d9d9;
`;

const GuideCell = styled.td`
    vertical-align: top;
    padding: 10px 12px;
    border: 1px solid #d9d9d9;
    font-size: 18px;
    line-height: 1.35;
`;

export type {JsItem};

export const syntaxItems: JsItem[] = [
    {
        highlight: "let / const",
        content: "Базовые способы объявления переменных: const для неизменяемой ссылки, let для переопределяемой переменной.",
        isTop: true,
        code: `
const user = { name: 'Sergey' };
user.name = 'Serg'; // ok: меняется свойство, а не сама ссылка

let count = 0;
count += 1;
`
    },
    {
        highlight: "Primitive types",
        content: "Основные примитивы: string, number, boolean, undefined, null, symbol, bigint. Объекты и функции не являются примитивами.",
        isTop: true,
        code: `
console.log(typeof 'hello'); // string
console.log(typeof 42); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof 10n); // bigint

// Исторические особенности typeof:
console.log(typeof null); // object
console.log(typeof NaN); // number
console.log(typeof []); // object
console.log(typeof function () {}); // function
`
    },
    {
        highlight: "=== / ==",
        content: "Используй строгое сравнение (===), чтобы избегать неочевидных преобразований типов.",
        isTop: true,
        code: `
console.log(0 == false); // true
console.log(0 === false); // false

console.log('' == 0); // true
console.log('' === 0); // false
`
    },
    {
        highlight: "?. / ??",
        content: "Безопасный доступ к полям и корректная подстановка значения по умолчанию.",
        isTop: true,
        code: `
const profile = null;

const city = profile?.address?.city ?? 'Moscow';
console.log(city); // Moscow
`
    },
    {
        highlight: "Destructuring",
        content: "Быстрый доступ к полям объекта и элементам массива через деструктуризацию.",
        code: `
const user = { name: 'Sergey', role: 'frontend' };
const { name, role } = user;

const coords = [10, 20];
const [x, y] = coords;
`
    },
    {
        highlight: "Spread / Rest",
        content: "... раскрывает массив/объект (spread) или собирает остаток параметров/элементов (rest).",
        code: `
const base = { name: 'Serg' };
const full = { ...base, active: true };

const list = [1, 2, 3];
const copy = [...list];

const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
console.log(sum(1, 2, 3)); // 6
`
    },
    {
        highlight: "Template literals",
        content: "Шаблонные строки с интерполяцией и многострочным форматом.",
        code: `
const user = 'Sergey';
const level = 'junior+';

const text = \`Hi, \${user}. Level: \${level}\`;
console.log(text);
`
    },
    {
        highlight: "Truthy / Falsy",
        content: "Понимание truthy/falsy критично для условий и фильтрации.",
        code: `
const values = [0, 1, '', 'ok', null, undefined, [], {}];

values.forEach((value) => {
  if (value) {
    console.log('truthy:', value);
  } else {
    console.log('falsy:', value);
  }
});
`
    }
];

export const functionItems: JsItem[] = [
    {
        highlight: "Function declaration",
        content: "Классическое объявление функции, доступно до строки объявления за счет hoisting.",
        isTop: true,
        code: `
sayHello();

function sayHello() {
  console.log('Hello');
}
`
    },
    {
        highlight: "Arrow function",
        content: "Короткий синтаксис функции; не создает собственный this.",
        isTop: true,
        code: `
const multiply = (a, b) => a * b;
console.log(multiply(2, 4)); // 8
`
    },
    {
        highlight: "this",
        content: "У обычной функции this определяется способом вызова. У стрелочной функции собственного this нет: она лексически берет его из внешней области.",
        isTop: true,
        code: `
const user = {
  name: 'Sergey',
  printName() {
    console.log(this.name);
  }
};

user.printName(); // Sergey
`
    },
    {
        highlight: "call / apply / bind",
        content: "Управление контекстом this: вызвать сразу (call/apply) или получить новую функцию (bind).",
        code: `
function showName(prefix) {
  console.log(prefix, this.name);
}

const user = { name: 'Sergey' };
showName.call(user, 'User:');
showName.apply(user, ['Applied:']);

const binded = showName.bind(user, 'Bound:');
binded();
`
    },
    {
        highlight: "Closure",
        content: "Функция запоминает внешнюю область видимости даже после завершения внешней функции.",
        isTop: true,
        code: `
function createCounter() {
  let count = 0;

  return () => {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
`
    },
    {
        highlight: "Default params",
        content: "Значения по умолчанию для параметров функции.",
        code: `
function greet(name = 'Guest') {
  return \`Hello, \${name}\`;
}

console.log(greet()); // Hello, Guest
`
    },
    {
        highlight: "Hoisting",
        content: "Function declaration создается до выполнения кода. Привязки let/const тоже создаются заранее, но остаются неинициализированными в TDZ до строки объявления.",
        code: `
// console.log(role); // ReferenceError (TDZ)
let role = 'frontend';

function sum(a, b) {
  return a + b;
}
`
    }
];

export const objectItems: JsItem[] = [
    {
        highlight: "Object.keys / values / entries",
        content: "Возвращают собственные перечисляемые свойства со строковыми ключами: ключи, значения и пары [ключ, значение]. Унаследованные свойства и Symbol-ключи не входят.",
        isTop: true,
        code: `
const user = { id: 1, name: 'Sergey', role: 'frontend' };

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));
`
    },
    {
        highlight: "Object.assign",
        content: "Копирует свойства в целевой объект и мутирует его. Если передать первым аргументом {}, получится новый поверхностный объект.",
        isTop: true,
        code: `
const defaults = { theme: 'light', lang: 'ru' };
const custom = { lang: 'en' };

const settings = Object.assign({}, defaults, custom);
console.log(settings); // { theme: 'light', lang: 'en' }
`
    },
    {
        highlight: "class / constructor",
        content: "Синтаксический сахар над прототипами: описание сущности и методов.",
        isTop: true,
        code: `
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return \`Hi, \${this.name}\`;
  }
}

const user = new User('Sergey');
console.log(user.greet());
`
    },
    {
        highlight: "extends / super",
        content: "Наследование классов и вызов конструктора родителя.",
        code: `
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
`
    },
    {
        highlight: "prototype",
        content: "Фундаментальная модель JS: методы чаще хранят в прототипе.",
        code: `
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  return \`Hi, \${this.name}\`;
};
`
    },
    {
        highlight: "Map",
        content: "Коллекция ключ-значение, где ключом может быть любой тип.",
        isTop: true,
        code: `
const map = new Map();
map.set('name', 'Sergey');
map.set(1, 'id');

console.log(map.get('name')); // Sergey
`
    },
    {
        highlight: "Set",
        content: "Коллекция уникальных значений, удобна для дедупликации.",
        isTop: true,
        code: `
const numbers = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4]
`
    },
    {
        highlight: "JSON.parse / stringify",
        content: "Преобразование между JSON-совместимыми данными и строкой. Циклические ссылки и BigInt вызывают ошибку, а undefined/functions/Symbol могут быть отброшены.",
        isTop: true,
        code: `
const user = { id: 1, name: 'Sergey' };
const serialized = JSON.stringify(user);
const parsed = JSON.parse(serialized);

console.log(serialized);
console.log(parsed.name);
`
    }
];

export const asyncItems: JsItem[] = [
    {
        highlight: "setTimeout",
        content: "Ставит одно выполнение в очередь не раньше заданной задержки. Фактический запуск произойдет только когда event loop сможет обработать задачу.",
        isTop: true,
        code: `
setTimeout(() => {
  console.log('Выполнилось через 1 секунду');
}, 1000);
`
    },
    {
        highlight: "setInterval / clearInterval",
        content: "Планирует повторные выполнения до ручной остановки, но не гарантирует точную периодичность: занятый event loop может задерживать вызовы.",
        isTop: true,
        code: `
let tick = 0;

const timerId = setInterval(() => {
  tick += 1;
  console.log('tick', tick);

  if (tick === 3) {
    clearInterval(timerId);
  }
}, 1000);
`
    },
    {
        highlight: "Promise",
        content: "Базовая абстракция асинхронной операции со статусами pending/fulfilled/rejected.",
        isTop: true,
        code: `
const promise = new Promise((resolve, reject) => {
  const ok = true;
  setTimeout(() => {
    if (ok) resolve('done');
    else reject(new Error('fail'));
  }, 500);
});

promise.then(console.log).catch(console.error);
`
    },
    {
        highlight: "async / await",
        content: "Синтаксис для работы с Promise в более читаемом, последовательном стиле.",
        isTop: true,
        code: `
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadData() {
  await wait(500);
  return { ready: true };
}

loadData().then(console.log);
`
    },
    {
        highlight: "Promise.all",
        content: "Ожидает группу уже созданных промисов и сохраняет порядок результатов. Отклоняется при первой ошибке и не отменяет остальные операции.",
        isTop: true,
        code: `
// Операции начинают выполняться при создании промисов,
// а не из-за самого вызова Promise.all.
const a = Promise.resolve(1);
const b = Promise.resolve(2);
const c = Promise.resolve(3);

Promise.all([a, b, c]).then((values) => {
  console.log(values); // [1, 2, 3]
});
`
    },
    {
        highlight: "try / catch / finally",
        content: "Перехват ошибок синхронного и async-кода (внутри async через await).",
        isTop: true,
        code: `
async function request() {
  try {
    const result = await Promise.resolve('ok');
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('cleanup');
  }
}
`
    },
    {
        highlight: "queueMicrotask",
        content: "Ставит задачу в очередь микротасок (после текущего стека, до macrotask).",
        code: `
console.log('start');
queueMicrotask(() => console.log('microtask'));
setTimeout(() => console.log('timeout'), 0);
console.log('end');
`
    }
];

export const domItems: JsItem[] = [
    {
        highlight: "window / document",
        content: "Точки входа в браузерные API: window — глобальное окно, document — DOM страницы.",
        isTop: true,
        code: `
console.log(window.location.href);
console.log(document.title);
`
    },
    {
        highlight: "querySelector / getElementById",
        content: "Поиск элементов DOM по CSS-селектору или id.",
        isTop: true,
        code: `
const app = document.getElementById('app');
const button = document.querySelector('.save-btn');
`
    },
    {
        highlight: "createElement / append",
        content: "Создание и вставка DOM-элементов через JS.",
        isTop: true,
        code: `
const li = document.createElement('li');
li.textContent = 'Новая задача';

document.querySelector('#todo')?.append(li);
`
    },
    {
        highlight: "textContent",
        content: "Безопасная запись текста без интерпретации HTML.",
        isTop: true,
        code: `
const output = document.querySelector('#output');
if (output) {
  output.textContent = '<b>text</b>'; // теги не рендерятся
}
`
    },
    {
        highlight: "innerText",
        content: "Текст так, как он отображается пользователю: учитывает CSS и переносы и обычно исключает скрытый контент. Для всего текстового содержимого без layout-расчета используй textContent.",
        code: `
const title = document.querySelector('#title');
console.log(title?.innerText);
`
    },
    {
        highlight: "innerHTML",
        content: "Чтение/запись HTML внутри элемента. Пользовательские данные нельзя вставлять без надежной HTML-санитизации: это приводит к XSS.",
        isTop: true,
        code: `
const list = document.querySelector('#list');
if (list) {
  list.innerHTML = '<li>Item 1</li><li>Item 2</li>';
}
`
    },
    {
        highlight: "classList / dataset / style",
        content: "Классы, data-атрибуты и inline-стили элемента.",
        isTop: true,
        code: `
const card = document.querySelector('.card');

card?.classList.add('active');
card?.setAttribute('data-id', '42');
card?.style.setProperty('border-color', 'tomato');

console.log(card?.dataset.id); // 42
`
    },
    {
        highlight: "addEventListener",
        content: "Подписка на события интерфейса и жизненного цикла страницы.",
        isTop: true,
        code: `
const button = document.querySelector('.save-btn');
button?.addEventListener('click', (event) => {
  console.log('target:', event.target);
  console.log('currentTarget:', event.currentTarget);
});
`
    },
    {
        highlight: "preventDefault / stopPropagation",
        content: "Управление поведением браузера и всплытием событий.",
        isTop: true,
        code: `
document.querySelector('form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Отправка через fetch вместо reload');
});
`
    }
];

export const webApiItems: JsItem[] = [
    {
        highlight: "fetch",
        content: "HTTP-запросы в браузере с Promise API.",
        isTop: true,
        code: `
async function loadUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('HTTP error ' + response.status);
  }

  const users = await response.json();
  console.log(users);
}
`
    },
    {
        highlight: "URL / URLSearchParams",
        content: "Работа с адресом и query-параметрами без ручной конкатенации строк.",
        isTop: true,
        code: `
const url = new URL('https://example.com/products');
url.searchParams.set('page', '2');
url.searchParams.set('sort', 'price');

console.log(url.toString());
`
    },
    {
        highlight: "AbortController",
        content: "Отмена fetch-запросов (например, при новом поисковом вводе).",
        isTop: true,
        code: `
const controller = new AbortController();

const request = fetch('/api/search?q=react', { signal: controller.signal })
  .then((res) => {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  })
  .then(console.log)
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('Запрос отменен');
      return;
    }

    // Не скрываем сетевые и parse-ошибки.
    throw error;
  });

request.catch((error) => console.error('Search failed:', error));
controller.abort();
`
    },
    {
        highlight: "FormData",
        content: "Удобный сбор данных формы для отправки.",
        isTop: true,
        code: `
const form = document.querySelector('#signup-form');
if (form instanceof HTMLFormElement) {
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
}
`
    },
    {
        highlight: "localStorage",
        content: "Постоянное хранение строковых данных в браузере.",
        isTop: true,
        code: `
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
console.log(theme);
`
    },
    {
        highlight: "sessionStorage",
        content: "Хранение данных до закрытия вкладки.",
        code: `
sessionStorage.setItem('step', '2');
console.log(sessionStorage.getItem('step'));
`
    },
    {
        highlight: "document.cookie",
        content: "JavaScript видит только не-HttpOnly cookie. Сессионные токены должен устанавливать сервер через Set-Cookie с HttpOnly, Secure и подходящим SameSite; не храни auth-токен в доступной JS cookie.",
        code: `
// Подходит для нечувствительной UI-настройки.
document.cookie = 'theme=dark; path=/; max-age=3600; SameSite=Lax; Secure';
console.log(document.cookie);

// Серверная сессия задается ответом сервера, а не этим API:
// Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax; Path=/
`
    },
    {
        highlight: "History API",
        content: "Управление историей браузера без перезагрузки страницы.",
        code: `
history.pushState({ tab: 'methods' }, '', '?tab=methods');

window.addEventListener('popstate', (event) => {
  console.log('back/forward', event.state);
});
`
    }
];

export const moduleItems: JsItem[] = [
    {
        highlight: "export / import (named)",
        content: "Именованные экспорты подходят, когда модуль отдает несколько функций/утилит.",
        isTop: true,
        code: `
// math.js
export const sum = (a, b) => a + b;
export const sub = (a, b) => a - b;

// usage.js
import { sum as importedSum, sub as importedSub } from './math.js';
console.log(importedSum(2, 3)); // 5
console.log(importedSub(9, 4)); // 5
`
    },
    {
        highlight: "export default",
        content: "Один главный экспорт модуля. Удобно для компонента/класса/основной функции.",
        isTop: true,
        code: `
// user-service.js
export default class UserService {
  findById(id) {
    return { id, name: 'Sergey' };
  }
}

// app.js
import UserServiceClient from './user-service.js';
console.log(new UserServiceClient().findById(1));
`
    },
    {
        highlight: "re-export (barrel)",
        content: "Переэкспорт упрощает импорты: один вход в модуль вместо множества путей.",
        code: `
// utils/date.js
export const formatDate = (date) => date.toISOString().slice(0, 10);

// utils/number.js
export const formatPrice = (value) => value.toFixed(2);

// utils/index.js
export * from './date.js';
export * from './number.js';

// feature.js
import {
  formatDate as importedFormatDate,
  formatPrice as importedFormatPrice
} from './utils/index.js';

console.log(importedFormatDate(new Date()));
console.log(importedFormatPrice(42));
`
    },
    {
        highlight: "dynamic import()",
        content: "Ленивая загрузка кода: подключай тяжелые части только когда они реально нужны.",
        isTop: true,
        code: `
const openChart = async () => {
  // chart-lib загрузится только в момент открытия графика
  const { renderChart } = await import('./chart-lib.js');
  renderChart('#chart', [10, 22, 18]);
};

document.querySelector('#openChart')?.addEventListener('click', openChart);
`
    },
    {
        highlight: "globalThis",
        content: "Единая ссылка на глобальный объект в браузере, Node.js и других окружениях.",
        code: `
globalThis.APP_VERSION = '1.0.0';
console.log(globalThis.APP_VERSION);

// Почему так лучше:
// не нужно гадать между window/global/self.
`
    },
    {
        highlight: "structuredClone",
        content: "Глубокое копирование значений, поддерживаемых structured clone algorithm. Функции и DOM-узлы не клонируются и вызов может выбросить DataCloneError.",
        isTop: true,
        code: `
const original = {
  user: { name: 'Ann' },
  tags: ['js', 'react']
};

const copy = structuredClone(original);
copy.user.name = 'Kate';
copy.tags.push('ts');

console.log(original.user.name); // Ann
console.log(original.tags); // ['js', 'react']
`
    }
];

const guideRows: GuideRow[] = [
    {
        situation: "Проверка значений из формы/API",
        avoid: "Неявные проверки и loose equality (==)",
        best: "Нормализация + строгая проверка (trim, Number, ===)",
        why: "Меньше скрытых преобразований типов и случайных багов."
    },
    {
        situation: "Обновление массивов и объектов в UI-состоянии",
        avoid: "Мутация исходного массива через sort/reverse/splice",
        best: "Иммутабельные копии: map/filter/toSorted/toSpliced",
        why: "Проще отслеживать изменения и меньше побочных эффектов."
    },
    {
        situation: "Поиск одной сущности",
        avoid: "filter()[0] или ручные циклы без необходимости",
        best: "find() для элемента, findIndex() для индекса",
        why: "Код читается быстрее и останавливается на первом совпадении."
    },
    {
        situation: "Работа с DOM-текстом",
        avoid: "innerHTML для пользовательского ввода",
        best: "textContent для текста, innerHTML только для доверенного или санитизированного HTML",
        why: "Снижение риска XSS и предсказуемое поведение."
    },
    {
        situation: "События scroll/input/resize",
        avoid: "Тяжелые обработчики на каждый тик без ограничений",
        best: "debounce/throttle/requestAnimationFrame; passive для wheel/touch без preventDefault",
        why: "Интерфейс не тормозит и лучше держит FPS."
    }
];

const EventLoopDemo = () => {
    const [logs, setLogs] = useState<string[]>([]);

    const push = (line: string) => {
        setLogs((prev) => [...prev, line]);
    };

    const run = () => {
        setLogs([]);
        push("sync: start");

        Promise.resolve().then(() => push("microtask: Promise.then"));
        queueMicrotask(() => push("microtask: queueMicrotask"));
        setTimeout(() => push("macrotask: setTimeout(0)"), 0);

        push("sync: end");
    };

    return (
        <RegexS.DemoCard>
            <RegexS.DemoTitle>Demo 1: Event Loop Order</RegexS.DemoTitle>
            <RegexS.DemoHint>
                {"Нажми кнопку и посмотри порядок выполнения: sync → microtask → macrotask."}
            </RegexS.DemoHint>
            <button onClick={run}>Run demo</button>
            <RegexS.DemoOutput>
                {logs.length ? logs.join("\n") : "Пока пусто. Нажми Run demo."}
            </RegexS.DemoOutput>
        </RegexS.DemoCard>
    );
};

const JsonSafetyDemo = () => {
    const [raw, setRaw] = useState('{"user":{"name":"Sergey"},"role":"editor"}');

    const result = useMemo(() => {
        try {
            const parsed = JSON.parse(raw);
            return {ok: true, message: JSON.stringify(parsed, null, 2)};
        } catch (error) {
            return {
                ok: false,
                message: error instanceof Error ? error.message : "Unknown parse error"
            };
        }
    }, [raw]);

    return (
        <RegexS.DemoCard>
            <RegexS.DemoTitle>Demo 2: Safe JSON Parse</RegexS.DemoTitle>
            <RegexS.DemoHint>
                Полезно для работы с localStorage и внешними payload, где формат может быть поврежден.
            </RegexS.DemoHint>
            <RegexS.DemoLabel htmlFor="json-raw">JSON input</RegexS.DemoLabel>
            <RegexS.DemoTextarea
                id="json-raw"
                value={raw}
                onChange={(event) => setRaw(event.currentTarget.value)}
            />
            <RegexS.DemoBadge $isError={!result.ok}>
                {result.ok ? "Valid JSON" : "Parse error"}
            </RegexS.DemoBadge>
            <RegexS.DemoOutput>{result.message}</RegexS.DemoOutput>
        </RegexS.DemoCard>
    );
};

export const JavaScript = () => {
    return (
        <>
            <TypeTitle>JavaScript (Азбука языка)</TypeTitle>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>О Разделе JavaScript</ParagraphTitle>
                    <TextP>
                        Эта страница — <Marker>обзорный конспект</Marker> по языку JavaScript: как им пользоваться
                        системно, где чаще всего делают ошибки, и какие шаблоны реально работают в проекте.
                    </TextP>
                    <TextP>
                        Категории ниже в навигации (<Marker>Syntax, Functions, Objects, Operators, Loops...</Marker>)
                        содержат уже детальные списки и справочники. Здесь оставлен именно общий
                        <Marker> фундамент и практические принципы</Marker>.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Что относится к самому языку, а что к браузерным API.</NoteLi>
                        <NoteLi>Как думать о данных, ошибках и асинхронности в живом коде.</NoteLi>
                        <NoteLi>Как быстрее читать чужой JavaScript-код и писать свой без хаоса.</NoteLi>
                    </NoteUl>
                    <TextP>
                        База спецификаций:{" "}
                        <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
                            MDN JavaScript
                        </Link>
                    </TextP>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>JavaScript vs Browser API</ParagraphTitle>
                    <GuideTableWrap>
                        <GuideTable>
                            <thead>
                            <tr>
                                <GuideHead>Слой</GuideHead>
                                <GuideHead>Что сюда входит</GuideHead>
                                <GuideHead>Частые ошибки</GuideHead>
                                <GuideHead>Рабочая практика</GuideHead>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <GuideCell>Ядро JavaScript</GuideCell>
                                <GuideCell>Переменные, функции, объекты, массивы, операторы, Promise</GuideCell>
                                <GuideCell>Неявные преобразования, мутации, запутанный control flow</GuideCell>
                                <GuideCell>Явные преобразования, иммутабельность, маленькие функции</GuideCell>
                            </tr>
                            <tr>
                                <GuideCell>Browser API</GuideCell>
                                <GuideCell>document, window, fetch, localStorage, history, events</GuideCell>
                                <GuideCell>innerHTML на пользовательских данных, тяжелые listeners</GuideCell>
                                <GuideCell>textContent, делегирование событий, abortable fetch</GuideCell>
                            </tr>
                            </tbody>
                        </GuideTable>
                    </GuideTableWrap>
                    <TextP>
                        Смысл таблицы: сначала определяем слой задачи, потом выбираем инструмент.
                    </TextP>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Best Practice Compass</ParagraphTitle>
                    <GuideTableWrap>
                        <GuideTable>
                            <thead>
                            <tr>
                                <GuideHead>Ситуация</GuideHead>
                                <GuideHead>Неудачный путь</GuideHead>
                                <GuideHead>Лучше так</GuideHead>
                                <GuideHead>Почему</GuideHead>
                            </tr>
                            </thead>
                            <tbody>
                            {guideRows.map((row) => (
                                <tr key={row.situation}>
                                    <GuideCell>{row.situation}</GuideCell>
                                    <GuideCell>{row.avoid}</GuideCell>
                                    <GuideCell>{row.best}</GuideCell>
                                    <GuideCell>{row.why}</GuideCell>
                                </tr>
                            ))}
                            </tbody>
                        </GuideTable>
                    </GuideTableWrap>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Рабочие Шаблоны Кода</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {
                            `
// 1) API-клиент: json — явный JSON-body, body — FormData/Blob/другой BodyInit
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
                            `
                        }
                    </HighlightedCodeBlock>

                    <HighlightedCodeBlock>
                        {
                            `
// 2) Нормализация входных данных из формы/URL
function toPositiveInteger(value, fallback) {
  const normalized = typeof value === 'string' ? value.trim() : value;
  if (normalized === '' || normalized == null) return fallback;

  const number = Number(normalized);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function normalizeUserInput(raw) {
  return {
    query: typeof raw.query === 'string' ? raw.query.trim().toLowerCase() : '',
    page: toPositiveInteger(raw.page, 1),
    limit: toPositiveInteger(raw.limit, 20)
  };
}

console.log(normalizeUserInput({ query: '  React  ', page: '2', limit: 'bad' }));
                            `
                        }
                    </HighlightedCodeBlock>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <ParagraphTitle>Интерактивные Мини-Демо</ParagraphTitle>
                <Text>
                    <RegexS.DemoGrid>
                        <EventLoopDemo/>
                        <JsonSafetyDemo/>
                    </RegexS.DemoGrid>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Видео-Блоки (можно заменить своими ссылками)</ParagraphTitle>
                    <VideoContainer>
                        <iframe
                            src="https://www.youtube.com/embed/W6NZfCO5SIk"
                            title="JavaScript Overview 1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoContainer>
                    <VideoContainer>
                        <iframe
                            src="https://www.youtube.com/embed/8aGhZQkoFbQ"
                            title="JavaScript Overview 2"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoContainer>
                    <TextP>
                        Эти видео можно заменить на твои — блоки уже встроены в архитектуру страницы.
                    </TextP>
                </Text>
            </NoteBlock>
        </>
    );
};
