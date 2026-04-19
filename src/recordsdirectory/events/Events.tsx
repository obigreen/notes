import React from 'react';
import {
    Link,
    Marker,
    NoteBlock,
    NoteLi,
    NoteUl,
    ParagraphTitle,
    Text,
    TextP,
    TypeTitle
} from "../RecordsDirectory_Style";
import {EventList} from "./eventslist/Event";
import {HighlightedCodeBlock} from "../regex/regexComponents/HighlightedCodeBlock";

export const Events = () => {
    return (
        <>
            <TypeTitle>Events (События)</TypeTitle>

            <NoteBlock>
                <Text>
                    <TextP>
                        Категория <Marker>Events</Marker> полностью целесообразна для отдельного раздела.
                        В нативном JavaScript это большая логическая группа:
                        <Marker> события интерфейса + объект события + управление всплытием + отмена стандартного поведения</Marker>.
                    </TextP>
                    <TextP>
                        В списке ниже есть как сами события (<Marker>click, input, submit, scroll...</Marker>),
                        так и ключевые части объекта события (<Marker>event.target, currentTarget, preventDefault</Marker>),
                        потому что в реальной разработке они используются вместе.
                    </TextP>
                </Text>
            </NoteBlock>

            <EventList/>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Конспект: Архитектура Событий В Реальном UI</ParagraphTitle>
                    <TextP>
                        В production события лучше проектировать как систему: где слушаем, где останавливаем всплытие,
                        где отменяем дефолт, и как не просадить производительность.
                    </TextP>
                    <NoteUl>
                        <NoteLi>Используй <Marker>делегирование</Marker> для больших списков и таблиц.</NoteLi>
                        <NoteLi>
                            Для `scroll`/`touch` слушателей учитывай <Marker>passive: true</Marker> и throttling/rAF.
                        </NoteLi>
                        <NoteLi>
                            Разделяй `target` (где кликнули) и `currentTarget` (где висит обработчик).
                        </NoteLi>
                        <NoteLi>
                            На формах почти всегда нужен `preventDefault` + ручная отправка с валидацией.
                        </NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практический Шаблон: Делегирование + Действия По Data-атрибутам</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {
                            `
const list = document.querySelector('#orders');

list.addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;

  const row = actionButton.closest('[data-id]');
  if (!row) return;

  const id = row.dataset.id;
  const action = actionButton.dataset.action;

  if (action === 'open') {
    console.log('open order', id);
  }

  if (action === 'delete') {
    row.remove();
    console.log('deleted', id);
  }
});

// Почему это удобно:
// один listener на контейнер вместо десятков на каждую кнопку
// и простое добавление новых action через data-action.
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Материалы:
                        {" "}
                        <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Event">MDN Event</Link>
                        {" · "}
                        <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling">MDN Event bubbling</Link>
                    </TextP>
                </Text>
            </NoteBlock>
        </>
    );
};
