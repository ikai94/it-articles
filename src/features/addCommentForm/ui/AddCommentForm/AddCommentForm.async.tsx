import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

// создание чанка для асинхронной функции
// добавляем <FC<LoginFormProps>> чтобы не терять пропсы при использование мемоизации (memo)
export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!!
    setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}));
