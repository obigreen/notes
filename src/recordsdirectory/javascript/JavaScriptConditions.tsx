import React, {useMemo, useState} from "react";
import {Marker, NoteBlock, NoteLi, NoteUl, ParagraphTitle, Text, TextP, TypeTitle} from "../RecordsDirectory_Style";
import {JsPopupItem, JsPopupList} from "./JsPopupList";
import {S} from "../regex/Regex_Styles";

type ConditionRow = {
    pattern: string;
    useWhen: string;
    avoidWhen: string;
};

const conditionItems: JsPopupItem[] = [
    {
        highlight: "if / else if / else",
        content: "Базовый ветвящийся контроль потока для большинства бизнес-условий.",
        isTop: true,
        code: `
const score = 72;

if (score >= 90) {
  console.log('A');
} else if (score >= 75) {
  console.log('B');
} else {
  console.log('C');
}
`
    },
    {
        highlight: "switch",
        content: "Удобен, когда проверяем одно выражение на много фиксированных значений. Сопоставление case выполняется как строгое сравнение; без break/return выполнение продолжится в следующий case.",
        isTop: true,
        code: `
const role = 'editor';

switch (role) {
  case 'admin':
    console.log('all access');
    break;
  case 'editor':
    console.log('edit content');
    break;
  default:
    console.log('read only');
}
`
    },
    {
        highlight: "?: (ternary)",
        content: "Короткая форма условного выражения. Подходит для простых решений в 1 строку.",
        isTop: true,
        code: `
const isOnline = true;
const status = isOnline ? 'online' : 'offline';
console.log(status);
`
    },
    {
        highlight: "Guard clause",
        content: "Ранний выход из функции, если входные условия не подходят.",
        isTop: true,
        code: `
function createOrder(cart) {
  if (!cart?.items?.length) {
    return { ok: false, reason: 'empty cart' };
  }

  // основной сценарий без лишней вложенности
  return { ok: true, itemCount: cart.items.length };
}
`
    },
    {
        highlight: "Short-circuit (&& / ||)",
        content: "Короткое логическое вычисление возвращает один из операндов, а не обязательно boolean. Удобно для guard-выражений и fallback, если falsy-значения обработаны осознанно.",
        code: `
const isDev = true;
isDev && console.log('debug panel enabled');

const title = '';
const fallbackTitle = title || 'Untitled';
console.log(fallbackTitle); // Untitled
`
    },
    {
        highlight: "Nullish + optional chaining",
        content: "Безопасный условный доступ и fallback без потери валидных 0/false/''.",
        isTop: true,
        code: `
const response = { data: { total: 0 } };

const total = response?.data?.total ?? 100;
console.log(total); // 0 (а не 100)
`
    },
    {
        highlight: "Array.some / Array.every",
        content: "Условные проверки по массиву без ручных циклов.",
        isTop: true,
        code: `
const values = [2, 4, 6, 8];

const hasOdd = values.some((n) => n % 2 !== 0);
const allEven = values.every((n) => n % 2 === 0);

console.log(hasOdd); // false
console.log(allEven); // true
`
    }
];

const conditionRows: ConditionRow[] = [
    {
        pattern: "if / else",
        useWhen: "Нужно описать 2-4 читаемых ветки с разными проверками",
        avoidWhen: "Появляется длинная лестница из 8+ веток"
    },
    {
        pattern: "switch",
        useWhen: "Есть одна переменная и фиксированный набор значений",
        avoidWhen: "Условия сравнения сложные и зависят от нескольких полей"
    },
    {
        pattern: "ternary",
        useWhen: "Короткое выражение для значения/рендера",
        avoidWhen: "Вложенные ternary на несколько экранов"
    },
    {
        pattern: "guard clause",
        useWhen: "Нужно быстро отбросить невалидный вход",
        avoidWhen: "Нет явного основного сценария после guard"
    }
];

const ConditionsScoreDemo = () => {
    const [scoreInput, setScoreInput] = useState("72");

    const result = useMemo(() => {
        const normalized = scoreInput.trim();
        if (!normalized) {
            return "Введите число от 0 до 100";
        }

        const score = Number(normalized);
        if (!Number.isFinite(score) || score < 0 || score > 100) {
            return "Введите число от 0 до 100";
        }

        if (score >= 90) return "A";
        if (score >= 75) return "B";
        if (score >= 60) return "C";
        return "D";
    }, [scoreInput]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 1: `if / else if` как бизнес-правило</S.DemoTitle>
            <S.DemoHint>Пример с вычислением грейда по баллам.</S.DemoHint>
            <S.DemoLabel htmlFor="cond-score">Score</S.DemoLabel>
            <S.DemoInput
                id="cond-score"
                value={scoreInput}
                onChange={(event) => setScoreInput(event.currentTarget.value)}
            />
            <S.DemoOutput>{`Result: ${result}`}</S.DemoOutput>
        </S.DemoCard>
    );
};

const ConditionsSwitchDemo = () => {
    const [role, setRole] = useState("viewer");

    const permission = useMemo(() => {
        switch (role) {
            case "admin":
                return "manage users, edit settings, publish";
            case "editor":
                return "edit and publish content";
            case "viewer":
            default:
                return "read only";
        }
    }, [role]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 2: `switch` для role-based logic</S.DemoTitle>
            <S.DemoHint>Когда одно поле определяет сценарий, switch обычно читается лучше.</S.DemoHint>

            <S.DemoLabel htmlFor="cond-role">Role</S.DemoLabel>
            <S.DemoSelect id="cond-role" value={role} onChange={(event) => setRole(event.currentTarget.value)}>
                <option value="viewer">viewer</option>
                <option value="editor">editor</option>
                <option value="admin">admin</option>
            </S.DemoSelect>

            <S.DemoOutput>{permission}</S.DemoOutput>
        </S.DemoCard>
    );
};

export const JavaScriptConditions = () => {
    return (
        <>
            <TypeTitle>Conditions (Условия и ветвление)</TypeTitle>

            <NoteBlock>
                <Text>
                    <TextP>
                        Эта категория нужна, чтобы осознанно выбирать форму условия:
                        <Marker> if, switch, ternary, guard clause</Marker>.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Чем проще условие, тем проще сопровождать код через 3 месяца.</NoteLi>
                        <NoteLi>
                            В первую очередь выбирай читабельность, потом уже «короткость» записи.
                        </NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <JsPopupList
                title="Condition Patterns (Кликни по паттерну)"
                description="От базовых условий до практики с guard clause и проверками коллекций."
                items={conditionItems}
            />

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Таблица Выбора Конструкции</ParagraphTitle>
                    <S.TableWrap>
                        <S.NoteTable>
                            <thead>
                            <tr>
                                <S.TableHeadCell>Конструкция</S.TableHeadCell>
                                <S.TableHeadCell>Когда использовать</S.TableHeadCell>
                                <S.TableHeadCell>Когда не стоит</S.TableHeadCell>
                            </tr>
                            </thead>
                            <tbody>
                            {conditionRows.map((row) => (
                                <tr key={row.pattern}>
                                    <S.TableCell><S.TableToken>{row.pattern}</S.TableToken></S.TableCell>
                                    <S.TableCell>{row.useWhen}</S.TableCell>
                                    <S.TableCell>{row.avoidWhen}</S.TableCell>
                                </tr>
                            ))}
                            </tbody>
                        </S.NoteTable>
                    </S.TableWrap>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практика: Ветвление В Рабочих Сценариях</ParagraphTitle>
                    <S.DemoGrid>
                        <ConditionsScoreDemo/>
                        <ConditionsSwitchDemo/>
                    </S.DemoGrid>
                </Text>
            </NoteBlock>
        </>
    );
};
