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
import Copy from '../../../accets/img/samuraifastimg/copy.png'
import KTwoApp from "./practice/onepractice/sprint2week2/KTwoApp";

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


export const TwoTodolist: FC = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Todolist. Sprint 1, week 2</BookTitle>

                <Section>
                    <ParagraphTitle>1. Добавляем обработку события по клику</ParagraphTitle>
                    <TextP>
                        Мы добавляем кнопку с обработчиком клика в JSX коде. Каждая кнопка при нажатии будет
                        активировать функцию удаления задачи.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    <Button onClick={() => {}} title={"x"}/>
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>2. Создаем функцию removeTask в компоненте App</ParagraphTitle>
                    <TextP>
                        Создаем функцию <Marker>removeTask</Marker>, которая будет принимать <Marker>taskId</Marker> и
                        удалять задачу с этим идентификатором.
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    const removeTask = (taskId: number) => {// Функция будет реализована позже}
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP>Затем, в компоненте <Marker>App</Marker> мы передаем эту функцию
                        в <Marker>Todolist</Marker> как пропс:
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    <Todolist title={"What to learn"} tasks={tasks} removeTask={removeTask}/>
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP>И используем эту функцию внутри каждой кнопки, передавая текущий <Marker>id</Marker> задачи:</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    <Button onClick={() => {removeTask(t.id)}} title={"x"}/>
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>3. Выносим обработчик события</ParagraphTitle>
                    <TextP>Мы выносим обработчик для удаления задачи в отдельную функцию для лучшей читаемости.</TextP>
                    {/*plaintext*/}
                    <HighlightedCodeBlock>
                        {
                            `
    {tasks.map(t => {const onClickRemoveTaskHandler = () => {removeTask(t.id);}
    
    return (
      <li key={t.id}>
        <input type='checkbox' checked={t.isDone}/>
        <span>{t.title}</span>
        <Button onClick={onClickRemoveTaskHandler} title={"x"}/>
      </li>
    )
    })}
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>4. Определение имени параметров при типизации</ParagraphTitle>
                    <TextP>
                        Имя параметров функций обратного вызова (callback) может быть любым. Пишите так, как вам кажется
                        логичнее и понятнее.
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    type PropsType = {removeTask: (id: number) => void; // Например, использование 'id' вместо 'taskId' или 'value'.}
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>


                <Section>
                    <ParagraphTitle>5. Переименовываем переменную в let</ParagraphTitle>
                    <TextP>
                        Объявляем переменную с задачами с использованием <Marker>let</Marker>, так как мы будем изменять
                        её значение.
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    let tasks = [ /... список задач .../ ];
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>6. Использование хука useState</ParagraphTitle>
                    <TextP>
                        Мы используем хук <Marker>useState</Marker> для создания локального стейта и его обновления, что
                        позволит перерисовать компонент с новыми данными после удаления задачи.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const [tasks, setTasks] = useState([ /... начальный список задач .../ ]);
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Обновляем функцию <Marker>removeTask</Marker>, используя новый
                        стейт:
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const removeTask = (taskId: number) => {setTasks(tasks.filter(task => task.id !== taskId));}
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>7. Рефакторинг компонента Button</ParagraphTitle>
                    <TextP>Стандартизируем <Marker>props</Marker> и поведение
                        компонента <Marker>Button</Marker>.</TextP>


                    <HighlightedCodeBlock>
                        {
                            `
    type ButtonPropsType = {
        title: string;
        onClick: () => void;};
    
    export const Button = ({ title, onClick }: ButtonPropsType) => {
        return <button onClick={onClick}>{title}</button>;};
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <KTwoApp/>
                </Section>
            </Text>
        </NoteBlock>
    );
};


// ===========================================================================detals
// <Marker></Marker>
// <Link target={"_blank"} href="#"></Link>

// <BookTitle></BookTitle>
// <ParagraphTitle></ParagraphTitle>
// <TextP></TextP>
//
// <NoteUl>
//     <NoteLi></NoteLi>
//     <NoteLi></NoteLi>
//     <NoteLi></NoteLi>
// </NoteUl>

// <TextareaWrapper>
//     <TextareaWithStorage id=" " />
// </TextareaWrapper>

// <HighlightedCodeBlock>
//     {
//         `
//
//         `
//     }
// </HighlightedCodeBlock>


// <VideoContainer>
//     <iframe src="https://www.youtube.com/embed/84wKkCVqEnk"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
// </VideoContainer>
