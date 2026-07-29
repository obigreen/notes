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

type EditableField = Exclude<keyof UserFormState, 'errors'>;

const initialFormState: UserFormState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
};

export const RegistrationForm = () => {

    const [formState, setFormState] = useState<UserFormState>(initialFormState);

    // Обновлять можно только поля ввода, но не служебный объект errors.
    const handleInputChange = (field: EditableField, value: string) => {
        setFormState((previousState) => ({
            ...previousState,
            [field]: value,
            errors: {
                ...previousState.errors,
                [field]: undefined,
            },
        }));
    };

    // Валидация остаётся чистой функцией: она не меняет state самостоятельно.
    const validateForm = (state: UserFormState) => {
        const errors: UserFormState['errors'] = {};

        if (state.username.trim().length < 3) {
            errors.username = 'Имя пользователя должно быть не менее 3 символов';
        }
        // Упрощённая UX-проверка. Сервер всё равно обязан валидировать email самостоятельно.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
            errors.email = 'Введите корректный email';
        }
        if (state.password.length < 8) {
            errors.password = 'Пароль должен быть не менее 8 символов';
        }
        if (state.confirmPassword !== state.password) {
            errors.confirmPassword = 'Пароли не совпадают';
        }

        return errors;
    };

    // Функция, вызываемая при отправке формы
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateForm(formState);

        if (Object.keys(errors).length > 0) {
            setFormState((previousState) => ({...previousState, errors}));
            return;
        }

        setFormState((previousState) => ({...previousState, errors: {}}));

        // В payload не отправляем служебные errors и повтор пароля.
        const payload = {
            username: formState.username.trim(),
            email: formState.email.trim(),
            password: formState.password,
        };
        console.log('Форма отправлена', payload);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
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

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {formState.errors.email && <p>{formState.errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password">Пароль:</label>
                <input
                    id="password"
                    type="password"
                    value={formState.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />
                {formState.errors.password && <p>{formState.errors.password}</p>}
            </div>

            <div>
                <label htmlFor="confirm-password">Повторите пароль:</label>
                <input
                    id="confirm-password"
                    type="password"
                    value={formState.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
                {formState.errors.confirmPassword && <p>{formState.errors.confirmPassword}</p>}
            </div>

            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};
