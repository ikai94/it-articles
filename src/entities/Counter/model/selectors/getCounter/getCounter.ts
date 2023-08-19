import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

// получение поля каунтер из стейта
export const getCounter = (state: StateSchema) => state.counter;
