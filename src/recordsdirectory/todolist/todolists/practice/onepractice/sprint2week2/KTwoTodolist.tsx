import React from 'react'

import {KTwoButton} from "./KTwoButton";
import {FilterValuesType, TaskType} from "./KTwoApp";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}


export const KTwoTodolist = ({title, tasks, removeTask, changeFilter}: PropsType) => {


    return (
        <div className='todolist'>
            <h2>{title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map(t => {

                            const onClickRemoveTaskHandler = () => {
                                removeTask(t.id);
                            }

                            return (
                                <li key={t.id}>
                                    <input type='checkbox' checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <KTwoButton onClick={onClickRemoveTaskHandler} title={"x"}/>
                                </li>
                            )
                        }
                    )
                }
            </ul>

            <div>
                <KTwoButton onClick={() => {changeFilter('All')}} title={'All'}/>
                <KTwoButton onClick={() => {changeFilter('Active')}} title={'Active'}/>
                <KTwoButton onClick={() => {changeFilter('Completed')}} title={'Completed'}/>
            </div>
        </div>
    )
}

