import { StateSchema } from '@/app/providers/StoreProvider';
import { getCounter } from './getCounter';

// блок проверки
describe('getCounter', () => {
    test('should return counter value', () => {
        // формируем стейт c DeepPartial для объявления только куска состояния, остальные поля он будет игнорировать
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        // используем as так как используюм DeepPartial, тем самым приводим к стейт схеме. Тоесть выдает именно необходимое состояние из селектораю. Можно исполльзовать только в тестах
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
