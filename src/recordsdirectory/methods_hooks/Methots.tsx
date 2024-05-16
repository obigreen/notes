import React from 'react';
import {TypeTitle} from "../RecordsDirectory_Style";
import {arrayItems, ArrayMethods} from "./methodslist/ArrayMethods";
import {stringItems, SrtingMethods} from "./methodslist/StringMethods";
import {objectItems, ObjectMethods} from "./methodslist/ObjectMethods";
import {numberItems, NumberMethods} from "./methodslist/NumberMethods";
import {dateItems, DataMethods} from "./methodslist/DateMethods";

export const Methots = () => {
    return (
        <>
            <TypeTitle>Methods</TypeTitle>
            <ArrayMethods arrayItems={arrayItems}/>
            <SrtingMethods stringItems={stringItems}/>
            <ObjectMethods objectItems={objectItems}/>
            <NumberMethods numberItems={numberItems}/>
            <DataMethods dateItems={dateItems}/>
        </>
    );
};
