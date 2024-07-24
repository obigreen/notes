import React from 'react';
import {ParagraphTitle, Section, Text, TextP, TypeTitle} from "../RecordsDirectory_Style";
import {arrayItems, ArrayMethods} from "./methodslist/ArrayMethods";
import {stringItems, SrtingMethods} from "./methodslist/StringMethods";
import {objectItems, ObjectMethods} from "./methodslist/ObjectMethods";
import {numberItems, NumberMethods} from "./methodslist/NumberMethods";
import {dateItems, DataMethods} from "./methodslist/DateMethods";

export const Methods = () => {


    return (
        <>
            <TypeTitle>Methods</TypeTitle>

            <Section>
                <Text>
                    <ParagraphTitle>Приоритет для изучения по ходу</ParagraphTitle>
                    <TextP>push()</TextP>
                    <TextP>pop()</TextP>
                    <TextP>shift()</TextP>
                    <TextP>unshift()</TextP>
                    <TextP>split()</TextP>
                    <TextP>join()</TextP>
                    <TextP>reverse()</TextP>
                    <TextP>concat() (array/string)</TextP>
                    <TextP>flat()</TextP>
                    <TextP>find()</TextP>
                    <TextP>includes() (array/string)</TextP>
                    <TextP></TextP>
                </Text>
            </Section>

            <ArrayMethods arrayItems={arrayItems}/>
            <SrtingMethods stringItems={stringItems}/>
            <ObjectMethods objectItems={objectItems}/>
            <NumberMethods numberItems={numberItems}/>
            <DataMethods dateItems={dateItems}/>
        </>
    );
};
