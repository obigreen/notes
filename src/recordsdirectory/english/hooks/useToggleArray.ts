import { useState, useCallback } from 'react';

// Функция для перемешивания массива
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

// Хук для управления перемешиванием массива и возвратом к исходному порядку
export const useToggleArray = <T,>(initialArray: T[]) => {
    const [array, setArray] = useState<T[]>(initialArray);
    const [isShuffled, setIsShuffled] = useState(false);

    const toggleArray = useCallback(() => {
        if (isShuffled) {
            setArray(initialArray); // Вернуть к исходному порядку
        } else {
            setArray(shuffleArray(initialArray)); // Перемешать массив
        }
        setIsShuffled(!isShuffled);
    }, [initialArray, isShuffled]);

    return { array, toggleArray, isShuffled };
};
