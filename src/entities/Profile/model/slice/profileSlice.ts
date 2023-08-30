import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    // находимся в режиме для чтения
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

// слайсы в котором указывается первоночальное состояние, название и редьюсеры
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducers } = profileSlice;
