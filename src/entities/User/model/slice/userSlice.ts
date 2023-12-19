import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localestorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { JsonSettings } from '../../model/types/jsonSettings';
import { saveJsonSettings } from '../../model/services/saveJsonSettings';
import { initAuthData } from '../../model/services/initAuthData';

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
            // своего рода эмитация бекенда, добавляем в локалсторедж
            localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);
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
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                setFeatureFlags(payload.features);
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: userActions } = userSlice;
export const { reducer: userReducers } = userSlice;
