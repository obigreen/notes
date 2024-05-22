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
    }>;
};


export const arrayItems = [
    {
        highlight: ".push()",
        content: "Добавляет один или несколько элементов в конец массива и возвращает новую длину массива",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан'];
        fruits.push('Апельсин');
        console.log(fruits); // ['Яблоко', 'Банан', 'Апельсин']
            `
    },
    {
        highlight: ".pop()",
        content: "Удаляет последний элемент из массива и возвращает его",

        code:
            `
        //code   
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        let lastFruit = fruits.pop();
        console.log(lastFruit); // 'Апельсин'
        console.log(fruits); // ['Яблоко', 'Банан']
            `
    },
    {
        highlight: ".shift()",
        content: "Удаляет первый элемент из массива и возвращает его. Этот метод изменяет длину массива",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        let firstFruit = fruits.shift();
        console.log(firstFruit); // 'Яблоко'
        console.log(fruits); // ['Банан', 'Апельсин']
            `
    },
    {
        highlight: ".unshift()",
        content: "Добавляет один или несколько элементов в начало массива и возвращает новую длину массива",

        code:
            `
        //code    
        let fruits = ['Банан', 'Апельсин'];
        fruits.unshift('Яблоко');
        console.log(fruits); // ['Яблоко', 'Банан', 'Апельсин']
            `
    },
    {
        highlight: ".splice()",
        content: "Изменяет содержимое массива, удаляя или заменяя существующие элементы и/или добавляя новые элементы",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Персик', 'Апельсин'];
        fruits.splice(1, 1, 'Банан');
        console.log(fruits); // ['Яблоко', 'Банан', 'Апельсин']
            `
    },
    {
        highlight: ".slice()",
        content: "Возвращает поверхностную копию части массива в новый массив",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин', 'Груша'];
        let citrusFruits = fruits.slice(1, 3);
        console.log(citrusFruits); // ['Банан', 'Апельсин']
            `
    },
    {
        highlight: ".concat()",
        content: "Используется для объединения двух или более массивов. Этот метод не изменяет существующие массивы, а вместо этого возвращает новый массив",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан'];
        let moreFruits = ['Апельсин', 'Груша'];
        let allFruits = fruits.concat(moreFruits);
        console.log(allFruits); // ['Яблоко', 'Банан', 'Апельсин', 'Груша']
            `
    },
    {
        highlight: ".join()",
        content: "Создает и возвращает новую строку путем объединения всех элементов массива, разделенных указанным разделителем",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        let fruitsString = fruits.join(', ');
        console.log(fruitsString); // 'Яблоко, Банан, Апельсин'
            `
    },
    {
        highlight: ".reverse()",
        content: "Обращает порядок элементов в массиве на месте. Первый элемент массива становится последним, а последний элемент становится первым.",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        fruits.reverse();
        console.log(fruits); // ['Апельсин', 'Банан', 'Яблоко']
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
        content: "Возвращает значение первого элемента в массиве, которое удовлетворяет предоставленной функции проверки. В противном случае возвращается undefined",

        code:
            `
        //code    
        let numbers = [1, 2, 3, 4, 5];
        let firstEvenNumber = numbers.find(number => number % 2 === 0);
        console.log(firstEvenNumber); // 2
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
        content: "Определяет, содержит ли массив определенный элемент, возвращая true или false",

        code:
            `
        //code    
        let fruits = ['Яблоко', 'Банан', 'Апельсин'];
        let hasBanana = fruits.includes('Банан');
        console.log(hasBanana); // true
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



