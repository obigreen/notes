import React, {useState} from 'react';

// Определение типов для элементов формы
interface UserFormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    errors: {
        username?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
}

const initialFormState: UserFormState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
};

export const RegistrationForm = () => {
    
    const [formState, setFormState] = useState<UserFormState>(initialFormState);

    // Универсальная функция для обновления состояний любого поля формы
    const handleInputChange = (field: keyof UserFormState, value: string) => {
        setFormState({
            ...formState,
            [field]: value,
        });
    };

    // Функция для проверки корректности введённых данных
    const validateForm = () => {
        let errors: UserFormState['errors'] = {};

        if (formState.username.length < 3) {
            errors.username = 'Имя пользователя должно быть не менее 3 символов';
        }
        // Проверки почты, паролей и т.д.
        // ...

        setFormState({
            ...formState,
            errors: errors,
        });

        return Object.keys(errors).length === 0;
    };

    // Функция, вызываемая при отправке формы
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Вызов функции валидации
        if (validateForm()) {
            console.log('Форма отправлена', formState);
            // Здесь могла быть отправка данных на сервер...
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Имя пользователя:</label>
                <input
                    id="username"
                    type="text"
                    value={formState.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                />
                {formState.errors.username && <p>{formState.errors.username}</p>}
            </div>

            {/* Поля для email, password и confirmPassword со схожими проверками */}
            {/* ... */}

            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};
