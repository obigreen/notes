import React from 'react'

import {KTwoButton} from "./KTwoButton";
import {TaskType} from "./KTwoApp";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}


export const KTwoTodolist = ({title, tasks, removeTask}: PropsType) => {


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
                <KTwoButton onClick={() => {
                }} title={'All'}/>
                <KTwoButton onClick={() => {
                }} title={'Active'}/>
                <KTwoButton onClick={() => {
                }} title={'Completed'}/>
            </div>
        </div>
    )
}

