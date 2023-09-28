import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    text: '',
    error: undefined,
};

// слайсы в котором указывается первоночальное состояние, название и редьюсеры
export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        // при помощи payloadAction мы определеям что ожидаем внутри экшена
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // изменяем стейт при помощи extraReducers
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             // ошибку обновляем, если она была true
    //             state.error = undefined;
    //             // будем показывать какой нибудь спинер
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducers } = addCommentFormSlice;
