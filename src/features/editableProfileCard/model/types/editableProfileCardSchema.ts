import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../consts/consts';

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
