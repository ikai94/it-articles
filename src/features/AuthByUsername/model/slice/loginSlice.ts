import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: loginSchema = {
    isLoading: false,
    username: '',
    password: '',
};

// слайсы в котором указывается первоночальное состояние, название и редьюсеры
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // при помощи payloadAction мы определеям что ожидаем внутри экшена
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    // изменяем стейт при помощи extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                // ошибку обновляем, если она была true
                state.error = undefined;
                // будем показывать какой нибудь спинер
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
