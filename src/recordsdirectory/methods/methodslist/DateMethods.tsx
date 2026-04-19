import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Method_Styles'


type MethodProps = {
    dateItems?: Array<{
        highlight: string;
        content: string;
        code: string;
        isTop?: boolean;
    }>;
};

export const dateItems = [
    {
        highlight: "getDate()",
        isTop: true,
        content: "Возвращает день месяца (от 1 до 31) для указанной даты",
        code:
            `
        //code
        //Методы Date для чтения (get*) не мутируют объект.
        //getDate() -> день месяца: 1..31

        const date = new Date(2026, 2, 15, 10, 42, 45);
        console.log(date.getDate()); // 15

        const another = new Date(2026, 1, 28);
        console.log(another.getDate()); // 28

        //Реальный пример: проверка дня выплаты
        const payDay = 15;
        if (date.getDate() === payDay) {
            console.log('Сегодня день выплаты');
        }
        `
    },
    {
        highlight: "getDay()",
        isTop: true,
        content: "Возвращает день недели (от 0 до 6) для указанной даты",
        code:
            `
        //code
        //getDay() -> день недели: 0 = воскресенье, 6 = суббота

        const date = new Date(2026, 2, 1); // 1 марта 2026
        console.log(date.getDay()); // 0

        const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        console.log(weekDays[date.getDay()]); // 'Вс'

        //Реальный пример: выходной или нет
        const isWeekend = [0, 6].includes(date.getDay());
        console.log(isWeekend); // true
        `
    },
    {
        highlight: "getFullYear()",
        isTop: true,
        content: "Возвращает год (4 цифры для 4-значных годов) указанной даты",
        code:
            `
        //code
        //getFullYear() -> полный год, например 2026

        const date = new Date(2026, 2, 15);
        console.log(date.getFullYear()); // 2026

        const oldDate = new Date('1999-12-31');
        console.log(oldDate.getFullYear()); // 1999

        //Реальный пример: грубый расчет возраста
        const birthDate = new Date(1998, 6, 10);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        console.log(age);
        `
    },
    {
        highlight: "getHours()",
        isTop: true,
        content: "Возвращает час (от 0 до 23) указанной даты и времени",
        code:
            `
        //code
        //getHours() -> часы в локальном времени: 0..23

        const date = new Date(2026, 2, 15, 19, 45);
        console.log(date.getHours()); // 19

        const midnight = new Date(2026, 2, 16, 0, 5);
        console.log(midnight.getHours()); // 0

        //Реальный пример: приветствие по времени
        const hour = new Date().getHours();
        if (hour < 12) console.log('Доброе утро');
        else if (hour < 18) console.log('Добрый день');
        else console.log('Добрый вечер');
        `
    },
    {
        highlight: "getMilliseconds()",
        content: "Возвращает миллисекунды (от 0 до 999) указанной даты и времени",
        code:
            `
        //code
        //getMilliseconds() -> миллисекунды: 0..999

        const date = new Date(2026, 2, 15, 10, 30, 45, 987);
        console.log(date.getMilliseconds()); // 987

        date.setMilliseconds(120);
        console.log(date.getMilliseconds()); // 120

        //Реальный пример: лог "внутри секунды"
        const now = new Date();
        console.log('Текущая доля секунды:', now.getMilliseconds());
        `
    },
    {
        highlight: "getMinutes()",
        isTop: true,
        content: "Возвращает минуты (от 0 до 59) указанной даты и времени",
        code:
            `
        //code
        //getMinutes() -> минуты: 0..59

        const date = new Date(2026, 2, 15, 10, 42, 45);
        console.log(date.getMinutes()); // 42

        const roundedToHour = new Date(2026, 2, 15, 10, 0, 0);
        console.log(roundedToHour.getMinutes()); // 0

        //Реальный пример: запуск задачи каждые 15 минут
        const minute = new Date().getMinutes();
        if (minute % 15 === 0) {
            console.log('Запускаем синхронизацию');
        }
        `
    },
    {
        highlight: "getMonth()",
        isTop: true,
        content: "Возвращает месяц (от 0 до 11) указанной даты",
        code:
            `
        //code
        //getMonth() -> месяц: 0 = январь, 11 = декабрь

        const date = new Date(2026, 2, 15); // март
        console.log(date.getMonth()); // 2

        const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        console.log(monthNames[date.getMonth()]); // 'Мар'

        //Реальный пример: определение квартала
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        console.log('Q' + quarter); // Q1
        `
    },
    {
        highlight: "getSeconds()",
        content: "Возвращает секунды (от 0 до 59) указанной даты и времени",
        code:
            `
        //code
        //getSeconds() -> секунды: 0..59

        const date = new Date(2026, 2, 15, 10, 30, 59);
        console.log(date.getSeconds()); // 59

        date.setSeconds(5);
        console.log(date.getSeconds()); // 5

        //Реальный пример: простая проверка "на старте минуты"
        if (new Date().getSeconds() === 0) {
            console.log('Новая минута началась');
        }
        `
    },
    {
        highlight: "getTime()",
        isTop: true,
        content: "Возвращает числовое значение указанной даты в виде количества миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC",
        code:
            `
        //code
        //getTime() -> timestamp в миллисекундах

        const date = new Date(2026, 2, 15);
        const timestamp = date.getTime();
        console.log(timestamp);

        //Обратное преобразование:
        const restored = new Date(timestamp);
        console.log(restored.toDateString());

        //Реальный пример: сортировка дат
        const list = [
            new Date(2026, 4, 10),
            new Date(2026, 0, 1),
            new Date(2026, 2, 5)
        ];
        list.sort((a, b) => a.getTime() - b.getTime());
        console.log(list.map(d => d.toDateString()));
        `
    },
    {
        highlight: "getTimezoneOffset()",
        content: "Возвращает разницу в минутах между местным временем и Всемирным координированным временем (UTC)",
        code:
            `
        //code
        //getTimezoneOffset() -> разница в минутах между local time и UTC
        //Зависит от таймзоны пользователя и даты (летнее/зимнее время)

        const date = new Date();
        const offset = date.getTimezoneOffset();
        console.log(offset);

        //Реальный пример: получить UTC timestamp из local Date
        const utcTimestamp = date.getTime() + offset * 60 * 1000;
        console.log(utcTimestamp);
        `
    },
    {
        highlight: "setDate()",
        isTop: true,
        content: "Устанавливает день месяца указанного объекта Date в соответствии с местным временем",
        code:
            `
        //code
        //Методы Date для изменения (set*) мутируют исходный объект.
        //setDate(day) возвращает timestamp (ms).

        const date = new Date(2026, 2, 1);
        const ts = date.setDate(15);
        console.log(date.toDateString()); // Sun Mar 15 2026
        console.log(ts); // timestamp

        //Переполнение дней переводит месяц вперед
        date.setDate(32);
        console.log(date.toDateString()); // Wed Apr 01 2026

        //Реальный пример: добавить 7 дней к дедлайну
        const deadline = new Date(2026, 2, 20);
        deadline.setDate(deadline.getDate() + 7);
        console.log(deadline.toDateString());
        `
    },
    {
        highlight: "setFullYear()",
        content: "Устанавливает полный год указанного объекта Date в соответствии с местным временем",
        code:
            `
        //code
        //setFullYear(year[, month[, day]])
        //Мутирует Date и возвращает timestamp.

        const date = new Date(2026, 2, 15);
        date.setFullYear(2030);
        console.log(date.getFullYear()); // 2030

        //Можно задать сразу год, месяц и день
        date.setFullYear(2024, 0, 5);
        console.log(date.toDateString()); // Fri Jan 05 2024

        //Реальный пример: перенести подписку на следующий год
        const subscriptionEnd = new Date(2026, 5, 30);
        subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
        console.log(subscriptionEnd.toDateString());
        `
    },
    {
        highlight: "setHours()",
        isTop: true,
        content: "Устанавливает часы указанного объекта Date в соответствии с местным временем",
        code:
            `
        //code
        //setHours(hours[, minutes[, seconds[, ms]]])
        //Мутирует Date и возвращает timestamp.

        const date = new Date(2026, 2, 15, 8, 20, 10);
        date.setHours(10);
        console.log(date.toTimeString()); // 10:20:10 ...

        date.setHours(23, 59, 59, 999);
        console.log(date.toTimeString()); // 23:59:59 ...

        //Реальный пример: начало дня для фильтрации
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        console.log(startOfDay.toISOString());
        `
    },
    {
        highlight: "setMilliseconds()",
        content: "Устанавливает миллисекунды указанного объекта Date в соответствии с местным временем",
        code:
            `
        //code
        //setMilliseconds(ms)
        //Мутирует Date и возвращает timestamp.

        const date = new Date(2026, 2, 15, 10, 30, 45, 0);
        date.setMilliseconds(500);
        console.log(date.getMilliseconds()); // 500

        date.setMilliseconds(1500); // переполнение в секунды
        console.log(date.getSeconds()); // 46
        console.log(date.getMilliseconds()); // 500

        //Реальный пример: "нормализация" времени до секунд
        const normalized = new Date();
        normalized.setMilliseconds(0);
        console.log(normalized.toISOString());
        `
    },
    {
        highlight: "setMinutes()",
        isTop: true,
        content: "Устанавливает минуты указанного объекта Date в соответствии с местным временем",
        code:
            `
        //code
        //setMinutes(minutes[, seconds[, ms]])
        //Мутирует Date и возвращает timestamp.

        const date = new Date(2026, 2, 15, 10, 0, 0);
        date.setMinutes(30);
        console.log(date.toTimeString()); // 10:30:00 ...

        date.setMinutes(75); // переполнение в часы
        console.log(date.toTimeString()); // 11:15:00 ...

        //Реальный пример: округление вверх до ближайших 15 минут
        const nextQuarter = new Date();
        const m = nextQuarter.getMinutes();
        const rounded = Math.ceil(m / 15) * 15;
        nextQuarter.setMinutes(rounded, 0, 0);
        console.log(nextQuarter.toTimeString());
        `
    },
    {
        highlight: "setMonth()",
        isTop: true,
        content: "Устанавливает месяц указанного объекта Date в соответствии с местным временем",
        code:
            `
        //code
        //setMonth(monthIndex[, day])
        //Мутирует Date и возвращает timestamp.

        const date = new Date(2026, 2, 15); // март
        date.setMonth(11); // декабрь
        console.log(date.toDateString()); // Tue Dec 15 2026

        date.setMonth(12); // январь следующего года
        console.log(date.toDateString()); // Fri Jan 15 2027

        //Реальный пример: сдвинуть дату на 3 месяца вперед
        const sprintEnd = new Date(2026, 0, 20);
        sprintEnd.setMonth(sprintEnd.getMonth() + 3);
        console.log(sprintEnd.toDateString());
        `
    },
    {
        highlight: "setSeconds()",
        content: "Устанавливает секунды указанного объекта Date в соответствии с местным временем",
        code:
            `
        //code
        //setSeconds(seconds[, ms])
        //Мутирует Date и возвращает timestamp.

        const date = new Date(2026, 2, 15, 10, 30, 0);
        date.setSeconds(30);
        console.log(date.toTimeString()); // 10:30:30 ...

        date.setSeconds(90); // переполнение в минуты
        console.log(date.toTimeString()); // 10:31:30 ...

        //Реальный пример: обнулить секунды перед сохранением времени
        const prepared = new Date();
        prepared.setSeconds(0, 0);
        console.log(prepared.toTimeString());
        `
    },
    {
        highlight: "setTime()",
        content: "Устанавливает значение объекта Date в количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 UTC",
        code:
            `
        //code
        //setTime(timestampMs)
        //Мутирует Date и возвращает timestamp.

        const date = new Date();
        date.setTime(0);
        console.log(date.toISOString()); // 1970-01-01T00:00:00.000Z

        const ts = Date.UTC(2026, 2, 15); // UTC timestamp
        date.setTime(ts);
        console.log(date.toISOString()); // 2026-03-15T00:00:00.000Z

        //Реальный пример: восстановить дату из backend timestamp
        const fromServer = 1760000000000;
        const restoredDate = new Date();
        restoredDate.setTime(fromServer);
        console.log(restoredDate.toISOString());
        `
    }
];




export const DataMethods: React.FC<MethodProps> = ({dateItems = []}) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Date methods (Методы даты)</NotesTitle>
            <Text>
                <S.List>
                    {dateItems.map((item, index) => (
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
