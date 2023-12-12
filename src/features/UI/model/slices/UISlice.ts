import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UISchema } from '../types/UISchema';

const initialState: UISchema = {
    scroll: {},
};

// слайсы в котором указывается первоночальное состояние, название и редьюсеры
export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // при помощи payloadAction мы определеям что ожидаем внутри экшена. Внутри дженерика объектом обозначаем поля которые будем получать. { 'путь' : 500}
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: uiActions, reducer: uiReducers } = uiSlice;
