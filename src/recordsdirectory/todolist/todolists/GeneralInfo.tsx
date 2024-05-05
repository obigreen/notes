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


export const GeneralInfo: FC = () => {
    return (
        <NoteBlock>
            <Text>
                <ParagraphTitle>Аналогия для Понимания Callback Функций</ParagraphTitle>
                <TextP>
                    Как ребенок, который идет на улицу и имеет возможность позвонить родителю при необходимости, так и
                    дочерний компонент должен "звонить" родительскому компоненту, чтобы сообщить об изменениях.
                    <NoteUl>
                        <NoteLi><Marker>Родитель</Marker> - родительский компонент App</NoteLi>
                        <NoteLi><Marker>Ребенок</Marker> - дочерний компонент Todolist</NoteLi>
                        <NoteLi><Marker>Телефон</Marker> - функция обратного вызова (callback)</NoteLi>
                    </NoteUl>
                </TextP>

                <TextP>
                    Важные заметки о Callback функциях:
                    <NoteUl>
                        <NoteLi>Название аргумента callback функции может быть любым и выбирается на ваше усмотрение для
                            лучшей читаемости.</NoteLi>
                    </NoteUl>
                </TextP>

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

                <ParagraphTitle>CRUD Операции</ParagraphTitle>
                <NoteUl>
                    <NoteLi><Marker>Create</Marker> - создание</NoteLi>
                    <NoteLi><Marker>Read</Marker> - чтение</NoteLi>
                    <NoteLi><Marker>Update</Marker> - обновление</NoteLi>
                    <NoteLi><Marker>Delete</Marker> - удаление</NoteLi>
                </NoteUl>

                <ParagraphTitle>Подготовка к Разработке</ParagraphTitle>
                <NoteUl>
                    <NoteLi><Marker>Создание</Marker> проекта с использованием TypeScript в React</NoteLi>
                    <NoteLi>Установка <Marker>зависимостей</Marker></NoteLi>
                    <NoteLi>Запуск <Marker>приложения</Marker> для тестирования и разработки.</NoteLi>
                </NoteUl>

                <ParagraphTitle>Экспорты в React: Именованный vs Default</ParagraphTitle>
                <TextP>
                    Для отдельных компонентов <Marker>всегда</Marker> используйте именованный export: <Marker>"export
                    const Component"</Marker>.
                </TextP>

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

                <ParagraphTitle>Props в React</ParagraphTitle>
                <TextP>
                    Использование <Marker>props</Marker> для передачи данных родительского компонента дочернему.
                </TextP>

                <ParagraphTitle>Деструктуризация</ParagraphTitle>
                <HighlightedCodeBlock>
                    {
                        `
    export const Todolist = ({ title, subTitle, description, tasks }: PropsType) => {
      // код компонента с использованием деструктуризации
    }
                        `
                    }
                </HighlightedCodeBlock>

                <ParagraphTitle>Type vs Interface в TypeScript</ParagraphTitle>
                <TextP>
                    <Marker>Type</Marker> отличается от <Marker>Interface</Marker> тем, что type нельзя расширять после
                    объявления, а interface можно.
                </TextP>

                <ParagraphTitle>Необязательные Types</ParagraphTitle>
                <TextP>
                    Добавление <Marker>?</Marker> позволяет указать необязательные свойства для типов.
                </TextP>

                <ParagraphTitle>Key Props и их Значение</ParagraphTitle>
                <TextP>
                    Каждый элемент списка должен иметь уникальный <Marker>key</Marker> при использовании map.
                </TextP>

                <ParagraphTitle>React.Fragment для Объединения Компонентов</ParagraphTitle>
                <TextP>
                    React компонент должен возвращать один родительский элемент, для этого можно
                    использовать <Marker>React.Fragment</Marker> или короткую запись с пустыми тегами.
                </TextP>

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

                <ParagraphTitle>Тернарный оператор</ParagraphTitle>
                <TextP>
                    Тернарный оператор используется для условного рендеринга, чтобы отобразить различное содержимое в
                    зависимости от условий.
                </TextP>

                <HighlightedCodeBlock>
                    {
                        `
    {tasks.length === 0 ? <p>Задач нет</p> : <ul>{/* рендер задач */}</ul>}
                        `
                    }
                </HighlightedCodeBlock>
            </Text>
        </NoteBlock>
    );
};