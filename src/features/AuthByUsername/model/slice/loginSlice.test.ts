import { loginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<loginSchema> = { username: '123' };
        // передаем данные в редьюсер для изменения юзернейма и последующая проверка
        expect(
            loginReducer(
                state as loginSchema,
                loginActions.setUsername('123123'),
            ),
        ).toStrictEqual({ username: '123123' });
    });

    test('test set password', () => {
        const state: DeepPartial<loginSchema> = { password: '123' };
        // передаем данные в редьюсер для изменения юзернейма и последующая проверка
        expect(
            loginReducer(
                state as loginSchema,
                loginActions.setPassword('123123'),
            ),
        ).toStrictEqual({ password: '123123' });
    });
});
