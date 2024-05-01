import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    dateItems?: Array<{
        highlight: string;
        content: string;
        code: string;
    }>;
};

export const dateItems = [
    {
        highlight: "getDate()",
        content: "Возвращает день месяца (от 1 до 31) для указанной даты",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getDate());
        `
    },  
    {
        highlight: "getDay()",
        content: "Возвращает день недели (от 0 до 6) для указанной даты",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getDay());
        `
    },  
    {
        highlight: "getFullYear()",
        content: "Возвращает год (4 цифры для 4-значных годов) указанной даты",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getFullYear());
        `
    },  
    {
        highlight: "getHours()",
        content: "Возвращает час (от 0 до 23) указанной даты и времени",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getHours());
        `
    },  
    {
        highlight: "getMilliseconds()",
        content: "Возвращает миллисекунды (от 0 до 999) указанной даты и времени",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getMilliseconds());
        `
    },  
    {
        highlight: "getMinutes()",
        content: "Возвращает минуты (от 0 до 59) указанной даты и времени",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getMinutes());
        `
    },  
    {
        highlight: "getMonth()",
        content: "Возвращает месяц (от 0 до 11) указанной даты",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getMonth());
        `
    },  
    {
        highlight: "getSeconds()",
        content: "Возвращает секунды (от 0 до 59) указанной даты и времени",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getSeconds());
        `
    },  
    {
        highlight: "getTime()",
        content: "Возвращает числовое значение указанной даты в виде количества миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getTime());
        `
    },  
    {
        highlight: "getTimezoneOffset()",
        content: "Возвращает разницу в минутах между местным временем и Всемирным координированным временем (UTC)",
        code: 
            `
        //code
        let date = new Date();
        console.log(date.getTimezoneOffset());
        `
    },  
    {
        highlight: "setDate()",
        content: "Устанавливает день месяца указанного объекта Date в соответствии с местным временем",
        code: 
            `
        //code
        let date = new Date();
        date.setDate(15);
        console.log(date);
            `
    },
    {
        highlight: "setFullYear()",
        content: "Устанавливает полный год указанного объекта Date в соответствии с местным временем",
        code: 
            `
        //code
        let date = new Date();
        date.setFullYear(2023);
        console.log(date);
            `
    },
    {
        highlight: "setHours()",
        content: "Устанавливает часы указанного объекта Date в соответствии с местным временем",
        code: 
            `
        //code
        let date = new Date();
        date.setHours(10);
        console.log(date);
            `
    },
    {
        highlight: "setMilliseconds()",
        content: "Устанавливает миллисекунды указанного объекта Date в соответствии с местным временем",
        code: 
            `
        //code
        let date = new Date();
        date.setMilliseconds(500);
        console.log(date);
            `
    },
    {
        highlight: "setMinutes()",
        content: "Устанавливает минуты указанного объекта Date в соответствии с местным временем",
        code: 
            `
        //code
        let date = new Date();
        date.setMinutes(30);
        console.log(date);
            `
    },
    {
        highlight: "setMonth()",
        content: "Устанавливает месяц указанного объекта Date в соответствии с местным временем",
        code: 
            `
        //code
        let date = new Date();
        date.setMonth(11); // Декабрь, так как отсчет начинается с 0
        console.log(date);
            `
    },
    {
        highlight: "setSeconds()",
        content: "Устанавливает секунды указанного объекта Date в соответствии с местным временем",
        code: 
            `
        //code
        let date = new Date();
        date.setSeconds(30);
        console.log(date);
            `
    },
    {
        highlight: "setTime()",
        content: "Устанавливает значение объекта Date в количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 UTC",
        code: 
            `
        //code
        let date = new Date();
        date.setTime(0);
        console.log(date);
            `
    }
];




export const DataMethods: React.FC<MethodProps> = ({dateItems = []}) => {
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
                    {dateItems.map((item, index) => (
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



