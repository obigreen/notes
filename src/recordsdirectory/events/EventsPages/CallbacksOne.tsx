import React, {useEffect, useRef} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {
    ButtonCopy,
    CodeBlockWrapp, Link,
    Text, BookTitle, Section, NoteBlock, ParagraphTitle, Marker, TextP, NoteUl, NoteLi
} from "../../RecordsDirectory_Style";
import Copy from '../../../accets/img/all/copy.png'


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


export const CallbacksOne = () => {


    return (
        <NoteBlock>
            <Text>
                <BookTitle>Callbacks</BookTitle>
                <ParagraphTitle>onClick, onChange, onBlur</ParagraphTitle>
                <Section>
                    <ParagraphTitle>1 спринт, 3 неделя</ParagraphTitle>
                    <TextP>
                        В JavaScript и TypeScript <Marker>callback</Marker> (колбэк) — это функция, которая передается
                        другой функции в качестве аргумента и вызывается позже, когда произойдет определенное событие
                        или когда другая функция завершит свое выполнение. Колбэки позволяют выполнять асинхронные
                        операции и управлять последовательностью выполнения кода.
                    </TextP>
                    <TextP>
                        В контексте React колбэки часто используются как обработчики событий, такие как <Marker>onClick</Marker>, <Marker>onChange</Marker> и <Marker>onBlur</Marker>. Эти обработчики позволяют реагировать на действия пользователя и обновлять состояние приложения.
                    </TextP>
                    <ParagraphTitle>Понятие Callback-функции</ParagraphTitle>
                    <TextP>
                        <Marker>Callback-функция</Marker> — это функция, переданная в другую функцию в качестве аргумента, которая затем вызывается внутри внешней функции для завершения какого-либо действия. Например:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    function greet(name, callback) {
        console.log(’Привет, ’ + name + ‘!’);
        callback();
    }
    
    function sayGoodbye() {
        console.log(‘До свидания!’);
    }
    
    greet(‘Андрей’, sayGoodbye);
    
    }
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        В этом примере функция <Marker>sayGoodbye</Marker> передается как колбэк в функцию <Marker>greet</Marker> и вызывается после вывода приветствия.
                    </TextP>

                    <ParagraphTitle>События в React</ParagraphTitle>
                    <TextP>
                        В React мы часто используем колбэк-функции как обработчики событий. Основные события включают:
                    </TextP>

                    <NoteUl>
                        <NoteLi><Marker>onClick</Marker> — срабатывает при клике на элемент.</NoteLi>
                        <NoteLi><Marker>onChange</Marker> — срабатывает при изменении значения элемента ввода.</NoteLi>
                        <NoteLi><Marker>onBlur</Marker> — срабатывает, когда элемент теряет фокус.</NoteLi>
                    </NoteUl>

                    <TextP>
                        Эти события позволяют взаимодействовать с пользователем и реагировать на его действия.
                    </TextP>

                    <ParagraphTitle>Использование onClick</ParagraphTitle>
                    <TextP>
                        Событие <Marker>onClick</Marker> используется для обработки кликов по элементам. Например:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    import React from ‘react’;
    
    export const ButtonExample = () => {
        const handleClick = () => {
            alert(‘Кнопка нажата!’);
            
        return (
        <button onClick={handleClick}>Нажми меня</button>
        );
    };
                            `}
                    </HighlightedCodeBlock>
                    <TextP>
                        Здесь функция <Marker>handleClick</Marker> будет вызвана при клике на кнопку.
                    </TextP>

                    <ParagraphTitle>Использование onChange</ParagraphTitle>
                    <TextP>
                        Событие <Marker>onChange</Marker> используется для отслеживания изменений в элементах ввода:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    import React, { useState } from ‘react’;
    
    export const InputExample = () => {
        const [value, setValue] = useState(’’);
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            console.log('Значение изменилось: ', event.target.value);
        };
    
        return (
            <input type="text" value={value} onChange={handleChange} />
        );
                        `}
                    </HighlightedCodeBlock>
                    <TextP>
                        Функция <Marker>handleChange</Marker> обновляет состояние компонента при каждом изменении значения в поле ввода.
                    </TextP>

                    <ParagraphTitle>Использование onBlur</ParagraphTitle>
                    <TextP>
                        Событие <Marker>onBlur</Marker> срабатывает, когда элемент теряет фокус:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    import React from ‘react’;
    
    export const BlurExample = () => {
        const handleBlur = () => {
            console.log(‘Элемент потерял фокус’);
            
        return (
        <input type="text" onBlur={handleBlur} />
        );
    };
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Здесь функция <Marker>handleBlur</Marker> будет вызвана, когда пользователь покинет поле ввода.
                    </TextP>

                    <ParagraphTitle>Комбинирование Колбэков и Событий</ParagraphTitle>
                    <TextP>
                        Колбэки используются как обработчики событий для управления логикой приложения. Вы можете передавать параметры в колбэк-функции и использовать контекст компонента:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    import React from ‘react’;
    
    export const UserActions = () => {
         const deleteUser = (userId: number) => {
         console.log(‘Удаление пользователя с ID:’, userId);
         
         
         const saveUser = (userId: number) => {
            console.log('Сохранение пользователя с ID:', userId);
         };
        
        return (
            <div>
                <button onClick={() => deleteUser(1)}>Удалить пользователя</button>
                <button onClick={() => saveUser(1)}>Сохранить пользователя</button>
            </div>
        );
    };
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Здесь мы используем стрелочные функции внутри обработчиков событий для передачи параметров.
                    </TextP>

                    <ParagraphTitle>Важно знать</ParagraphTitle>
                    <NoteUl>
                        <NoteLi>
                            При использовании событий в React имена обработчиков пишутся в <Marker>camelCase</Marker>, например, <Marker>onClick</Marker>, а не <Marker>onclick</Marker>.
                        </NoteLi>
                        <NoteLi>
                            Никогда не вызывайте функцию-обработчик напрямую в JSX, то есть не пишите <Marker>onClick=&#123;handleClick()&#125;</Marker>, так как это вызовет функцию сразу при рендере компонента.
                        </NoteLi>
                        <NoteLi>
                            Если нужно передать параметры в колбэк, используйте стрелочные функции или метод <Marker>.bind()</Marker>.
                        </NoteLi>
                    </NoteUl>

                    <ParagraphTitle>Асинхронные Колбэки</ParagraphTitle>
                    <TextP>
                        В асинхронных операциях колбэки позволяют выполнять код после завершения операции, например, при запросах к серверу:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    fetch(‘https://api.example.com/data’)
        .then(response => response.json())
        .then(data => {
            console.log(‘Полученные данные:’, data);
        })
        .catch(error => {
            console.error(‘Ошибка:’, error);
    });
                             `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Здесь колбэк-функции в <Marker>.then()</Marker> и <Marker>.catch()</Marker> вызываются после получения ответа от сервера.
                    </TextP>

                    <ParagraphTitle>Проблемы и Решения с Колбэками</ParagraphTitle>
                    <TextP>
                        Использование большого количества вложенных колбэков может привести к так называемому <Marker>"Callback Hell"</Marker>, что усложняет чтение и поддержку кода. Для решения этой проблемы используются:
                    </TextP>

                    <NoteUl>
                        <NoteLi><Marker>Promises</Marker> — объекты, представляющие завершение или неудачу асинхронной операции.</NoteLi>
                        <NoteLi><Marker>async/await</Marker> — синтаксический сахар над промисами, позволяющий писать асинхронный код в синхронном стиле.</NoteLi>
                    </NoteUl>

                    <TextP>
                        Пример использования <Marker>async/await</Marker>:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    async function fetchData() {
        try {
            const response = await fetch(‘https://api.example.com/data’);
            const data = await response.json();
            console.log(‘Полученные данные:’, data);
        } catch (error) {
            console.error(‘Ошибка:’, error);
        }
    }
    fetchData();
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Такой код легче читать и понимать, чем цепочки промисов или вложенные колбэки.
                    </TextP>

                    <ParagraphTitle>Итоги</ParagraphTitle>
                    <TextP>
                        Понимание колбэков и событий в React является фундаментальным для эффективной разработки приложений. Колбэки позволяют управлять потоком выполнения кода и реагировать на действия пользователя, а события <Marker>onClick</Marker>, <Marker>onChange</Marker> и <Marker>onBlur</Marker> являются ключевыми для взаимодействия с элементами интерфейса.
                    </TextP>
                </Section>
            </Text>
        </NoteBlock>
    );
};