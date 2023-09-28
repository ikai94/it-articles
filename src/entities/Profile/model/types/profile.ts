import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

// хранение типов валидационных ошибок
export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface Profile {
    id?: string,
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string
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
