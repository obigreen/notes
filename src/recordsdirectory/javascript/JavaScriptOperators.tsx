import React, {useMemo, useState} from "react";
import {Marker, NoteBlock, NoteLi, NoteUl, ParagraphTitle, Text, TextP, TypeTitle} from "../RecordsDirectory_Style";
import {JsPopupItem, JsPopupList} from "./JsPopupList";
import {S} from "../regex/Regex_Styles";

type OperatorRow = {
    token: string;
    meaning: string;
    example: string;
};

const operatorItems: JsPopupItem[] = [
    {
        highlight: "= / += / -= / *= / /=",
        content: "Операторы присваивания: обычное и комбинированное присваивание.",
        isTop: true,
        code: `
let count = 10;
count += 2; // 12
count -= 1; // 11
count *= 3; // 33
count /= 11; // 3
`
    },
    {
        highlight: "++ / --",
        content: "Инкремент и декремент. В префиксной и постфиксной форме ведут себя по-разному.",
        isTop: true,
        code: `
let a = 1;
console.log(++a); // 2 (сначала увеличили)

let b = 1;
console.log(b++); // 1 (сначала вернули старое)
console.log(b);   // 2
`
    },
    {
        highlight: "=== / !==",
        content: "Строгое сравнение без неявного приведения типов.",
        isTop: true,
        code: `
console.log(0 === false); // false
console.log('10' === 10); // false
console.log('10' !== 10); // true
`
    },
    {
        highlight: "> / < / >= / <=",
        content: "Операторы сравнения чисел, строк и дат.",
        code: `
console.log(10 > 2); // true
console.log('b' > 'a'); // true

const start = new Date('2026-01-01');
const end = new Date('2026-12-31');
console.log(end > start); // true
`
    },
    {
        highlight: "&&",
        content: "Логическое И. Истина, только если оба операнда truthy.",
        isTop: true,
        code: `
const isLoggedIn = true;
const hasAccess = false;

console.log(isLoggedIn && hasAccess); // false

// Практика: guard для запуска действия
isLoggedIn && console.log('fetch profile');
`
    },
    {
        highlight: "||",
        content: "Логическое ИЛИ. Возвращает первый truthy-операнд.",
        isTop: true,
        code: `
const name = '';
const fallback = name || 'Guest';
console.log(fallback); // Guest

// Осторожно: 0/false/'' тоже считаются falsy
const count = 0;
console.log(count || 10); // 10
`
    },
    {
        highlight: "!",
        content: "Логическое НЕ. Инвертирует truthy/falsy значение.",
        isTop: true,
        code: `
const isActive = false;
console.log(!isActive); // true

// Часто для булевизации
console.log(!!'text'); // true
console.log(!!''); // false
`
    },
    {
        highlight: "?? (nullish coalescing)",
        content: "Возвращает правую часть только если слева null/undefined.",
        isTop: true,
        code: `
const count = 0;
console.log(count || 100); // 100 (нежелательно)
console.log(count ?? 100); // 0 (корректно)

const title = null;
console.log(title ?? 'Untitled'); // Untitled
`
    },
    {
        highlight: "?. (optional chaining)",
        content: "Безопасный доступ к вложенным полям и методам.",
        isTop: true,
        code: `
const profile = { settings: { locale: 'ru' } };
console.log(profile.settings?.locale); // 'ru'
console.log(profile.contacts?.email); // undefined

const onSave = null;
onSave?.(); // не падает
`
    },
    {
        highlight: "?: (ternary)",
        content: "Короткая форма if/else для выражений.",
        isTop: true,
        code: `
const age = 20;
const label = age >= 18 ? 'adult' : 'minor';
console.log(label);
`
    },
    {
        highlight: "typeof / instanceof / in",
        content: "Проверки типа и наличия поля.",
        isTop: true,
        code: `
console.log(typeof 'hello'); // string
console.log([] instanceof Array); // true
console.log('name' in { name: 'Sergey' }); // true
`
    },
    {
        highlight: "delete",
        content: "Удаление свойства объекта (использовать осторожно на hot-path).",
        code: `
const user = { id: 1, name: 'Ann', temp: true };
delete user.temp;
console.log(user); // { id: 1, name: 'Ann' }
`
    }
];

const operatorRows: OperatorRow[] = [
    {token: "===", meaning: "Строгое сравнение", example: "a === b"},
    {token: "!==", meaning: "Строгое неравенство", example: "a !== b"},
    {token: "&&", meaning: "Логическое И", example: "isAuth && isAdmin"},
    {token: "||", meaning: "Логическое ИЛИ", example: "title || 'Untitled'"},
    {token: "!", meaning: "Логическое НЕ", example: "!isLoading"},
    {token: "??", meaning: "Подстановка только для null/undefined", example: "value ?? defaultValue"},
    {token: "?.", meaning: "Безопасный доступ", example: "obj?.a?.b"},
    {token: "?:", meaning: "Тернарный оператор", example: "isOk ? 'yes' : 'no'"},
    {token: "in", meaning: "Проверка свойства в объекте", example: "'id' in user"},
    {token: "instanceof", meaning: "Проверка прототипной цепочки", example: "value instanceof Date"}
];

const renderTable = () => (
    <S.TableWrap>
        <S.NoteTable>
            <thead>
            <tr>
                <S.TableHeadCell>Оператор</S.TableHeadCell>
                <S.TableHeadCell>Назначение</S.TableHeadCell>
                <S.TableHeadCell>Пример</S.TableHeadCell>
            </tr>
            </thead>
            <tbody>
            {operatorRows.map((row) => (
                <tr key={row.token}>
                    <S.TableCell><S.TableToken>{row.token}</S.TableToken></S.TableCell>
                    <S.TableCell>{row.meaning}</S.TableCell>
                    <S.TableCell><S.TableToken>{row.example}</S.TableToken></S.TableCell>
                </tr>
            ))}
            </tbody>
        </S.NoteTable>
    </S.TableWrap>
);

const parseValue = (value: string): unknown => {
    if (value === "undefined") return undefined;
    if (value === "null") return null;
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "''") return "";
    if (value === "0") return 0;
    if (value === "'0'") return "0";
    return value;
};

const OperatorsCompareDemo = () => {
    const [left, setLeft] = useState("0");
    const [right, setRight] = useState("false");

    const result = useMemo(() => {
        const leftValue = parseValue(left);
        const rightValue = parseValue(right);

        return {
            // eslint-disable-next-line eqeqeq
            loose: (leftValue as any) == (rightValue as any),
            strict: leftValue === rightValue
        };
    }, [left, right]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 1: `==` vs `===`</S.DemoTitle>
            <S.DemoHint>
                Показывает, как loose equality делает приведение типов и почему в прод-коде почти всегда нужен
                <S.TableToken>===</S.TableToken>.
            </S.DemoHint>

            <S.DemoLabel htmlFor="op-left">Left</S.DemoLabel>
            <S.DemoSelect id="op-left" value={left} onChange={(event) => setLeft(event.currentTarget.value)}>
                <option value="0">0</option>
                <option value="'0'">'0'</option>
                <option value="false">false</option>
                <option value="true">true</option>
                <option value="null">null</option>
                <option value="undefined">undefined</option>
                <option value="''">''</option>
            </S.DemoSelect>

            <S.DemoLabel htmlFor="op-right">Right</S.DemoLabel>
            <S.DemoSelect id="op-right" value={right} onChange={(event) => setRight(event.currentTarget.value)}>
                <option value="0">0</option>
                <option value="'0'">'0'</option>
                <option value="false">false</option>
                <option value="true">true</option>
                <option value="null">null</option>
                <option value="undefined">undefined</option>
                <option value="''">''</option>
            </S.DemoSelect>

            <S.DemoOutput>{`==  -> ${String(result.loose)}\n=== -> ${String(result.strict)}`}</S.DemoOutput>
        </S.DemoCard>
    );
};

const OperatorsNullishDemo = () => {
    const [raw, setRaw] = useState("0");

    const output = useMemo(() => {
        const value = parseValue(raw) as any;
        return {
            orResult: value || "fallback",
            nullishResult: value ?? "fallback"
        };
    }, [raw]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 2: `||` vs `??`</S.DemoTitle>
            <S.DemoHint>
                Для значений <S.TableToken>0</S.TableToken>, <S.TableToken>''</S.TableToken>, <S.TableToken>false</S.TableToken>
                чаще нужен <S.TableToken>??</S.TableToken>, иначе `||` перезапишет их fallback-ом.
            </S.DemoHint>

            <S.DemoLabel htmlFor="op-nullish">Value</S.DemoLabel>
            <S.DemoSelect id="op-nullish" value={raw} onChange={(event) => setRaw(event.currentTarget.value)}>
                <option value="0">0</option>
                <option value="''">''</option>
                <option value="false">false</option>
                <option value="null">null</option>
                <option value="undefined">undefined</option>
                <option value="hello">hello</option>
            </S.DemoSelect>

            <S.DemoOutput>{`value || 'fallback' -> ${String(output.orResult)}\nvalue ?? 'fallback' -> ${String(output.nullishResult)}`}</S.DemoOutput>
        </S.DemoCard>
    );
};

export const JavaScriptOperators = () => {
    return (
        <>
            <TypeTitle>Operators (Операторы и выражения)</TypeTitle>

            <NoteBlock>
                <Text>
                    <TextP>
                        Это отдельная базовая категория JavaScript. Именно операторы определяют,
                        <Marker> как вычисляется выражение</Marker>, что будет приведено к типу и почему условие
                        сработало или нет.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Для проверок почти всегда используй <Marker>=== / !==</Marker>.</NoteLi>
                        <NoteLi>
                            Для fallback по данным из API/form выбирай <Marker>??</Marker>, а не `||`, если 0/''/false
                            являются валидными значениями.
                        </NoteLi>
                        <NoteLi>Тернарный оператор хорош для коротких выражений, но не для сложной бизнес-логики.</NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <JsPopupList
                title="Operator Cheatsheet (Кликни по оператору)"
                description="Список базовых операторов с примерами от простого к рабочему кейсу."
                items={operatorItems}
            />

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Таблица Быстрого Выбора</ParagraphTitle>
                    {renderTable()}
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практика: Операторы В Действии</ParagraphTitle>
                    <S.DemoGrid>
                        <OperatorsCompareDemo/>
                        <OperatorsNullishDemo/>
                    </S.DemoGrid>
                </Text>
            </NoteBlock>
        </>
    );
};
