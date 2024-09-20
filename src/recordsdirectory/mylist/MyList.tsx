import React from 'react';
import {TasksList} from "./tasksList/TasksList";
import {TypeTitle} from "../RecordsDirectory_Style";

export const MyList = () => {
    return (
        <>
            <TypeTitle>MyList</TypeTitle>
            <TasksList/>
        </>
    );
};
