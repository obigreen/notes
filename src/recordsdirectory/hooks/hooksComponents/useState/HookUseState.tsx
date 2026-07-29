import React, {useEffect, useRef} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {
    ParagraphTitle,
    ButtonCopy,
    CodeBlockWrapp, Link, Marker,
    NoteBlock, NoteLi, NoteUl,
    Text, TextP, BookTitle, Section, VideoContainer
} from "../../../RecordsDirectory_Style";
import Copy from '../../../../accets/img/all/copy.png'
import {Count} from "./Count";
import {TaskManager} from "./TaskManager";
import {RegistrationForm} from "./RegistrationForm";


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


export const HookUseState = () => {


    return (
        <NoteBlock>
            <Text>
                <BookTitle>useState</BookTitle>
                <Section>
                    <TextP>
                        Хук <Marker>useState</Marker> позволяет функциональному React-компоненту хранить состояние между
                        рендерами и запрашивать новый рендер после его обновления. Состояние принадлежит конкретному
                        экземпляру компонента: например, каждый экземпляр переключателя отдельно помнит, включён он
                        или выключен.
                    </TextP>

                    <TextP>Основы <Marker>useState</Marker></TextP>

                    <TextP>
                        <Marker>useState</Marker> принимает начальное значение состояния как аргумент и возвращает
                        массив из двух
                        элементов: <Marker>текущее значение состояния</Marker> и <Marker>функцию для его
                        обновления</Marker>. Это позволяет компоненту
                        реагировать на изменения данных и интерактивно меняться без необходимости перезагрузки страницы.
                    </TextP>

                    <TextP>Деструктуризация <Marker>useState</Marker></TextP>

                    <VideoContainer>
                        <iframe src="https://www.youtube.com/embed/wqs3LuU2x3s"
                                title="useState: деструктуризация состояния"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
                    </VideoContainer>

                    <HighlightedCodeBlock>
                        {
                            `
    // Вариант без деструктуризации:
    function StateWithoutDestructuring() {
      const initialTasks: string[] = []
      const result = useState(initialTasks)
      const state = result[0]
      const setState = result[1]
      return <button onClick={() => setState([...state, 'task'])}>{state.length}</button>
    }

    // Эквивалентная форма записи в отдельном примере компонента:
    function StateWithDestructuring() {
      const initialTasks: string[] = []
      const [state, setState] = useState(initialTasks)
      return <button onClick={() => setState([...state, 'task'])}>{state.length}</button>
    }
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
    <button onClick={() => setCount(count + 1)}>
      Нажми на меня
    </button>
                                    `
                                }
                            </HighlightedCodeBlock>

                            Вызов setCount ставит обновление в очередь. React вычислит новое состояние, и обновлённое
                            значение станет доступно компоненту в следующем рендере.
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
                        состояние и вернет обновленное. Setter планирует состояние для следующего рендера, а уже
                        выполняющийся обработчик продолжает видеть snapshot текущего рендера, поэтому несколько
                        зависимых обновлений следует записывать через updater-функции.
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
                        <Marker>Хуки не могут быть вызваны условно</Marker> — хуки следует вызывать на верхнем уровне
                        React-компонента или собственного хука, но не в условных операторах, циклах или вложенных
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
    type Task = {
      id: number;
      text: string;
    };
    type TaskList = Task[];
    let nextTaskId = 1;

    export const TaskManager = () => {
      // Состояние для хранения текущего ввода пользователя (текст задачи)
      const [currentTask, setCurrentTask] = useState('');
      // Состояние для хранения списка всех задач
      const [tasks, setTasks] = useState<TaskList>([]);
      // Функция для обновления состояния при вводе текста пользователем
      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(event.currentTarget.value);
      };
      // Функция для добавления новой задачи в список
      const addTask = () => {
        const normalizedTask = currentTask.trim();
        if (!normalizedTask) return; // Не добавляем пустую строку или одни пробелы
        const newTask: Task = {id: nextTaskId++, text: normalizedTask};
        setTasks(previousTasks => [...previousTasks, newTask]);
        setCurrentTask(''); // Очищаем поле ввода
      };
      return (
        <div>
          <input value={currentTask} onChange={handleInputChange} />
          <button onClick={addTask}>Добавить Задачу</button>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.text}</li>
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

	   type EditableField = Exclude<keyof UserFormState, 'errors'>;

	   export const RegistrationForm = () => {
	        const [formState, setFormState] = useState<UserFormState>(initialFormState);

	        // Служебный объект errors нельзя случайно заменить строкой.
	        const handleInputChange = (field: EditableField, value: string) => {
	            setFormState(previousState => ({
	                ...previousState,
	                [field]: value,
	                errors: {...previousState.errors, [field]: undefined},
	            }));
	        };

	        // Чистая функция валидации не вызывает setState.
	        const validateForm = (state: UserFormState) => {
	            const errors: UserFormState['errors'] = {};

	            if (state.username.trim().length < 3) {
	                errors.username = 'Имя пользователя должно быть не менее 3 символов';
	            }
	            // Упрощённая UX-проверка; сервер валидирует email самостоятельно.
	            if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(state.email.trim())) {
	                errors.email = 'Введите корректный email';
	            }
	            if (state.password.length < 8) {
	                errors.password = 'Пароль должен быть не менее 8 символов';
	            }
	            if (state.confirmPassword !== state.password) {
	                errors.confirmPassword = 'Пароли не совпадают';
	            }
	            return errors;
	        };

	        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	            event.preventDefault();
	            const errors = validateForm(formState);
	            if (Object.keys(errors).length > 0) {
	                setFormState(previousState => ({...previousState, errors}));
	                return;
	            }
	            setFormState(previousState => ({...previousState, errors: {}}));

	            const payload = {
	                username: formState.username.trim(),
	                email: formState.email.trim(),
	                password: formState.password,
	            };
	            console.log('Форма отправлена', payload);
	        };
    
        return (
            <form onSubmit={handleSubmit} noValidate>
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

	                <div>
	                    <label htmlFor="email">Email:</label>
	                    <input
	                        id="email"
	                        type="email"
	                        value={formState.email}
	                        onChange={(e) => handleInputChange('email', e.target.value)}
	                    />
	                    {formState.errors.email && <p>{formState.errors.email}</p>}
	                </div>

	                <div>
	                    <label htmlFor="password">Пароль:</label>
	                    <input
	                        id="password"
	                        type="password"
	                        value={formState.password}
	                        onChange={(e) => handleInputChange('password', e.target.value)}
	                    />
	                    {formState.errors.password && <p>{formState.errors.password}</p>}
	                </div>

	                <div>
	                    <label htmlFor="confirm-password">Повторите пароль:</label>
	                    <input
	                        id="confirm-password"
	                        type="password"
	                        value={formState.confirmPassword}
	                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
	                    />
	                    {formState.errors.confirmPassword && <p>{formState.errors.confirmPassword}</p>}
	                </div>
    
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
