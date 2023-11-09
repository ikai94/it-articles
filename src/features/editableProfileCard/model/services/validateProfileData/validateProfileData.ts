// проверка на заполнение полей в форме пользователь
import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

export const validateProfileData = (profile?: Profile) => {
    // проверка на получение профиля
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const {
        first,
        lastname,
        age,
        country,
    } = profile;

    const errors: ValidateProfileError[] = [];

    // если нет имени или фамилии то добавляем в массив ValidateProfileError.INCORRECT_USER_DATA
    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_COUNTRY);
    }

    return errors;
};
