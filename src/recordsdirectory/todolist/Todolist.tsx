import React from 'react';
import {OneTodolist} from "./todolists/OneTodolist";
import {TypeTitle} from "../RecordsDirectory_Style";

export const Todolist = () => {
    return (
        <>
            <TypeTitle>Todolists</TypeTitle>
            <OneTodolist/>
        </>
    );
};

