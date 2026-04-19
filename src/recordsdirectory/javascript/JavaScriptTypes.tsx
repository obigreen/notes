import React, {useMemo, useState} from "react";
import {Marker, NoteBlock, NoteLi, NoteUl, ParagraphTitle, Text, TextP, TypeTitle} from "../RecordsDirectory_Style";
import {JsPopupItem, JsPopupList} from "./JsPopupList";
import {S} from "../regex/Regex_Styles";

type TypeRow = {
    caseName: string;
    result: string;
    recommendation: string;
};

const typesItems: JsPopupItem[] = [
    {
        highlight: "Number()",
        content: "Явное преобразование в число. Предсказуемее, чем неявная арифметическая магия.",
        isTop: true,
        code: `
console.log(Number('42')); // 42
console.log(Number('  3.14  ')); // 3.14
console.log(Number('')); // 0
console.log(Number('abc')); // NaN
`
    },
    {
        highlight: "parseInt / parseFloat",
        content: "Парсинг чисел из строк, когда в конце может быть текст/единицы измерения.",
        isTop: true,
        code: `
console.log(parseInt('42px', 10)); // 42
console.log(parseFloat('3.14rem')); // 3.14
console.log(parseInt('08', 10)); // 8
`
    },
    {
        highlight: "Number.isNaN",
        content: "Корректная проверка NaN после преобразования/вычислений.",
        isTop: true,
        code: `
const value = Number('abc');
console.log(Number.isNaN(value)); // true

// Глобальный isNaN делает неявное приведение
console.log(isNaN('abc')); // true
console.log(Number.isNaN('abc')); // false
`
    },
    {
        highlight: "Boolean() / !!",
        content: "Явное приведение к boolean для условий, фильтрации и состояния.",
        code: `
console.log(Boolean('text')); // true
console.log(Boolean('')); // false
console.log(!!0); // false
console.log(!!1); // true
`
    },
    {
        highlight: "String()",
        content: "Безопасное преобразование значений в строку перед выводом или сериализацией.",
        code: `
console.log(String(123)); // '123'
console.log(String(null)); // 'null'
console.log(String(undefined)); // 'undefined'
`
    },
    {
        highlight: "JSON.parse / stringify",
        content: "Преобразование между объектом и JSON. Ошибки parse нужно ловить через try/catch.",
        isTop: true,
        code: `
const payload = { id: 1, name: 'Sergey' };
const raw = JSON.stringify(payload);
console.log(raw);

const parsed = JSON.parse(raw);
console.log(parsed.name);
`
    },
    {
        highlight: "BigInt",
        content: "Для больших целых чисел вне безопасного диапазона Number.",
        code: `
const unsafe = Number.MAX_SAFE_INTEGER + 1;
console.log(unsafe === unsafe + 1); // true (потеря точности)

const precise = 9007199254740993n;
console.log(precise + 1n); // 9007199254740994n
`
    },
    {
        highlight: "Date parsing",
        content: "Работай с датами аккуратно: ISO-формат предсказуемее локальных строк.",
        code: `
const iso = '2026-04-19T10:00:00Z';
const date = new Date(iso);
console.log(date.toISOString());

// Нестандартизованные строки парсятся по-разному в разных окружениях
`
    }
];

const typeRows: TypeRow[] = [
    {
        caseName: "'42' -> число",
        result: "Number('42') -> 42",
        recommendation: "Для строгого парсинга используй Number + Number.isNaN"
    },
    {
        caseName: "'42px' -> число",
        result: "parseInt('42px', 10) -> 42",
        recommendation: "UI-единицы лучше через parseInt/parseFloat"
    },
    {
        caseName: "'' -> число",
        result: "Number('') -> 0",
        recommendation: "Перед преобразованием часто нужен trim + явная проверка пустой строки"
    },
    {
        caseName: "'abc' -> число",
        result: "Number('abc') -> NaN",
        recommendation: "Проверяй Number.isNaN"
    }
];

const TypesConvertDemo = () => {
    const [raw, setRaw] = useState("42px");

    const result = useMemo(() => {
        const numberValue = Number(raw);
        const intValue = parseInt(raw, 10);
        const floatValue = parseFloat(raw);

        return {
            numberValue,
            intValue,
            floatValue,
            isNumberNaN: Number.isNaN(numberValue)
        };
    }, [raw]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 1: Преобразование строки в число</S.DemoTitle>
            <S.DemoHint>Сравни Number / parseInt / parseFloat на одном и том же вводе.</S.DemoHint>
            <S.DemoLabel htmlFor="types-raw">Input</S.DemoLabel>
            <S.DemoInput id="types-raw" value={raw} onChange={(event) => setRaw(event.currentTarget.value)} />
            <S.DemoOutput>{`Number -> ${String(result.numberValue)}\nparseInt -> ${String(result.intValue)}\nparseFloat -> ${String(result.floatValue)}\nNumber.isNaN(Number(...)) -> ${String(result.isNumberNaN)}`}</S.DemoOutput>
        </S.DemoCard>
    );
};

const TypesTruthyDemo = () => {
    const [value, setValue] = useState("0");

    const bool = useMemo(() => {
        const map: Record<string, unknown> = {
            "0": 0,
            "1": 1,
            "''": "",
            "text": "text",
            "null": null,
            "undefined": undefined,
            "false": false,
            "true": true
        };

        const selected = map[value];
        return {
            selected,
            asBoolean: Boolean(selected)
        };
    }, [value]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 2: Truthy / Falsy</S.DemoTitle>
            <S.DemoHint>Показывает, как JS ведет себя в условиях при разных значениях.</S.DemoHint>
            <S.DemoLabel htmlFor="types-truthy">Value</S.DemoLabel>
            <S.DemoSelect id="types-truthy" value={value} onChange={(event) => setValue(event.currentTarget.value)}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="''">''</option>
                <option value="text">text</option>
                <option value="null">null</option>
                <option value="undefined">undefined</option>
                <option value="false">false</option>
                <option value="true">true</option>
            </S.DemoSelect>
            <S.DemoOutput>{`Boolean(value) -> ${String(bool.asBoolean)}`}</S.DemoOutput>
        </S.DemoCard>
    );
};

export const JavaScriptTypes = () => {
    return (
        <>
            <TypeTitle>Types (Типы и преобразования)</TypeTitle>

            <NoteBlock>
                <Text>
                    <TextP>
                        Эта категория закрывает один из главных источников багов: неявные преобразования типов.
                        Здесь важно знать не только <Marker>как</Marker> преобразовать значение, но и
                        <Marker> когда лучше этого не делать автоматически</Marker>.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Преобразование делай явно (`Number`, `String`, `Boolean`).</NoteLi>
                        <NoteLi>После Number всегда учитывай возможность NaN.</NoteLi>
                        <NoteLi>Для чисел из UI-строк с единицами используй parseInt/parseFloat.</NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <JsPopupList
                title="Type Patterns (Кликни по элементу)"
                description="Ключевые операции по типам и преобразованиям с практическими примерами."
                items={typesItems}
            />

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Таблица: Частые Преобразования</ParagraphTitle>
                    <S.TableWrap>
                        <S.NoteTable>
                            <thead>
                            <tr>
                                <S.TableHeadCell>Сценарий</S.TableHeadCell>
                                <S.TableHeadCell>Что получим</S.TableHeadCell>
                                <S.TableHeadCell>Как делать в проекте</S.TableHeadCell>
                            </tr>
                            </thead>
                            <tbody>
                            {typeRows.map((row) => (
                                <tr key={row.caseName}>
                                    <S.TableCell><S.TableToken>{row.caseName}</S.TableToken></S.TableCell>
                                    <S.TableCell>{row.result}</S.TableCell>
                                    <S.TableCell>{row.recommendation}</S.TableCell>
                                </tr>
                            ))}
                            </tbody>
                        </S.NoteTable>
                    </S.TableWrap>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практика: Конвертация и Проверки</ParagraphTitle>
                    <S.DemoGrid>
                        <TypesConvertDemo/>
                        <TypesTruthyDemo/>
                    </S.DemoGrid>
                </Text>
            </NoteBlock>
        </>
    );
};
