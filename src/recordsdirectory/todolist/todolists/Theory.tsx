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
    TextareaWrapper, TextP, BookTitle, Section, ImgWrapp, Img
} from "../../RecordsDirectory_Style";
import Copy from '../../../accets/img/all/copy.png'
import Props from '../../../accets/img/theory/props.png'


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


// img
// styles
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        background: 'black'
    }
};

type ImgPropsType = {
    src: string
    alt: string
}


// ---------------------------------------------------------------------------------------


export const Theory = ({src, alt}: ImgPropsType) => {

    //img
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }


    return (
        <NoteBlock>
            <Text>
                <Section>
                    <BookTitle>Theory</BookTitle>
                    <ParagraphTitle>Аналогия для Понимания <Marker>Callback</Marker> Функций</ParagraphTitle>
                    <TextP>
                        Как ребенок, который идет на улицу и имеет возможность позвонить родителю при необходимости, так
                        и
                        дочерний компонент должен "звонить" родительскому компоненту, чтобы сообщить об изменениях.
                    </TextP>

                    <NoteUl>
                        <NoteLi><Marker>Родитель</Marker> - родительский компонент App</NoteLi>
                        <NoteLi><Marker>Ребенок</Marker> - дочерний компонент Todolist</NoteLi>
                        <NoteLi><Marker>Телефон</Marker> - функция обратного вызова (callback)</NoteLi>
                    </NoteUl>

                    <TextP>Важные заметки о <Marker>Callback</Marker> функциях:</TextP>
                    <TextP>Название аргумента callback функции может быть любым и выбирается на мое усмотрение для
                        лучшей читаемости.</TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    type PropsType = {
      removeTask: (taskId: number) => void
      // другие объявления функций
    }
                        `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle><Marker>CRUD</Marker> Операции</ParagraphTitle>
                    <NoteUl>
                        <NoteLi><Marker>Create</Marker> - создание</NoteLi>
                        <NoteLi><Marker>Read</Marker> - чтение</NoteLi>
                        <NoteLi><Marker>Update</Marker> - обновление</NoteLi>
                        <NoteLi><Marker>Delete</Marker> - удаление</NoteLi>
                    </NoteUl>
                </Section>

                <Section>
                    <ParagraphTitle>Экспорты в React: Именованный vs Default</ParagraphTitle>
                    <TextP>
                        Для отдельных компонент <Marker>всегда</Marker> использовать именованный export: <Marker>"export
                        const Component"</Marker>.
                    </TextP>

                    <TextP>В данном <Link target={"_blank"}
                                          href="https://code-style.it-incubator.io/react/import-export/export">style-guide</Link> можно
                        подробно изучить разницу.</TextP>
                </Section>

                <Section>
                    <ParagraphTitle>Функциональные Компоненты: Стрелочные vs Объявленные</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {
                            `
    const Todolist = () => {/* код компонента */}
    // или
    function Todolist() {/* код компонента */}
                        `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>Props в React</ParagraphTitle>
                    <TextP>
                        Использование <Marker><Link target={"_blank"}
                                                    href="https://react.dev/learn/passing-props-to-a-component">props</Link></Marker> для
                        передачи данных родительского компонента дочернему.
                    </TextP>

                    <TextP>
                        <Marker>Props</Marker> - это параметр нашей функции, это объект, который приходит в нашу
                        функцию-компоненту. Компонент может использовать эти данные для отображения. Внутри JSX-разметки
                        нужно в фигурных скобках обратиться к объекту и через точку прочитать её
                        св-во <Marker>title</Marker> (потому что именно <Marker>title</Marker> передали в атрибутах):
                    </TextP>

                    <ImgWrapp>
                        <Img src={Props} alt={alt} onClick={toggleModal}/>
                        <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} style={modalStyles}>
                            <Img src={Props} alt={alt} style={{width: '100%', height: '100%'}}/>
                        </Modal>
                    </ImgWrapp>
                </Section>

                <Section>
                    <ParagraphTitle>Деструктуризация</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {
                            `
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
                            
                            
    export const Todolist = ({ title, subTitle, description, tasks }: PropsType) => {
      // код компонента с использованием деструктуризации
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
                </Section>

                <Section>
                    <ParagraphTitle>Type vs Interface в TypeScript</ParagraphTitle>
                    <TextP>
                        <Marker>Type</Marker> отличается от <Marker>Interface</Marker> тем, что type нельзя расширять
                        после
                        объявления, а interface можно.
                    </TextP>


                    <TextP><Marker>Подробнее</Marker></TextP>
                    <TextP><Link target={"_blank"}
                                 href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces">Differences
                        Between Type Aliases and Interfaces
                    </Link></TextP>
                    <TextP><Link target={"_blank"}
                                 href="https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript">Interfaces
                        vs Types in TypeScript</Link></TextP>
                </Section>

                <Section>
                    <ParagraphTitle>Необязательные Types</ParagraphTitle>
                    <TextP>
                        Добавление <Marker>?</Marker> позволяет указать необязательные свойства для типов.
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    type TypeProps = {
        id: string;
    };
                            `
                        }
                    </HighlightedCodeBlock>
                </Section>


                <Section>
                    <ParagraphTitle>Key</ParagraphTitle>

                    <TextP>
                        Использовав map и открыв рабочий проект, можно увидеть ошибку в console связанную с key, эта
                        ошибка говорит о том что у каждого элемента array должен быть уникальный key
                    </TextP>

                    <TextP><Marker>Что нужно использовать в качестве key:</Marker></TextP>

                    <NoteUl>
                        <NoteLi><Marker>1</Marker> При реальной разработке в качестве key берутся id из базы данных,
                            которые всегда уникальны
                        </NoteLi>
                        <NoteLi><Marker>2</Marker> Если вы работаете с локальными данными, то в качестве key в
                            документации рекомендуют использовать <Link target={"_blank"}
                                                                        href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID">crypto.randomUUID()</Link> или
                            установить дополнительный пакет <Link target={"_blank"}
                                                                  href="https://www.npmjs.com/package/uuid">uuid</Link>
                        </NoteLi>
                    </NoteUl>

                    <TextP><Marker>Что не нужно использовать в качестве key:</Marker></TextP>
                    <NoteUl>
                        <NoteLi>
                            <Marker>1</Marker> <Marker>index</Marker> элемента массива.
                        </NoteLi>

                        <TextP>
                            Если key не указан React будет использовать index по умолчанию, но за счет этого будет
                            нарушаться порядок в случае удаления или добавления элемента, или будет
                            переупорядочен
                        </TextP>
                        <NoteLi>
                            <Marker>2</Marker> <Marker>Math.random()</Marker>
                        </NoteLi>

                        <TextP>В таком случае keys никогда не совпадут с рендерами, все component DOM будут
                            отрисовываться заново, это не только медленно но и ведет к потере пользовательского ввода
                            внутри элементов списка
                        </TextP>
                    </NoteUl>
                    <TextP>Подробнее о key в
                        <Link target={"_blank"}
                              href="https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key">документации
                            React</Link>
                    </TextP>
                </Section>

                <Section>
                    <ParagraphTitle>React.Fragment для Объединения Компонентов</ParagraphTitle>
                    <TextP>
                        React компонент должен возвращать один родительский элемент, для этого можно
                        использовать <Marker>React.Fragment</Marker> или короткую запись с пустыми тегами.
                    </TextP>

                    <TextP>Более детально ознакомиться с нюансами работы вы можете в
                        <Link target={"_blank"}
                              href="https://react.dev/reference/react/Fragment#rendering-a-list-of-fragments">документации</Link></TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    <>
      <Todolist />
      <Todolist />
    </>
    // или
    <Fragment>
      <Todolist />
      <Todolist />
    </Fragment>
                        `
                        }
                    </HighlightedCodeBlock>
                </Section>

                <Section>
                    <ParagraphTitle>Тернарный оператор</ParagraphTitle>
                    <TextP>
                        Тернарный оператор используется для условного рендеринга, чтобы отобразить различное содержимое
                        в
                        зависимости от условий.
                    </TextP>

                    <TextP>
                        <Link target={"_blank"}
                              href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Conditional_operator">Documentation</Link>
                    </TextP>

                    <HighlightedCodeBlock>
                        {
                            `
    {tasks.length === 0 ? <p>Задач нет</p> : <ul>{/* рендер задач */}</ul>}
                        `
                        }
                    </HighlightedCodeBlock>
                </Section>

            </Text>
        </NoteBlock>
    );
};

