import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

// добавляем типы пропсов, как для внетренней части, так и для открытия и закрытия модального окна
interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
    } = props;
    // состояние закрытия модального окна
    const [isClosing, setIsClosing] = useState(false);
    // ReturnType возвращет тип который возвращает данная функция setTimeout
    // cделано при помощи данного хука, чтоб можно было осуществить очистку
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const { theme } = useTheme();

    // сначала делаем значение true для срабатывания модов на стиле, а потом закрываем
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // при нажатие на Escape отработает закрытие окна
    // useCallback сохраняет ссылку на функцию, а не перерендываем новую. Мемоизирует и запоминает ссылку и возвращает одну и тоже ссылку, если в массиве зависимостей ничего не изменилось
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

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

    const mods: Record<string, boolean> = {
        // Когда значение true, навешивается стиль opened со значением opacity=1 и окно становится видимым
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls[theme]]: true,
    };

    return (
        // переносим компонент на верхний уровень дом дерева при помощи портала
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>

                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
