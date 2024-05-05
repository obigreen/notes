import React, {useState} from 'react'
import '../../practicestyle.css'
import {KTwoTodolist} from "./KTwoTodolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]);

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesType>
    ('All')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let taskForTodolist = tasks

    if (filter === 'Active') {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'Completed') {
        taskForTodolist = tasks.filter(task => task.isDone)
    }

    return (
        <div className={'App'}>
            <KTwoTodolist title={"What to learn"}
                          tasks={taskForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}/>
        </div>
    )
}

export default App;