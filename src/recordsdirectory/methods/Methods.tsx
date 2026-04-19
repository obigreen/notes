import React from 'react';
import {
    Link,
    Marker,
    NoteBlock,
    NoteLi,
    NoteUl,
    ParagraphTitle,
    Section,
    Text,
    TextP,
    TypeTitle,
    VideoContainer
} from "../RecordsDirectory_Style";
import {arrayItems, ArrayMethods} from "./methodslist/ArrayMethods";
import {stringItems, SrtingMethods} from "./methodslist/StringMethods";
import {objectItems, ObjectMethods} from "./methodslist/ObjectMethods";
import {numberItems, NumberMethods} from "./methodslist/NumberMethods";
import {dateItems, DataMethods} from "./methodslist/DateMethods";
import {HighlightedCodeBlock} from "../regex/regexComponents/HighlightedCodeBlock";

export const Methods = () => {
    return (
        <>
            <TypeTitle>Methods (Методы)</TypeTitle>
            <Section>
                <Text>
                    <ParagraphTitle>Приоритет для изучения</ParagraphTitle>
                    <TextP>push()</TextP>
                    <TextP>pop()</TextP>
                    <TextP>shift()</TextP>
                    <TextP>unshift()</TextP>
                    <TextP>split()</TextP>
                    <TextP>join()</TextP>
                    <TextP>reverse()</TextP>
                    <TextP>concat() (array/string)</TextP>
                    <TextP>flat()</TextP>
                    <TextP>flatMap()</TextP>
                    <TextP>find()</TextP>
                    <TextP>reduce()</TextP>
                    <TextP>includes() (array/string)</TextP>
                    <TextP>toSorted()</TextP>
                    <TextP>Object.fromEntries()</TextP>
                </Text>
            </Section>
            <ArrayMethods arrayItems={arrayItems}/>
            <SrtingMethods stringItems={stringItems}/>
            <ObjectMethods objectItems={objectItems}/>
            <NumberMethods numberItems={numberItems}/>
            <DataMethods dateItems={dateItems}/>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Конспект: Как Выбирать Метод Осознанно</ParagraphTitle>
                    <TextP>
                        Главная практика: сначала понимать, <Marker>какой результат нужен</Marker> (новый массив, одно значение,
                        boolean, поиск элемента), и только потом выбирать метод.
                    </TextP>
                    <NoteUl>
                        <NoteLi><Marker>map</Marker> — получить массив той же длины с преобразованными элементами.</NoteLi>
                        <NoteLi><Marker>filter</Marker> — получить подмножество по условию.</NoteLi>
                        <NoteLi><Marker>find</Marker> — найти один первый элемент.</NoteLi>
                        <NoteLi><Marker>reduce</Marker> — свести массив к одному итогу (число/объект/Map).</NoteLi>
                        <NoteLi>
                            Проверяй, мутирует ли метод исходные данные: <Marker>sort/reverse/push/pop/shift/unshift</Marker>
                            мутируют, а <Marker>map/filter/find/includes/toSorted</Marker> — нет.
                        </NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практический Pipeline (Рабочий Шаблон)</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {
                            `
// Цель: взять массив заказов и подготовить данные для UI + статистики
const orders = [
  { id: 1, status: 'paid', amount: 1200, currency: 'RUB' },
  { id: 2, status: 'new', amount: 500, currency: 'RUB' },
  { id: 3, status: 'paid', amount: 890, currency: 'RUB' }
];

// 1) Оставляем только оплаченные
const paidOrders = orders.filter((order) => order.status === 'paid');

// 2) Готовим компактный список карточек
const cards = paidOrders.map((order) => ({
  id: order.id,
  label: 'Order #' + order.id,
  amountText: order.amount.toLocaleString('ru-RU') + ' ' + order.currency
}));

// 3) Общая сумма
const total = paidOrders.reduce((sum, order) => sum + order.amount, 0);

// 4) Индекс по id для быстрого доступа
const byId = Object.fromEntries(paidOrders.map((order) => [order.id, order]));

console.log(cards);
console.log(total);
console.log(byId[1]);
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Рекомендуемые материалы:
                        {" "}
                        <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">MDN Array</Link>
                        {" · "}
                        <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">MDN Object</Link>
                    </TextP>
                    <VideoContainer>
                        <iframe
                            src="https://www.youtube.com/embed/R8rmfD9Y5-c"
                            title="JavaScript Array methods"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoContainer>
                </Text>
            </NoteBlock>
        </>
    );
};







