import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, ParagraphTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    arrayItems?: Array<{
        highlight: string;
        content: string;
        code: string;
    }>;
};


export const arrayItems = [
    {
        highlight: ".push()",
        content: "Добавляет один или несколько элементов в конец массива и возвращает новую длину массива",

        code:
            `
        //code  
        //Мутирующий  
        
        const arr = [1, 2, 3];
        const newLength = arr.push(4);
        console.log(arr); // [1, 2, 3, 4]
        console.log(newLength); // 4
        
        //Использование push() с массивом объектов
        const users = [{ name: 'John' }, { name: 'Alice' }];
        const newLength = users.push({ name: 'Bob' });
        console.log(users);
        // [{ name: 'John' }, { name: 'Alice' }, { name: 'Bob' }]
        console.log(newLength); // 3
        
        //Добавление нескольких элементов
        const arr = [1, 2, 3];
        const newLength = arr.push(4, 5, 6);
        console.log(arr); // [1, 2, 3, 4, 5, 6]
        console.log(newLength); // 6
        
        //Добавление массива как одного элемента
        //Если вы передадите массив в push(), он будет добавлен как один элемент:
        const arr = [1, 2, 3];
        const newLength = arr.push([4, 5, 6]);
        console.log(arr); // [1, 2, 3, [4, 5, 6]] //хм.. и может далее flat() для "выравнивания"
        console.log(newLength); // 4
            `
    },
    {
        highlight: ".pop()",
        content: "Удаляет последний элемент из массива и возвращает его. Этот метод изменяет длину массива",

        code:
            `
        //code   
        //Мутирующий
                  
        const arr = [1, 2, 3];
        const lastElement = arr.pop();
        console.log(arr); // [1, 2]
        console.log(lastElement); // 3
        
        //Если массив пустой, метод pop() возвращает undefined и не изменяет массив
        const emptyArr = [];
        const lastElement = emptyArr.pop();
        console.log(emptyArr); // []
        console.log(lastElement); // undefined
        
        //Метод pop() изменяет исходный массив, уменьшая его длину на один.
        //Возвращаемое значение pop() — это последний элемент массива или undefined, если массив пустой.
            `
    },
    {
        highlight: ".shift()",
        content: "Удаляет первый элемент из массива и возвращает его. Этот метод изменяет длину массива",

        code:
            `
        //code  
        //Мутирующий  
        
        const arr = [1, 2, 3];
        const firstElement = arr.shift();
        console.log(arr); // [2, 3]
        console.log(firstElement); // 1
        
        //Если массив пустой, метод shift() возвращает undefined и не изменяет массив.
        const emptyArr = [];
        const firstElement = emptyArr.shift();
        console.log(emptyArr); // []
        console.log(firstElement); // undefined
            `
    },
    {
        highlight: ".unshift()",
        content: "Добавляет один или несколько элементов в начало массива и возвращает новую длину массива",

        code:
            `
        //code    
        //Мутирующий  
        
        const arr = [2, 3, 4];
        const newLength = arr.unshift(1);
        console.log(arr); // [1, 2, 3, 4]
        console.log(newLength); // 4
        
        //Добавление нескольких элементов
        const arr = [3, 4];
        const newLength = arr.unshift(1, 2);
        console.log(arr); // [1, 2, 3, 4]
        console.log(newLength); // 4
        
        //Добавление массива как одного элемента
        const arr = [2, 3];
        const newLength = arr.unshift([0, 1]);
        console.log(arr); // [[0, 1], 2, 3]
        console.log(newLength); // 3
        
        //Добавление объектов в массив
        const users = [{ name: 'Alice' }, { name: 'Bob' }];
        const newLength = users.unshift({ name: 'John' });
        console.log(users); // [{ name: 'John' }, { name: 'Alice' }, { name: 'Bob' }]
        console.log(newLength); // 3
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
        content: "Используется для объединения двух или более массивов. Этот метод не изменяет существующие массивы, а вместо этого возвращает новый массив",

        code:
            `
        //code    
        //Не мутирующий
        
        arr.concat(value1, value2, ..., valueN)
        //value1, value2, ..., valueN: Массивы и/или значения, которые нужно объединить в новый массив.

        //Объединение двух массивов
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const newArr = arr1.concat(arr2);
        
        console.log(newArr); // [1, 2, 3, 4, 5, 6]
        console.log(arr1); // [1, 2, 3]
        console.log(arr2); // [4, 5, 6]
        //В этом примере массивы arr1 и arr2 объединяются в новый массив newArr, при этом исходные массивы остаются неизменными
        
        //Объединение массивов и значений
        const arr = [1, 2, 3];
        const newArr = arr.concat(4, [5, 6], 7);
        console.log(newArr); // [1, 2, 3, 4, 5, 6, 7]
        //В этом примере массив arr объединяется с числом 4, массивом [5, 6] и числом 7, создавая новый массив newArr
        
        //Вложенные массивы добавляются как есть, без развертывания
        
        //Метод concat() часто используется для создания поверхностных копий массивов:
        const originalArr = [1, 2, 3];
        const copyArr = originalArr.concat();
        console.log(copyArr); // [1, 2, 3]
        
        //Метод concat() полезен для объединения данных из разных источников, например, объединения результатов нескольких API-запросов или объединения данных из нескольких компонентов.
            `
    },
    {
        highlight: ".join()",
        content: "Используется для объединения всех элементов массива в одну строку. Этот метод не изменяет исходный массив и возвращает новую строку.",

        code:
            `
        //code 
        //Не мутирующий   
        arr.join([separator])
        //separator (необязательный): Указывает строку, которая будет использоваться в качестве разделителя между элементами массива. 
        //Если разделитель не указан, используется запятая ,.
        
        //Объединение массива в строку с разделителем по умолчанию
        const arr = [1, 2, 3];
        const str = arr.join();
        console.log(str); // "1,2,3"
        
        //Объединение массива с указанным разделителем
        const arr = ['Hello', 'world'];
        const str = arr.join(' ');
        console.log(str); // "Hello world"
        
        //Объединение массива без разделителя
        const arr = ['H', 'e', 'l', 'l', 'o'];
        const str = arr.join('');
        console.log(str); // "Hello"
        
        //Объединение массива с разными типами данных
        const arr = [1, 'apple', true];
        const str = arr.join(' - ');
        console.log(str); // "1 - apple - true"
        //В этом примере элементы массива разных типов объединяются в строку с использованием дефиса в качестве разделителя.
        
        //Если массив содержит только один элемент, этот элемент будет возвращен как строка без добавления разделителя
            `
    },
    {
        highlight: ".reverse()",
        content: "Используется для изменения порядка элементов массива на обратный. Этот метод изменяет исходный массив и возвращает его",

        code:
            `
        //code    
        //Мутирующий
        
        //Обратный порядок числового/строкового массива
        const arr = [1, 2, 3];
        const reversedArr = arr.reverse();
        console.log(arr); // [3, 2, 1]
        console.log(reversedArr); // [3, 2, 1]
        //и
        const arr = ['a', 'b', 'c'];
        const reversedArr = arr.reverse();
        console.log(arr); // ['c', 'b', 'a']
        console.log(reversedArr); // ['c', 'b', 'a']
                
        //Меняет исходный (создать копию)
        const originalArr = [1, 2, 3];
        const reversedArr = [...originalArr].reverse();
        console.log(originalArr); // [1, 2, 3]
        console.log(reversedArr); // [3, 2, 1]
        //--
        const [items, setItems] = useState([1, 2, 3]);
        const handleReverse = () => {
            const reversedItems = [...items].reverse();
            setItems(reversedItems);
        };
            `
    },
    {
        highlight: ".flat()",
        content: "Используется для “выравнивания” многомерных массивов, то есть для объединения элементов вложенных массивов в один одномерный массив. Этот метод возвращает новый массив и не изменяет исходный массив",

        code:
            `
        //code    
        //Не мутирующий
        arr.flat(depth) //depth значение глубины (1) (2) (3)
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
        content: "Сортирует элементы массива на месте и возвращает массив.\n",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        fruits.sort();
        console.log(fruits); // ['Апельсин', 'Банан', 'Яблоко']
            `
    },
    {
        highlight: ".filter()",
        content: "Создает новый массив со всеми элементами, которые проходят условие, реализованное предоставленной функцией",

        code:
            `
        //code    
        let numbers = [1, 2, 3, 4, 5, 6];
        let evenNumbers = numbers.filter(number => number % 2 === 0);
        console.log(evenNumbers); // [2, 4, 6]
        
        
        //---
        let [tasks, setTasks] = useState([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
        ]);
        
        function removeTasak(taskId: number) {
        let resutlTasks = tasks.filter(t => t.id !== taskId)
        setTasks(resutlTasks)
        } 
            `
    },
    {
        highlight: ".map()",
        content: "Создает новый массив с результатами вызова предоставленной функции для каждого элемента массива",

        code:
            `
        //code    
        let numbers = [1, 2, 3, 4, 5];
        let squares = numbers.map(number => number * number);
        console.log(squares); // [1, 4, 9, 16, 25]
            `
    },
    {
        highlight: ".reduce()",
        content: "Применяет функцию к аккумулятору и каждому значению массива (слева направо), чтобы свести его к одному значению",

        code:
            `
        //code    
        let numbers = [1, 2, 3, 4, 5];
        let sum = numbers.reduce((total, number) => total + number, 0);
        console.log(sum); // 15
            `
    },
    {
        highlight: ".forEach()",
        content: "Выполняет предоставленную функцию один раз для каждого элемента массива",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        fruits.forEach(fruit => console.log(fruit));
        // 'Яблоко'
        // 'Банан'
        // 'Апельсин'
            `
    },
    {
        highlight: ".indexOf()",
        content: "Возвращает первый индекс, по которому данный элемент может быть найден в массиве, или -1, если такого элемента нет",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        let index = fruits.indexOf('Банан');
        console.log(index); // 1
            `
    },
    {
        highlight: ".find()",
        content: "Используется для поиска первого элемента в массиве, который удовлетворяет предоставленному условию (функции). Этот метод возвращает первый найденный элемент или undefined, если ни один элемент не удовлетворяет условию",

        code:
            `
        //code 
        //Не мутирующий   
        
        arr.find(callback(element[, index[, array]])[, thisArg])
            //tcallback: Функция, которая выполняется для каждого элемента массива.
            //element: Текущий элемент массива.
            //index (необязательный): Индекс текущего элемента.
            //tarray (необязательный): Сам массив, который проходит через метод find.
            //thisArg (необязательный): Значение, используемое в качестве this при выполнении функции callback.
            
        //----------//    
        //Поиск первого элемента больше 25    
        const numbers = [10, 20, 30, 40, 50];
        const firstNumberGreaterThan25 = numbers.find(num => num > 25);
        console.log(firstNumberGreaterThan25); // Output: 30
        
        !!!!!!Универсальное решение без привязки к определенному массиву
        const numbers = [10, 20, 30, 40, 50];
        let firstNumberGreaterThan25 = findFirstElement(numbers, (num) => num > 25);
        console.log(firstNumberGreaterThan25); // Output: 30
        
        //Разбор кода:
        //Функция findFirstElement:
        //Принимает два параметра: arr (массив) и condition (функция условия).
        //Использует метод find для поиска первого элемента, который удовлетворяет условию.
        //Использование функции:
        //Определяем массив numbers.
        //Вызываем findFirstElement с numbers и условием (num) => num > 25.
        //Выводим результат.
        //----------//
        
        //Поиск объекта в массиве объектов
        const users = [
          { name: 'Alice', age: 25 },
          { name: 'Bob', age: 30 },
          { name: 'Charlie', age: 35 }
        ];
        const user = users.find(user => user.age > 28);
        console.log(user); // Output: { name: 'Bob', age: 30 }
        
        //Поиск элемента по индексу
        const numbers = [5, 12, 8, 130, 44];
        const found = numbers.find((element, index) => index === 3);
        console.log(found); // Output: 130
        
        //Поиск с использованием thisArg
        const obj = { minAge: 18 };
        const people = [
          { name: 'Alice', age: 16 },
          { name: 'Bob', age: 20 },
          { name: 'Charlie', age: 15 }
        ];
        const adult = people.find(function(person) {
          return person.age >= this.minAge;
        }, obj);
        console.log(adult); // Output: { name: 'Bob', age: 20 }
        //В этом примере метод find() использует объект obj в качестве thisArg для проверки возраста людей в массиве people. Результат: { name: 'Bob', age: 20 }.
        
        //Работа с состоянием в React
        //При работе с состоянием в компонентах React метод find() может быть полезен для поиска и обновления определенных элементов состояния:
        const [items, setItems] = useState([
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]);
        const item = items.find(item => item.id === 2);
        console.log(item); // Output: { id: 2, name: 'Item 2' }
            `
    },
    {
        highlight: ".findIndex()",
        content: "Возвращает индекс первого элемента в массиве, который удовлетворяет предоставленной функции проверки. В противном случае возвращается -1",

        code:
            `
        //code    
        let numbers = [1, 2, 3, 4, 5];
        let firstEvenNumberIndex = numbers.findIndex(number => number % 2 === 0);
        console.log(firstEvenNumberIndex); // 1
            `
    },
    {
        highlight: ".every()",
        content: "Проверяет, удовлетворяют ли все элементы массива предоставленной функции проверки",

        code:
            `
        //code    
        let numbers = [2, 4, 6, 8, 10];
        let areAllEven = numbers.every(number => number % 2 === 0);
        console.log(areAllEven); // true
            `
    },
    {
        highlight: ".some()",
        content: "Проверяет, удовлетворяет ли хотя бы один элемент массива предоставленной функции проверки",

        code:
            `
        //code    
        let numbers = [1, 2, 3, 4, 5];
        let isThereAnEvenNumber = numbers.some(number => number % 2 === 0);
        console.log(isThereAnEvenNumber); // true
            `
    },
    {
        highlight: ".includes()",
        content: "Используется для проверки наличия определенного элемента в массиве. Этот метод возвращает true, если элемент найден, и false в противном случае",

        code:
            `
        //code    
        //Не мутирующий
        arr.includes(valueToFind[, fromIndex])

        //valueToFind: Значение, которое необходимо найти в массиве.
        //fromIndex (необязательный): Индекс, с которого начинать поиск. По умолчанию равен 0. Если указан отрицательный индекс, поиск начинается с конца массива.
        
        //Поиск элемента в массиве
        const arr = [1, 2, 3, 4, 5];
        const hasThree = arr.includes(3);
        console.log(hasThree); // true
        
        //Поиск отсутствующего элемента
        const arr = ['apple', 'banana', 'cherry'];
        const hasOrange = arr.includes('orange');
        console.log(hasOrange); // false
        
        //Поиск с указанием индекса начала
        const arr = [1, 2, 3, 4, 5];
        const hasTwoAfterIndexTwo = arr.includes(2, 2);
        console.log(hasTwoAfterIndexTwo); // false
        //В этом примере метод includes() начинает поиск элемента 2 с индекса 2. Поскольку 2 находится до индекса 2, результат: false.
        
        //Поиск с отрицательным индексом
        const arr = [1, 2, 3, 4, 5];
        const hasFourFromEnd = arr.includes(4, -2);
        console.log(hasFourFromEnd); // true
        //В этом примере метод includes() начинает поиск элемента 4 с индекса -2, что соответствует позиции второго элемента с конца. Результат: true.
        
        //Метод includes() использует строгую проверку (то есть такие же правила, как ===), поэтому различие между 0 и -0, а также false и 0 имеет значение.
        
        //!!!!!!! АЛЬТЕРНАТИВНЫЙ МЕТОД
        //indexOf(): Возвращает индекс первого вхождения указанного элемента в массиве, или -1, если элемент не найден. Менее читаем в контексте проверки наличия элемента
        const arr = [1, 2, 3, 4, 5];
        const hasThree = arr.indexOf(3) !== -1;
        console.log(hasThree); // true
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
            <NotesTitle>Method Array</NotesTitle>
            <Text>
                <S.List>
                    {arrayItems.map((item, index) => (
                        <S.Item key={index}>
                            <S.HighlightedText
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



