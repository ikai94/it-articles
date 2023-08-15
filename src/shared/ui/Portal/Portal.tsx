import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import cls from './Portal.module.scss';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
// переносит компонент на уровень который мы указываем, в данном случаи body. чилдрен это необходимый элемент, а елемент куда переносим
export const Portal = (props: PortalProps) => {
    const {
        children,
        element = document.body,
    } = props;
    return createPortal(children, element);
};
