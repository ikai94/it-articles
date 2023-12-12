import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileFirstname } from '../../selectors/getProfileFirstname/getProfileFirstname';

describe('getProfileFirstname.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    first: '123',
                },
            },
        };
        expect(getProfileFirstname(state as StateSchema)).toEqual('123');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileFirstname(state as StateSchema)).toEqual(undefined);
    });
});
