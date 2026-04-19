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
        isTop?: boolean;
    }>;
};


export const stringItems = [
    {
        highlight: ".charAt()",
        content: "Возвращает символ по указанному индексу",
        code:
            `
        //code
        //Не мутирующий
        //str.charAt(index)

        const str = 'Привет, мир!';
        console.log(str.charAt(0)); // 'П'
        console.log(str.charAt(8)); // 'м'

        //Если индекс вне диапазона - вернется пустая строка
        console.log(str.charAt(999)); // ''

        //Полезно, когда нужен первый символ:
        const name = 'sergey';
        const upperFirst = name.charAt(0).toUpperCase() + name.slice(1);
        console.log(upperFirst); // 'Sergey'
            `
    },
    {
        highlight: ".concat()",
        isTop: true,
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
        isTop: true,
        content: "Используется для проверки наличия подстроки в строке. Этот метод возвращает true, если подстрока найдена, и false в противном случае. Метод не изменяет исходную строку",
        code:
            `
        //code
        //Не мутирующий

        //1) Базовый поиск
        const text = 'Hello, world!';
        console.log(text.includes('world')); // true
        console.log(text.includes('react')); // false

        //2) Поиск с позиции
        console.log(text.includes('o', 5)); // true

        //3) Чувствительно к регистру
        console.log(text.includes('hello')); // false

        //4) Практика: мягкий поиск по вводу пользователя
        const query = '  JAVASCRIPT  '.trim().toLowerCase();
        const title = 'JavaScript Handbook'.toLowerCase();
        console.log(title.includes(query)); // true

        //Почему так:
        //trim + toLowerCase убирают "шум" ввода и делают поиск предсказуемым.
            `
    },
    {
        highlight: ".indexOf()",
        isTop: true,
        content: "Возвращает индекс первого вхождения указанной подстроки, или -1, если подстрока не найдена",
        code:
            `
        //code
        //Не мутирующий
        //str.indexOf(searchValue[, fromIndex])

        const str = 'Привет, мир! Мир большой.';
        console.log(str.indexOf('мир')); // 8
        console.log(str.indexOf('Мир')); // 13 (чувствителен к регистру)

        //Поиск начиная с конкретной позиции
        console.log(str.indexOf('Мир', 14)); // -1

        //Стандартная проверка наличия подстроки
        console.log(str.indexOf('React') !== -1); // false
            `
    },
    {
        highlight: ".lastIndexOf()",
        content: "Возвращает индекс последнего вхождения указанной подстроки, или -1, если подстрока не найдена",
        code:
            `
        //code
        //Не мутирующий
        //str.lastIndexOf(searchValue[, fromIndex])

        const str = 'мир, мир, мир!';
        console.log(str.lastIndexOf('мир')); // 10

        //Ограничение справа через fromIndex
        console.log(str.lastIndexOf('мир', 7)); // 5

        //Если не найдено -1
        console.log(str.lastIndexOf('react')); // -1
            `
    },
    {
        highlight: ".match()",
        isTop: true,
        content: "Используется для поиска совпадений с регулярным выражением",
        code:
            `
        //code
        //Не мутирующий
        //str.match(regex)

        const str = 'Привет, мир! JavaScript 2026';

        //С флагом g - массив всех совпадений
        console.log(str.match(/[A-Za-z]+/g)); // ['JavaScript']

        //Без g - первое совпадение + служебные данные
        const result = str.match(/\\d+/);
        console.log(result?.[0]); // '2026'
        console.log(result?.index); // индекс начала совпадения

        //Если совпадений нет, вернется null
        console.log(str.match(/React/)); // null
            `
    },
    {
        highlight: ".replace()",
        isTop: true,
        content: "Используется, когда нужно изменить часть строки по шаблону: исправить текст, нормализовать ввод пользователя или очистить строку перед проверками. Метод не изменяет исходную строку, а возвращает новую",
        code:
            `
        //code
        //Не мутирующий

        string.replace(pattern, replacement)
        //pattern: строка или регулярное выражение
        //replacement: строка или функция, которая формирует замену

        //1) Базовая замена (если pattern - строка, заменится только первое совпадение)
        const text = 'Привет, мир! Мир большой.';
        console.log(text.replace('мир', 'JavaScript')); // 'Привет, JavaScript! Мир большой.'

        //2) Замена всех вхождений через регулярное выражение + флаг g
        const message = 'cat and dog and cat';
        console.log(message.replace(/cat/g, 'fox')); // 'fox and dog and fox'

        //3) Замена без учета регистра (флаг i)
        const title = 'JavaScript и javascript';
        console.log(title.replace(/javascript/gi, 'JS')); // 'JS и JS'

        //4) Очистка строки от лишних символов (полезно для валидации и алгоритмов)
        const raw = 'A man, a plan, a canal: Panama!';
        const normalized = raw.replace(/[^a-z0-9]/gi, '').toLowerCase();
        console.log(normalized); // 'amanaplanacanalpanama'

        //5) Замена через функцию (когда логика зависит от найденного значения)
        const prices = 'apple 10, banana 25';
        const updated = prices.replace(/\\d+/g, (num) => String(Number(num) * 2));
        console.log(updated); // 'apple 20, banana 50'

        //Итог:
        //.replace() помогает не только "поменять слово", но и подготовить строку к сравнению,
        //поиску, валидации и другим преобразованиям текста.
            `
    },
    {
        highlight: ".replaceAll()",
        isTop: true,
        content: "Заменяет все вхождения подстроки сразу. Удобнее, чем replace() со строкой, когда нужны именно все совпадения.",
        code:
            `
        //code
        //Не мутирующий
        //str.replaceAll(searchValue, replaceValue)

        //1) Базовый кейс
        const text = 'js-js-js';
        console.log(text.replaceAll('js', 'JavaScript')); // JavaScript-JavaScript-JavaScript

        //2) Практика: нормализация slug
        const title = 'my awesome article';
        const slug = title.trim().toLowerCase().replaceAll(' ', '-');
        console.log(slug); // my-awesome-article

        //3) Когда нужен replace с regex:
        //если замена по шаблону (например, все цифры), лучше replace(/\\d+/g, ...)
        const sku = 'id-123-part-456';
        console.log(sku.replace(/\\d+/g, '#')); // id-#-part-#
            `
    },
    {
        highlight: ".search()",
        content: "Выполняет поиск совпадения между регулярным выражением и этой строкой",
        code:
            `
        //code
        //Не мутирующий
        //str.search(regex)

        const str = 'Привет, мир!';
        console.log(str.search(/мир/)); // 8

        //Удобно с регулярками
        const message = 'Order #4821 created';
        console.log(message.search(/#\\d+/)); // 6

        //Если не найдено
        console.log(message.search(/cancelled/)); // -1
            `
    },
    {
        highlight: ".slice()",
        isTop: true,
        content: "Извлекает часть строки и возвращает новую строку",
        code:
            `
        //code
        //Не мутирующий
        //str.slice(beginIndex[, endIndex])

        const str = 'Привет, мир!';
        console.log(str.slice(8)); // 'мир!'
        console.log(str.slice(0, 6)); // 'Привет'

        //Поддерживает отрицательные индексы
        console.log(str.slice(-4)); // 'мир!'
        console.log(str.slice(-4, -1)); // 'мир'
            `
    },
    {
        highlight: ".split()",
        isTop: true,
        content: "Разбивает строку по указанному разделителю и возвращает массив подстрок",
        code:
            `
        //code
        //Не мутирующий

        //1) Базовое разделение
        const fullName = 'Sergey Budyakin';
        const parts = fullName.split(' ');
        console.log(parts); // ['Sergey', 'Budyakin']

        //2) Ограничение количества частей
        const csv = 'one,two,three,four';
        console.log(csv.split(',', 2)); // ['one', 'two']

        //3) Разделение по разным разделителям через regex
        const line = 'apple, banana; cherry | date';
        const fruits = line.split(/[;,|]\\s*/);
        console.log(fruits); // ['apple', 'banana', 'cherry', 'date']

        //4) Практика: разбор query-подобной строки
        const query = 'page=2&sort=price&view=grid';
        const queryObj = Object.fromEntries(
          query.split('&').map((pair) => pair.split('='))
        );
        console.log(queryObj.sort); // price

        //Почему split важен:
        //это быстрый "первый этап" парсинга строки перед map/filter/reduce.
            `
    },
    {
        highlight: ".substr()",
        content: "Возвращает часть строки, начиная с указанного индекса и в течение заданного количества символов",
        code:
            `
        //code
        //Не мутирующий
        //str.substr(start[, length])
        //Метод считается устаревающим, чаще используют slice/substring

        const str = 'Привет, мир!';
        console.log(str.substr(8, 3)); // 'мир'
        console.log(str.substr(8)); // 'мир!'

        //Отрицательный start считается с конца
        console.log(str.substr(-4, 3)); // 'мир'
            `
    },
    {
        highlight: ".substring()",
        isTop: true,
        content: "Возвращает часть строки между двумя индексами",
        code:
            `
        //code
        //Не мутирующий
        //str.substring(startIndex[, endIndex])

        const str = 'Привет, мир!';
        console.log(str.substring(8, 11)); // 'мир'
        console.log(str.substring(8)); // 'мир!'

        //Если start > end, JS поменяет их местами
        console.log(str.substring(11, 8)); // 'мир'

        //Отрицательные значения превращаются в 0
        console.log(str.substring(-3, 6)); // 'Привет'
            `
    },
    {
        highlight: ".toLowerCase()",
        isTop: true,
        content: "Преобразует все символы строки в нижний регистр",
        code:
            `
        //code
        //Не мутирующий

        const str = 'Привет, Мир!';
        console.log(str.toLowerCase()); // 'привет, мир!'

        //Практика: регистронезависимый поиск
        const input = 'JaVaScRiPt';
        console.log(input.toLowerCase() === 'javascript'); // true
            `
    },
    {
        highlight: ".toUpperCase()",
        isTop: true,
        content: "Преобразует все символы строки в верхний регистр",
        code:
            `
        //code
        //Не мутирующий

        const str = 'Привет, мир!';
        console.log(str.toUpperCase()); // 'ПРИВЕТ, МИР!'

        //Практика: нормализация перед сравнением
        const role = 'admin';
        console.log(role.toUpperCase() === 'ADMIN'); // true
            `
    },
    {
        highlight: ".trim()",
        isTop: true,
        content: "Удаляет пробелы с обоих концов строки",
        code:
            `
        //code
        //Не мутирующий
        //Удаляет пробелы/переводы строк/табуляцию по краям

        const str = '   Привет, мир!   ';
        console.log(str.trim()); // 'Привет, мир!'

        const withBreaks = '\\n\\t  text  \\t\\n';
        console.log(withBreaks.trim()); // 'text'

        //Частый кейс: подготовка пользовательского ввода
        const emailInput = '  user@mail.com  ';
        console.log(emailInput.trim()); // 'user@mail.com'
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
            <NotesTitle>String methods (Методы строк)</NotesTitle>
            <Text>
                <S.List>
                    {stringItems.map((item, index) => (
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
