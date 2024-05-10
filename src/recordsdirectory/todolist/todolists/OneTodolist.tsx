import React, {useEffect, useRef, FC, ChangeEvent, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {
    ParagraphTitle,
    ButtonCopy,
    CodeBlockWrapp, Link, Marker,
    NoteBlock, NoteLi, NoteUl,
    Text,
    Textarea,
    TextareaWrapper, TextP, BookTitle, Section
} from "../../RecordsDirectory_Style";
import Copy from '../../../accets/img/all/copy.png'

//type for texteria
type TextareaWithStorageProps = {
    id: string;
};

//type for code
interface HighlightedCodeBlockProps {
    children: string;
}

// ---------------------------------------------------------------------------------------
// code block + copy button
const HighlightedCodeBlock: FC<HighlightedCodeBlockProps> = ({children}) => {


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

//save texteria
const useTextareaStorage = (id: string): [string, (value: string) => void] => {
    const localStorageKey = `textareaContent_${id}`;
    const [value, setValue] = useState<string>(() => {
        return localStorage.getItem(localStorageKey) || '';
    });
    const setStoredValue = (newValue: string) => {
        setValue(newValue);
        localStorage.setItem(localStorageKey, newValue);
    };
    return [value, setStoredValue];
};
const TextareaWithStorage = ({id}: TextareaWithStorageProps) => {
    const [textValue, setTextValue] = useTextareaStorage(id);
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(event.target.value);
    };
    return (
        <TextareaWrapper>
            <Textarea value={textValue} onChange={handleTextChange}/>
        </TextareaWrapper>
    );
};
// ---------------------------------------------------------------------------------------


export const OneTodolist: FC = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Todolist. Sprint 1, week 1</BookTitle>
                <Section>
                    <ParagraphTitle>1. Создание component Todolist</ParagraphTitle>
                    <TextP>Выносим component Todolist в отдельный файл <Marker>Todolist.tsx</Marker></TextP>
                </Section>

                <Section>
                    <ParagraphTitle>2. Передача через props</ParagraphTitle>
                    <TextP>Передаём заголовок в component Todolist через <Marker>props</Marker>. Передача данных
                        осуществляется при использовании component.</TextP>
                    <TextP><Marker>В component App:</Marker></TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    function App() {
      return (
        <div className={'App'}>
          <Todolist title={"What to learn"}/>
        </div>
      );
    }
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>3. Array tasks</ParagraphTitle>
                    <TextP>Объявляем array с tasks и type его для использования в component Todolist.</TextP>
                    <TextP><Marker>В component App:</Marker></TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    type TaskType = {
      id: number;
      title: string;
      isDone: boolean;
    }
    // Массив задач
    const tasks: TaskType[] = [
      // Здесь примеры объектов задач
    ];
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>4. Передача task в Todolist</ParagraphTitle>
                    <TextP>Передаем array tasks в component Todolist и обновляем тип PropsType для соответствия
                        props.</TextP>
                    <TextP><Marker>В component Todolist:</Marker></TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    type PropsType = {
      title: string;
      tasks: TaskType[];
    }
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>5. Использование map и условный рендеринг</ParagraphTitle>
                    <TextP>Используем method array <Marker>.map</Marker> для отображения списка tasks и <Marker>тернарный
                        оператор</Marker> для условного рендеринга пустого сообщения.</TextP>
                    <TextP><Marker>В component Todolist:</Marker></TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    {
      tasks.length === 0 ? 
      (<p>No Tasks</p>) : 
      (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input type='checkbox' checked={task.isDone} />
              <span>{task.title}</span>
              // Здесь можно добавить кнопку
            </li>
          ))}
        </ul>
      )
    }
                    `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>6. Выносим кнопку в отдельный component</ParagraphTitle>
                    <TextP>Создаем component <Marker>Button</Marker> для повторного использования по всему
                        приложению.</TextP>
                    <TextP><Marker>В отдельном файле Button.tsx:</Marker></TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    type ButtonPropsType = {
      title: string;
      // Можно добавить другие пропсы и обработчики событий
    }
    
    export const Button = ({ title }: ButtonPropsType) => {
      return <button>{title}</button>;
    };
      `
                        }
                    </HighlightedCodeBlock>
                </Section>
            </Text>
        </NoteBlock>
    );
};









