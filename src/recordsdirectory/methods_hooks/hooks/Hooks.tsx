import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    hooksItems?: Array<{
        highlight: string;
        content: string;
        code: string;
    }>;
};


export const hooksItems = [
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
];


export const Hooks: React.FC<MethodProps> = ({hooksItems = []}) => {
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
                    {hooksItems.map((item, index) => (
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



