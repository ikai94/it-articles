import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    // после пересечения элемента на котором висит этот ref будет вызываться callback
    triggerRef: MutableRefObject<HTMLElement>;
    // внутри этого реф находится скролл ( в нашем случаи Page - компонент). Иногда wrapperom может быть вся страница
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback,
}: UseInfiniteScrollOptions) {
    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;
        let observer: IntersectionObserver | null = null;
        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };
            // при помощи деструктуризации достаем из массива entry
            observer = new IntersectionObserver(([entry]) => {
                // проверка на отработку callback единожды
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            // указываем за каким элемнтом мы будем следить
            observer.observe(triggerElement);
        }

        // отписываемся от слежки
        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
