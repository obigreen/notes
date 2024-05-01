import React from 'react';
import {TypeTitle} from "../RecordsDirectory_Style";
import {arrayItems, ArrayMethods} from "./methodsarray/ArrayMethods";
import {stringItems, SrtingMethods} from "./methodsarray/StringMethods";
import {objectItems, ObjectMethods} from "./methodsarray/ObjectMethods";
import {numberItems, NumberMethods} from "./methodsarray/NumberMethods";
import {dateItems, DataMethods} from "./methodsarray/DateMethods";

export const Methods = () => {
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
