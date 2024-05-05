import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    objectItems?: Array<{
        highlight: string;
        content: string;
        code: string;
    }>;
};

export const objectItems = [
    {
        highlight: ".keys()",
        content: "Возвращает массив, содержащий имена всех перечисляемых свойств объекта",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        let keys = Object.keys(car);
        console.log(keys); // ['make', 'model', 'year']
            `
    },
    {
        highlight: ".values()",
        content: "Возвращает массив, содержащий значения всех перечисляемых свойств объекта",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        let values = Object.values(car);
        console.log(values); // ['Toyota', 'Camry', 2020]
            `
    },
    {
        highlight: ".entries()",
        content: "Возвращает массив, содержащий пары [ключ, значение] для каждого свойства объекта",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        let entries = Object.entries(car);
        console.log(entries); // [['make', 'Toyota'], ['model', 'Camry'], ['year', 2020]]
            `
    },
    {
        highlight: ".assign()",
        content: "Копирует все перечисляемые собственные свойства из одного или нескольких исходных объектов в целевой объект и возвращает целевой объект",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry'};
        let newCar = Object.assign({}, car, {year: 2020});
        console.log(newCar); // {make: 'Toyota', model: 'Camry', year: 2020}
            `
    },
    {
        highlight: ".create()",
        content: "Создает новый объект с указанным прототипом и свойствами",
        code: 
            `
        //code
        let car = {wheels: 4};
        let toyota = Object.create(car);
        toyota.make = 'Toyota';
        console.log(toyota.wheels); // 4
        console.log(toyota.make); // 'Toyota'
            `
    },
    {
        highlight: ".freeze()",
        content: "Запрещает добавление новых свойств к объекту, удаление старых свойств из объекта и изменение существующих свойств или их перечисляемости, настраиваемости и записываемости",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        Object.freeze(car);
        car.color = 'Red'; // будет проигнорировано, потому что объект заморожен
        console.log(car); // {make: 'Toyota', model: 'Camry', year: 2020}
            `
    },
    {
        highlight: ".seal()",
        content: "Запрещает добавление новых свойств к объекту и удаление старых свойств из объекта, но позволяет изменять значения существующих свойств",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        Object.seal(car);
        car.year = 2021; // допустимо, потому что свойство уже существует в объекте
        car.color = 'Red'; // будет проигнорировано, потому что новые свойства нельзя добавить
        console.log(car); // {make: 'Toyota', model: 'Camry', year: 2021}
            `
    },
    {
        highlight: ".isFrozen()",
        content: "Определяет, заморожен ли объект",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        Object.freeze(car);
        console.log(Object.isFrozen(car)); // true
            `
    },
    {
        highlight: ".isSealed()",
        content: "Определяет, запечатан ли объект",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        Object.seal(car);
        console.log(Object.isSealed(car)); // true
            `
    },
    {
        highlight: ".hasOwnProperty()",
        content: "Возвращает логическое значение, указывающее, содержит ли объект указанное свойство в качестве собственного свойства",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        console.log(car.hasOwnProperty('make')); // true
        console.log(car.hasOwnProperty('color')); // false
            `
    },
    {
        highlight: ".is()",
        content: "Сравнивает, являются ли два значения одинаковыми значениями",
        code: 
            `
        //code
        console.log(Object.is('foo', 'foo'));     // true
        console.log(Object.is(window, window));   // true
        console.log(Object.is('foo', 'bar'));     // false
        console.log(Object.is([], []));           // false
            `
    },
    {
        highlight: ".isExtensible()",
        content: "Определяет, является ли объект расширяемым (то есть, могут ли к нему быть добавлены новые свойства)",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        console.log(Object.isExtensible(car)); // true
        Object.preventExtensions(car);
        console.log(Object.isExtensible(car)); // false
            `
    },
    {
        highlight: ".preventExtensions()",
        content: "Запрещает любые расширения объекта",
        code: 
            `
        //code
        let car = {make: 'Toyota', model: 'Camry', year: 2020};
        Object.preventExtensions(car);
        car.color = 'Red'; // будет проигнорировано, потому что объект не расширяем
        console.log(car); // {make: 'Toyota', model: 'Camry', year: 2020}
            `
    }
];




export const ObjectMethods: React.FC<MethodProps> = ({objectItems = []}) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Method Objeks</NotesTitle>
            <Text>
                <S.List>
                    {objectItems.map((item, index) => (
                        <S.Item key={index}>
                            <S.HighlightedText
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



