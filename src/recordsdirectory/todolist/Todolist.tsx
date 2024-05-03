import React from 'react';
import {OneTodolist} from "./todolists/OneTodolist";
import {TypeTitle} from "../RecordsDirectory_Style";
import {CodeForLessons} from "./todolists/code/CodeForLessons";
import {TwoTodolist} from "./todolists/TwoTodolist";

export const Todolist = () => {
    return (
        <>
            <TypeTitle>Todolists</TypeTitle>
            <OneTodolist/>
            <TwoTodolist/>

            {/*<CodeForLessons/>*/}
        </>
    );
};

