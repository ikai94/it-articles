import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue.test', () => {
    test('', () => {
        // формируем стейт c DeepPartial для объявления только куска состояния, остальные поля он будет игнорировать
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        // используем as так как используюм DeepPartial, тем самым приводим к стейт схеме. Тоесть выдает именно необходимое состояние из селектораю. Можно исполльзовать только в тестах
        expect(getCounterValue(state as StateSchema)).toEqual(10);
    });
});
