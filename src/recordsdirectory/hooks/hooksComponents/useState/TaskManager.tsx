import React, {ChangeEvent, useState} from 'react';

type Task = string;
type TaskList = Task[];

export const TaskManager = () => {


    // Состояние для хранения текущего ввода пользователя (текст задачи)
    const [currentTask, setCurrentTask] = useState<Task>('');


    // Состояние для хранения списка всех задач
    const [tasks, setTasks] = useState<TaskList>([]);

    // Функция для обновления состояния при вводе текста пользователем
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(event.currentTarget.value);
    };

    // Функция для добавления новой задачи в список
    const addTask = () => {
        if (!currentTask) return; // Не добавляем пустую задачу
        setTasks([...tasks, currentTask]); // Добавляем текущую задачу в список
        setCurrentTask(''); // Очищаем поле ввода
    };

    return (
        <div>
            <input value={currentTask} onChange={handleInputChange} />
            <button onClick={addTask}>Добавить Задачу</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
}

