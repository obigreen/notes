import React, {useEffect, useRef, ChangeEvent, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import Modal from 'react-modal';
import {
    ParagraphTitle,
    ButtonCopy,
    CodeBlockWrapp, Link, Marker,
    NoteBlock, NoteLi, NoteUl,
    Text,
    Textarea,
    TextareaWrapper, TextP, BookTitle, Section, ImgWrapp, Img, VideoContainer
} from "../../../RecordsDirectory_Style";
import Copy from '../../../../accets/img/all/copy.png'
import {Count} from "./Count";
import {TaskManager} from "./TaskManager";
import {RegistrationForm} from "./RegistrationForm";


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


export const HookUseState = () => {


    return (
        <NoteBlock>
            <Text>
                <BookTitle>useState</BookTitle>
                <Section>
                    <TextP>
                        Хук <Marker>useState</Marker> в React — это функция, которая позволяет обычным функциям
                        запоминать информацию и
                        <Marker>менять её</Marker>. Представьте, что у вас есть свет в комнате, и вам нужно помнить,
                        включен он или
                        выключен. useState - это как переключатель: он не только помогает запомнить, но и менять
                        состояние света - включить или выключить. Это упрощает создание интерактивных приложений без
                        сложного программирования.
                    </TextP>

                    <TextP>Основы <Marker>useState</Marker></TextP>

                    <TextP>
                        <Marker></Marker>useState принимает начальное значение состояния как аргумент и возвращает
                        массив из двух
                        элементов: <Marker>текущее значение состояния</Marker> и <Marker>функцию для его
                        обновления</Marker>. Это позволяет компоненту
                        реагировать на изменения данных и интерактивно меняться без необходимости перезагрузки страницы.
                    </TextP>

                    <TextP>Деструктуризация <Marker>useState</Marker></TextP>

                    <VideoContainer>
                        <iframe src="https://www.youtube.com/embed/wqs3LuU2x3s"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
                    </VideoContainer>

                    <HighlightedCodeBlock>
                        {
                            `
    const result = useState(tasks)
    const state = result[0]
    const setState = result[1]

    const [state, setState] = useState(tasks)
                            `
                        }
                    </HighlightedCodeBlock>


                    <HighlightedCodeBlock>
                        {
                            `
    function Counter() {
      // Инициализируем хук useState начальным значением счетчика, равным 0
      const [count, setCount] = useState(0);
    
      return (
        <div>
          <p>Вы нажали {count} раз</p>
          <button onClick={() => setCount(count + 1)}>
            Нажми на меня
          </button>
        </div>
      );
    }
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP><Marker>demo</Marker></TextP>
                    <Section>
                        <Count/>
                    </Section>


                    <ParagraphTitle>Разбор кода</ParagraphTitle>
                    <TextP><Marker>const [count, setCount] = useState(0);</Marker></TextP>
                    <NoteUl>
                        <NoteLi>
                            В этой строке мы вызываем <Marker>useState</Marker> с начальным значением
                            0. <Marker>useState</Marker> возвращает пару
                            значений, которые мы получаем через <Marker>деструктуризацию массива</Marker>: текущее
                            значение состояния
                            <Marker> (count)</Marker> и функцию для его обновления <Marker>(setCount)</Marker>.
                        </NoteLi>
                        <NoteLi>
                            В JSX мы используем count для отображения текущего значения счетчика:
                        </NoteLi>
                        <HighlightedCodeBlock>
                            {
                                `
    <p>Вы нажали {count} раз</p>  
                                `
                            }
                        </HighlightedCodeBlock>
                        <NoteLi>
                            Функция для обновления состояния (setCount) вызывается, когда пользователь нажимает на
                            кнопку. Это делается через атрибут onClick кнопки:
                            <HighlightedCodeBlock>
                                {
                                    `
    onClick={() => setCount(count + 1)}
                                    `
                                }
                            </HighlightedCodeBlock>

                            Когда функция setCount вызывается, она увеличивает значение счетчика на 1.
                        </NoteLi>
                    </NoteUl>

                    <TextP>
                        <Marker>Принципы работы</Marker>
                    </TextP>

                    <TextP>
                        <Marker>1 Независимость состояний</Marker> - Каждый вызов useState отвечает за свою "часть"
                        состояния компонента. Это означает, что можно использовать несколько useState в одном компоненте
                        для разных переменных состояния.
                    </TextP>
                    <TextP>
                        <Marker>Функциональные обновления</Marker> - Если новое состояние зависит от предыдущего,
                        useState позволяет передавать в функцию обновления другую функцию, которая получит текущее
                        состояние и вернет обновленное.
                    </TextP>
                    <TextP>Пример:</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
   setCount(prevCount => prevCount + 1);
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP>
                        <Marker>Хуки не могут быть вызваны условно</Marker> - Хуки следует вызывать на верхнем уровне
                        функционального компонента или других хуков, но не в условных операторах, циклах или вложенных
                        функциях.
                    </TextP>

                    <TextP>
                        <Marker>Заключение</Marker>
                    </TextP>

                    <TextP>
                        <Marker>useState</Marker> - это мощный и гибкий инструмент для управления состоянием в
                        функциональных компонентах React. Он позволяет компонентам отвечать на пользовательский ввод,
                        изменения данных и другие события без необходимости перезагрузки страницы, обеспечивая
                        интерактивность и динамичность в приложениях.
                    </TextP>

                    <TextP>Усложненный пример:</TextP>
                    <HighlightedCodeBlock>
                        {
                            `
   type Task = string;
   type TaskList = Task[];
   
   export const TaskManager = () => {
        // Состояние для хранения текущего ввода пользователя (текст задачи)
        const [currentTask, setCurrentTask] = useState<Task>('');
        // Состояние для хранения списка всех задач
        const [tasks, setTasks] = useState<TaskList>([]);
        // Функция для обновления состояния при вводе текста пользователем
        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            setCurrentTask(event.currentTarget.value);
        };
        // Функция для добавления новой задачи в список
        const addTask = () => {
            if (!currentTask) return; // Не добавляем пустую задачу
            setTasks([...tasks, currentTask]); // Добавляем текущую задачу в список
            setCurrentTask(''); // Очищаем поле ввода
        };
        return (
            <div>
                <input value={currentTask} onChange={handleInputChange} />
                <button onClick={addTask}>Добавить Задачу</button>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>
        );
   }
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP><Marker>demo</Marker></TextP>
                    <Section>
                        <TaskManager/>
                    </Section>



                    <ParagraphTitle>!Продвинутый пример!</ParagraphTitle>

                    <HighlightedCodeBlock>
                        {
                            `
    // Определение типов для элементов формы
   interface UserFormState {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        errors: {
            username?: string;
            email?: string;
            password?: string;
            confirmPassword?: string;
        };
   }
    
   const initialFormState: UserFormState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
   };
    
   export const RegistrationForm = () => {
        const [formState, setFormState] = useState<UserFormState>(initialFormState);
    
        // Универсальная функция для обновления состояний любого поля формы
        const handleInputChange = (field: keyof UserFormState, value: string) => {
            setFormState({
                ...formState,
                [field]: value,
            });
        };
    
        // Функция для проверки корректности введённых данных
        const validateForm = () => {
            let errors: UserFormState['errors'] = {};
    
            if (formState.username.length < 3) {
                errors.username = 'Имя пользователя должно быть не менее 3 символов';
            }
            // Проверки почты, паролей и т.д.
            // ...
    
            setFormState({
                ...formState,
                errors: errors,
            });
    
            return Object.keys(errors).length === 0;
        };
    
        // Функция, вызываемая при отправке формы
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // Вызов функции валидации
            if (validateForm()) {
                console.log('Форма отправлена', formState);
                // Здесь могла быть отправка данных на сервер...
            }
        };
    
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        type="text"
                        value={formState.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                    {formState.errors.username && <p>{formState.errors.username}</p>}
                </div>
    
                {/* Поля для email, password и confirmPassword со схожими проверками */}
                {/* ... */}
    
                <button type="submit">Зарегистрироваться</button>
            </form>
        );
   };
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP><Marker>demo</Marker></TextP>
                    <Section>
                        <RegistrationForm/>
                    </Section>
                </Section>

                <Link target={"_blank"}
                      href="https://react.dev/learn/referencing-values-with-refs#differences-between-refs-and-state">Разница
                    между refs and state</Link>


            </Text>
        </NoteBlock>
   );
};

