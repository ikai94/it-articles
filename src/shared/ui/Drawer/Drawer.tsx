import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}
// шторка для мобильных устройств (работает как модалка)
export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;
    const { theme } = useTheme();
    // хук который отвечает за реализацию открытия и закрытия модального окна
    const { close, isClosing, isMounted } = useModal({ animationDelay: 300, isOpen, onClose });

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
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={close} />
                <div
                    className={cls.content}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
});
