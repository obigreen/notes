import React, {useMemo, useState} from "react";
import {Marker, NoteBlock, NoteLi, NoteUl, ParagraphTitle, Text, TextP, TypeTitle} from "../RecordsDirectory_Style";
import {JsPopupItem, JsPopupList} from "./JsPopupList";
import {S} from "../regex/Regex_Styles";

type LoopRow = {
    syntax: string;
    bestFor: string;
    pitfalls: string;
};

const loopItems: JsPopupItem[] = [
    {
        highlight: "for",
        content: "Универсальный цикл, когда нужен индекс, break/continue и полный контроль.",
        isTop: true,
        code: `
const arr = ['a', 'b', 'c'];
for (let i = 0; i < arr.length; i += 1) {
  if (arr[i] === 'b') continue;
  console.log(i, arr[i]);
}
`
    },
    {
        highlight: "while",
        content: "Повторять, пока условие true. Хорошо для неизвестного заранее количества шагов.",
        isTop: true,
        code: `
let attempts = 0;
while (attempts < 3) {
  attempts += 1;
  console.log('try', attempts);
}
`
    },
    {
        highlight: "do...while",
        content: "Как минимум один запуск тела цикла, затем проверка условия.",
        code: `
let value = 0;
do {
  value += 1;
} while (value < 1);
console.log(value); // 1
`
    },
    {
        highlight: "for...of",
        content: "Итерация по значениям iterable (Array, String, Map, Set).",
        isTop: true,
        code: `
const list = ['html', 'css', 'js'];
for (const item of list) {
  console.log(item);
}
`
    },
    {
        highlight: "for...in",
        content: "Итерация по ключам объекта. Для массивов обычно не используется.",
        code: `
const user = { id: 1, name: 'Sergey' };
for (const key in user) {
  console.log(key, user[key]);
}
`
    },
    {
        highlight: "forEach",
        content: "Перебор массива без break/continue. Удобно для сайд-эффектов.",
        isTop: true,
        code: `
const ids = [1, 2, 3];
ids.forEach((id) => {
  console.log('send metric for id', id);
});
`
    },
    {
        highlight: "map / filter / reduce",
        content: "Функциональная альтернатива классическим циклам для преобразования данных.",
        isTop: true,
        code: `
const users = [
  { id: 1, active: true },
  { id: 2, active: false }
];

const activeIds = users
  .filter((user) => user.active)
  .map((user) => user.id);

console.log(activeIds); // [1]
`
    },
    {
        highlight: "NodeList iteration",
        content: "NodeList можно обходить через for...of и forEach. Коллекции HTMLCollection часто приводят к Array.",
        isTop: true,
        code: `
const nodes = document.querySelectorAll('.item'); // NodeList
for (const node of nodes) {
  node.classList.add('is-ready');
}

// Для HTMLCollection:
const live = document.getElementsByClassName('item');
Array.from(live).forEach((node) => node.classList.add('is-live'));
`
    },
    {
        highlight: "break / continue",
        content: "Управление потоком внутри цикла.",
        code: `
for (let i = 0; i < 10; i += 1) {
  if (i === 2) continue; // пропускаем шаг
  if (i === 6) break; // полностью выходим
  console.log(i);
}
`
    }
];

const loopRows: LoopRow[] = [
    {
        syntax: "for",
        bestFor: "Нужен индекс, break/continue, точный контроль шага",
        pitfalls: "Легко ошибиться в условии и сделать бесконечный цикл"
    },
    {
        syntax: "for...of",
        bestFor: "Чистый проход по значениям массива/строки/Set/Map",
        pitfalls: "Не дает индекс напрямую (нужен entries())"
    },
    {
        syntax: "forEach",
        bestFor: "Сайд-эффекты: лог, отправка метрик, изменение DOM",
        pitfalls: "Нельзя break/continue и неудобно с async/await"
    },
    {
        syntax: "map/filter/reduce",
        bestFor: "Преобразование данных без мутации",
        pitfalls: "Неподходяще для тяжелых сайд-эффектов"
    },
    {
        syntax: "for...in",
        bestFor: "Перебор ключей объекта",
        pitfalls: "Для массивов часто дает неожиданный порядок/поведение"
    }
];

const LoopsArrayDemo = () => {
    const [raw, setRaw] = useState("5,12,7,20,1");

    const output = useMemo(() => {
        const parsed = raw
            .split(",")
            .map((value) => Number(value.trim()))
            .filter((value) => Number.isFinite(value));

        const evenByFor: number[] = [];
        for (let i = 0; i < parsed.length; i += 1) {
            if (parsed[i] % 2 === 0) {
                evenByFor.push(parsed[i]);
            }
        }

        const evenByFilter = parsed.filter((n) => n % 2 === 0);

        return {
            parsed,
            evenByFor,
            evenByFilter
        };
    }, [raw]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 1: `for` vs `filter`</S.DemoTitle>
            <S.DemoHint>Одна и та же задача двумя подходами: императивно и функционально.</S.DemoHint>
            <S.DemoLabel htmlFor="loops-raw">Numbers (comma separated)</S.DemoLabel>
            <S.DemoInput
                id="loops-raw"
                value={raw}
                onChange={(event) => setRaw(event.currentTarget.value)}
            />
            <S.DemoOutput>{`source -> [${output.parsed.join(", ")}]\nfor -> [${output.evenByFor.join(", ")}]\nfilter -> [${output.evenByFilter.join(", ")}]`}</S.DemoOutput>
        </S.DemoCard>
    );
};

const LoopsNodeListDemo = () => {
    const [items] = useState(["Inbox", "Archive", "Trash"]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const codePreview = useMemo(() => {
        return items
            .map((label, index) => {
                const marker = index === selectedIndex ? "<-- active" : "";
                return `${index}: ${label} ${marker}`.trim();
            })
            .join("\n");
    }, [items, selectedIndex]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 2: Индексация элементов как в цикле</S.DemoTitle>
            <S.DemoHint>Моделирует работу с меню/табами, где важен индекс текущего элемента.</S.DemoHint>

            <S.DemoLabel htmlFor="loops-index">Active index</S.DemoLabel>
            <S.DemoSelect
                id="loops-index"
                value={String(selectedIndex)}
                onChange={(event) => setSelectedIndex(Number(event.currentTarget.value))}
            >
                {items.map((_, index) => (
                    <option key={index} value={String(index)}>{index}</option>
                ))}
            </S.DemoSelect>

            <S.DemoOutput>{codePreview}</S.DemoOutput>
        </S.DemoCard>
    );
};

export const JavaScriptLoops = () => {
    return (
        <>
            <TypeTitle>Loops (Циклы и обход коллекций)</TypeTitle>

            <NoteBlock>
                <Text>
                    <TextP>
                        Циклы - это не только <Marker>for/while</Marker>. В реальном JavaScript очень часто используются
                        <Marker> map/filter/reduce</Marker> и обход DOM-коллекций.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Для объектов чаще `for...in` + `Object.keys/entries`.</NoteLi>
                        <NoteLi>Для массивов чаще `for...of` или методы массива.</NoteLi>
                        <NoteLi>Для DOM-коллекций учитывай разницу между NodeList и HTMLCollection.</NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <JsPopupList
                title="Loop Patterns (Кликни по паттерну)"
                description="От базовых циклов до работы с коллекциями и управлением потоком break/continue."
                items={loopItems}
            />

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Таблица: Какой Цикл Когда Выбирать</ParagraphTitle>
                    <S.TableWrap>
                        <S.NoteTable>
                            <thead>
                            <tr>
                                <S.TableHeadCell>Конструкция</S.TableHeadCell>
                                <S.TableHeadCell>Лучше всего подходит для</S.TableHeadCell>
                                <S.TableHeadCell>Риск/ограничение</S.TableHeadCell>
                            </tr>
                            </thead>
                            <tbody>
                            {loopRows.map((row) => (
                                <tr key={row.syntax}>
                                    <S.TableCell><S.TableToken>{row.syntax}</S.TableToken></S.TableCell>
                                    <S.TableCell>{row.bestFor}</S.TableCell>
                                    <S.TableCell>{row.pitfalls}</S.TableCell>
                                </tr>
                            ))}
                            </tbody>
                        </S.NoteTable>
                    </S.TableWrap>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практика: Циклы На Реальных Мини-Кейсах</ParagraphTitle>
                    <S.DemoGrid>
                        <LoopsArrayDemo/>
                        <LoopsNodeListDemo/>
                    </S.DemoGrid>
                </Text>
            </NoteBlock>
        </>
    );
};
