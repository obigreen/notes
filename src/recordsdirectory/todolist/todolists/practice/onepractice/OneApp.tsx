import React from 'react'
import {OneTodolist} from "./OneTodolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


function OneApp() {

    const tasks1 = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false }
    ]

    return (
        <div className={"OneApp"}>
            <OneTodolist title={"What to learn"} tasks={tasks1}/>
        </div>
    )
}

export default OneApp;