import React from 'react';
import {NoteLi, NoteUl, ParagraphTitle, TypeTitle} from "../RecordsDirectory_Style";
import {arrayItems, ArrayMethods} from "./methodslist/ArrayMethods";
import {stringItems, SrtingMethods} from "./methodslist/StringMethods";
import {objectItems, ObjectMethods} from "./methodslist/ObjectMethods";
import {numberItems, NumberMethods} from "./methodslist/NumberMethods";
import {dateItems, DataMethods} from "./methodslist/DateMethods";

export const Methots = () => {
    return (
        <>
            <TypeTitle>Methods</TypeTitle>
            <ParagraphTitle>Приоритет для изучения по ходу</ParagraphTitle>
            <NoteUl>
                <NoteLi>push()</NoteLi>
                <NoteLi>pop()</NoteLi>
                <NoteLi>shift()</NoteLi>
                <NoteLi>unshift()</NoteLi>
                <NoteLi>split()</NoteLi>
                <NoteLi>join()</NoteLi>
                <NoteLi>reverse()</NoteLi>
                <NoteLi>concat() (array/string)</NoteLi>
                <NoteLi>flat()</NoteLi>
                <NoteLi>find()</NoteLi>
                <NoteLi>includes() (array/string)</NoteLi>
                <NoteLi></NoteLi>
            </NoteUl>
            <ArrayMethods arrayItems={arrayItems}/>
            <SrtingMethods stringItems={stringItems}/>
            <ObjectMethods objectItems={objectItems}/>
            <NumberMethods numberItems={numberItems}/>
            <DataMethods dateItems={dateItems}/>
        </>
    );
};
