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
                    <ParagraphTitle>1. Создание компонента Todolist</ParagraphTitle>
                    <TextP>Выносим компонент Todolist в отдельный файл <Marker>Todolist.tsx</Marker></TextP>
                </Section>

                <Section>
                    <ParagraphTitle>2. Передача через props</ParagraphTitle>
                    <TextP>Передаём заголовок в компонент Todolist через <Marker>props</Marker>. Передача данных осуществляется при использовании компонента.</TextP>
                    <TextP><Marker>В компоненте App:</Marker></TextP>
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
                    <ParagraphTitle>3. Массив задач</ParagraphTitle>
                    <TextP>Объявляем массив с задачами и типизируем его для использования в компоненте Todolist.</TextP>
                    <TextP><Marker>В компоненте App:</Marker></TextP>
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
                    <ParagraphTitle>4. Передача задач в Todolist</ParagraphTitle>
                    <TextP>Передаем массив задач в компонент Todolist и обновляем тип PropsType для соответствия пропсам.</TextP>
                    <TextP><Marker>В компоненте Todolist:</Marker></TextP>
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
                    <TextP>Используем метод массива <Marker>map</Marker> для отображения списка задач и тернарный оператор для условного рендеринга пустого сообщения.</TextP>
                    <TextP><Marker>В компоненте Todolist:</Marker></TextP>
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
                    <ParagraphTitle>6. Выносим кнопку в отдельный компонент</ParagraphTitle>
                    <TextP>Создаем компонент <Marker>Button</Marker> для повторного использования по всему приложению.</TextP>
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




//     <ParagraphTitle><Marker>CRUT</Marker> операции</ParagraphTitle>
//     <NoteUl>
//         <NoteLi><Marker>Create</Marker> - создание</NoteLi>
//         <NoteLi><Marker>Read</Marker> - чтение</NoteLi>
//         <NoteLi><Marker>Update</Marker> - обновления</NoteLi>
//         <NoteLi><Marker>Delete</Marker> - удаление</NoteLi>
//     </NoteUl>
//
//
//
//     <ParagraphTitle>Подготовка к занятию</ParagraphTitle>
//     <NoteUl>
//         <NoteLi><Marker>1</Marker> Создать проект -
//             <Link target={"_blank"}
//                   href="https://create-react-app.dev/docs/adding-typescript/"> React</Link>
//         </NoteLi>
//         <NoteLi><Marker>2</Marker> Установить <Marker>зависимости</Marker></NoteLi>
//         <NoteLi><Marker>3</Marker> Запустить приложение</NoteLi>
//     </NoteUl>
//
//     <ParagraphTitle>Именованный и default <Marker>export</Marker></ParagraphTitle>
//     <TextP>
//         Для отдельных component <Marker>всегда</Marker> ставим именованный export - <Marker>"export const
//         Component"</Marker>.
//         Для погружения в детали о разницы export для компонента можно почитать тут - <Link target={"_blank"}
//                                                                                            href="https://code-style.it-incubator.io/react/import-export/export">style-guide</Link>
//     </TextP>
//
//     <ParagraphTitle>Стрелочная или declaration functions</ParagraphTitle>
//
//     {/*Стрелочная и обычная функция*/}
//     <HighlightedCodeBlock>
//         {
//             `
// const Todolist = () => {...}
//
// // or
//
// function Todolist() {...}
//
//
//
// () => {}
//                         `
//         }
//     </HighlightedCodeBlock>
//     {/*стрелочная и обычная функция*/}
//
//     <ParagraphTitle>props</ParagraphTitle>
//     <TextP><Marker><Link target={"_blank"}
//                          href="https://react.dev/learn/passing-props-to-a-component">props</Link></Marker>
//
//     <ParagraphTitle>Деструктурирующие присваивание - <Marker>Деструктуризация</Marker></ParagraphTitle>
//     <TextP>Как правило, в компонент приходит много свойств, это приводит к тому что в разметке
//         будет <Marker>много props</Marker></TextP>
//     <TextP><Marker>К примеру:</Marker></TextP>
//
//     {/*Пример в котором много props*/}
//     <HighlightedCodeBlock>
//         {
//             `
// type PropsType = {
//   title: string
//   subTitle: string
//   description: string
//   tasks: Task[]
// }
//
// export const Todolist = (props: PropsType) => {
//   return (
//     <div>
//       <h3>{props.title}</h3>
//       <h4>{props.subTitle}</h4>
//       <p>{props.description}</p>
//       <div>{props.tasks.map(t => t.title)}</div>
//     </div>
//   )
// }
//                         `
//         }
//     </HighlightedCodeBlock>
//     {/*Пример в котором много props*/}
//
//     <TextP><Marker>Деструктуризация:</Marker></TextP>
//
//     {/*Деструктуризация - 1*/}
//     <HighlightedCodeBlock>
//         {
//             `
// export const Todolist = (props: PropsType) => {
//   const { title, subTitle, description, tasks } = props
//
//   return (
//     <div>
//       <h3>{title}</h3>
//       <h4>{subTitle}</h4>
//       <p>{description}</p>
//       <div>{tasks.map(t => t.title)}</div>
//     </div>
//   )
// }
//                         `
//         }
//     </HighlightedCodeBlock>
//     {/*Деструктуризация - 1*/}
//
//     <TextP><Marker>Чаще всего делают так:</Marker></TextP>
//
//     {/*Деструктуризация - САМЫЙ ЧАСТЫЙ ВАРИАНТ*/}
//     <HighlightedCodeBlock>
//         {
//             `
// export const Todolist = ({ title, subTitle, description, tasks }: PropsType) => {
//   return (
//     <div>
//       <h3>{title}</h3>
//       <h4>{subTitle}</h4>
//       <p>{description}</p>
//       <div>{tasks.map(t => t.title)}</div>
//     </div>
//   )
// }
//                         `
//         }
//     </HighlightedCodeBlock>
//     {/*Деструктуризация - САМЫЙ ЧАСТЫЙ ВАРИАНТ*/}
//
//     <ParagraphTitle>Type or Interface?</ParagraphTitle>
//     <TextP>Основное отличие в том, что <Marker>type</Marker> нельзя повторно открыть для добавления новых
//         свойств а <Marker>interface</Marker> всегда расширяем</TextP>
//     <TextP>Подробнее об этом</TextP>
//     <NoteUl>
//         <NoteLi><Marker>1</Marker> <Link target={"_blank"}
//                                          href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces">Differences
//             Between Type Aliases and Interfaces</Link></NoteLi>
//         <NoteLi><Marker>2</Marker> <Link target={"_blank"}
//                                          href="https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript">Interfaces
//             vs Types in TypeScript</Link></NoteLi>
//     </NoteUl>
//     <TextP>type на начальных этапах называем</TextP>
//     <NoteUl>
//         <NoteLi><Marker>1</Marker> TodoPropsType</NoteLi>
//         <NoteLi><Marker>2</Marker> UserPropsType</NoteLi>
//     </NoteUl>
//     <TextP>Далее будет понятнее почему или <Link target={"_blank"}
//                                                  href="https://code-style.it-incubator.io/react/naming#36-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-%D1%82%D0%B8%D0%BF%D0%BE%D0%B2-type">style-guide</Link>,
//         главное соблюсти конструкцию <Marker><Marker>N</Marker>ame</Marker> + <Marker><Marker>P</Marker>rops</Marker> + <Marker><Marker>T</Marker>ype</Marker></TextP>
//
//     <TextP>Так-же можно сделать type <Marker>не обязательным</Marker>, для этого сразу после имени
//         необязательного type нужно написать <Marker>'?'</Marker></TextP>
//
//     {/*необязательный type*/}
//     <HighlightedCodeBlock>
//         {
//             `
// type PropsType = {
//   title: string
//   tasks: TaskType[]
//   // делаем не обязательным
//   date?: string
// }
//
// export const Todolist = ({ title, tasks, date }: PropsType) => {
//   return (
//     <div>
//       <h3>{title}</h3>
//
//         // Code ....
//
//       <div>{date}</div>
//   )
// }
//
//
//
//
// <div className="App">
//   // благодаря этому мы можем подписать дату только для одного Todolist
//   <Todolist title="What to learn" tasks={tasks1} date={'30.01.2024'}/>
//   <Todolist title="Songs" tasks={tasks2} />
// </div>
//                         `
//         }
//     </HighlightedCodeBlock>
//     {/*необязательный type*/}
//
//
//     <ParagraphTitle>Key</ParagraphTitle>
//     <TextP>Использовав map и открыв рабочий проект, можно увидеть ошибку в console связанную с key, эта
//         ошибка говорит о том что у каждого элемента array должен быть уникальный key</TextP>
//     <TextP><Marker>Что нужно использовать в качестве key:</Marker></TextP>
//     <NoteUl>
//         <NoteLi><Marker>1</Marker> При реальной разработке в качестве key берутся id из базы данных, которые
//             всегда уникальны</NoteLi>
//         <NoteLi><Marker>2</Marker> Если вы работаете с локальными данными, то в качестве key в документации
//             рекомендуют использовать <Link target={"_blank"}
//                                            href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID">crypto.randomUUID()</Link> или
//             установить дополнительный пакет <Link target={"_blank"}
//                                                   href="https://www.npmjs.com/package/uuid">uuid</Link></NoteLi>
//     </NoteUl>
//     <TextP><Marker>Что не нужно использовать в качестве key:</Marker></TextP>
//     <NoteUl>
//         <NoteLi><Marker>1</Marker> <Marker>index</Marker> элемента массива.</NoteLi>
//         <TextP>Если key не указан React будет использовать index по умолчанию, но за счет этого будет
//             нарушаться порядок в случае удаления или добавления элемента, или будет переупорядочен</TextP>
//         <NoteLi><Marker>2</Marker> <Marker>Math.random()</Marker></NoteLi>
//         <TextP>В таком случае keys никогда не совпадут с рендерами, все component DOM будут отрисовываться
//             заново, это не только медленно но и ведет к потере пользовательского ввода внутри элементов
//             списка</TextP>
//     </NoteUl>
//     <TextP>Подробнее о key в <Link target={"_blank"}
//                                    href="https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key">документации
//         React</Link></TextP>
//
//     <ParagraphTitle>React.Fragment</ParagraphTitle>
//     <TextP>React component обязан возвращать <Marker>один</Marker> родительский элемент, у меня возвращается div потому что на нем висит <Marker>className</Marker>, но довольно часто встречается ситуация при которой нужно просто обернуть components, можно использовать пустой div в таком случае, но <Marker>не рекомендуется</Marker> что-бы не создавать лишний узел в DOM, не критично но есть лучший вариант</TextP>
//     <TextP>Для этого есть 2 tags</TextP>
//     <TextP><Link target={"_blank"} href="https://react.dev/reference/react/Fragment#rendering-a-list-of-fragments">Документация</Link></TextP>
//
//     {/*2 тега обертки*/}
//     <HighlightedCodeBlock>
//         {
//             `
// <></>
//
// //or
//
// <Fragment></Fragment>
//
//
//
// // пример 1
// function Component1() {
//   return (
//     <>
//       <Todolist />
//       <Todolist />
//       <Todolist />
//     </>
//   )
// }
//
//
// // пример 2
// function Component2() {
//   return (
//     <Fragment>
//       <Todolist />
//       <Todolist />
//       <Todolist />
//     </Fragment>
//   )
// }
//                         `
//         }
//     </HighlightedCodeBlock>
//     {/*2 тега обертки*/}
//
//     <TextP><Marker>Всегда</Marker> использовать пустой tag, <Marker>но</Marker> если понадобиться мапить array и соответственно передавать key, <Marker>используется Fragment</Marker></TextP>
//     <TextP><Link target={"_blank"} href="https://react.dev/reference/react/Fragment#rendering-a-list-of-fragments">Пример использования Fragment из документации</Link></TextP>
//     <ParagraphTitle>Тернарный оператор</ParagraphTitle>
//     <TextP>Если мы из array tasks2 удалим все objects, то будет просто пустота, нужно пометить что tasks нет или tasks еще не созданы и так далее</TextP>
//     <TextP>Используем для этого <Link target={"_blank"} href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Conditional_operator">условный (тернарный) оператор</Link></TextP>
//
//     {/*тернарный оператор*/}
//     <HighlightedCodeBlock>
//         {
//             `
// {tasks.length === 0 ? (
// <p>Тасок нет</p>
// ) : (
// <ul>
//   {tasks.map(task => {
//     return (
//       <li key={task.id}>
//         <input type="checkbox" checked={task.isDone} />
//         <span>{task.title}</span>
//       </li>
//     )
//   })}
// </ul>
// )}
//
//
// function App() {
//   const tasks2 = []
//
//   return (
//     <div className="App">
//       <Todolist title="What to learn" tasks={tasks1} />
//       <Todolist title="Songs" tasks={tasks2} />
//     </div>
//   )
// }
//                         `
//         }
//     </HighlightedCodeBlock>
//     {/*тернарный оператор*/}






