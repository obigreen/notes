import React from 'react';
import {OneTodolist} from "./todolists/OneTodolist";
import {TypeTitle} from "../RecordsDirectory_Style";
import {CodeForLessons} from "./todolists/code/CodeForLessons";
import {TwoTodolist} from "./todolists/TwoTodolist";
import {Theory} from "./todolists/Theory";
import {ThreeTodolist} from "./todolists/ThreeTodolist";
import {FourTodolist} from "./todolists/FourTodolist";

export const Todolist = () => {
    return (
        <>
            <TypeTitle>Todolists</TypeTitle>
            {/*<OneTodolist/>*/}
            {/*<TwoTodolist/>*/}
            {/*<ThreeTodolist/>*/}
            <FourTodolist/>
            {/*<CodeForLessons/>*/}
            {/*<Theory src={"string"} alt={"string"}/>*/}
        </>
    );
};



