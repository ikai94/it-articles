import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localestorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход, третим аргументом передается обработчик ошибок
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    // authData передаем на прямую как тело запроса (можно было реализовать деструктуризацию с паролем и именем пользователя)
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            // теперь можно сокращать маршрут до локалхоста, так как был указан в baseURL
            const response = await extra.api.post<User>('/login', authData);

            // если с сервера пришел пустой запрос, то будет ошибка
            if (!response.data) {
                throw new Error();
            }

            // своего рода эмитация бекенда, и так как в локалсторедж можно хранить только строки, то используем stringify для преобразования
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(response.data),
            );
            // передаем данные которые мы получили с сервера
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            // rejectWithValue используется для обработки ошибок, который вытягивается из thunkAPI
            return rejectWithValue('error');
        }
    },
);
