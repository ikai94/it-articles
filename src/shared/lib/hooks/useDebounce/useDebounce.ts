import { MutableRefObject, useCallback, useRef } from 'react';

/**
 *  Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */

// хук для выполенения действия в промежуток времени (сделано для того, чтоб не спамить кучу действий)
export function useDebounce(callback: (...arg: any[]) => void, delay: number) {
    // как только проходит время, то будет производится вызов callback
    const timer = useRef() as MutableRefObject<any>;

    // пока таймер очищается, функция вызвана не будет
    return useCallback((...arg: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callback(...arg);
        }, delay);
    }, [callback, delay]);
}
