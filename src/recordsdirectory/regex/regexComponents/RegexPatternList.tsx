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
        pattern: "/[^\\p{L}\\p{N}]/gu",
        title: "Unicode-очистка строки",
        description: "Удаляет всё, кроме Unicode-букв и числовых символов.",
        isTop: true,
        code: String.raw`
// 1) Убираем всё, кроме Unicode-букв/числовых символов
const raw = 'A man, a plan! 2026';
const cleaned = raw.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
console.log(cleaned); // 'amanaplan2026'

// Кириллица, включая ё/Ё, не требует отдельного диапазона:
const unicodeRaw = 'Ёж, Привет! 123';
const cleanedRu = unicodeRaw.replace(/[^\p{L}\p{N}]/gu, '');
console.log(cleanedRu); // 'ЁжПривет123'
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
        description: "Упрощённая UX-проверка. Не заменяет input[type=email] и серверную валидацию.",
        isTop: true,
        code: String.raw`
const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;

console.log(emailRegex.test('john@example.com')); // true
console.log(emailRegex.test('bad@@example.com')); // false
console.log(emailRegex.test('no-domain@')); // false
        `
    },
    {
        pattern: "/https?:\\/\\/[^\\s<>\"']*[^\\s<>\"'.,!?;:)]/g",
        title: "Поиск URL в тексте (упрощённо)",
        description: "Находит http(s)-ссылки и не включает частую конечную пунктуацию. Полный URL лучше разбирать через URL.",
        code: String.raw`
const text = 'Docs: https://react.dev, example: http://example.com.';
const urls = text.match(/https?:\/\/[^\s<>"']*[^\s<>"'.,!?;:)]/g);
console.log(urls); // ['https://react.dev', 'http://example.com']
        `
    },
    {
        pattern: "/#([\\p{L}\\p{N}_-]+)/gu",
        title: "Хештеги",
        description: "Извлекает Unicode-хештеги и значение после #.",
        code: String.raw`
const post = 'Изучаю #javascript и #регулярки-2026';
const tags = Array.from(post.matchAll(/#([\p{L}\p{N}_-]+)/gu), (match) => match[1]);
console.log(tags); // ['javascript', 'регулярки-2026']
        `
    },
    {
        pattern: "/\\p{L}{6,}/gu",
        title: "Слова длиннее N символов",
        description: "Находит непрерывные последовательности Unicode-букв длиной от 6 символов.",
        code: String.raw`
const sentence = 'regex помогает developers писать powerful filters';
const longWords = sentence.match(/\p{L}{6,}/gu);
console.log(longWords); // ['помогает', 'developers', 'писать', 'powerful', 'filters']
        `
    },
    {
        pattern: "/^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/",
        title: "Базовая проверка даты YYYY-MM-DD",
        description: "Проверяет весь формат и базовые диапазоны. Календарную дату (например, 31 февраля) проверяет Date/Temporal.",
        code: String.raw`
const dateText = '2026-03-01';
const match = dateText.match(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);

if (match) {
    const [, year, month, day] = match;
    console.log(day + '.' + month + '.' + year); // '01.03.2026'
}
        `
    },
    {
        pattern: "/<\\/?[^>]+>/g",
        title: "Удаление HTML-тегов (не sanitization)",
        description: "Только учебная текстовая трансформация. Она не делает недоверенный HTML безопасным.",
        code: String.raw`
const html = '<b>Hello</b> <i>regex</i>';
const plain = html.replace(/<\/?[^>]+>/g, '');
console.log(plain); // 'Hello regex'

// Для безопасного отображения используй textContent/React escaping.
// Если нужно разрешить часть HTML, применяй специализированный sanitizer.
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
        title: "Минимальная длина строки (упрощённо)",
        description: "Проверяет минимум 8 UTF-16 code units; без s перевод строки не совпадает с точкой.",
        code: String.raw`
const passwordLength = /^.{8,}$/;

console.log(passwordLength.test('1234567')); // false
console.log(passwordLength.test('12345678')); // true

// Это не подсчёт пользовательских grapheme clusters: emoji может занимать 2 code units.
// Для пароля длина — только одна из проверок, а правила проверяет и сервер.
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
