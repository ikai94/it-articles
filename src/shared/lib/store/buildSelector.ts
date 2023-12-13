import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

/**
 * селектор может принимать N-количество аргументов
 */
type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
/**
 * Типизация аргументов хука
 */
type Hook<T, Args extends any[]> = (...args: Args) => T;
/**
 * Типизация результатов
 */
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

/**
 * Хук, который возвращает значение селектора, и сам селектор
 * @param selector - сам селектор
 */
export function buildSelector<T, Args extends any[]>(
    selector: Selector<T, Args>,
): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useSelector((state: StateSchema) => selector(state, ...args));
    };

    return [useSelectorHook, selector];
}
