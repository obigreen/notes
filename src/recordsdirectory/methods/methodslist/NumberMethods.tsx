import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    numberItems?: Array<{
        highlight: string;
        content: string;
        code: string;
        isTop?: boolean;
    }>;
};

export const numberItems = [
    {
        highlight: ".toFixed()",
        isTop: true,
        content: "Форматирует число, используя запись с фиксированной запятой",
        code:
            `
        //code
        //.toFixed(digits)
        //Возвращает строку (не число)

        const price = 10.12345;
        console.log(price.toFixed(2)); // '10.12'

        const rounded = 10.999;
        console.log(rounded.toFixed(2)); // '11.00'

        const whole = 15;
        console.log(whole.toFixed(3)); // '15.000'

        //Если нужно обратно число:
        const normalized = Number(price.toFixed(2));
        console.log(normalized); // 10.12
            `
    },
    {
        highlight: ".toPrecision()",
        isTop: true,
        content: "Возвращает строковое представление числа в указанной точности",
        code:
            `
        //code
        //.toPrecision(precision)
        //precision - общее количество значащих цифр

        const num = 10.12345;
        console.log(num.toPrecision(3)); // '10.1'
        console.log(num.toPrecision(5)); // '10.123'

        const small = 0.000123456;
        console.log(small.toPrecision(2)); // '0.00012'

        const big = 123456;
        console.log(big.toPrecision(3)); // '1.23e+5'
            `
    },
    {
        highlight: ".toString()",
        isTop: true,
        content: "Возвращает строковое представление указанного объекта. Метод toString() объекта Number возвращает строку, представляющую указанное число",
        code:
            `
        //code
        //.toString([radix])
        //radix - основание системы счисления от 2 до 36

        const num = 123;
        console.log(num.toString()); // '123'

        console.log(num.toString(2)); // '1111011'
        console.log(num.toString(16)); // '7b'

        const floatNum = 12.5;
        console.log(floatNum.toString()); // '12.5'
            `
    },
    {
        highlight: ".valueOf()",
        content: "Возвращает примитивное значение указанного объекта. Метод valueOf() объекта Number возвращает примитивное значение объекта Number как число",
        code:
            `
        //code
        //Полезен, когда работаем с объектом-оберткой Number

        const wrapped = new Number(123);
        console.log(wrapped.valueOf()); // 123
        console.log(typeof wrapped); // 'object'
        console.log(typeof wrapped.valueOf()); // 'number'

        //В арифметике JS и так неявно приведет:
        console.log(wrapped + 7); // 130
        //Но valueOf() делает это явно:
        console.log(wrapped.valueOf() + 7); // 130
            `
    }
];



export const NumberMethods: React.FC<MethodProps> = ({numberItems = []}) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Number methods (Методы чисел)</NotesTitle>
            <Text>
                <S.List>
                    {numberItems.map((item, index) => (
                        <S.Item key={index}>
                            <S.HighlightedText
                                $isTop={item.isTop}
                                onClick={() => item.code && setSelectedCode(item.code)}>
                                {item.highlight}
                            </S.HighlightedText>: {item.content}
                        </S.Item>
                    ))}
                </S.List>
            </Text>
            {selectedCode && (
                <S.Overlay onClick={() => setSelectedCode(null)}>
                    <S.PopupWrapper>
                        <pre>
                            <code ref={codeRef} className="javascript">
                                {selectedCode.trim()}
                            </code>
                        </pre>
                    </S.PopupWrapper>
                </S.Overlay>
            )}
        </NoteBlock>
    );
};
