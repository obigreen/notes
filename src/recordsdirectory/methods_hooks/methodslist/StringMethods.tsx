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
        content: "Объединяет две или более строк и возвращает новую строку",
        code:
            `
        //code
        let greeting = 'Привет, ';
        let world = 'мир!';
        console.log(greeting.concat(world)); // 'Привет, мир!'
            `
    },
    {
        highlight: ".includes()",
        content: "Определяет, содержит ли строка указанную подстроку",
        code:
            `
        //code
        let str = 'Привет, мир!';
        console.log(str.includes('мир')); // true
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
        let str = 'Привет, мир!';
        console.log(str.split(', ')); // ['Привет', 'мир!']
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



