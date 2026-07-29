import React, {useRef} from 'react';
import {
    Link,
    Marker,
    NoteBlock,
    NoteLi,
    NoteUl,
    Section,
    Text,
    TextP,
    BookTitle
} from "../../../RecordsDirectory_Style";
export const HookUseRef = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.focus();
        }
    };

    return (
        <NoteBlock>
            <Text>
                <BookTitle>useRef</BookTitle>
                <Section>
                    <TextP>
                        <Marker>useRef</Marker> возвращает один и тот же объект между рендерами. Его свойство
                        <Marker> current</Marker> можно использовать для ссылки на DOM-элемент или для изменяемого
                        значения, которое не участвует в отображении.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Изменение <Marker>ref.current</Marker> само по себе не вызывает ререндер.</NoteLi>
                        <NoteLi>Для данных, которые должны появиться в JSX, используй state, а не ref.</NoteLi>
                        <NoteLi>DOM-ref становится доступен после монтирования элемента.</NoteLi>
                    </NoteUl>

                    <TextP><Marker>Живой пример: управление неконтролируемым input</Marker></TextP>
                    <div>
                        <input ref={inputRef} defaultValue="Текст без React state"/>
                        <button type="button" onClick={focusInput}>Фокус</button>
                        <button type="button" onClick={clearInput}>Очистить</button>
                    </div>
                </Section>
                <Section>
                    <Link target={"_blank"} href="https://react.dev/reference/react/useRef">useRef - документация</Link>
                </Section>
            </Text>
        </NoteBlock>
   );
};
