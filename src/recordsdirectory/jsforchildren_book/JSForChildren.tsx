import React from 'react';
import {TypeTitle} from "../RecordsDirectory_Style";
import {OneWhatJavaScript} from "./chapters/part_one_basics/OneWhatJavaScript";
import {S} from "./JSForChildren_Styles"

export const JsForChildren = () => {
    return (
        <>
            <TypeTitle>Book - "JavaScript fo children"</TypeTitle>
            <S.Chapters>
                <OneWhatJavaScript />
            </S.Chapters>
        </>
    );
};
