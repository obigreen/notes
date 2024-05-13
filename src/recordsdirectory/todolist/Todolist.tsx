import React from 'react';
import {OneTodolist} from "./todolists/OneTodolist";
import {TypeTitle} from "../RecordsDirectory_Style";
import {CodeForLessons} from "./todolists/code/CodeForLessons";
import {TwoTodolist} from "./todolists/TwoTodolist";
import {Theory} from "./todolists/Theory";
import {ThreeTodolist} from "./todolists/ThreeTodolist";

export const Todolist = () => {
    return (
        <>
            <TypeTitle>Todolists</TypeTitle>
            {/*<OneTodolist/>*/}
            {/*<TwoTodolist/>*/}
            <ThreeTodolist/>

            {/*<CodeForLessons/>*/}
            {/*<Theory src={"string"} alt={"string"}/>*/}
        </>
    );
};



