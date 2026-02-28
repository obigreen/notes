import React, {useEffect, useRef, useState} from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import {
    NoteBlock,
    NotesTitle,
    Text
} from "../../RecordsDirectory_Style";
import {S} from "../Regex_Styles";

type RegexPatternItem = {
    pattern: string;
    title: string;
    description: string;
    code: string;
    isTop?: boolean;
};

export const regexPatternItems: RegexPatternItem[] = [
    {
        pattern: "/[^a-z0-9]/gi",
        title: "Очистка строки от спецсимволов",
        description: "Удаляет всё, кроме латинских букв и цифр. Очень частый кейс перед сравнением/поиском.",
        isTop: true,
        code: String.raw`
// 1) Убираем всё, кроме букв/цифр
const raw = 'A man, a plan! 2026';
const cleaned = raw.replace(/[^a-z0-9]/gi, '').toLowerCase();
console.log(cleaned); // 'amanaplan2026'

// 2) Если нужен Unicode-вариант с кириллицей:
const unicodeRaw = 'Привет, мир! 123';
const cleanedRu = unicodeRaw.replace(/[^a-zа-я0-9]/gi, '');
console.log(cleanedRu); // 'Приветмир123'
        `
    },
    {
        pattern: "/\\s+/g",
        title: "Нормализация пробелов",
        description: "Сжимает любые подряд идущие пробельные символы в один пробел.",
        isTop: true,
        code: String.raw`
const text = 'Hello    world\n\tfrom   regex';
const normalized = text.replace(/\s+/g, ' ').trim();
console.log(normalized); // 'Hello world from regex'
        `
    },
    {
        pattern: "/^\\d+$/",
        title: "Только цифры",
        description: "Проверяет, что вся строка состоит только из цифр (без букв и пробелов).",
        isTop: true,
        code: String.raw`
console.log(/^\d+$/.test('12345')); // true
console.log(/^\d+$/.test('12a45')); // false
console.log(/^\d+$/.test('')); // false
        `
    },
    {
        pattern: "/^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,}$/",
        title: "Базовая валидация email",
        description: "Учебный шаблон для формы. Не покрывает 100% RFC-случаев, но подходит для практики.",
        isTop: true,
        code: String.raw`
const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;

console.log(emailRegex.test('john@example.com')); // true
console.log(emailRegex.test('bad@@example.com')); // false
console.log(emailRegex.test('no-domain@')); // false
        `
    },
    {
        pattern: "/https?:\\/\\/[^\\s]+/g",
        title: "Поиск URL в тексте",
        description: "Находит ссылки, начинающиеся с http:// или https://.",
        code: String.raw`
const text = 'Docs: https://react.dev and http://example.com';
const urls = text.match(/https?:\/\/[^\s]+/g);
console.log(urls); // ['https://react.dev', 'http://example.com']
        `
    },
    {
        pattern: "/#([\\w-]+)/g",
        title: "Хештеги",
        description: "Извлекает хештеги и значение после #.",
        code: String.raw`
const post = 'Learning #javascript and #regex-basics today';
const tags = Array.from(post.matchAll(/#([\w-]+)/g), (match) => match[1]);
console.log(tags); // ['javascript', 'regex-basics']
        `
    },
    {
        pattern: "/\\b\\w{6,}\\b/g",
        title: "Слова длиннее N символов",
        description: "Находит слова длиной от 6 символов.",
        code: String.raw`
const sentence = 'regex helps developers write powerful filters';
const longWords = sentence.match(/\b\w{6,}\b/g);
console.log(longWords); // ['developers', 'powerful', 'filters']
        `
    },
    {
        pattern: "/(\\d{4})-(\\d{2})-(\\d{2})/",
        title: "Разбор даты YYYY-MM-DD",
        description: "Берёт группы (год/месяц/день) и позволяет форматировать дату как нужно.",
        code: String.raw`
const dateText = '2026-03-01';
const match = dateText.match(/(\d{4})-(\d{2})-(\d{2})/);

if (match) {
    const [, year, month, day] = match;
    console.log(day + '.' + month + '.' + year); // '01.03.2026'
}
        `
    },
    {
        pattern: "/<\\/?[^>]+>/g",
        title: "Удаление HTML-тегов (упрощённо)",
        description: "Учебный шаблон, чтобы очистить строку от тегов. Для сложного HTML нужен парсер.",
        code: String.raw`
const html = '<b>Hello</b> <i>regex</i>';
const plain = html.replace(/<\/?[^>]+>/g, '');
console.log(plain); // 'Hello regex'
        `
    },
    {
        pattern: "/(?<=\\$)\\d+/g",
        title: "Число после знака $",
        description: "Пример lookbehind: взять число только если слева есть $.",
        code: String.raw`
const text = '100€ $250 $19';
const prices = text.match(/(?<=\$)\d+/g);
console.log(prices); // ['250', '19']

// Если в проекте нужен fallback без lookbehind:
const fallback = Array.from(text.matchAll(/\$(\d+)/g), (m) => m[1]);
console.log(fallback); // ['250', '19']
        `
    },
    {
        pattern: "/^.{8,}$/",
        title: "Минимальная длина строки",
        description: "Проверяет, что длина строки не меньше 8 символов.",
        code: String.raw`
const passwordLength = /^.{8,}$/;

console.log(passwordLength.test('1234567')); // false
console.log(passwordLength.test('12345678')); // true

// Часто комбинируют с доп. проверками: цифры, буквы и т.д.
        `
    },
    {
        pattern: "/^(?:\\+7|8)\\d{10}$/",
        title: "Телефон РФ (учебный вариант)",
        description: "Проверка формата без пробелов: +7XXXXXXXXXX или 8XXXXXXXXXX.",
        code: String.raw`
const phoneRegex = /^(?:\+7|8)\d{10}$/;

console.log(phoneRegex.test('+79991234567')); // true
console.log(phoneRegex.test('89991234567')); // true
console.log(phoneRegex.test('+7 999 123 45 67')); // false

// Для пользовательского ввода сначала обычно чистят пробелы/скобки/дефисы.
        `
    }
];

export const RegexPatternList = () => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Частые Regex-шаблоны (кликни по шаблону)</NotesTitle>
            <Text>
                <S.List>
                    {regexPatternItems.map((item, index) => (
                        <S.Item key={index}>
                            <S.HighlightedText
                                $isTop={item.isTop}
                                onClick={() => setSelectedCode(item.code)}
                            >
                                {item.pattern}
                            </S.HighlightedText>{" "}
                            <strong>{item.title}</strong>: {item.description}
                        </S.Item>
                    ))}
                </S.List>
            </Text>

            {selectedCode && (
                <S.Overlay onClick={() => setSelectedCode(null)}>
                    <S.PopupWrapper onClick={(event) => event.stopPropagation()}>
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
