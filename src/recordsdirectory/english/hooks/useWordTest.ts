import {useState, useEffect} from 'react';

export const useWord = (questions: { eng: string; rus: string }[]) => {
    const [isSingleWordMode, setIsSingleWordMode] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    // Тоггл режима просмотра одного слова
    const toggleMode = () => {
        setIsSingleWordMode(!isSingleWordMode);
        setIsCorrect(false);
        setInputValue('');
    };

    // Функция перехода к следующему слову
    const handleNextWord = () => {
        setIsCorrect(false);
        setInputValue('');
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    // Удаление символов и приведение к нижнему регистру
    const normalizeString = (str: string) => {
        const withoutBrackets = str.replace(/\(.*?\)/g, ''); // Удаляем скобки
        return withoutBrackets.replace(/[^a-zа-яё\s]/gi, '').toLowerCase().trim(); // Удаляем знаки и приводим к нижнему регистру
    };

    // Просто принимаем любой ввод и считаем его правильным
    const handleCheckTranslation = () => {
        setIsCorrect(true);
    };

    // Обработка нажатия клавиши Enter
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !isCorrect) {
                handleCheckTranslation();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputValue, currentWordIndex, isCorrect]);

    const currentWord = questions[currentWordIndex];

    return {
        isSingleWordMode,
        toggleMode,
        currentWord,
        inputValue,
        setInputValue,
        isCorrect,
        handleNextWord,
        handleCheckTranslation
    };
};




