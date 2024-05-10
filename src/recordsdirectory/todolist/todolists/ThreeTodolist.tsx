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


export const ThreeTodolist = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Todolist. Sprint 1, week 3</BookTitle>

                <Section>
                    <ParagraphTitle>1. Подключение библиотеки <Marker>uuid</Marker> для генерации уникальных
                        id</ParagraphTitle>
                    <TextP>
                        Интегрируем в проект библиотеку uuid, чтобы каждый новый элемент списка (task) имел уникальный
                        идентификатор.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    import { v1 } from 'uuid';
    
    // меняем id на fuction v1()
    const [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false}
    ]);
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>2. Обновление типа данных id</ParagraphTitle>
                    <TextP>
                        Меняем тип данных
                        для <Marker>id</Marker> с <Marker>number</Marker> на <Marker>string</Marker>, так как
                        функция <Marker>v1()</Marker> возвращает строковое представление <Marker>id</Marker>.
                    </TextP>
                    <TextP>Пример:</TextP>
                    <TextP><Marker>fb651bd3-0ebd-11ef-9820-bf83cf1af415</Marker></TextP>


                    <TextP>Для проверки id используем console.log:</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    console.log(typeof(v1())); // "string"
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>3. Создание function <Marker>addTask</Marker> для добавления task</ParagraphTitle>

                    <TextP>
                        Определяем function <Marker>addTask</Marker>, которая принимает название task и добавляет её в
                        список с уникальным <Marker>id</Marker> и стандартным статусом <Marker>false</Marker> для не
                        выполненных задач.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const addTask = (title: string) => {
        const newTask = {
            id: v1(), 
            title: title, 
            isDone: false
        };
        
        setTasks(prevTasks => [...prevTasks, newTask]);
    }
            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>3. Создание функции <Marker>addTask</Marker> для добавления задачи</ParagraphTitle>

                    <TextP>
                        Функция <Marker>addTask</Marker> позволяет добавить новую task в список tasks. Она принимает как
                        аргумент,
                        название task <Marker>title</Marker>, создаёт object task с новым уникальным
                        идентификатором, полученным с помощью function <Marker>v1()</Marker> из
                        библиотеки <Marker>uuid</Marker>, и устанавливает её статус как невыполненная
                        <Marker>false</Marker>.
                    </TextP>

                    <TextP>
                        Function <Marker></Marker>setTasks обновляет состояние списка tasks, возвращая новый array
                        tasks, состоящий
                        из <Marker>предыдущего состояния списка tasks <Marker>prevTasks</Marker></Marker> и <Marker>только
                        что созданной task <Marker>newTask</Marker></Marker>.
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
const addTask = (title: string) => {
    const newTask = {
        id: v1(), // Генерация уникального идентификатора для каждой новой задачи
        title: title, // Название задачи из входного параметра
        isDone: false // Статус задачи по умолчанию - невыполнена
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
}
                        `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>4. Добавление function <Marker>addTask</Marker> в component <Marker>Todolist</Marker></ParagraphTitle>

                    <TextP>Fuction <Marker>addTask</Marker> передается в compnent <Marker>Todolist</Marker> для
                        обработки действий пользователя по добавлению новых task.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    <Todolist
        // title={todolistTitle}
        // tasks={taskForTodolist}
        // removeTask={removeTask}
        // changeFilter={changeFilter}
        addTask={addTask}
    />
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>5. Типизация props в component <Marker>Todolist</Marker></ParagraphTitle>
                    <TextP>Указываем type данных props в component <Marker>Todolist</Marker>, для предотвращения
                        ошибок во время разработки и выполнения кода.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    type PropsType = {
        // title: string;
        // tasks: TaskType[];
        addTask: (title: string) => void;
        // removeTask: (taskId: string) => void;
        // changeFilter: (filter: FilterValuesType) => void;
    };
            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>6. Добавление обработчика событий к component Button с <Marker>input</Marker> в
                        component <Marker>Todolist</Marker></ParagraphTitle>


                    <TextP>Реализация обработчика событий для кнопки, вызывающей function
                        <Marker>callback</Marker> <Marker>addTask</Marker>, для внесения новой task в список.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    <div>
        <input />
        <Button title={"+"} onClick={() => {addTask("Новая задача")}} />
    </div>
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

            </Text>
        </NoteBlock>
    );
};

