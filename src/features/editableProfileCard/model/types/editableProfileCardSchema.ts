import { Profile } from 'entities/Profile';

// хранение типов валидационных ошибок
export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface ProfileSchema {
    // хранятся данные пользователя
    data?: Profile;
    // хранятся измененные состояния пользователя
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    // валидация проверок
    validateErrors?: ValidateProfileError[];
}
