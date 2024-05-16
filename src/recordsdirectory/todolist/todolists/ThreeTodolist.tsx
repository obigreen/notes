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

                    <NoteUl>
                        <NoteLi>
                            <Link target={"_blank"} href="https://www.npmjs.com/package/uuid">uuid</Link>
                        </NoteLi>
                        <NoteLi>
                            <Link target={"_blank"}
                                  href="https://www.npmjs.com/package/@types/uuid">TS types</Link>
                        </NoteLi>
                    </NoteUl>

                </Section>


                <Section>
                    <ParagraphTitle>3. Создание function <Marker>addTask</Marker> для добавления задачи</ParagraphTitle>

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
                    <ParagraphTitle>4. Добавление function <Marker>addTask</Marker> в
                        component <Marker>Todolist</Marker></ParagraphTitle>

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


                    <TextP>
                        Реализация обработчика событий для кнопки, вызывающей function <Marker>callback</Marker>
                        <Marker> addTask</Marker>, для внесения новой task в список.</TextP>
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

                <ParagraphTitle>6. Создание контролируемого <Marker>input</Marker></ParagraphTitle>
                <Section>
                    <ParagraphTitle>Создаем новый локальный state <Marker>taskTitle</Marker> для трекинга значение ввода</ParagraphTitle>
                    <TextP>
                        Это позволяет контролировать содержимое <Marker>input</Marker> полей через React состояние.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const [taskTitle, setTaskTitle] = useState("");
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>
                <Section>
                    <ParagraphTitle>7. Добавляем <Marker>value</Marker> <Marker>input</Marker> полю, присвоив
                        его <Marker>taskTitle</Marker></ParagraphTitle>
                    <TextP>
                        Это гарантирует, что значение <Marker>input</Marker> будет синхронизировано со
                        значением <Marker>taskTitle</Marker>.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    <input value={taskTitle} ...
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>
                <Section>
                    <ParagraphTitle>8. Добавляем
                        event <Marker>onChange</Marker> на <Marker>input</Marker></ParagraphTitle>
                    <TextP>input fixing следующим образом:</TextP>

                    <NoteUl>
                        <NoteLi>повесим на input обработчик события onChange</NoteLi>
                        <NoteLi>onChange принимает callback function, первым параметром которой является object event
                            event</NoteLi>
                        <NoteLi>достаем значение event.currentTarget.value</NoteLi>
                    </NoteUl>

                    <TextP>
                        Введенное значение обновляет <Marker>taskTitle</Marker> через <Marker>setTaskTitle</Marker>.
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value);
    
    <input value={taskTitle}
           onChange={changeTaskTitleHandler} 
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP><Marker>event.currentTarget.value</Marker> получает текст в элементе формы, когда происходит
                        event, такое
                        как ввод текста. <Marker>event</Marker> это events object, <Marker>currentTarget</Marker> это
                        элемент, к которому привязан
                        событийный обработчик, а <Marker>value</Marker> это текст введенный в этот элемент.</TextP>
                </Section>
                <Section>
                    <ParagraphTitle>9. Включение/отключение button и вывод предупреждений</ParagraphTitle>
                    <TextP>
                        Определяем логику для <Marker>disabled</Marker> свойства button, чтобы она становилась
                        неактивной, когда <Marker>taskTitle</Marker> пустой или его длина больше 15 символов.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const isAddBtnDis = taskTitle.length === 0 || taskTitle.length > 15;
    
    <Button title={"+"}
            onClick={addTaskHandler}
            disabled={isAddBtnDis}/>
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Используем тернарный оператор для вывода сообщения пользователю в зависимости от
                        длины <Marker>taskTitle</Marker>.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    {
        taskTitle.length > 15
            ? <div>max 15 characters</div>
            : taskTitle.length > 10 && <div>recommended 10 characters</div>
    }
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>
                <Section>
                    <ParagraphTitle>10. Добавление обработчика <Marker>addTaskHandler</Marker></ParagraphTitle>
                    <TextP>
                        Этот обработчик вызывает <Marker>addTask</Marker>, передавая в него текущее
                        значение <Marker>taskTitle</Marker> (название новой
                        task, <Marker>введенное пользователем</Marker>).
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const addTaskHandler = () => {
        addTask(taskTitle);
        setTaskTitle("");
    }
                            `
                        }
                    </HighlightedCodeBlock>


                </Section>
                <Section>
                    <ParagraphTitle>11. Разные подходы к обработке события <Marker>onKeyUp</Marker></ParagraphTitle>
                    <TextP>a. Условное присвоение обработчика <Marker>addTaskOnkeyUpHandler</Marker></TextP>

                    <TextP>
                        В этом подходе обработчик события <Marker>onKeyUp</Marker> устанавливается только
                        если <Marker>taskTitle</Marker> не пустой. Это
                        снижает ненужные вычисления, но может привести к частым перерисовкам из-за изменения ссылки на
                        function обработчика.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const addTaskOnkeyUpHandler = taskTitle.length === 0
        ? undefined : (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                addTaskHandler()
            }
        };
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP>b. Постоянный обработчик с условием внутри <Marker>addTaskOnKeyUpHandler</Marker>
                    </TextP>

                    <TextP>
                        Обработчик всегда установлен, но действие выполняется только при выполнении условий (нажатие
                        Enter и непустой <Marker>taskTitle</Marker>). Предотвращает потенциальные ререндеринги из-за
                        изменений ссылки на
                        function, но каждое нажатие клавиши теперь вызывает выполнение function обработчика.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskHandler()
        }
    };
                            `
                        }
                    </HighlightedCodeBlock>
                    <Link target={"_blank"}
                          href="https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event">KeyUp</Link>
                    <TextP></TextP>

                </Section>


                <Section>
                    <ParagraphTitle>12. Исправление бага добавления empty tasks</ParagraphTitle>
                    <TextP>
                        Добавление <Marker>setTaskTitle("")</Marker> после
                        успешного добавления task обнуляет <Marker>taskTitle</Marker>.
                    </TextP>
                    <HighlightedCodeBlock>
                        {
                            `
const addTaskHandler = () => {
    if (taskTitle) {
        addTask(taskTitle);
        // добавляем
        setTaskTitle("");
    }
};
            `
                        }
                    </HighlightedCodeBlock>
                </Section>
            </Text>
        </NoteBlock>
    );
};

