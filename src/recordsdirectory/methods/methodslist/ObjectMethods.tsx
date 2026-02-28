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
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        const keys = Object.keys(car);
        console.log(keys); // ['make', 'model', 'year']

        //Удобно для перебора
        keys.forEach((key) => {
            console.log(key, car[key]);
        });
            `
    },
    {
        highlight: ".values()",
        content: "Возвращает массив, содержащий значения всех перечисляемых свойств объекта",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        const values = Object.values(car);
        console.log(values); // ['Toyota', 'Camry', 2020]

        //Можно, например, суммировать числовые значения
        const stats = { a: 10, b: 20, c: 5 };
        const total = Object.values(stats).reduce((sum, n) => sum + n, 0);
        console.log(total); // 35
            `
    },
    {
        highlight: ".entries()",
        content: "Возвращает массив, содержащий пары [ключ, значение] для каждого свойства объекта",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        const entries = Object.entries(car);
        console.log(entries); // [['make', 'Toyota'], ['model', 'Camry'], ['year', 2020]]

        //Частый кейс - обратно собрать объект после фильтрации
        const filtered = Object.fromEntries(
            entries.filter(([key]) => key !== 'year')
        );
        console.log(filtered); // { make: 'Toyota', model: 'Camry' }
            `
    },
    {
        highlight: ".assign()",
        content: "Копирует все перечисляемые собственные свойства из одного или нескольких исходных объектов в целевой объект и возвращает целевой объект",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry' };
        const newCar = Object.assign({}, car, { year: 2020 });
        console.log(newCar); // { make: 'Toyota', model: 'Camry', year: 2020 }

        //Merge нескольких источников (справа приоритет)
        const defaults = { theme: 'light', lang: 'ru' };
        const user = { lang: 'en' };
        const settings = Object.assign({}, defaults, user);
        console.log(settings); // { theme: 'light', lang: 'en' }

        //Важно: копия поверхностная
        const source = { profile: { name: 'Ann' } };
        const copy = Object.assign({}, source);
        copy.profile.name = 'Kate';
        console.log(source.profile.name); // 'Kate'
            `
    },
    {
        highlight: ".create()",
        content: "Создает новый объект с указанным прототипом и свойствами",
        code: 
            `
        //code
        const vehicle = { wheels: 4 };
        const toyota = Object.create(vehicle);
        toyota.make = 'Toyota';

        console.log(toyota.wheels); // 4 (из прототипа)
        console.log(toyota.make); // 'Toyota'
        console.log(Object.getPrototypeOf(toyota) === vehicle); // true

        //Создание "чистого" объекта без прототипа
        const dict = Object.create(null);
        dict.key = 'value';
        console.log(dict.key); // 'value'
            `
    },
    {
        highlight: ".freeze()",
        content: "Запрещает добавление новых свойств к объекту, удаление старых свойств из объекта и изменение существующих свойств или их перечисляемости, настраиваемости и записываемости",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        Object.freeze(car);

        car.year = 2025; // игнорируется
        car.color = 'Red'; // игнорируется
        delete car.model; // игнорируется

        console.log(car); // { make: 'Toyota', model: 'Camry', year: 2020 }
        console.log(Object.isFrozen(car)); // true

        //Важно: freeze не делает deep freeze
        const user = { profile: { name: 'Ann' } };
        Object.freeze(user);
        user.profile.name = 'Kate';
        console.log(user.profile.name); // 'Kate'
            `
    },
    {
        highlight: ".seal()",
        content: "Запрещает добавление новых свойств к объекту и удаление старых свойств из объекта, но позволяет изменять значения существующих свойств",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        Object.seal(car);

        car.year = 2021; // можно
        car.color = 'Red'; // нельзя добавить
        delete car.model; // нельзя удалить

        console.log(car); // { make: 'Toyota', model: 'Camry', year: 2021 }
        console.log(Object.isSealed(car)); // true
            `
    },
    {
        highlight: ".isFrozen()",
        content: "Определяет, заморожен ли объект",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry' };
        console.log(Object.isFrozen(car)); // false

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
        const car = { make: 'Toyota', model: 'Camry' };
        console.log(Object.isSealed(car)); // false

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
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        console.log(car.hasOwnProperty('make')); // true
        console.log(car.hasOwnProperty('toString')); // false (это из прототипа)

        //Безопасный вариант:
        console.log(Object.prototype.hasOwnProperty.call(car, 'model')); // true
            `
    },
    {
        highlight: ".is()",
        content: "Сравнивает, являются ли два значения одинаковыми значениями",
        code: 
            `
        //code
        console.log(Object.is('foo', 'foo')); // true
        console.log(Object.is('foo', 'bar')); // false
        console.log(Object.is([], [])); // false

        //Отличия от ===
        console.log(Object.is(NaN, NaN)); // true
        console.log(NaN === NaN); // false

        console.log(Object.is(+0, -0)); // false
        console.log(+0 === -0); // true
            `
    },
    {
        highlight: ".isExtensible()",
        content: "Определяет, является ли объект расширяемым (то есть, могут ли к нему быть добавлены новые свойства)",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
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
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        Object.preventExtensions(car);

        car.color = 'Red'; // не добавится
        car.year = 2025; // менять существующее можно
        delete car.model; // удалять существующее можно

        console.log(car); // { make: 'Toyota', year: 2025 }
        console.log(Object.isExtensible(car)); // false
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
            <NotesTitle>Method Object</NotesTitle>
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


