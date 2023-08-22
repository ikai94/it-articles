import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {};

// слайсы в котором указывается первоночальное состояние, название и редьюсеры
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: userActions } = userSlice;
export const { reducer: userReducers } = userSlice;
