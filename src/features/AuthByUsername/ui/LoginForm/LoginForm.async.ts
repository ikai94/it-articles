import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// создание чанка для асинхронной функции
// добавляем <FC<LoginFormProps>> чтобы не терять пропсы при использование мемоизации (memo)
export const LoginFormAsync = lazy<FC<LoginFormProps>>(
    () => import('./LoginForm'),
);
