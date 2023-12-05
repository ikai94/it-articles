import { StateSchema } from '@/app/providers/StoreProvider';

// получение поля каунтер из стейта
export const getCounter = (state: StateSchema) => state.counter;
