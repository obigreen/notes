import React from "react";
import {
    BookTitle,
    Link,
    Marker,
    NoteBlock,
    NoteLi,
    NotesTitle,
    NoteUl,
    ParagraphTitle,
    Section,
    Text,
    TextP,
    TypeTitle,
    VideoContainer
} from "../RecordsDirectory_Style";
import {S} from "./Regex_Styles";
import {HighlightedCodeBlock} from "./regexComponents/HighlightedCodeBlock";
import {RegexPatternList} from "./regexComponents/RegexPatternList";
import {RegexSanitizeDemo} from "./regexComponents/demos/RegexSanitizeDemo";
import {RegexReplaceDemo} from "./regexComponents/demos/RegexReplaceDemo";
import {RegexTesterDemo} from "./regexComponents/demos/RegexTesterDemo";

type TableRow = {
    token: string;
    meaning: string;
    example: string;
};

const flagsRows: TableRow[] = [
    {token: "g", meaning: "Искать все совпадения", example: "/cat/g"},
    {token: "i", meaning: "Игнорировать регистр", example: "/cat/i"},
    {token: "m", meaning: "^ и $ работают построчно", example: "/^foo/m"},
    {token: "s", meaning: ". также матчится с переводом строки", example: "/a.b/s"},
    {token: "u", meaning: "Unicode-aware режим; включает property escapes", example: "/\\p{L}+/u"},
    {token: "y", meaning: "Липкий поиск строго от lastIndex", example: "/foo/y"},
    {token: "d", meaning: "Добавляет индексы групп в match.indices", example: "/(cat)/d"},
    {token: "v", meaning: "Unicode sets: операции с наборами и свойства строк", example: "/[\\p{L}&&\\p{ASCII}]/v"}
];

const symbolsRows: TableRow[] = [
    {token: ".", meaning: "Любой символ, кроме line terminators (без s)", example: "/a.b/"},
    {token: "\\d / \\D", meaning: "ASCII-цифра [0-9] / не ASCII-цифра", example: "/\\d+/"},
    {token: "\\w / \\W", meaning: "Слово [A-Za-z0-9_] / не слово", example: "/\\w+/"},
    {token: "\\p{L} / \\p{N}", meaning: "Unicode-буква / Unicode-числовой символ (с u или v)", example: "/[\\p{L}\\p{N}]+/gu"},
    {token: "\\s / \\S", meaning: "Пробел / не пробел", example: "/\\s+/"},
    {token: "[abc]", meaning: "Один символ из набора", example: "/[abc]/"},
    {token: "[^abc]", meaning: "Любой символ, кроме набора", example: "/[^0-9]/"},
    {token: "[a-z]", meaning: "Диапазон", example: "/[a-z]/i"},
    {token: "?", meaning: "0 или 1 раз", example: "/colou?r/"},
    {token: "*", meaning: "0 или больше", example: "/go*/"},
    {token: "+", meaning: "1 или больше", example: "/go+/"},
    {token: "{n,m}", meaning: "От n до m повторений", example: "/\\d{2,4}/"},
    {token: "+? *? {..}?", meaning: "Ленивые квантификаторы", example: "/<.*?>/g"}
];

const advancedRows: TableRow[] = [
    {token: "(group)", meaning: "Захватывающая группа", example: "/(ab)+/"},
    {token: "(?:group)", meaning: "Незахватывающая группа", example: "/(?:ab)+/"},
    {token: "|", meaning: "Альтернатива ИЛИ", example: "/cat|dog/"},
    {token: "\\1, \\2", meaning: "Обращение к захваченным группам", example: "/(ha)\\s\\1/"},
    {token: "^ / $", meaning: "Начало / конец строки", example: "/^\\d+$/"},
    {token: "\\b / \\B", meaning: "Граница JS-word (связана с \\w) / не граница", example: "/\\bcat\\b/"},
    {token: "(?=...)", meaning: "Позитивный lookahead", example: "/\\d+(?=€)/"},
    {token: "(?!...)", meaning: "Негативный lookahead", example: "/foo(?!bar)/"},
    {token: "(?<=...)", meaning: "Позитивный lookbehind", example: "/(?<=\\$)\\d+/"},
    {token: "(?<!...)", meaning: "Негативный lookbehind", example: "/(?<!-)\\d+/"}
];

const renderTable = (rows: TableRow[]) => {
    return (
        <S.TableWrap>
            <S.NoteTable>
                <thead>
                <tr>
                    <S.TableHeadCell>Токен</S.TableHeadCell>
                    <S.TableHeadCell>Что делает</S.TableHeadCell>
                    <S.TableHeadCell>Мини-пример</S.TableHeadCell>
                </tr>
                </thead>
                <tbody>
                {rows.map((row) => (
                    <tr key={row.token}>
                        <S.TableCell>
                            <S.TableToken>{row.token}</S.TableToken>
                        </S.TableCell>
                        <S.TableCell>{row.meaning}</S.TableCell>
                        <S.TableCell>
                            <S.TableToken>{row.example}</S.TableToken>
                        </S.TableCell>
                    </tr>
                ))}
                </tbody>
            </S.NoteTable>
        </S.TableWrap>
    );
};

export const Regex = () => {
    return (
        <>
            <TypeTitle>Regex (Регулярные выражения)</TypeTitle>

            <NoteBlock>
                <Text>
                    <BookTitle>Regular Expressions (RegExp) в JavaScript</BookTitle>
                    <TextP>
                        <Marker>RegExp</Marker> — это шаблон для поиска, проверки и замены текста. Для фронтенда
                        чаще всего используется в <Marker>валидации форм</Marker>, <Marker>очистке ввода</Marker>,
                        <Marker> replace()</Marker> и извлечении данных из строк.
                    </TextP>

                    <ParagraphTitle>2 формы записи</ParagraphTitle>
                    <NoteUl>
                        <NoteLi><S.TableToken>/pattern/flags</S.TableToken> — когда шаблон статичный.</NoteLi>
                        <NoteLi><S.TableToken>new RegExp("pattern", "flags")</S.TableToken> — когда шаблон нужно собрать программно.</NoteLi>
                    </NoteUl>

                    <HighlightedCodeBlock>
                        {
                            `
// 1) Литерал - быстрее читается
const re1 = /javascript/gi;

// 2) Конструктор - если pattern приходит из переменной
const query = 'react';
// Динамический текст нужно экранировать: иначе ".", "(" и другие символы
// изменят смысл выражения или сделают его невалидным.
const escapedQuery = RegExp.escape(query);
const re2 = new RegExp(escapedQuery, 'gi');

// RegExp.escape — современный стандартный API.
// Для старых целевых браузеров нужен проверенный polyfill.

console.log('JavaScript + React'.match(re1));
console.log('JavaScript + React'.match(re2));
                            `
                        }
                    </HighlightedCodeBlock>

                    <ParagraphTitle>Флаги (flags)</ParagraphTitle>
                    {renderTable(flagsRows)}
                    <TextP>
                        Флаги <S.TableToken>u</S.TableToken> и <S.TableToken>v</S.TableToken> задают разные
                        Unicode-режимы и не используются одновременно.
                    </TextP>

                    <ParagraphTitle>Видео-разбор</ParagraphTitle>
                    <VideoContainer>
                        <iframe
                            src="https://www.youtube.com/embed/-ef2E0ozxao"
                            title="Регулярные выражения JavaScript"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoContainer>

                    <TextP>
                        Видео добавлено как дополнительный материал. Базовый конспект и практические примеры ниже.
                    </TextP>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <BookTitle>Таблицы для запоминания</BookTitle>

                    <Section>
                        <ParagraphTitle>1) Символы, классы, квантификаторы</ParagraphTitle>
                        {renderTable(symbolsRows)}
                    </Section>

                    <Section>
                        <ParagraphTitle>2) Группы, якоря и lookaround</ParagraphTitle>
                        {renderTable(advancedRows)}
                    </Section>

                    <ParagraphTitle>Мини-алгоритм чтения regex</ParagraphTitle>
                    <NoteUl>
                        <NoteLi>Что искать: символы/классы (<S.TableToken>\\d</S.TableToken>, <S.TableToken>[a-z]</S.TableToken>, <S.TableToken>.</S.TableToken>).</NoteLi>
                        <NoteLi>Сколько раз: квантификаторы (<S.TableToken>+</S.TableToken>, <S.TableToken>*</S.TableToken>, <S.TableToken>{"{n,m}"}</S.TableToken>).</NoteLi>
                        <NoteLi>Где искать: якоря (<S.TableToken>^</S.TableToken>, <S.TableToken>$</S.TableToken>, <S.TableToken>\\b</S.TableToken>) и группы.</NoteLi>
                        <NoteLi>Как применять в JS: <S.TableToken>match / test / replace / split</S.TableToken>.</NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <BookTitle>Regex + String методы (ключевой блок для replace)</BookTitle>

                    <HighlightedCodeBlock>
                        {
                            `
const text = 'A man, a plan!';

// match
console.log(text.match(/[a-z]+/gi)); // ['A', 'man', 'a', 'plan']

// test
console.log(/plan/i.test(text)); // true

// replace
console.log(text.replace(/[^a-z0-9]/gi, '').toLowerCase()); // 'amanaplan'

// split
console.log('one,two;three'.split(/[;,]/)); // ['one', 'two', 'three']
                            `
                        }
                    </HighlightedCodeBlock>

                    <ParagraphTitle>Частые ошибки</ParagraphTitle>
                    <NoteUl>
                        <NoteLi>Забыли флаг <Marker>g</Marker> и получили замену/совпадение только для первого случая.</NoteLi>
                        <NoteLi>Не экранировали спецсимвол: для точки нужен <S.TableToken>\\.</S.TableToken>.</NoteLi>
                        <NoteLi>Передали пользовательскую строку в <S.TableToken>new RegExp()</S.TableToken> без <S.TableToken>RegExp.escape()</S.TableToken>.</NoteLi>
                        <NoteLi>Использовали слишком агрессивный шаблон (например <S.TableToken>.*</S.TableToken>) и захватили лишнее.</NoteLi>
                        <NoteLi>
                            Путают <S.TableToken>\\b</S.TableToken> с пробелом или ожидают от неё Unicode-границы:
                            в JS она связана с ASCII-ориентированным <S.TableToken>\\w</S.TableToken>.
                        </NoteLi>
                        <NoteLi>
                            Повторно вызывают <S.TableToken>test/exec</S.TableToken> с `g` или `y`, забывая, что
                            выражение меняет <S.TableToken>lastIndex</S.TableToken>.
                        </NoteLi>
                        <NoteLi>
                            Запускают непроверенный сложный шаблон на длинном тексте: catastrophic backtracking может
                            заблокировать главный поток.
                        </NoteLi>
                    </NoteUl>

                    <HighlightedCodeBlock>
                        {
                            `
const globalWord = /cat/g;

console.log(globalWord.test('cat cat')); // true, lastIndex = 3
console.log(globalWord.test('cat cat')); // true, поиск продолжился с lastIndex
globalWord.lastIndex = 0;                // явный сброс перед новым независимым поиском

// match с g возвращает полные совпадения без capture-групп.
console.log('cat-1 cat-2'.match(/cat-(\\d)/g)); // ['cat-1', 'cat-2']

// matchAll требует g и сохраняет capture-группы каждого совпадения.
const matches = [...'cat-1 cat-2'.matchAll(/cat-(\\d)/g)];
console.log(matches.map((match) => match[1])); // ['1', '2']
                            `
                        }
                    </HighlightedCodeBlock>

                    <TextP>
                        Документация для углубления: <Link target={"_blank"} href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp">MDN RegExp</Link> и{" "}
                        <Link target={"_blank"} href="https://learn.javascript.ru/regexp-introduction">learn.javascript.ru / regexp</Link>
                    </TextP>
                </Text>
            </NoteBlock>

            <RegexPatternList/>

            <NoteBlock>
                <NotesTitle>Интерактивные Regex demo</NotesTitle>
                <Text>
                    <TextP>
                        Эти демо повторяют самые практичные сценарии: очистка строки, применение <Marker>replace()</Marker>
                        с разными шаблонами и ручная проверка выражения через mini-тестер.
                    </TextP>
                    <S.DemoGrid>
                        <RegexSanitizeDemo/>
                        <RegexReplaceDemo/>
                        <RegexTesterDemo/>
                    </S.DemoGrid>
                </Text>
            </NoteBlock>
        </>
    );
};
