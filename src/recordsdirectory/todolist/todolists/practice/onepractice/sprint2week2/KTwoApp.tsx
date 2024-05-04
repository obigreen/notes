import React, {useState} from 'react'
import '../../practicestyle.css'
import {KTwoTodolist} from "./KTwoTodolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]);

    const removeTask = (taskId: number) => {

        setTasks(tasks.filter(task => task.id !== taskId))
    }

    return (
        <div className={'App'}>
            <KTwoTodolist title={"What to learn"} tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}

export default App;