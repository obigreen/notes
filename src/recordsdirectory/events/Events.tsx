import React from 'react';
import {TypeTitle, NoteBlock, Text, TextP, Marker} from "../RecordsDirectory_Style";
import {EventList} from "./eventslist/Event";

export const Events = () => {
    return (
        <>
            <TypeTitle>Events</TypeTitle>

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
        </>
    );
};
