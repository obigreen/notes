import {notesData, SamuraiFastItem} from "./component/SamuraiFastItem";
import {TypeTitle} from "../RecordsDirectory_Style";
import React from "react";


// Перебор данных и вывод каждой компоненты с уникальными данными
export const SamuraiFast = () => {
    return (
        <>
            <TypeTitle>SamuraiFast</TypeTitle>
            {notesData.map((item) => (
                <SamuraiFastItem key={item.id} data={item}/>
            ))}
        </>
    );
};






