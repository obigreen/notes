import React, {useEffect, useRef, ChangeEvent, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import Copy from '../../accets/img/all/copy.png'
import Props from '../../../accets/img/theory/props.png'
import {
    ButtonCopy,
    CodeBlockWrapp,
    NoteBlock,
    Textarea,
    TextareaWrapper,
    Text,
    BookTitle, Section, ParagraphTitle, Marker, NoteUl, NoteLi, TextP
} from "../RecordsDirectory_Style";


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


export const TheoryEng = () => {

    return (
        <NoteBlock>
            <Text>
                <BookTitle>Theory</BookTitle>
                {/*do and make*/}
                <Section>
                    <ParagraphTitle>Разница между <Marker>do</Marker> и <Marker>make</Marker></ParagraphTitle>

                    <Section>
                        <TextP><Marker>Do</Marker></TextP>
                        <NoteUl>
                            <NoteLi>
                                <Marker>Do</Marker> - используется для обозначения действий, процессов или задач
                                в <Marker>общем
                                смысле</Marker>, а также в выражениях, связанных с работой, домашними делами и учёбой.
                            </NoteLi>
                            <TextP>
                                <Marker>Примеры:</Marker> do homework (делать домашнее задание), do business (заниматься
                                бизнесом), do
                                the cleaning (делать уборку).</TextP>
                            <NoteLi>
                                <Marker>Do</Marker> - используется в вопросительных и отрицательных предложениях как
                                вспомогательный глагол.
                            </NoteLi>
                            <TextP>
                                <Marker>Примеры:</Marker> Do you speak English? (Ты говоришь по-английски?), I do not
                                like it. (Мне это не нравится).
                            </TextP>
                        </NoteUl>

                        <TextP><Marker>Make</Marker></TextP>
                        <NoteUl>
                            <NoteLi>
                                <Marker>Make</Marker> - используется
                                при <Marker>создании</Marker>, <Marker>производстве</Marker>, <Marker>приготовлении</Marker> чего-либо,
                                а также когда речь идет о принятии решений и подготовке планов.
                            </NoteLi>
                            <TextP>
                                <Marker>Примеры:</Marker> make breakfast (готовить завтрак), make a decision (принимать
                                решение), make plans (строить планы).
                            </TextP>

                            <NoteLi>
                                <Marker>Make</Marker> - также используется для выражения вызванных действий или эмоций.
                            </NoteLi>
                            <TextP>
                                <Marker>Примеры:</Marker> make someone happy (сделать кого-то счастливым), make a noise
                                (шуметь).
                            </TextP>
                        </NoteUl>
                    </Section>


                    <ParagraphTitle>Как запомнить разницу:</ParagraphTitle>
                    <TextP>
                        <Marker>Do</Marker> чаще всего касается работы, действий или активностей в общем. Если вы не
                        уверены, какое
                        слово использовать, спросите себя, связано ли это действие с выполнением задачи? Если да, скорее
                        всего подойдет <Marker>do</Marker>.
                    </TextP>
                    <TextP>
                        <Marker>Make</Marker> связано с созданием, производством или приготовлением <Marker>чего-то
                        нового</Marker>. Если действие влечет
                        за собой результат или что-то в результате <Marker>изменяется или создается</Marker>,
                        используйте <Marker>make</Marker>.
                    </TextP>

                </Section>

                {/*tell speak say spell*/}
                <Section>
                    <ParagraphTitle>
                        Разница между <Marker>Tell</Marker>,
                        <Marker> Speak</Marker>,
                        <Marker> Say</Marker> и
                        <Marker> Spell</Marker>
                    </ParagraphTitle>

                    <Section>
                        <TextP><Marker>Tell</Marker></TextP>
                        <NoteUl>
                            <NoteLi>
                                <Marker>Tell</Marker> используется, когда информация или история передается от одного
                                человека к другому.
                                Этот глагол требует указания объекта (то есть, кому рассказывается история или
                                информация).
                            </NoteLi>
                            <TextP>
                                <Marker>Пример:</Marker> She told me a secret. (Она рассказала мне секрет.)
                            </TextP>
                        </NoteUl>

                        <TextP><Marker>Speak</Marker></TextP>
                        <NoteUl>
                            <NoteLi>
                                <Marker>Speak</Marker> касается акта речи и часто используется, когда дело касается
                                языков или больших
                                обсуждений.
                            </NoteLi>
                            <TextP>
                                <Marker>Пример:</Marker> He speaks English fluently. (Он свободно говорит по-английски.)
                            </TextP>
                            <TextP>
                                <Marker>Speak</Marker> также используется для обозначения разговора между людьми: They
                                spoke for hours.
                                (Они говорили часами.)
                            </TextP>
                        </NoteUl>

                        <TextP><Marker>Say</Marker></TextP>
                        <NoteUl>
                            <NoteLi>
                                <Marker>Say</Marker> используется для выражения конкретных слов или мыслей, часто без
                                указания адресата,
                                или когда адресат указан с помощью предлога "to".
                            </NoteLi>
                            <TextP>
                                <Marker>Пример:</Marker> She says "hello". (Она говорит "привет.")
                            </TextP>
                            <TextP>
                                <Marker>Пример с адресатом:</Marker> He said to me that he was tired. (Он сказал мне,
                                что устал.)
                            </TextP>
                        </NoteUl>

                        <TextP><Marker>Spell</Marker></TextP>
                        <NoteUl>
                            <NoteLi>
                                <Marker>Spell</Marker> относится к произнесению или написанию отдельных букв слова в
                                правильном порядке.
                            </NoteLi>
                            <TextP>
                                <Marker>Пример:</Marker> Can you spell your name? (Можете написать ваше имя по буквам?)
                            </TextP>
                        </NoteUl>

                    </Section>

                    <ParagraphTitle>Как запомнить разницу:</ParagraphTitle>
                    <TextP><Marker>Tell</Marker> подразумевает передачу информации или повествование и требует указания
                        объекта (кому).
                        Используется больше в контексте длинных разговоров или рассказов.</TextP>
                    <TextP><Marker>Speak</Marker> связан с процессом разговора или владения языком. Это общий глагол для
                        обозначения
                        устной речи.</TextP>
                    <TextP><Marker>Say</Marker> обычно относится к выражению конкретных слов или фраз. Может
                        использоваться без прямого
                        объекта или с объектом после предлога "to".</TextP>
                    <TextP><Marker>Spell</Marker> уникальный и конкретный, поскольку касается правильного произнесения
                        или написания букв
                        слова.</TextP>


                </Section>

            </Text>
        </NoteBlock>
    );
};

