import { useCallback, useRef } from 'react';

// хук для выполенения действия в промежуток времени (сделано для того, чтоб не спамить кучу действий)
export function useThrottle(callback: (...arg: any[]) => void, delay: number) {
    // создается флаг, по условию которого будет выполняться callback (если флаг будет false, тогда будет выполняться)
    const throttleRef = useRef(false);

    return useCallback((...arg: any[]) => {
        if (!throttleRef.current) {
            callback(...arg);
            throttleRef.current = true;

            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [callback, delay]);
}
