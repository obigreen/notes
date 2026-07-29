import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    arrayItems?: Array<{
        highlight: string;
        content: string;
        code: string;
        isTop?: boolean;
    }>;
};


export const arrayItems = [
    {
        highlight: ".push()",
        content: "Добавляет один или несколько элементов в конец массива и возвращает новую длину массива",
        isTop: true,

        code:
            `
        //code  
        //Мутирующий  
        
        {
            const arr = [1, 2, 3];
            const newLength = arr.push(4);
            console.log(arr); // [1, 2, 3, 4]
            console.log(newLength); // 4
        }
        
        //Использование push() с массивом объектов
        {
            const users = [{ name: 'John' }, { name: 'Alice' }];
            const newLength = users.push({ name: 'Bob' });
            console.log(users);
            // [{ name: 'John' }, { name: 'Alice' }, { name: 'Bob' }]
            console.log(newLength); // 3
        }
        
        //Добавление нескольких элементов
        {
            const arr = [1, 2, 3];
            const newLength = arr.push(4, 5, 6);
            console.log(arr); // [1, 2, 3, 4, 5, 6]
            console.log(newLength); // 6
        }
        
        //Добавление массива как одного элемента
        //Если вы передадите массив в push(), он будет добавлен как один элемент:
        {
            const arr = [1, 2, 3];
            const newLength = arr.push([4, 5, 6]);
            console.log(arr); // [1, 2, 3, [4, 5, 6]]
            console.log(newLength); // 4
        }
            `
    },
    {
        highlight: ".pop()",
        content: "Удаляет последний элемент из массива и возвращает его. Этот метод изменяет длину массива",
        isTop: true,

        code:
            `
        //code   
        //Мутирующий
                  
        {
            const arr = [1, 2, 3];
            const lastElement = arr.pop();
            console.log(arr); // [1, 2]
            console.log(lastElement); // 3
        }
        
        //Если массив пустой, метод pop() возвращает undefined и не изменяет массив
        {
            const emptyArr = [];
            const lastElement = emptyArr.pop();
            console.log(emptyArr); // []
            console.log(lastElement); // undefined
        }
        
        //Метод pop() изменяет исходный массив, уменьшая его длину на один.
        //Возвращаемое значение pop() — это последний элемент массива или undefined, если массив пустой.
            `
    },
    {
        highlight: ".shift()",
        content: "Удаляет первый элемент из массива и возвращает его. Этот метод изменяет длину массива",
        isTop: true,

        code:
            `
        //code  
        //Мутирующий  
        
        {
            const arr = [1, 2, 3];
            const firstElement = arr.shift();
            console.log(arr); // [2, 3]
            console.log(firstElement); // 1
        }
        
        //Если массив пустой, метод shift() возвращает undefined и не изменяет массив.
        {
            const emptyArr = [];
            const firstElement = emptyArr.shift();
            console.log(emptyArr); // []
            console.log(firstElement); // undefined
        }
            `
    },
    {
        highlight: ".unshift()",
        content: "Добавляет один или несколько элементов в начало массива и возвращает новую длину массива",
        isTop: true,

        code:
            `
        //code    
        //Мутирующий  
        
        {
            const arr = [2, 3, 4];
            const newLength = arr.unshift(1);
            console.log(arr); // [1, 2, 3, 4]
            console.log(newLength); // 4
        }
        
        //Добавление нескольких элементов
        {
            const arr = [3, 4];
            const newLength = arr.unshift(1, 2);
            console.log(arr); // [1, 2, 3, 4]
            console.log(newLength); // 4
        }
        
        //Добавление массива как одного элемента
        {
            const arr = [2, 3];
            const newLength = arr.unshift([0, 1]);
            console.log(arr); // [[0, 1], 2, 3]
            console.log(newLength); // 3
        }
        
        //Добавление объектов в массив
        {
            const users = [{ name: 'Alice' }, { name: 'Bob' }];
            const newLength = users.unshift({ name: 'John' });
            console.log(users); // [{ name: 'John' }, { name: 'Alice' }, { name: 'Bob' }]
            console.log(newLength); // 3
        }
            `
    },
    // {
    //     highlight: ".splice()",
    //     content: "Изменяет содержимое массива, удаляя или заменяя существующие элементы и/или добавляя новые элементы",
    //
    //     code:
    //         `
    //     //code
    //     let fruits = ['Яблоко', 'Персик', 'Апельсин'];
    //     fruits.splice(1, 1, 'Банан');
    //     console.log(fruits); // ['Яблоко', 'Банан', 'Апельсин']
    //         `
    // },
    // {
    //     highlight: ".slice()",
    //     content: "Возвращает поверхностную копию части массива в новый массив",
    //
    //     code:
    //         `
    //     //code
    //     let fruits = ['Яблоко', 'Банан', 'Апельсин', 'Груша'];
    //     let citrusFruits = fruits.slice(1, 3);
    //     console.log(citrusFruits); // ['Банан', 'Апельсин']
    //         `
    // },
    {
        highlight: ".concat()",
        content: "Возвращает новый массив, объединяя исходный массив со значениями и массивами-аргументами. Массивы-аргументы разворачиваются только на один уровень; исходные массивы не мутируют",
        isTop: true,

        code:
            `
        //code    
        //Не мутирующий
        
        //arr.concat(value1, value2, ..., valueN)
        //value1, value2, ..., valueN: Массивы и/или значения, которые нужно объединить в новый массив.
        //Массивы-аргументы разворачиваются на один уровень, но их вложенные массивы остаются вложенными.

        //Объединение двух массивов
        {
            const arr1 = [1, 2, 3];
            const arr2 = [4, 5, 6];
            const newArr = arr1.concat(arr2);

            console.log(newArr); // [1, 2, 3, 4, 5, 6]
            console.log(arr1); // [1, 2, 3]
            console.log(arr2); // [4, 5, 6]
        }
        //В этом примере массивы arr1 и arr2 объединяются в новый массив newArr, при этом исходные массивы остаются неизменными
        
        //Объединение массивов и значений
        {
            const arr = [1, 2, 3];
            const newArr = arr.concat(4, [5, 6], [[7, 8]]);
            console.log(newArr); // [1, 2, 3, 4, 5, 6, [7, 8]]
        }
        //Массив [5, 6] развернулся, а вложенный [7, 8] сохранился:
        //concat не является полной заменой flat(Infinity).
        
        //Метод concat() часто используется для создания поверхностных копий массивов:
        {
            const originalArr = [{ id: 1 }];
            const copyArr = originalArr.concat();
            console.log(copyArr); // [{ id: 1 }]
            console.log(copyArr !== originalArr); // true: новый массив
            console.log(copyArr[0] === originalArr[0]); // true: копия поверхностная
        }
        
        //Метод concat() полезен для объединения данных из разных источников, например, объединения результатов нескольких API-запросов или объединения данных из нескольких компонентов.
            `
    },
    {
        highlight: ".join()",
        content: "Используется для объединения всех элементов массива в одну строку. Этот метод не изменяет исходный массив и возвращает новую строку.",
        isTop: true,

        code:
            `
        //code 
        //Не мутирующий   
        //arr.join(separator)
        //separator (необязательный): Указывает строку, которая будет использоваться в качестве разделителя между элементами массива. 
        //Если разделитель не указан, используется запятая ,.
        
        //Объединение массива в строку с разделителем по умолчанию
        {
            const arr = [1, 2, 3];
            const str = arr.join();
            console.log(str); // "1,2,3"
        }
        
        //Объединение массива с указанным разделителем
        {
            const arr = ['Hello', 'world'];
            const str = arr.join(' ');
            console.log(str); // "Hello world"
        }
        
        //Объединение массива без разделителя
        {
            const arr = ['H', 'e', 'l', 'l', 'o'];
            const str = arr.join('');
            console.log(str); // "Hello"
        }
        
        //Объединение массива с разными типами данных
        {
            const arr = [1, 'apple', true];
            const str = arr.join(' - ');
            console.log(str); // "1 - apple - true"
        }
        //В этом примере элементы массива разных типов объединяются в строку с использованием дефиса в качестве разделителя.
        
        //Если массив содержит только один элемент, этот элемент будет возвращен как строка без добавления разделителя
            `
    },
    {
        highlight: ".reverse()",
        content: "Используется для изменения порядка элементов массива на обратный. Этот метод изменяет исходный массив и возвращает его",
        isTop: true,

        code:
            `
        //code    
        //Мутирующий
        
        //Обратный порядок числового/строкового массива
        {
            const arr = [1, 2, 3];
            const reversedArr = arr.reverse();
            console.log(arr); // [3, 2, 1]
            console.log(reversedArr); // [3, 2, 1]
            console.log(reversedArr === arr); // true: возвращается тот же массив
        }
        //и
        {
            const arr = ['a', 'b', 'c'];
            const reversedArr = arr.reverse();
            console.log(arr); // ['c', 'b', 'a']
            console.log(reversedArr); // ['c', 'b', 'a']
        }
                
        //Для React state сначала создаем копию
        {
            const originalArr = [1, 2, 3];
            const reversedArr = [...originalArr].reverse();
            console.log(originalArr); // [1, 2, 3]
            console.log(reversedArr); // [3, 2, 1]
        }

        //В React безопасный functional update выглядит так:
        //setItems((currentItems) => [...currentItems].reverse());
            `
    },
    {
        highlight: ".flat()",
        content: "Возвращает новый массив, разворачивая вложенные массивы до указанной глубины (по умолчанию один уровень), и не изменяет исходный массив",
        isTop: true,

        code:
            `
        //code    
        //Не мутирующий
        //arr.flat(depth), где depth — глубина 1, 2, 3...
        //По умолчанию, значение depth равно 1
        //Infinity - для полного “выравнивания” массива
        
        const arr1 = [1, [2, 3], [4, [5, 6]]];
        console.log(arr1.flat()); // Глубина по умолчанию 1
        // Результат: [1, 2, 3, 4, [5, 6]]
        
        const arr2 = [1, [2, 3], [4, [5, 6]]];
        console.log(arr2.flat(2)); // Указана глубина 2
        // Результат: [1, 2, 3, 4, 5, 6]
        
        const arr4 = [1, 2, [3, 4, [5, 6, [7, 8]]]];
        console.log(arr4.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8]
        
        //Пустые слоты в массиве (empty slots) удаляются, когда flat() вызывается:
        const arr5 = [1, 2, , 4, 5];
        console.log(arr5.flat()); // [1, 2, 4, 5]
        
        
        //Метод flat() не поддерживается в старых браузерах, поэтому, если поддержка старых браузеров критична, стоит использовать полифилы или другие подходы.
        //Использование flat(Infinity) может быть дорогим с точки зрения производительности для очень глубоких или больших массивов, поэтому стоит использовать его с осторожностью или ограничивать глубину выравнивания.
            `
    },
    {
        highlight: ".sort()",
        content: "Сортирует элементы массива на месте и возвращает тот же массив. Для React state используй toSorted() или сортируй предварительно созданную копию",
        isTop: true,

        code:
            `
        //code    
        //Мутирующий
        //arr.sort([compareFn])

        const fruits = ['Яблоко', 'Банан', 'Апельсин'];
        fruits.sort();
        console.log(fruits); // ['Апельсин', 'Банан', 'Яблоко']

        //Для чисел нужен compareFn, иначе сортировка будет как строки
        const numbers = [10, 2, 100, 5];
        const returned = numbers.sort((a, b) => a - b);
        console.log(numbers); // [2, 5, 10, 100]
        console.log(returned === numbers); // true

        //Сортировка объектов
        const users = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 20 }
        ];
        users.sort((a, b) => a.age - b.age);
        console.log(users.map((user) => user.name)); // ['Bob', 'Alice']

        //Если нужно без мутации:
        const original = [3, 1, 2];
        const sortedCopy = [...original].sort((a, b) => a - b);
        console.log(original); // [3, 1, 2]
        console.log(sortedCopy); // [1, 2, 3]
            `
    },
    {
        highlight: ".filter()",
        content: "Возвращает новый массив со всеми элементами, для которых callback вернул truthy. Сам filter() не мутирует исходный массив",
        isTop: true,

        code:
            `
        //code    
        //Не мутирующий
        //arr.filter(callback)

        const numbers = [1, 2, 3, 4, 5, 6];
        const evenNumbers = numbers.filter((number) => number % 2 === 0);
        console.log(evenNumbers); // [2, 4, 6]
        console.log(numbers); // [1, 2, 3, 4, 5, 6]

        //Фильтрация массива объектов
        const tasks = [
            { id: 1, title: 'HTML & CSS', isDone: true },
            { id: 2, title: 'JS & TS', isDone: true },
            { id: 3, title: 'REACT', isDone: false }
        ];
        const completed = tasks.filter((task) => task.isDone);
        console.log(completed); // первые 2 элемента

        //Частый кейс в React: удалить элемент по id
        const taskId = 2;
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        console.log(updatedTasks); // без task с id=2
            `
    },
    {
        highlight: ".map()",
        content: "Возвращает новый массив той же длины с результатами callback для каждого существующего элемента; исходный массив сам метод не мутирует",
        isTop: true,

        code:
            `
        //code
        //Не мутирующий
        //arr.map(callback)

        //1) Базовое преобразование
        const numbers = [1, 2, 3];
        const doubled = numbers.map((n) => n * 2);
        console.log(doubled); // [2, 4, 6]

        //2) Преобразование структуры данных
        const users = [
          { id: 1, name: 'Alice', points: 12 },
          { id: 2, name: 'Bob', points: 5 }
        ];
        const preview = users.map((user) => ({
          id: user.id,
          label: user.name + ' (' + user.points + ')'
        }));
        console.log(preview);

        //3) Практика: подготовка данных для UI
        //Почему map: UI часто рендерит "view-model", а не сырые данные API.
        const cards = users.map((user) => ({
          ...user,
          isTop: user.points >= 10
        }));
        console.log(cards);
            `
    },
    {
        highlight: ".flatMap()",
        content: "Возвращает новый массив, выполняя map() и затем flat(1): удобно, когда один элемент превращается в 0, 1 или несколько элементов.",
        isTop: true,

        code:
            `
        //code
        //Не мутирующий
        //arr.flatMap(callback)

        //1) Из каждого числа делаем пару [n, n*10]
        const base = [1, 2, 3];
        const expanded = base.flatMap((n) => [n, n * 10]);
        console.log(expanded); // [1, 10, 2, 20, 3, 30]

        //2) Фильтрация + преобразование в одном проходе
        //Возвращаем [] чтобы "выкинуть" элемент
        const words = ['ok', '', 'js'];
        const normalized = words.flatMap((word) => {
          if (!word) return [];
          return [word.toUpperCase()];
        });
        console.log(normalized); // ['OK', 'JS']

        //3) Практика: распаковать теги из массива статей
        const posts = [
          { id: 1, tags: ['js', 'react'] },
          { id: 2, tags: ['js', 'css'] }
        ];
        const allTags = posts.flatMap((post) => post.tags);
        console.log(allTags); // ['js', 'react', 'js', 'css']
            `
    },
    {
        highlight: ".reduce()",
        content: "Применяет функцию к аккумулятору и каждому значению массива (слева направо), чтобы свести его к одному значению",
        isTop: true,

        code:
            `
        //code
        //Сам reduce() не мутирует исходный массив.
        //Но callback может мутировать accumulator, элементы или внешний state.
        //arr.reduce((acc, item) => nextAcc, initialAcc)

        //1) Базовый кейс: сумма
        const numbers = [1, 2, 3, 4, 5];
        const total = numbers.reduce((acc, n) => acc + n, 0);
        console.log(total); // 15

        //2) Группировка в объект
        const users = [
          { id: 1, name: 'Alice', role: 'dev' },
          { id: 2, name: 'Bob', role: 'qa' },
          { id: 3, name: 'Kate', role: 'dev' }
        ];
        const byRole = users.reduce((acc, user) => {
          const list = acc[user.role] ?? [];
          return { ...acc, [user.role]: [...list, user] };
        }, {});
        console.log(byRole.dev.length); // 2

        //3) Реальный кейс: нормализация ответа API для O(1) доступа
        const byId = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        console.log(byId[2].name); // Bob

        //Почему reduce полезен:
        //когда нужно получить один итог: число, объект, Map, сложную агрегированную структуру.
        //Для пустого массива без initialAcc метод выбросит TypeError.
            `
    },
    {
        highlight: ".forEach()",
        content: "Вызывает callback для каждого существующего элемента и всегда возвращает undefined; сам по себе новый массив не создает",
        isTop: true,

        code:
            `
        //code    
        //Не возвращает новый массив (в отличие от map)
        //arr.forEach(callback)

        const fruits = ['Яблоко', 'Банан', 'Апельсин'];
        const returned = fruits.forEach((fruit) => console.log(fruit));
        // 'Яблоко'
        // 'Банан'
        // 'Апельсин'
        console.log(returned); // undefined

        //Подсчет суммы через внешний аккумулятор
        let sum = 0;
        [1, 2, 3, 4].forEach((n) => {
            sum += n;
        });
        console.log(sum); // 10
            `
    },
    {
        highlight: ".indexOf()",
        content: "Возвращает первый индекс, по которому данный элемент может быть найден в массиве, или -1, если такого элемента нет",

        code:
            `
        //code    
        //Не мутирующий
        //arr.indexOf(searchElement[, fromIndex])

        const fruits = ['Яблоко', 'Банан', 'Апельсин', 'Банан'];
        console.log(fruits.indexOf('Банан')); // 1
        console.log(fruits.indexOf('Банан', 2)); // 3
        console.log(fruits.indexOf('Манго')); // -1

        //Проверка наличия (альтернатива includes)
        console.log(fruits.indexOf('Апельсин') !== -1); // true
            `
    },
    {
        highlight: ".find()",
        content: "Используется для поиска первого элемента в массиве, который удовлетворяет предоставленному условию (функции). Этот метод возвращает первый найденный элемент или undefined, если ни один элемент не удовлетворяет условию",
        isTop: true,

        code:
            `
        //code
        //Не мутирующий
        //arr.find(predicate) -> первый найденный элемент или undefined

        //1) Базовый поиск
        const numbers = [10, 20, 30, 40];
        const firstBig = numbers.find((n) => n > 25);
        console.log(firstBig); // 30

        //2) Поиск объекта
        const users = [
          { id: 1, name: 'Alice', active: false },
          { id: 2, name: 'Bob', active: true }
        ];
        const activeUser = users.find((user) => user.active);
        console.log(activeUser?.name); // Bob

        //3) Практика: достать сущность по id перед обновлением
        const targetId = 2;
        const user = users.find((item) => item.id === targetId);
        if (!user) {
          console.log('Пользователь не найден');
        } else {
          console.log('Обновляем:', user.name);
        }

        //Почему не filter:
        //find останавливается на первом совпадении и сразу возвращает элемент.
            `
    },
    {
        highlight: ".findIndex()",
        content: "Возвращает индекс первого элемента в массиве, который удовлетворяет предоставленной функции проверки. В противном случае возвращается -1",

        code:
            `
        //code    
        //Не мутирующий
        //arr.findIndex(callback)

        const numbers = [1, 3, 7, 8, 10];
        const firstEvenNumberIndex = numbers.findIndex((number) => number % 2 === 0);
        console.log(firstEvenNumberIndex); // 3

        const users = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ];
        const indexById = users.findIndex((user) => user.id === 2);
        console.log(indexById); // 1

        console.log(users.findIndex((user) => user.id === 999)); // -1
            `
    },
    {
        highlight: ".every()",
        content: "Проверяет, удовлетворяют ли все элементы массива предоставленной функции проверки",

        code:
            `
        //code    
        //Не мутирующий
        //arr.every(callback)

        const numbers = [2, 4, 6, 8, 10];
        const areAllEven = numbers.every((number) => number % 2 === 0);
        console.log(areAllEven); // true

        const mixed = [2, 4, 5];
        console.log(mixed.every((number) => number % 2 === 0)); // false

        //Для пустого массива вернет true
        console.log([].every((item) => item > 0)); // true
            `
    },
    {
        highlight: ".some()",
        content: "Проверяет, удовлетворяет ли хотя бы один элемент массива предоставленной функции проверки",

        code:
            `
        //code    
        //Не мутирующий
        //arr.some(callback)

        const numbers = [1, 2, 3, 4, 5];
        const isThereAnEvenNumber = numbers.some((number) => number % 2 === 0);
        console.log(isThereAnEvenNumber); // true

        const oddOnly = [1, 3, 5];
        console.log(oddOnly.some((number) => number % 2 === 0)); // false

        //Для пустого массива вернет false
        console.log([].some((item) => item > 0)); // false
            `
    },
    {
        highlight: ".at()",
        content: "Возвращает элемент массива по индексу, поддерживает отрицательные индексы (удобно для чтения конца массива).",
        isTop: true,

        code:
            `
        //code
        //Не мутирующий
        //arr.at(index)

        const list = ['draft', 'review', 'published'];
        console.log(list.at(0));  // 'draft'
        console.log(list.at(-1)); // 'published'
        console.log(list.at(99)); // undefined

        //Сравнение с классикой:
        console.log(list[list.length - 1]); // 'published'

        //Практический кейс:
        //берем последний лог в чате/истории событий
        const logs = ['start', 'fetch', 'render'];
        const lastLog = logs.at(-1);
        console.log(lastLog); // render
            `
    },
    {
        highlight: ".toSorted()",
        content: "Возвращает поверхностную отсортированную копию массива без мутации исходного (современная иммутабельная альтернатива sort).",
        isTop: true,

        code:
            `
        //code
        //Не мутирующий (ES2023)
        //arr.toSorted(compareFn)

        const numbers = [30, 5, 12];
        const sorted = numbers.toSorted((a, b) => a - b);

        console.log(numbers); // [30, 5, 12]
        console.log(sorted);  // [5, 12, 30]

        //Практический React-кейс:
        //не мутируем state-массив перед рендером
        const users = [
          { id: 1, name: 'Bob' },
          { id: 2, name: 'Alice' }
        ];
        const byName = users.toSorted((a, b) => a.name.localeCompare(b.name));
        console.log(byName.map((u) => u.name)); // ['Alice', 'Bob']
            `
    },
    {
        highlight: ".includes()",
        content: "Используется для проверки наличия определенного элемента в массиве. Этот метод возвращает true, если элемент найден, и false в противном случае",
        isTop: true,

        code:
            `
        //code
        //Не мутирующий
        //arr.includes(valueToFind[, fromIndex]) -> boolean

        //1) Базовая проверка
        const tech = ['html', 'css', 'js'];
        console.log(tech.includes('js')); // true
        console.log(tech.includes('node')); // false

        //2) Поиск с позиции
        const ids = [10, 20, 30, 20];
        console.log(ids.includes(20, 2)); // true (ищем начиная с индекса 2)

        //3) Важный нюанс: includes умеет находить NaN
        const values = [1, NaN, 3];
        console.log(values.includes(NaN)); // true
        console.log(values.indexOf(NaN)); // -1

        //4) Практика: простая валидация входного значения
        const allowedRoles = ['admin', 'editor', 'viewer'];
        const role = 'editor';
        if (!allowedRoles.includes(role)) {
          throw new Error('Недопустимая роль');
        }
            `
    }
];


export const ArrayMethods: React.FC<MethodProps> = ({arrayItems = []}) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Array methods (Методы массивов)</NotesTitle>
            <Text>
                <S.List>
                    {arrayItems.map((item, index) => (
                        <S.Item key={index}>
                            <S.HighlightedText
                                $isTop={item.isTop}
                                onClick={() => item.code && setSelectedCode(item.code)}>
                                {item.highlight}
                            </S.HighlightedText>: {item.content}
                        </S.Item>
                    ))}
                </S.List>
            </Text>

            {selectedCode && (
                <S.Overlay onClick={() => setSelectedCode(null)}>
                    <S.PopupWrapper>
                        <pre>
                            <code ref={codeRef} className="javascript">
                                {selectedCode.trim()}
                            </code>
                        </pre>
                    </S.PopupWrapper>
                </S.Overlay>
            )}
        </NoteBlock>
    );
};
