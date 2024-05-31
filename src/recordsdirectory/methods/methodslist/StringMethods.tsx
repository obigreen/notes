import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    stringItems?: Array<{
        highlight: string;
        content: string;
        code: string;
    }>;
};


export const stringItems = [
    {
        highlight: ".charAt()",
        content: "Возвращает символ по указанному индексу",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.charAt(0)); // 'П'
            `
    },
    {
        highlight: ".concat()",
        content: "Используется для объединения двух или более строк в одну новую строку. Этот метод не изменяет исходные строки и возвращает новую строку",
        code:
            `
        //code
        //Не мутирующий
        
        string1.concat(string2, string3, ..., stringN)
        //string1: Исходная строка.
        //string2, string3, ..., stringN: Строки, которые нужно объединить с string1.
        
        //Объединение двух строк
        const str1 = "Hello, ";
        const str2 = "world!";
        const result = str1.concat(str2);
        console.log(result); // "Hello, world!"
        
        //Объединение нескольких строк
        const str1 = "JavaScript ";
        const str2 = "is ";
        const str3 = "awesome!";
        const result = str1.concat(str2, str3);
        console.log(result); // "JavaScript is awesome!"
        
        //Объединение с пустой строкой
        const str1 = "Concat";
        const str2 = "";
        const result = str1.concat(str2);
        console.log(result); // "Concat"
        
        //Если один из аргументов не является строкой, он будет приведен к строке перед объединением.
        
        //Метод concat() полезен для создания сложных строковых значений, объединяя отдельные части текста, такие как пользовательский ввод, константы или данные из различных источников.
        //Альтернатива с использованием оператора +
        const str1 = "Hello, ";
        const str2 = "world!";
        const result = str1 + str2;
        console.log(result); // "Hello, world!"
        //Использование оператора + может быть более кратким и читабельным, особенно при объединении небольшого количества строк.
            `
    },
    {
        highlight: ".includes()",
        content: "Используется для проверки наличия подстроки в строке. Этот метод возвращает true, если подстрока найдена, и false в противном случае. Метод не изменяет исходную строку",
        code:
            `
        //code
        //Не мутирующий
        
        string.includes(searchString[, position])
        //searchString: Строка, которую необходимо найти в исходной строке.
        //position (необязательный): Позиция, с которой начинать поиск подстроки. По умолчанию равна 0.
        
        //Поиск подстроки в строке
        const str = "Hello, world!";
        const containsHello = str.includes("Hello");
        console.log(containsHello); // true
        
        //Поиск отсутствующей подстроки
        const str = "Hello, world!";
        const containsHi = str.includes("Hi");
        console.log(containsHi); // false
        
        //Поиск подстроки с указанием позиции
        const str = "Hello, world!";
        const containsWorld = str.includes("world", 7);
        
        console.log(containsWorld); // true
        //В этом примере метод includes() начинает поиск подстроки "world" с позиции 7. Результат: true.
        
        //Поиск подстроки с учетом регистра
        const str = "Hello, world!";
        const containshello = str.includes("hello");
        
        console.log(containshello); // false
        //Метод includes() чувствителен к регистру, поэтому в этом примере поиск подстроки "hello" вернет false, так как исходная строка содержит "Hello" с заглавной буквы.
        
        //Нюансы использования для фронтенд-разработчиков
        //Метод includes() полезен для проверки наличия подстрок в текстовых данных, например, для валидации ввода пользователя или поиска в текстовых данных.
        
        //Проверка ввода пользователя
        const userInput = "I love JavaScript!";
        const keyword = "JavaScript";
        if (userInput.includes(keyword)) {
            console.log("Keyword found!"); // Keyword found!
        } else {
            console.log("Keyword not found.");
        }
        
        //Проверка существования слова в предложении
        const sentence = "The quick brown fox jumps over the lazy dog.";
        const word = "fox";
        if (sentence.includes(word)) {
            console.log("The word exists in the sentence."); // The word exists in the sentence.
        } else {
            console.log("The word does not exist in the sentence.");
        }
            `
    },
    {
        highlight: ".indexOf()",
        content: "Возвращает индекс первого вхождения указанной подстроки, или -1, если подстрока не найдена",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.indexOf('мир')); // 8
            `
    },
    {
        highlight: ".lastIndexOf()",
        content: "Возвращает индекс последнего вхождения указанной подстроки, или -1, если подстрока не найдена",
        code:
            `
        //code
        let str = 'мир, мир, мир!';
        console.log(str.lastIndexOf('мир')); // 10
            `
    },
    {
        highlight: ".match()",
        content: "Используется для поиска совпадений с регулярным выражением",
        code:
            `
        //code
        let str = 'Привет, мир!';
        let regex = /\\w+/g;
        console.log(str.match(regex)); // ['Привет', 'мир']
            `
    },
    {
        highlight: ".replace()",
        content: "Возвращает новую строку с некоторыми или всеми совпадениями с шаблоном, замененными на заменитель",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.replace('мир', 'JavaScript')); // 'Привет, JavaScript!'
            `
    },
    {
        highlight: ".search()",
        content: "Выполняет поиск совпадения между регулярным выражением и этой строкой",
        code:
            `
        //code
        let str = 'Привет, мир!';
        let regex = /мир/;
        console.log(str.search(regex)); // 8
            `
    },
    {
        highlight: ".slice()",
        content: "Извлекает часть строки и возвращает новую строку",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.slice(8)); // 'мир!'
            `
    },
    {
        highlight: ".split()",
        content: "Разбивает строку по указанному разделителю и возвращает массив подстрок",
        code:
            `
        //code
        //Не мутирующий
        
        string.split([separator[, limit]]) 
        //separator (необязательный): Символ или регулярное выражение, используемое для разделения строки.
        //Если разделитель не указан, возвращается массив, содержащий всю строку
        //limit (необязательный): Целое число, ограничивающее количество найденных подстрок. 
        //Если указано, разделение выполняется не более чем указанное количество раз.
        
        
        //Ориентируется по символу, ..ет,.. (', ') - 
        //если был бы просто пробел то разделение по пробелу
        let str = 'Привет, мир!';
        console.log(str.split(', ')); // ['Привет', 'мир!']
        //или
        const str = "Hello world";
        const words = str.split(" ");
        console.log(words); // ["Hello", "world"]
        
        //Разделение строки с указанием ограничения
        const str = "one, two, three, four, five";
        const limitedSplit = str.split(", ", 3);
        console.log(limitedSplit); // ["one", "two", "three"]
        
        //Разделение строки без указания разделителя
        const str = "hello";
        const chars = str.split("");
        console.log(chars); // ["h", "e", "l", "l", "o"]
        //Если разделитель не указан, метод split() разделяет строку по символам
        
        //Разделение строки по регулярному выражению
        const str = "apple, banana; cherry|date";
        const fruits = str.split(/[,;|]/);
        console.log(fruits); // ["apple", "banana", "cherry", "date"]
        //В этом примере строка разделяется на массив подстрок на основе нескольких разделителей, используя регулярное выражение.
            `
    },
    {
        highlight: ".substr()",
        content: "Возвращает часть строки, начиная с указанного индекса и в течение заданного количества символов",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.substr(8, 3)); // 'мир'
            `
    },
    {
        highlight: ".substring()",
        content: "Возвращает часть строки между двумя индексами",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.substring(8, 11)); // 'мир'
            `
    },
    {
        highlight: ".toLowerCase()",
        content: "Преобразует все символы строки в нижний регистр",
        code:
            `
        //code
        let str = 'Привет, Мир!';
        console.log(str.toLowerCase()); // 'привет, мир!'
            `
    },
    {
        highlight: ".toUpperCase()",
        content: "Преобразует все символы строки в верхний регистр",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.toUpperCase()); // 'ПРИВЕТ, МИР!'
            `
    },
    {
        highlight: ".trim()",
        content: "Удаляет пробелы с обоих концов строки",
        code:
            `
        //code
        let str = '   Привет, мир!   ';
        console.log(str.trim()); // 'Привет, мир!'
            `
    }
];


export const SrtingMethods: React.FC<MethodProps> = ({stringItems = []}) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Method Srting</NotesTitle>
            <Text>
                <S.List>
                    {stringItems.map((item, index) => (
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



