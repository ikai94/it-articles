export type { AddCommentFormSchema } from './model/types/addCommentForm';
export { AddCommentFormAsync as AddCommentForm } from './ui/AddCommentForm/AddCommentForm.async';

// полностью изолированная фича, наружу выходит только тип и асинхронный компонент. Все остальное изолировано в рамках одного модуля
