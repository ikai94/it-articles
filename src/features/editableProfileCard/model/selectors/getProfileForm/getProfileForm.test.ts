import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

describe('getProfileForm.test', () => {
    test('should return data', () => {
        const data = {
            first: 'admin',
            lastname: 'admin',
            age: 22,
            username: 'admin',
            country: Country.Russia,
            city: 'Krasnodar',
            currency: Currency.RUB,
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
