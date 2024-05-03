import React from 'react'
import {KOneButton} from "./KOneButton";
import {TaskType} from "./KOneApp";
import '../practicestyle.css'



type PropsType = {
    title: string
    tasks: TaskType[]
}


export const KOneTodolist = ({title, tasks}: PropsType) => {

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
                <KOneButton title={'All'} />
                <KOneButton title={'Active'} />
                <KOneButton title={'Completed'} />
            </div>
        </div>
    )
}

