import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';

const data = {
    first: 'admin',
    lastname: 'admin',
    age: 22,
    username: 'admin',
    country: Country.Russia,
    city: 'Krasnodar',
    currency: Currency.RUB,
};

describe('fetchProfileData.test', () => {
    test('succes', async () => {
        // создание объекта из класса который сделали
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk('1');

        // подтверждение самого вызова поста
        expect(thunk.api.get).toHaveBeenCalled();
        // статус подтверждения
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
