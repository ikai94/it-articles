import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
    /*    // объявление типов
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    // будет отрабатывать перед каждым тестом
    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('succes login', async () => {
        const userValue = { username: '123', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const action = loginByUsername({ password: '123', username: '123' });
        const result = await action(dispatch, getState, undefined);

        // проверка экшинов
        expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        // количество вызовод dispatch
        expect(dispatch).toHaveBeenCalledTimes(3);
        // подтверждение самого вызова поста
        expect(mockedAxios.post).toHaveBeenCalled();
        // статус подтверждения
        expect(result.meta.requestStatus).toBe('fulfilled');
        // возвращаются данные о пользователе
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const action = loginByUsername({ password: '123', username: '123' });
        const result = await action(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    }); */

    test('succes login', async () => {
        const userValue = { username: '123', id: '1' };

        // создание объекта из класса который сделали
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({ password: '123', username: '123' });

        // проверка экшинов
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        // количество вызовод dispatch
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        // подтверждение самого вызова поста
        expect(thunk.api.post).toHaveBeenCalled();
        // статус подтверждения
        expect(result.meta.requestStatus).toBe('fulfilled');
        // возвращаются данные о пользователе
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ password: '123', username: '123' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
