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
        isTop?: boolean;
    }>;
};

export const objectItems = [
    {
        highlight: "Object.keys()",
        isTop: true,
        content: "Возвращает имена собственных перечисляемых свойств со строковыми ключами. Унаследованные, неперечисляемые и Symbol-свойства не входят",
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

        const inherited = Object.create({ fromPrototype: true });
        inherited.own = 1;
        Object.defineProperty(inherited, 'hidden', { value: 2, enumerable: false });
        inherited[Symbol('token')] = 3;
        console.log(Object.keys(inherited)); // ['own']
            `
    },
    {
        highlight: "Object.values()",
        isTop: true,
        content: "Возвращает значения собственных перечисляемых свойств со строковыми ключами. Унаследованные, неперечисляемые и Symbol-свойства не входят",
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
        highlight: "Object.entries()",
        isTop: true,
        content: "Возвращает пары [ключ, значение] собственных перечисляемых свойств со строковыми ключами. Symbol-ключи, inherited и non-enumerable свойства не входят",
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
        highlight: "Object.fromEntries()",
        isTop: true,
        content: "Собирает объект из iterable пар [ключ, значение] со строковыми или Symbol-ключами. Часто используется после map()/filter() над entries.",
        code:
            `
        //code
        const params = new URLSearchParams('page=2&sort=price');
        const queryObject = Object.fromEntries(params.entries());
        console.log(queryObject); // { page: '2', sort: 'price' }

        //Классический pipeline: entries -> filter -> fromEntries
        const raw = { q: 'react', page: '', sort: 'date' };
        const cleaned = Object.fromEntries(
            Object.entries(raw).filter(([, value]) => value !== '')
        );
        console.log(cleaned); // { q: 'react', sort: 'date' }
            `
    },
    {
        highlight: "Object.assign()",
        isTop: true,
        content: "Копирует собственные перечисляемые свойства со строковыми и Symbol-ключами из источников в target и возвращает тот же target. Копирование поверхностное",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry' };
        const target = {};
        const newCar = Object.assign(target, car, { year: 2020 });
        console.log(newCar); // { make: 'Toyota', model: 'Camry', year: 2020 }
        console.log(newCar === target); // true

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
        highlight: "Object.create()",
        isTop: true,
        content: "Создает новый объект с указанным прототипом и необязательными дескрипторами собственных свойств",
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
        highlight: "Object.freeze()",
        isTop: true,
        content: "Делает объект нерасширяемым, его собственные свойства — non-configurable, а data-свойства — non-writable. Операция поверхностная; в strict mode запрещенная запись/добавление/удаление бросает TypeError",
        code: 
            `
        //code
        'use strict';
        //ES-модули (включая React-код) работают в strict mode.
        //В classic script без strict эти запрещенные операции обычно завершились бы молча.

        const attempt = (label, action) => {
            try {
                action();
            } catch (error) {
                console.log(label, error.name); // TypeError
            }
        };

        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        const frozenCar = Object.freeze(car);
        console.log(frozenCar === car); // true

        attempt('change', () => {
            car.year = 2025;
        });
        attempt('add', () => {
            car.color = 'Red';
        });
        attempt('delete', () => {
            delete car.model;
        });

        console.log(car); // { make: 'Toyota', model: 'Camry', year: 2020 }
        console.log(Object.isFrozen(car)); // true

        //Важно: freeze не делает deep freeze
        const user = { profile: { name: 'Ann' } };
        Object.freeze(user);
        user.profile.name = 'Kate'; // вложенный объект не заморожен
        console.log(user.profile.name); // 'Kate'
            `
    },
    {
        highlight: "Object.seal()",
        content: "Делает объект нерасширяемым и все его собственные свойства non-configurable, но сохраняет writable у существующих data-свойств. В strict mode добавление и удаление бросают TypeError",
        code: 
            `
        //code
        'use strict';
        //ES-модули (включая React-код) работают в strict mode.
        //В classic script без strict добавление/удаление обычно завершилось бы молча.

        const attempt = (label, action) => {
            try {
                action();
            } catch (error) {
                console.log(label, error.name); // TypeError
            }
        };

        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        const sealedCar = Object.seal(car);
        console.log(sealedCar === car); // true

        car.year = 2021; // можно
        attempt('add', () => {
            car.color = 'Red';
        });
        attempt('delete', () => {
            delete car.model;
        });

        console.log(car); // { make: 'Toyota', model: 'Camry', year: 2021 }
        console.log(Object.isSealed(car)); // true
            `
    },
    {
        highlight: "Object.isFrozen()",
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
        highlight: "Object.isSealed()",
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
        highlight: "Object.hasOwn() / .hasOwnProperty()",
        isTop: true,
        content: "Возвращает логическое значение, указывающее, содержит ли объект указанное свойство в качестве собственного свойства",
        code: 
            `
        //code
        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        console.log(car.hasOwnProperty('make')); // true
        console.log(car.hasOwnProperty('toString')); // false (это из прототипа)

        //Современный безопасный вариант, в том числе для Object.create(null):
        console.log(Object.hasOwn(car, 'model')); // true

        //Совместимый безопасный вариант для старых окружений:
        console.log(Object.prototype.hasOwnProperty.call(car, 'model')); // true
            `
    },
    {
        highlight: "Object.is()",
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
        highlight: "Object.isExtensible()",
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
        highlight: "Object.preventExtensions()",
        content: "Запрещает добавлять новые свойства, но не запрещает менять и удалять существующие. В strict mode попытка добавить свойство бросает TypeError",
        code: 
            `
        //code
        'use strict';
        //ES-модули (включая React-код) работают в strict mode.
        //В classic script без strict добавление обычно завершилось бы молча.

        const car = { make: 'Toyota', model: 'Camry', year: 2020 };
        const sameCar = Object.preventExtensions(car);
        console.log(sameCar === car); // true

        try {
            car.color = 'Red';
        } catch (error) {
            console.log(error.name); // TypeError
        }
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
            <NotesTitle>Object methods (Методы объектов)</NotesTitle>
            <Text>
                <S.List>
                    {objectItems.map((item, index) => (
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
