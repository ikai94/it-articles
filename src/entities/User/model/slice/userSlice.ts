import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localestorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { JsonSettings } from '../../model/types/jsonSettings';
import { saveJsonSettings } from '../../model/services/saveJsonSettings';

const initialState: UserSchema = {
    _inited: false,
};

// слайсы в котором указывается первоночальное состояние, название и редьюсеры
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * сохраняем пользователя в базу
         */
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            /**
             * устанавливает значение флагов для авторизованного пользователя
             */
            setFeatureFlags(action.payload.features);
        },
        // метод позволяет получать данные из localStorage, что пользователь авторизован
        initAuthData: (state) => {
            // получаем по ключу данные
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                const json = JSON.parse(user) as User;
                // передаем в состояние, но перед этим парсим, так как они у нас в строке.
                state.authData = json;
                setFeatureFlags(json.features);
            }
            state._inited = true;
        },
        logout: (state) => {
            // очищаем стейт
            state.authData = undefined;
            // удаляем ключ который отвечает за данные пользователя
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            },
        );
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: userActions } = userSlice;
export const { reducer: userReducers } = userSlice;
