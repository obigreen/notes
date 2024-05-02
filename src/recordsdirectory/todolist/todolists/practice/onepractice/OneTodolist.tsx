import React from 'react'
import {OneButton} from "./OneButton";
import {TaskType} from "./OneApp";



type PropsType = {
    title: string
    tasks: TaskType[]
}


export const OneTodolist = ({title, tasks}: PropsType) => {

    return (
        <div className='todolist'>
            <h2>{title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map(t => <li><input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button>x</button>
                        </li>
                    )
                }
            </ul>

            <div>
                <OneButton title={'All'} />
                <OneButton title={'Active'} />
                <OneButton title={'Completed'} />
            </div>
        </div>
    )
}

