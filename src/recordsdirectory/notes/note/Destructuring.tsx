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


export const Destructuring = () => {


    return (
        <NoteBlock>
            <Text>
                <BookTitle>Destructuring</BookTitle>
                <ParagraphTitle>Деструктурирующее присваивание</ParagraphTitle>
                <Section>
                    <ParagraphTitle>1 спринт, 3 неделя</ParagraphTitle>
                    <TextP>
                        <Marker>Деструктурирующее присваивание</Marker> — это удобный синтаксис в JavaScript и TypeScript, позволяющий извлекать значения из массивов и объектов и присваивать их переменным более лаконичным способом.
                    </TextP>
                    <ParagraphTitle>Деструктуризация массивов</ParagraphTitle>
                    <TextP>
                        Позволяет извлекать элементы массива и присваивать их переменным:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const numbers = [1, 2, 3];
    const [a, b, c] = numbers;
    
    console.log(a); // 1
    console.log(b); // 2
    console.log(c); // 3
    
    //Здесь элементы массива numbers присваиваются переменным a, b и c соответственно.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Деструктуризация объектов</ParagraphTitle>
                    <TextP>
                        Позволяет извлекать значения свойств объекта и присваивать их переменным с тем же именем:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const user = {
    name: ‘Alice’,
    age: 25
    };
    
    const { name, age } = user;
    
    console.log(name); // ‘Alice’
    console.log(age); // 25
    
    
    //Значения свойств name и age объекта user присваиваются переменным с такими же именами.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Переименование переменных</ParagraphTitle>
                    <TextP>
                        Можно присваивать значения свойств переменным с другими именами:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const user = {
    name: ‘Bob’,
    age: 30
    };
    
    const { name: userName, age: userAge } = user;
    
    console.log(userName); // ‘Bob’
    console.log(userAge); // 30
    
    
    //Здесь свойства name и age присваиваются переменным userName и userAge.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Значения по умолчанию</ParagraphTitle>
                    <TextP>
                        Можно задавать значения по умолчанию для переменных:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const user = {
    name: ‘Carol’
    };
    
    const { name, age = 20 } = user;
    
    console.log(name); // ‘Carol’
    console.log(age); // 20
    
    
    //Переменная age получит значение 20, так как в объекте user отсутствует свойство age.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Вложенная деструктуризация</ParagraphTitle>
                    <TextP>
                        Можно деструктурировать вложенные объекты и массивы:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const user = {
    name: ‘Dave’,
    address: {
    city: ‘New York’,
    zip: 10001
    }
    };
    
    const {
    name,
    address: { city, zip }
    } = user;
    
    console.log(name); // ‘Dave’
    console.log(city); // ‘New York’
    console.log(zip); // 10001
    
    
    //Значения из вложенного объекта address присваиваются переменным city и zip.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Пропуск элементов массива</ParagraphTitle>
                    <TextP>
                        Можно пропускать ненужные элементы массива:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const colors = [‘red’, ‘green’, ‘blue’];
    
    const [ , , thirdColor ] = colors;
    
    console.log(thirdColor); // ‘blue’
    
    
    Здесь мы извлекаем только третий элемент массива colors.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Остаточные параметры</ParagraphTitle>
                    <TextP>
                        Используя оператор <Marker>...</Marker>, можно собирать остаточные элементы:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const numbers = [1, 2, 3, 4, 5];
    
    const [first, …rest] = numbers;
    
    console.log(first); // 1
    console.log(rest); // [2, 3, 4, 5]
    
    
    Переменная rest содержит массив из оставшихся элементов.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Деструктуризация в функциях</ParagraphTitle>
                    <TextP>
                        Можно деструктурировать параметры функций:
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    function greet({ name, age }) {
    console.log(\`Привет, &#36;&#123;name&#125;! Тебе &#36;&#123;age&#125; лет.\`);
    }
    
    const user = {
    name: ‘Eve’,
    age: 22
    };
    
    greet(user); // ‘Привет, Eve! Тебе 22 лет.’
    
    
    Функция greet деструктурирует объект прямо в параметрах.
        `
                        }
                    </HighlightedCodeBlock>
                    <ParagraphTitle>Итоги</ParagraphTitle>
                    <TextP>
                        Деструктурирующее присваивание упрощает работу с данными, делая код более понятным и удобным для чтения. Оно помогает быстро извлекать необходимые значения и улучшает структуру вашего кода.
                    </TextP>
                </Section>
            </Text>
        </NoteBlock>
    );
};