import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localestorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

// слайсы в котором указывается первоночальное состояние, название и редьюсеры
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // сохраняем пользователей в базу
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        // метод позволяет сохранять данные, что пользователь авторизован
        initAuthData: (state) => {
            // получаем по ключу данные
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                // передаем в состояние, но перед этим парсим, так как они у нас в строке.
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            // очищаем стейт
            state.authData = undefined;
            // удаляем ключ который отвечает за данные пользователя
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: userActions } = userSlice;
export const { reducer: userReducers } = userSlice;
