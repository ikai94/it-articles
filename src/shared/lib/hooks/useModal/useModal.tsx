import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param animationDelay
 * @param isOpen
 * @param onClose
 */

export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
    // состояние закрытия модального окна
    const [isClosing, setIsClosing] = useState(false);

    // отвечает за состояние монтирование модалки в дом дерево
    const [isMounted, setIsMounted] = useState(false);

    // ReturnType возвращет тип который возвращает данная функция setTimeout
    // cделано при помощи данного хука, чтоб можно было осуществить очистку
    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    // если модальное окно будет открыто, то значение будет монтировано с true
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    // сначала делаем значение true для срабатывания модов на стиле, а потом закрываем
    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    // при нажатие на Escape отработает закрытие окна
    // useCallback сохраняет ссылку на функцию, а не перерендываем новую. Мемоизирует и запоминает ссылку и возвращает одну и тоже ссылку, если в массиве зависимостей ничего не изменилось
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close],
    );

    // очистка компонентка от таймаут, при демонтировании компонентка юзэффект очищает
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
    };
}
