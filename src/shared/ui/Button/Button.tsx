import { classNames } from 'shared/lib/classNames/classNames';
import {
    ButtonHTMLAttributes, FC, ReactNode, memo,
} from 'react';
import cls from './Button.module.scss';

// темы для кнопки
export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
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
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme,
        // задаем первоначальные значения именно тут
        size = ButtonSize.M,
        square,
        disabled,
        ...otherProps
    } = props;

    // вынес модсы в отдельный объект (деструктуризация)
    const mods: Record<string, boolean> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
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
