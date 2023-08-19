import { createSlice } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';

const initialState: CounterSchema = {
    value: 0,
};

// слайсы для счетчика
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducers } = counterSlice;
