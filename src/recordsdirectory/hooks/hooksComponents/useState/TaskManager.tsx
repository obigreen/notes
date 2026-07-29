import React, {ChangeEvent, useState} from 'react';

type Task = {
    id: number;
    text: string;
};
type TaskList = Task[];
let nextTaskId = 1;

export const TaskManager = () => {


    // Состояние для хранения текущего ввода пользователя (текст задачи)
    const [currentTask, setCurrentTask] = useState('');


    // Состояние для хранения списка всех задач
    const [tasks, setTasks] = useState<TaskList>([]);

    // Функция для обновления состояния при вводе текста пользователем
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(event.currentTarget.value);
    };

    // Функция для добавления новой задачи в список
    const addTask = () => {
        const normalizedTask = currentTask.trim();
        if (!normalizedTask) return; // Не добавляем пустую строку или одни пробелы
        const newTask: Task = {
            id: nextTaskId++,
            text: normalizedTask,
        };
        setTasks((previousTasks) => [...previousTasks, newTask]);
        setCurrentTask(''); // Очищаем поле ввода
    };

    return (
        <div>
            <input value={currentTask} onChange={handleInputChange} />
            <button onClick={addTask}>Добавить Задачу</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.text}</li>
                ))}
            </ul>
        </div>
    );
}
