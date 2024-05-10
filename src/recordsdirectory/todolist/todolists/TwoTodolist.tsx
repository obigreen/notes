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
import {Todolist} from "../Todolist";
//type for texteria
type TextareaWithStorageProps = {
    id: string;
};

//type for code
type HighlightedCodeBlockProps = {
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


export const TwoTodolist = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Todolist. Sprint 1, week 2</BookTitle>

                <Section>
                    <ParagraphTitle>1. Добавляем обработку события по клику</ParagraphTitle>
                    <TextP>
                        Мы добавляем кнопку с обработчиком клика в JSX коде. Каждая кнопка при нажатии будет
                        активировать function удаления задачи.
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
                    <ParagraphTitle>2. Создаем function removeTask в component App</ParagraphTitle>
                    <TextP>
                        Создаем function <Marker>removeTask</Marker>, которая будет принимать аргумент <Marker>taskId</Marker> и
                        удалять task с этим id.
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    const removeTask = (taskId: number) => {// function будет реализована позже}
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP>Затем, в component <Marker>App</Marker> мы передаем эту function
                        в <Marker>Todolist</Marker> как props:
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    <Todolist title={"What to learn"} tasks={tasks} removeTask={removeTask}/>
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP>И используем эту function внутри каждой кнопки, передавая
                        текущий <Marker>id</Marker> task:</TextP>

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
                    <TextP>Мы выносим обработчик для удаления task в отдельную finction для лучшей читаемости.</TextP>
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
                    <ParagraphTitle>4. Определение имени параметров при type</ParagraphTitle>
                    <TextP>
                        Имя параметров function обратного вызова <Marker>callback</Marker> может быть любым. Пишите так, как вам кажется
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
                        Объявляем переменную с tasks с использованием <Marker>let</Marker>, так как мы будем изменять
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
                        Мы используем хук <Marker>useState</Marker> для создания локального state и его обновления, что
                        позволит перерисовать component с новыми данными после удаления task.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const [tasks, setTasks] = useState([ /... начальный список задач .../ ]);
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Обновляем function <Marker>removeTask</Marker>, используя новый
                        state:
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
                    <ParagraphTitle>7. Рефакторинг component Button</ParagraphTitle>
                    <TextP>Стандартизируем <Marker>props</Marker> и поведение
                        component <Marker>Button</Marker>.</TextP>


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
                    <ParagraphTitle>8. Создание state для фильтрации tasks</ParagraphTitle>
                    <TextP>Начнем с определения state filter с использованием хука useState. Этот state будет хранить
                        текущий выбранный фильтр.</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    export type FilterValuesType = 'All' | 'Active' | 'Completed';
    const [filter, setFilter] = useState<FilterValuesType>('All');
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>9. Так же быстренько выносим Title в переменную, это все data</ParagraphTitle>
                    <TextP>Начнем с определения state filter с использованием хука useState. Этот state будет хранить
                        текущий выбранный фильтр.</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    //data - данные которые гипотетически приходят с backend
    const todolistTitle = "What to learn";
    
    const [tasks, setTasks] = useState([......... array with tasks
    
    
    
     // так теперь приходит title
    return (
        <div className={'App'}>
            <Todolist title={todolistTitle} //... еще подключения
        </div>
    )
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>


                <Section>
                    <ParagraphTitle>9. Определение списка tasks для отображения</ParagraphTitle>
                    <TextP>Сначала мы сохраняем все текущие tasks в переменную taskForTodolist.</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    let taskForTodolist = tasks;
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>10. Фильтрация tasks</ParagraphTitle>
                    <TextP>Мы реализуем логику для отображения tasks в зависимости от выбранного фильтра</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    if (filter === 'Active') {
        taskForTodolist = tasks.filter(task => !task.isDone);
    }
    
    if (filter === 'Completed') {
        taskForTodolist = tasks.filter(task => task.isDone);
    }
                `
                        }
                    </HighlightedCodeBlock>
                    <TextP>Здесь .filter(task =&gt; !task.isDone) возвращает tasks, которые еще не выполнены (активные),
                        а .filter(task =&gt; task.isDone) возвращает tasks, которые выполнены.</TextP>
                </Section>

                <Section>
                    <ParagraphTitle>11. Создание function для смены фильтра</ParagraphTitle>
                    <TextP>Funtion changeFilter реализуем так, чтобы она принимала новый фильтр и устанавливала его в
                        state</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    };
                `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>12. Внедрение фильтра в JSX</ParagraphTitle>
                    <TextP>Модифицируем component App, чтобы он передавал props tasks, removeTask и changeFilter в
                        Todolist.</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    return (
        <div className='App'>
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
                `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>13. Типизация пропсов в Todolist</ParagraphTitle>
                    <TextP>Убедимся, что component Todolist принимает function changeFilter в качестве props</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    export type PropsType = {
        title: string
        tasks: TaskType[]
        removeTask: (taskId: number) => void
        changeFilter: (filter: FilterValuesType) => void
    };
                `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>14. Добавление обработчиков для кнопок фильтрации</ParagraphTitle>
                    <TextP>Добавляем обработчики кликов onClick для изменения фильтра</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    <div>
        <Button title="All" onClick={() => {changeFilter('All')}}/>
        <Button title="Active" onClick={() => {changeFilter('Active')}}/>
        <Button title="Completed" onClick={() => {changeFilter('Completed')}}/>
    </div>
                `
                        }
                    </HighlightedCodeBlock>
                    <TextP>Эти кнопки позволяют пользователю выбирать, какие задачи отображать в списке.</TextP>
                </Section>
            </Text>
        </NoteBlock>
    );
};

