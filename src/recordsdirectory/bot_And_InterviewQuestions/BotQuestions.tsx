import React, {useEffect, useRef} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import {
    ParagraphTitle,
    ButtonCopy,
    CodeBlockWrapp, Marker,
    NoteBlock, NoteLi, NoteUl,
    Text, TextP, BookTitle, Section
} from "../RecordsDirectory_Style";
import Copy from '../../accets/img/all/copy.png'


//type for code
interface HighlightedCodeBlockProps {
    children: string;
}

// ---------------------------------------------------------------------------------------
// code block + copy button
const HighlightedCodeBlock = ({children}: HighlightedCodeBlockProps) => {
    const codeRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [])
    const handleCopyClick = async () => {
        if (codeRef.current) {
            const range = document.createRange();
            range.selectNodeContents(codeRef.current);

            if (navigator.clipboard) {
                try {
                    const text = range.toString();
                    await navigator.clipboard.writeText(text);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            } else {
                const selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                    document.execCommand('copy');
                    selection.removeAllRanges();
                }
            }
        }
    }
    return (
        <CodeBlockWrapp>
      <pre>
        <code ref={codeRef} className="javascript">
          {children}
        </code>
      </pre>
            <ButtonCopy onClick={handleCopyClick}>
                <img src={Copy} alt="Copy"/>
            </ButtonCopy>
        </CodeBlockWrapp>
    );
};


// ---------------------------------------------------------------------------------------


export const BotQuestions = () => {

    return (
        <NoteBlock>
            <Text>
                <BookTitle>Bot questions</BookTitle>
                {/*Во что Babel превращает JSX?*/}
                <Section>
                    <ParagraphTitle>Во что Babel превращает JSX?</ParagraphTitle>
                    <TextP>
                        <Marker>Babel</Marker>, выступая в роли <Marker></Marker>транспилятора, трансформирует JSX, которая является синтаксическим
                        расширением для JavaScript, предназначенным для описания структуры интерфейса в компонентах
                        React, в
                        обычный JavaScript-код.
                    </TextP>
                    <TextP>
                        Когда вы используете JSX для определения компонентов React, ваш код может выглядеть подобно
                        следующему:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const element = <h1>Hello, world!</h1>;
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Этот код использует JSX для того, чтобы описать, что должно быть отрендерено: в данном случае -
                        HTML-тег h1 с текстом внутри.
                    </TextP>
                    <TextP>
                        <Marker>Babel</Marker> преобразует этот JSX-код в обычные вызовы функций JavaScript и объекты, которые React
                        может понимать. Результат работы Babel будет выглядеть примерно так:
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    const element = React.createElement('h1', null, 'Hello, world!');
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Здесь <Marker>React.createElement</Marker> — это функция из библиотеки React, которая создаёт Виртуальные DOM
                        элементы, которые позже React будет использовать для построения реального DOM.
                    </TextP>
                    <TextP>
                        Основной процесс преобразования JSX в JavaScript с помощью <Marker>Babel</Marker> включает в себя следующие
                        этапы:
                    </TextP>

                    <NoteUl>
                        <NoteLi>
                            <Marker>1. Лексический анализ (Tokenizing)</Marker>: JSX код превращается в список "токенов" или лексем, которые
                            представляют собой атомарные кусочки кода, имеющие смысловое значение.
                        </NoteLi>
                        <NoteLi>
                            <Marker>2. Синтаксический анализ (Parsing)</Marker>: Токены преобразуются в Abstract Syntax Tree (AST),
                            представляющий собой дерево, которое описывает синтаксическую структуру кода.
                        </NoteLi>
                        <NoteLi>
                            <Marker>3. Трансформация (Transforming)</Marker>: AST модифицируется в соответствии с правилами Babel-плагинов,
                            в данном случае - плагин преобразует JSX в вызовы React.createElement.
                        </NoteLi>
                        <NoteLi>
                            <Marker>4. Генерация (Code Generation)</Marker>: Изменённое AST превращается обратно в код JavaScript.
                        </NoteLi>
                    </NoteUl>

                    <TextP>
                        Этот процесс позволяет разработчикам использовать выразительный и лаконичный синтаксис JSX, в то
                        время как в реальности в работе используется обычный JavaScript, совместимый со стандартами
                        <Marker>ECMAScript</Marker>, которые поддерживаются браузерами и другими платформами.
                    </TextP>
                </Section>
            </Text>
        </NoteBlock>
    );
};

