import { useTranslation } from 'react-i18next';
import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        max,
        theme = CardTheme.NORMAL,
        ...otherProps
    } = props;
    const { t } = useTranslation();

    return (
        <div
            {...otherProps}
            className={classNames(cls.Card, { [cls.max]: max }, [
                className,
                cls[theme],
            ])}
        >
            {children}
        </div>
    );
};
