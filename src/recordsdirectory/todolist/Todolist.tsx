import React from 'react';
import {OneTodolist} from "./todolists/OneTodolist";
import {TypeTitle} from "../RecordsDirectory_Style";
import {CodeForLessons} from "./todolists/code/CodeForLessons";

export const Todolist = () => {
    return (
        <>
            <TypeTitle>Todolists</TypeTitle>
            <OneTodolist/>

            {/*<CodeForLessons/>*/}
        </>
    );
};

