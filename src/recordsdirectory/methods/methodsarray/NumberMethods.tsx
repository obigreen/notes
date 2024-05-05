import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    numberItems?: Array<{
        highlight: string;
        content: string;
        code: string;
    }>;
};

export const numberItems = [
    {
        highlight: ".toFixed()",
        content: "Форматирует число, используя запись с фиксированной запятой",
        code:
            `
        //code
        let num = 10.12345;
        console.log(num.toFixed(2)); // '10.12'
            `
    },
    {
        highlight: ".toPrecision()",
        content: "Возвращает строковое представление числа в указанной точности",
        code:
            `
        //code
        let num = 10.12345;
        console.log(num.toPrecision(3)); // '10.1'
            `
    },
    {
        highlight: ".toString()",
        content: "Возвращает строковое представление указанного объекта. Метод toString() объекта Number возвращает строку, представляющую указанное число",
        code:
            `
        //code
        let num = 123;
        console.log(num.toString()); // '123'
            `
    },
    {
        highlight: ".valueOf()",
        content: "Возвращает примитивное значение указанного объекта. Метод valueOf() объекта Number возвращает примитивное значение объекта Number как число",
        code:
            `
        //code
        let num = new Number(123);
        console.log(num.valueOf()); // 123
            `
    }
];



export const NumberMethods: React.FC<MethodProps> = ({numberItems = []}) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Method Number</NotesTitle>
            <Text>
                <S.List>
                    {numberItems.map((item, index) => (
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



