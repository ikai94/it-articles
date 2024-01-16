import React, { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../../deprecated/Overlay/Overlay';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import cls from './Modal.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

// добавляем типы пропсов, как для внутренней части, так и для открытия и закрытия модального окна
interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;

    const { theme } = useTheme();
    // хук который отвечает за реализацию открытия и закрытия модального окна
    const { isClosing, close, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen,
        onClose,
    });

    const mods: Mods = {
        // Когда значение true, навешивается стиль opened со значением opacity=1 и окно становится видимым
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    // если указан пропс lazy и компонент не вмонтирован то будем возвращать null. Само модальное окно не отрисовываем.
    if (lazy && !isMounted) {
        return null;
    }

    return (
        // переносим компонент на верхний уровень дом дерева при помощи портала
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    theme,
                    'app_modal',
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.modalNew,
                        off: () => cls.modalOld,
                    }),
                ])}
            >
                {/* добавляем нажатие на область видимости overlay */}
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
