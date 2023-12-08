import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';
import { buildSlice } from '@/shared/lib/store';

const initialState: CounterSchema = {
    value: 0,
};

// слайсы для счетчика
export const counterSlice = buildSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        add: (state, { payload }: PayloadAction<number>) => {
            state.value += payload;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

// экспорт экшинов и редьюсеров через деструктуризацию
export const {
    actions: counterActions,
    reducer: counterReducers,
    useActions: useCounterActions,
} = counterSlice;
