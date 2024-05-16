import React, {useState} from 'react';

export const Count = () => {
    // Инициализируем хук useState начальным значением счетчика, равным 0
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Вы нажали {count} раз</p>
            <button onClick={() => setCount(count + 1)}>
                Нажми на меня
            </button>
        </div>
    );
};

