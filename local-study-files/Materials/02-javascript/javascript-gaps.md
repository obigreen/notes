# JavaScript: пробелы, которые нужно закрыть практикой

**Приоритет:** P0  
**Основа:** историческая самооценка Preax, вопросы из диалогов и сопоставление с приложением  
**Важно:** синтаксис функций, объектов, массивов, ошибок и прототипов уже есть в приложении. Этот файл не дублирует справочник: он фиксирует модели, на которых чаще всего ломается самостоятельный код.

## 1. Значение, ссылка и мутация

Примитив присваивается как значение:

```js
let first = 10;
let second = first;
second += 1;

console.log(first); // 10
```

Переменные с объектами содержат ссылки на один объект:

```js
const original = {
  profile: { name: 'Ann' },
};

const alias = original;
alias.profile.name = 'Sam';

console.log(original.profile.name); // Sam
```

Spread создаёт только поверхностную копию:

```js
const copy = { ...original };

console.log(copy !== original); // true
console.log(copy.profile === original.profile); // true
```

Иммутабельное обновление вложенного значения требует скопировать каждый изменяемый уровень:

```js
const updated = {
  ...original,
  profile: {
    ...original.profile,
    name: 'Lee',
  },
};
```

Нужно уметь до запуска предсказать:

- какие ссылки одинаковы;
- какой объект мутируется;
- достаточно ли поверхностной копии;
- почему React может не увидеть мутацию существующего state-объекта.

## 2. Три формы функций и hoisting

```js
declaration(); // работает

function declaration() {
  return 'declaration';
}

const expression = function () {
  return 'expression';
};

const arrow = () => 'arrow';
```

- Function declaration создаётся при инициализации окружения и доступна раньше строки объявления.
- Переменные `let`/`const` тоже имеют binding до строки объявления, но находятся в temporal dead zone: обращаться к ним до инициализации нельзя.
- Function expression и arrow становятся доступны тогда, когда инициализирована содержащая их переменная.
- Arrow не имеет собственного `this`, `arguments` и не вызывается через `new`.

Выбор формы должен следовать смыслу, а не привычке. Для object method, которому нужен динамический receiver, arrow часто неверна.

## 3. Scope и closure

Closure — функция вместе с доступом к лексическому окружению, в котором она создана.

```js
function createCounter(initial = 0) {
  let value = initial;

  return {
    increment() {
      value += 1;
      return value;
    },
    read() {
      return value;
    },
  };
}

const counter = createCounter(2);
counter.increment(); // 3
counter.read();      // 3
```

Практические применения:

- инкапсуляция состояния;
- factory functions;
- callbacks и event handlers;
- memoization;
- React handlers/effects, которые видят значения конкретного render.

Типичный баг — stale closure: callback продолжает использовать значение из render/итерации, где он был создан. Исправление зависит от задачи: корректные dependencies, functional state update, ref или изменение ownership состояния.

## 4. `this`: смотреть на место вызова

Для обычной функции `this` обычно определяется способом вызова:

```js
const user = {
  name: 'Ann',
  sayName() {
    return this.name;
  },
};

user.sayName(); // this === user

const detached = user.sayName;
// detached() — receiver потерян;
// конкретное значение this зависит от strict mode и окружения.
```

Явное управление:

```js
function greet(prefix, punctuation) {
  return `${prefix}, ${this.name}${punctuation}`;
}

greet.call(user, 'Привет', '!');
greet.apply(user, ['Привет', '!']);

const greetUser = greet.bind(user, 'Привет');
greetUser('!');
```

- `call` вызывает сразу с аргументами по одному;
- `apply` вызывает сразу с массивоподобным набором;
- `bind` возвращает новую связанную функцию;
- arrow получает `this` из внешнего лексического окружения.

Не заучивать ответ «глобальный объект»: top-level `this`, detached call, strict mode, ES modules и Node/CommonJS различаются.

## 5. Call stack и рекурсия

Каждый незавершённый вызов занимает frame в call stack.

```js
function factorial(value) {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError('value must be a non-negative integer');
  }

  if (value <= 1) return 1;
  return value * factorial(value - 1);
}
```

В рекурсии обязательны:

- корректная base case;
- движение к ней;
- понимание глубины;
- ответ, не проще ли цикл.

Для frontend важнее уверенно читать stack trace и вложенные вызовы, чем решать сложные рекурсивные головоломки.

## 6. Prototype chain и class

Если собственного property нет, JavaScript ищет его выше по prototype chain.

```js
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal);
dog.name = 'Rex';

dog.speak();
Object.hasOwn(dog, 'speak'); // false
Object.getPrototypeOf(dog) === animal; // true
```

`class` даёт удобный синтаксис поверх prototype-based model, но не превращает JavaScript в классическую копию Java/C#.

Исправление ошибочного примера из архива:

```js
class User {
  #age;

  constructor(age) {
    this.age = age;
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError('Invalid age');
    }

    this.#age = value;
  }
}
```

Getter `age`, возвращающий `this.age`, и setter, записывающий в `this.age`, рекурсивно вызывают сами себя.

## 7. Sparse arrays: реальный интервью-вопрос

```js
const values = [1, 2, 3];
values[7] = 4;

console.log(values.length); // 8
console.log(3 in values);   // false
console.log(values[3]);     // undefined
```

Индексы 3–6 — empty slots, а не явно записанные элементы со значением `undefined`.

```js
values.map((value) => String(value));
// callback пропустит holes

Array.from(values);
// создаст плотный массив, где отсутствующие позиции станут undefined
```

В обычном прикладном коде специально создавать sparse arrays почти никогда не нужно. Ценность вопроса — увидеть разницу между `length`, наличием property и результатом чтения.

## 8. Строка, code point и видимый символ

`String#length` считает UTF-16 code units, а не пользовательские символы.

```js
'😀'.length;       // 2
[...'😀'].length; // 1 code point
```

Но spread тоже не всегда считает grapheme clusters: составной emoji или буква с combining mark может состоять из нескольких code points. Когда интерфейсу важны видимые символы, нужна соответствующая сегментация, например `Intl.Segmenter`, и тесты на реальные данные.

## 9. Ошибки — часть контракта

Не писать:

```js
try {
  await save();
} catch {
  // ошибка исчезла
}
```

Нужно решить:

- может ли текущий слой восстановиться;
- что показать пользователю;
- какой context добавить и где залогировать;
- нужно ли пробросить ошибку выше;
- является ли отмена ожидаемым исходом.

Синтаксис `try/catch`, custom errors и Promise rejection уже есть в приложении. Здесь критерий — спроектировать ошибочный сценарий, а не только happy path.

## Что уметь объяснить без подсказки

1. Почему spread не делает deep clone.
2. Чем declaration, expression и arrow различаются по hoisting и `this`.
3. Что closure сохраняет и откуда появляется stale closure.
4. Чем `call`, `apply` и `bind` отличаются.
5. Как property находится по prototype chain.
6. Почему после `values[7] = 4` длина равна 8, но позиции 3–6 не являются обычными элементами.
7. Почему `String#length` не всегда соответствует числу видимых символов.

## Практический критерий

- написать closure-counter и объяснить приватность `value`;
- потерять и восстановить method receiver через `bind`;
- обновить вложенный объект без мутации;
- исправить рекурсивный accessor;
- предсказать поведение sparse array в `map`, `for...of` и `Object.keys`;
- по stack trace найти первый frame собственного кода;
- решить эти задачи заново на следующий день без просмотра ответа.

