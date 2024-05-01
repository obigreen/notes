import React, {useEffect, useRef, FC, ChangeEvent, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {
    BookTitle,
    ButtonCopy,
    CodeBlockWrapp, Link, Marker,
    NoteBlock, NoteLi, NoteUl, ParagraphTitle,
    Text,
    Textarea,
    TextareaWrapper, TextP
} from "../../RecordsDirectory_Style";
import Copy from '../../../accets/img/samuraifastimg/copy.png'

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
                <BookTitle>Todolist one</BookTitle>
                <ParagraphTitle><Marker>CRUT</Marker> операции</ParagraphTitle>
                <NoteUl>
                    <NoteLi><Marker>Create</Marker> - создание</NoteLi>
                    <NoteLi><Marker>Read</Marker> - чтение</NoteLi>
                    <NoteLi><Marker>Update</Marker> - обновления</NoteLi>
                    <NoteLi><Marker>Delete</Marker> - удаление</NoteLi>
                </NoteUl>
                <ParagraphTitle>Подготовка к занятию</ParagraphTitle>
                <NoteUl>
                    <NoteLi><Marker>1</Marker> Создать проект -
                        <Link target={"_blank"}
                              href="https://create-react-app.dev/docs/adding-typescript/"> React</Link>
                    </NoteLi>
                    <NoteLi><Marker>2</Marker> Установить <Marker>зависимости</Marker></NoteLi>
                    <NoteLi><Marker>3</Marker> Запустить приложение</NoteLi>
                </NoteUl>
                <ParagraphTitle>Создание компонента</ParagraphTitle>
                <TextP>
                    Создаю компонент Todolist.tsx
                </TextP>

                {/*Component Todolist and App*/}
                <HighlightedCodeBlock>
                    {
                        `
// Todolist.tsx
export const Todolist = () => {
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={true} /> <span>HTML&CSS</span>
                </li>
                <li>
                    <input type="checkbox" checked={true} /> <span>JS</span>
                </li>
                <li>
                    <input type="checkbox" checked={false} /> <span>React</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}


// App.tsx
function App() {
  return (
    <div className="App">
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  )
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*Component Todolist and App*/}

                <ParagraphTitle>Именованный и default <Marker>export</Marker></ParagraphTitle>
                <TextP>
                    Для отдельных component <Marker>всегда</Marker> ставим именованный export - <Marker>"export const
                    Component"</Marker>.
                    Для погружения в детали о разницы export для компонента можно почитать тут - <Link target={"_blank"}
                                                                                                       href="https://code-style.it-incubator.io/react/import-export/export">style-guide</Link>
                </TextP>
                <ParagraphTitle>Стрелочная или declaration functions</ParagraphTitle>

                {/*Стрелочная и обычная функция*/}
                <HighlightedCodeBlock>
                    {
                        `
const Todolist = () => {...}

// or

function Todolist() {...}



() => {}
                        `
                    }
                </HighlightedCodeBlock>
                {/*стрелочная и обычная функция*/}

                <ParagraphTitle>props</ParagraphTitle>
                <TextP><Marker><Link target={"_blank"}
                                     href="https://react.dev/learn/passing-props-to-a-component">props</Link></Marker> это
                    объект,
                    свойствами proprs являются атрибуты которые мы передаем.</TextP>
                <TextP>С помощью props начну передавать разные titles для <Marker>Todolist</Marker> так как сейчас у
                    них одно и то же
                    название. <Marker>What to learn</Marker>, этот title находится внутри component и
                    прописан <Marker>хардкодом</Marker>, поэтому при
                    создании новых components, title будет оставаться тот который прописан с самом component.
                    Пропишем title для каждого <Marker>Todolist</Marker>
                </TextP>

                {/*Передаем title через props*/}
                <HighlightedCodeBlock>
                    {
                        `
// Передаем в каждый Todolist свой title                    
function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" />
      <Todolist title="Songs" />
      <Todolist title="Books" />
    </div>
  )
}

// Далее прописываем в Todolist что хотим передать что-то через props + добавляем любой type(пока что), это any
export const Todolist = (props: any) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
            
                код ...
                        `
                    }
                </HighlightedCodeBlock>
                {/*передаем title через props*/}

                <TextP>Новички в TypeScript часто ставят <Marker>везде</Marker> <Marker>any</Marker>, в этом случае
                    теряется
                    смысл от самого <Marker>TypeScript</Marker>
                </TextP>
                <TextP>По результату мы должны получить 3 components todolist с разным title</TextP>
                <ParagraphTitle>Типизация props</ParagraphTitle>
                <TextP>Типизация позволяет следить за тем какой тип данных я передаю, если к примеру я намеренно ошибусь
                    в <Marker>title</Marker>:</TextP>

                {/*Намеренная ошибка в title для наглядности типизации*/}
                <HighlightedCodeBlock>
                    {
                        `
function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" />
      <Todolist tit="Songs" />
      <Todolist titl="Books" />
    </div>
  )
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*Намеренная ошибка в title для наглядности типизации*/}

                <TextP>ошибки не будет так как наш тип <Marker>any</Marker>, но при этом не будут отображаться те
                    titles, в которых title написан с ошибкой</TextP>
                <TextP>Теперь пропишем <Marker>type для title</Marker>, который мы передаем через props</TextP>

                {/*Передаем типы в todolist*/}
                <HighlightedCodeBlock>
                    {
                        `
type PropsType = {
    title: string
}
                        
export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
            
                код ...
                    `
                    }
                </HighlightedCodeBlock>
                {/*Передаем типы в todolist*/}

                <TextP>После того как мы проставили type, если еще раз ошибиться в:</TextP>

                {/*Намеренная ошибка в title для наглядности типизации*/}
                <HighlightedCodeBlock>
                    {
                        `
function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" />
      <Todolist tit="Songs" />
      <Todolist titl="Books" />
    </div>
  )
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*Намеренная ошибка в title для наглядности типизации*/}

                <TextP>то в этот раз уже выскочит ошибка в title</TextP>
                <ParagraphTitle>Деструктурирующие присваивание - <Marker>Деструктуризация</Marker></ParagraphTitle>
                <TextP>Как правило, в компонент приходит много свойств, это приводит к тому что в разметке
                    будет <Marker>много props</Marker></TextP>
                <TextP><Marker>К примеру:</Marker></TextP>

                {/*Пример в котором много props*/}
                <HighlightedCodeBlock>
                    {
                        `
type PropsType = {
  title: string
  subTitle: string
  description: string
  tasks: Task[]
}
 
export const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <h4>{props.subTitle}</h4>
      <p>{props.description}</p>
      <div>{props.tasks.map(t => t.title)}</div>
    </div>
  )
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*Пример в котором много props*/}

                <TextP><Marker>Деструктуризация:</Marker></TextP>

                {/*Деструктуризация - 1*/}
                <HighlightedCodeBlock>
                    {
                        `
export const Todolist = (props: PropsType) => {
  const { title, subTitle, description, tasks } = props
 
  return (
    <div>
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      <div>{tasks.map(t => t.title)}</div>
    </div>
  )
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*Деструктуризация - 1*/}

                <TextP><Marker>Чаще всего делают так:</Marker></TextP>

                {/*Деструктуризация - САМЫЙ ЧАСТЫЙ ВАРИАНТ*/}
                <HighlightedCodeBlock>
                    {
                        `
export const Todolist = ({ title, subTitle, description, tasks }: PropsType) => {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      <div>{tasks.map(t => t.title)}</div>
    </div>
  )
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*Деструктуризация - САМЫЙ ЧАСТЫЙ ВАРИАНТ*/}

                <ParagraphTitle>Type or Interface?</ParagraphTitle>
                <TextP>Основное отличие в том, что <Marker>type</Marker> нельзя повторно открыть для добавления новых
                    свойств а <Marker>interface</Marker> всегда расширяем</TextP>
                <TextP>Подробнее об этом</TextP>
                <NoteUl>
                    <NoteLi><Marker>1</Marker> <Link target={"_blank"}
                                                     href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces">Differences
                        Between Type Aliases and Interfaces</Link></NoteLi>
                    <NoteLi><Marker>2</Marker> <Link target={"_blank"}
                                                     href="https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript">Interfaces
                        vs Types in TypeScript</Link></NoteLi>
                </NoteUl>
                <TextP>type на начальных этапах называем</TextP>
                <NoteUl>
                    <NoteLi><Marker>1</Marker> TodoPropsType</NoteLi>
                    <NoteLi><Marker>2</Marker> UserPropsType</NoteLi>
                </NoteUl>
                <TextP>Далее будет понятнее почему или <Link target={"_blank"}
                                                             href="https://code-style.it-incubator.io/react/naming#36-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-%D1%82%D0%B8%D0%BF%D0%BE%D0%B2-type">style-guide</Link>,
                    главное соблюсти конструкцию <Marker><Marker>N</Marker>ame</Marker> + <Marker><Marker>P</Marker>rops</Marker> + <Marker><Marker>T</Marker>ype</Marker></TextP>

                <ParagraphTitle>Прокидываем Array с tasks в Todolist</ParagraphTitle>
                <TextP>Сейчас у нашего Todolist как и с <Marker>title</Marker>, tasks
                    написаны <Marker>хардкодом</Marker> в самой component, что бы сделать более гибкий вариант мы
                    создадим 2 arrays в App.tsx и передадим array with tasks in this Todolist:</TextP>

                {/*tasks начальные без изменений*/}
                <HighlightedCodeBlock>
                    {
                        `
<ul>
    <li>
        <input type="checkbox" checked={true} /> <span>HTML&CSS</span>
    </li>
    <li>
        <input type="checkbox" checked={true} /> <span>JS</span>
    </li>
    <li>
        <input type="checkbox" checked={false} /> <span>React</span>
    </li>
</ul>
                        `
                    }
                </HighlightedCodeBlock>
                {/*tasks начальные без изменений*/}

                <TextP>Создаем 2 arrays и <Marker>сразу</Marker> прописываем types for arrays</TextP>

                {/*App в которой теперь 2 arrays для tasks*/}
                <HighlightedCodeBlock>
                    {
                        `               
type TaskType = {
  id: string
  title: string
  isDone: boolean
}  


                        
function App() {
  const tasks1 = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false }
  ]
 
  const tasks2 = [
    { id: 1, title: 'Hello world', isDone: true },
    { id: 2, title: 'I am Happy', isDone: false },
    { id: 3, title: 'Yo', isDone: false }
  ]
 
  return (
    <div className="App">
      // прокидываем array в каждый Todolist - tasks={tasks1}
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="Songs" tasks={tasks2} />
    </div>
  )
}
                    `
                    }
                </HighlightedCodeBlock>
                {/*App в которой теперь 2 arrays для tasks*/}

                <TextP>Существует 2 способа типизации array:</TextP>

                {/*2 способа типизации array*/}
                <HighlightedCodeBlock>
                    {
                        `
// First более предпочтительный
type PropsType = {
    tasks: TaskType[]
    tasks: Array<TaskType>
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*2 способа типизации array*/}

                <TextP>Прокидываем tasks in Todolist</TextP>
                {/*tasks in Todolist*/}
                <HighlightedCodeBlock>
                    {
                        `
type PropsType = {
  title: string
  tasks: TaskType[]
}
 
export const Todolist = ({ title, tasks }: PropsType) => {
  return (
    <div>
      <h3>{title}</h3>
      
        // Code ....
  )
}
                        `
                    }
                </HighlightedCodeBlock>
                {/*tasks in Todolist*/}

                <TextP>Теперь нужно информацию из arrays <Marker>отображать в tasks</Marker>, для этого нужно обратиться
                    к tasks с
                    соответствующим <Marker>id[]</Marker> для передачи нужных свойств в <Marker>task</Marker></TextP>

                {/*передаем свойства tasks[] в каждую task */}
                <HighlightedCodeBlock>
                    {
                        `
// до                       
<ul>
    <li>
        <input type="checkbox" checked={true} /> <span>HTML&CSS</span>
    </li>
    <li>
        <input type="checkbox" checked={true} /> <span>JS</span>
    </li>
    <li>
        <input type="checkbox" checked={false} /> <span>React</span>
    </li>
</ul>


// после
<ul>
    <li>
      <input type="checkbox" checked={tasks[0].isDone} />
      <span>{tasks[0].title}</span>
    </li>
    <li>
      <input type="checkbox" checked={tasks[1].isDone} />
      <span>{tasks[1].title}</span>
    </li>
    <li>
      <input type="checkbox" checked={tasks[2].isDone} />
      <span>{tasks[2].title}</span>
    </li>
</ul>
                        `
                    }
                </HighlightedCodeBlock>
                {/*передаем свойства tasks[] в каждую task */}

                <TextP>Так-же можно сделать type <Marker>не обязательным</Marker>, для этого сразу после имени
                    необязательного type нужно написать <Marker>'?'</Marker></TextP>

                {/*необязательный type*/}
                <HighlightedCodeBlock>
                    {
                        `
type PropsType = {
  title: string
  tasks: TaskType[]
  // делаем не обязательным
  date?: string
}
 
export const Todolist = ({ title, tasks, date }: PropsType) => {
  return (
    <div>
      <h3>{title}</h3>
      
        // Code ....
        
      <div>{date}</div>  
  )
}




<div className="App">
  // благодаря этому мы можем подписать дату только для одного Todolist
  <Todolist title="What to learn" tasks={tasks1} date={'30.01.2024'}/>
  <Todolist title="Songs" tasks={tasks2} />
</div>
                        `
                    }
                </HighlightedCodeBlock>
                {/*необязательный type*/}

                <ParagraphTitle>Method .map</ParagraphTitle>
                <TextP>Для того что бы по <Marker>надобности</Marker> добавить еще одну task in array, при этом каждый раз не добавляя ее
                    <Marker>вручную в самом Todolist</Marker>, нам нужно прогнать tasks через method <Marker>map</Marker></TextP>

                {/*map*/}
                <HighlightedCodeBlock>
                    {
                        `
// до                        
<ul>
    <li>
      <input type="checkbox" checked={tasks[0].isDone} />
      <span>{tasks[0].title}</span>
    </li>
    <li>
      <input type="checkbox" checked={tasks[1].isDone} />
      <span>{tasks[1].title}</span>
    </li>
    <li>
      <input type="checkbox" checked={tasks[2].isDone} />
      <span>{tasks[2].title}</span>
    </li>
</ul>


// после
<ul>
    {tasks.map(task => {
      return (
        <li>
          <input type="checkbox" checked={task.isDone} />
          <span>{task.title}</span>
        </li>
      )
    })}
</ul>
                        `
                    }
                </HighlightedCodeBlock>
                {/*map*/}

                <TextP>Как результат, <Marker>автоматически</Marker> будет отрисовываться столько tasks сколько будет в array
                    tasks</TextP>

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








