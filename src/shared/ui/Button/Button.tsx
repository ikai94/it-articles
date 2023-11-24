import {
    ButtonHTMLAttributes, FC, ReactNode, memo,
} from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

// темы для кнопки
export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}
// размеры для кнопки
export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonTheme;
    // Отвечает за размер кнопки по умолчанию
    square?: boolean;
    // отвечает за размер кнопки
    size?: ButtonSize;
    // дисейблит кнопку
    disabled?: boolean;
    children?: ReactNode;
    fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        // задаем первоначальные значения именно тут
        size = ButtonSize.M,
        square,
        fullWidth,
        disabled,
        ...otherProps
    } = props;

    // вынес модсы в отдельный объект (деструктуризация)
    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
