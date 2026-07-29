import React, {useMemo, useState} from "react";
import {NoteBlock, NoteLi, NoteUl, ParagraphTitle, Text, TextP, TypeTitle} from "../RecordsDirectory_Style";
import {JsPopupItem, JsPopupList} from "./JsPopupList";
import {S} from "../regex/Regex_Styles";

type ErrorRow = {
    layer: string;
    what: string;
    recommendation: string;
};

const errorItems: JsPopupItem[] = [
    {
        highlight: "try / catch / finally",
        content: "Ловит синхронные исключения внутри try и отклонения Promise, которые были явно await. Ошибка из отдельно запущенной async-операции этим catch не перехватывается.",
        isTop: true,
        code: `
async function loadProfile() {
  try {
    const response = await fetch('/api/profile');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (error) {
    console.error('Profile error:', error);
    // После логирования не маскируем ошибку под отсутствие данных.
    throw error;
  } finally {
    console.log('request finished');
  }
}
`
    },
    {
        highlight: "throw new Error",
        content: "Явно сигнализирует о невалидном состоянии или входных данных.",
        isTop: true,
        code: `
function assertNonEmpty(value, fieldName) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(fieldName + ' is required');
  }
}

assertNonEmpty('Sergey', 'name');
`
    },
    {
        highlight: "Custom Error class",
        content: "Собственный класс ошибки помогает различать типы ошибок в обработке.",
        code: `
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateAge(age) {
  if (!Number.isFinite(age) || age < 18) {
    throw new ValidationError('Age must be a finite number and 18+');
  }
}
`
    },
    {
        highlight: "Promise rejection handling",
        content: "У цепочки Promise без await должен быть явный обработчик rejection. Реши осознанно: восстановиться, вернуть fallback или пробросить ошибку выше.",
        isTop: true,
        code: `
fetch('/api/orders')
  .then((res) => {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((error) => {
    console.error('orders error', error);
    return []; // осознанное восстановление цепочки значением того же типа
  });
`
    },
    {
        highlight: "window.onerror / unhandledrejection",
        content: "Глобальные хуки для последнего уровня мониторинга неожиданных клиентских ошибок; они не заменяют локальную обработку и понятный fallback в UI.",
        code: `
window.addEventListener('error', (event) => {
  console.error('Global JS error:', event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
`
    },
    {
        highlight: "console.error / console.warn / console.trace",
        content: "Минимальный набор для отладки и диагностики в dev-режиме.",
        code: `
console.warn('Potential issue in config');
console.error('Request failed', { code: 500 });
console.trace('Trace execution path');
`
    },
    {
        highlight: "debugger",
        content: "Останавливает выполнение в DevTools в точке вызова.",
        code: `
function calculateTotal(items) {
  debugger;
  return items.reduce((sum, item) => sum + item.price, 0);
}
`
    }
];

const errorRows: ErrorRow[] = [
    {
        layer: "UI validation",
        what: "Пустые поля/невалидный формат",
        recommendation: "Валидация до отправки + точечные сообщения пользователю"
    },
    {
        layer: "API request",
        what: "Сеть/таймаут/HTTP-ошибка",
        recommendation: "Проверять response.ok; логировать status/request ID и только безопасные диагностические данные"
    },
    {
        layer: "Runtime",
        what: "Неожиданное исключение в проде",
        recommendation: "Глобальный onerror/unhandledrejection + error tracking"
    }
];

const ErrorsValidateDemo = () => {
    const [email, setEmail] = useState("");

    const result = useMemo(() => {
        try {
            const normalized = email.trim().toLowerCase();
            if (!normalized.includes("@")) {
                throw new Error("Email must include '@'");
            }
            if (normalized.length < 6) {
                throw new Error("Email is too short");
            }

            return {ok: true, message: "Valid email: " + normalized};
        } catch (error) {
            return {
                ok: false,
                message: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }, [email]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 1: Validation + throw/catch</S.DemoTitle>
            <S.DemoHint>
                Показывает централизованную обработку на упрощенной проверке; `includes("@")` не является полной
                валидацией email.
            </S.DemoHint>
            <S.DemoLabel htmlFor="errors-email">Email</S.DemoLabel>
            <S.DemoInput id="errors-email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
            <S.DemoBadge $isError={!result.ok}>{result.message}</S.DemoBadge>
        </S.DemoCard>
    );
};

const ErrorsTryFinallyDemo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("idle");

    const run = async () => {
        setIsLoading(true);
        setStatus("loading...");

        try {
            await new Promise((resolve) => setTimeout(resolve, 700));
            const fail = Math.random() < 0.5;
            if (fail) throw new Error("Random network fail");
            setStatus("success");
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "unknown error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 2: try/catch/finally в async</S.DemoTitle>
            <S.DemoHint>finally гарантированно выполняется и снимает loading-состояние.</S.DemoHint>
            <S.DemoLabel htmlFor="errors-run">Action</S.DemoLabel>
            <button id="errors-run" onClick={run} disabled={isLoading}>
                {isLoading ? "Running..." : "Run request"}
            </button>
            <S.DemoOutput>{status}</S.DemoOutput>
        </S.DemoCard>
    );
};

export const JavaScriptErrors = () => {
    return (
        <>
            <TypeTitle>Errors (Ошибки и отладка)</TypeTitle>

            <NoteBlock>
                <Text>
                    <TextP>
                        Ошибки нужно не просто «ловить», а проектировать обработку на каждом уровне.
                        Цель: предсказуемое поведение UI и понятные логи для диагностики.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Валидационные ошибки показывай пользователю, системные — логируй разработчикам.</NoteLi>
                        <NoteLi>Не глуши ошибки без контекста (`catch {}` без логики).</NoteLi>
                        <NoteLi>В async-коде обязательно закрывай loading-состояния в `finally`.</NoteLi>
                        <NoteLi>Unhandled promise rejection в проде должна попадать в мониторинг.</NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <JsPopupList
                title="Error Handling Patterns (Кликни по паттерну)"
                description="Шаблоны обработки ошибок, от базовых try/catch до глобальных хуков браузера."
                items={errorItems}
            />

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Таблица: Слои Обработки Ошибок</ParagraphTitle>
                    <S.TableWrap>
                        <S.NoteTable>
                            <thead>
                            <tr>
                                <S.TableHeadCell>Слой</S.TableHeadCell>
                                <S.TableHeadCell>Что может пойти не так</S.TableHeadCell>
                                <S.TableHeadCell>Практика</S.TableHeadCell>
                            </tr>
                            </thead>
                            <tbody>
                            {errorRows.map((row) => (
                                <tr key={row.layer}>
                                    <S.TableCell><S.TableToken>{row.layer}</S.TableToken></S.TableCell>
                                    <S.TableCell>{row.what}</S.TableCell>
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
                    <ParagraphTitle>Практика: Ошибки в Действии</ParagraphTitle>
                    <S.DemoGrid>
                        <ErrorsValidateDemo/>
                        <ErrorsTryFinallyDemo/>
                    </S.DemoGrid>
                </Text>
            </NoteBlock>
        </>
    );
};
