import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

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
    // изменяем стейт при помощи extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                // ошибку обновляем, если она была true
                state.error = undefined;
                // будем показывать какой нибудь спинер
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                // сохранение данных от сервера в state
                state.data = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducers } = profileSlice;
