import { counterReducers, counterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice.test', () => {
    test('decrement', () => {
        // формируем стейт
        const state: CounterSchema = { value: 10 };
        // коунтерредьюсер принимает стейт и экшины и работает уже с ними
        expect(counterReducers(state, counterActions.decrement()))
            .toEqual({ value: 9 });
    });
    test('increment', () => {
        // формируем стейт
        const state: CounterSchema = { value: 10 };
        // коунтерредьюсер принимает стейт и экшины и работает уже с ними
        expect(counterReducers(state, counterActions.increment()))
            .toEqual({ value: 11 });
    });
    test('should work with empty state', () => {
        // коунтерредьюсер принимает стейт и экшины и работает уже с ними
        expect(counterReducers(undefined, counterActions.increment()))
            .toEqual({ value: 1 });
    });
});
