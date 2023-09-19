import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
    ProfileSchema, ValidateProfileError, profileActions, profileReducers, updateProfileData,
} from 'entities/Profile';

const data = {
    first: 'admin',
    lastname: 'admin',
    age: 22,
    username: 'admin',
    country: Country.Russia,
    city: 'Krasnodar',
    currency: Currency.RUB,
};

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        // передаем данные в редьюсер для изменения юзернейма и последующая проверка
        expect(profileReducers(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
        // передаем данные в редьюсер для изменения юзернейма и последующая проверка
        expect(profileReducers(
            state as ProfileSchema,
            profileActions.cancelEdit(),
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '1234' } };
        // передаем данные в редьюсер для изменения юзернейма и последующая проверка
        expect(profileReducers(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: '123456',
            }),
        )).toEqual({
            form: {
                username: '123456',
            },
        });
    });

    test('test update profile service pending ', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: undefined,
        };
        // передаем данные в редьюсер для изменения юзернейма и последующая проверка
        expect(profileReducers(
            state as ProfileSchema,
            updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fullfiled ', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };
        // передаем данные в редьюсер для изменения юзернейма и последующая проверка
        expect(profileReducers(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: data,
            data,
        });
    });
});