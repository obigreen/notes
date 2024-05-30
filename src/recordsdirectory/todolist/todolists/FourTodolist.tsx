import React, {useEffect, useRef, ChangeEvent, useState} from 'react';
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


export const FourTodolist = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Todolist. Sprint 1, week 4</BookTitle>

                <Section>
                    <ParagraphTitle>1. Реализация функции изменения статуса задачи в Todolist
                        <Marker>changeTaskStatus</Marker></ParagraphTitle>
                    <TextP>Создание функции <Marker>changeTaskStatus</Marker> для обновления статуса выполнения задач на
                        основе значения checkbox.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t);
        setTasks(nextState);
    };
    
    
    
    // !!это первый простой, но код будет лучше (этот плох тем что изменяет объект и не копирует)!!
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const taskForUpdate: TaskType | undefined = tasks.find(t => t.id === taskId)
        if (taskForUpdate) {
            taskForUpdate.isDone = !taskForUpdate.isDone
        }
        setTasks([...tasks])
    }
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>2. Передача функции <Marker>changeTaskStatus</Marker> в
                        компонент <Marker>Todolist</Marker></ParagraphTitle>
                    <TextP>Интеграция функции <Marker>changeTaskStatus</Marker> в
                        компонент <Marker>Todolist</Marker> через props.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    <div className={'App'}>
        <Todolist title={todolistTitle}
                  tasks={tasks}
                  removeTask={removeTask}
                  addTask={addTask}
                
                  changeTaskStatus={changeTaskStatus}/>
    </div>
    
    // Типы в todolist
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void   
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>3. Обработка изменения checkbox</ParagraphTitle>
                    <TextP>Добавление и обработка изменения элемента <Marker>input type='checkbox'</Marker> для каждой
                        задачи.</TextP>

                    <TextP>Необходимо повесить обработчик события на изменения input.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)                     
    // более длинная версия!!!!
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue)
    }      
    
                            
    <input type='checkbox'
           checked={t.isDone}
           onChange={changeTaskStatusHandler}/>
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP><Marker>Результат. Значение checkbox при клике меняется на противоположное</Marker></TextP>
                </Section>

                <Section>
                    <ParagraphTitle>4. Улучшение пользовательской валидации инпута</ParagraphTitle>
                    <TextP>Используем метод <Marker>trim()</Marker> для функции <Marker>addTaskHandler</Marker>, чтобы
                        предотвратить добавление задач с пустым именем.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const addTaskHandler = () => {
      if (taskTitle.trim() !== '') {
        addTask(taskTitle.trim())
        setTaskTitle('')
      }
    }
                            `
                        }
                    </HighlightedCodeBlock>
                    <Link target={"_blank"}
                          href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/trim">trim()</Link>
                </Section>

                <Section>
                    <ParagraphTitle>5. Визуализация ошибки ввода</ParagraphTitle>
                    <TextP>Добавление стилей для индикации ошибки:</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    .error {
      border: red 1px solid;
    }
    .error-message {
      color: red;
    }
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>Определение состояния ошибки <Marker>error</Marker> и его обновление при неудачном
                        вводе:</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const [error, setError] = useState<string | null>(null);
    
    const addTaskHandler = () => {
      if (taskTitle.trim() !== '') {
        addTask(taskTitle.trim())
        setTaskTitle('')
      } else {
        setError('Title is required')
      }
    }
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>Добавляем класс с ошибкой к инпуту при состоянии ошибки <Marker>error</Marker> и отображаем
                        сообщение:</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    <input value={taskTitle}
           onChange={changeTaskTitleHandler}
           onKeyUp={addTaskOnKeyUpHandler}
           
           className={error ? 'task-input-error' : ""}/>
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>6. Обнуление состояния ошибки при следующем вводе в инпут</ParagraphTitle>
                    <TextP>Реализация функции <Marker>addTaskOnKeyUpHandler</Marker> для очистки состояния ошибки при
                        вводе в инпут:</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      setError(null)
      if (event.key === 'Enter') {
        addTaskHandler()
      }
    }
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>


                <Section>
                    <ParagraphTitle>7. Прокачиваем логику отображения подсказок при вводе</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {
                            `
        //тут изначально для disabled                
        const isAddBtnDis = taskTitle.length === 0 || taskTitle.trim().length >= 15                 
                            
        <div>
            <input value={taskTitle}
                   onChange={changeTaskTitleHandler}
                   onKeyUp={addTaskOnKeyUpHandler}
                   className={error ? 'task-input-error' : ""}/>

            <Button title={"+"}
                    onClick={addTaskHandler}
                    disabled={isAddBtnDis}/>

            {/*{error ? <div>{error}</div> : ''}*/}
            {error && <div style={{color: "red"}}>{error}</div>}
            {taskTitle.trim().length > 10 && taskTitle.length < 15 && <div>recommended 10 characters</div>}
            {taskTitle.trim().length >= 15 && <div style={{color: "red"}}>Title is too long</div>}
        </div>
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>


                <Section>
                    <ParagraphTitle>1. Визуальное выделение активной кнопки фильтрации
                        <Marker>стилизация кнопок</Marker></ParagraphTitle>
                    <TextP>Обеспечение визуальной обратной связи для пользователя путем подсвечивания активных кнопок фильтра. Добавление стиля <Marker>.btn-filter-active</Marker> в целях выделения активной кнопки.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    .btn-filter-active {
        background-color: aquamarine;
    }

    <Button title={"All"} onClick={() => changeFilter('All')} classes={filter === "All" ? "btn-filter-active" : ""}/>
                             `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>2. Доработка компонента <Marker>Button.tsx</Marker></ParagraphTitle>
                    <TextP>Модификация универсального компонента <Marker>Button</Marker> для принятия дополнительных стилей через пропс <Marker>classes</Marker>.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    return <button onClick={onClickHandler} disabled={disabled} className={classes}>{title}</button>
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>3. Стили для выполненных задач
                        <Marker>стилизация задач</Marker></ParagraphTitle>
                    <TextP>Введение стиля <Marker>.task-done</Marker> для отображения выполненных задач с уменьшенной прозрачностью и зачеркиванием.</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
    .task-done {
        opacity: 0.5;
        text-decoration: line-through;
    }
    
    <li key={t.id}>
        <input type='checkbox' checked={t.isDone} onChange={changeTaskStatusHandler}/>
        <span className={t.isDone ? "task-done" : "task"}>{t.title}</span>
        <Button onClick={onClickRemoveTaskHandler} title={"x"}/>
    </li>
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>
            </Text>
        </NoteBlock>
    );
};

