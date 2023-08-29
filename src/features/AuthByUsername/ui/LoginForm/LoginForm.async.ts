import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// создание чанка для асинхронной функции
// добавляем <FC<LoginFormProps>> чтобы не терять пропсы при использование мемоизации (memo)
export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!!
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
