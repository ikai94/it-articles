import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from '@/entities/Profile';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

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
    reducers: {
        // изменяем состояние флага
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            // возвращаем в режим только для чтения
            state.readonly = true;
            // сбрасываем текст всех ошибок в форме
            state.validateErrors = undefined;
            // перезаписываем стейт в первоночальное состояние
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            // разворачивает старое поле полностью и добавляем новое (в случаи изменения какого то поля, оно перезатрется)
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    // изменяем стейт при помощи extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                // ошибку обновляем, если она была true
                state.error = undefined;
                // будем показывать какой нибудь спинер
                state.isLoading = true;
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    // сохранение данных от сервера в state
                    state.data = action.payload;
                    state.form = action.payload;
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, (state) => {
                // ошибку обновляем, если она была true
                state.error = undefined;
                // будем показывать какой нибудь спинер
                state.isLoading = true;
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    // сохранение данных от сервера в state
                    state.data = action.payload;
                    state.form = action.payload;
                    state.readonly = true;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
