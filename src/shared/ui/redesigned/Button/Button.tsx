import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

/**
 * Темы для кнопки
 */
export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
/**
 * Размеры для кнопки
 */
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противополныжный теме приложения и т.д.)
     */
    variant?: ButtonVariant;
    /**
     * флаг делающий кнопку квадратной
     */
    square?: boolean;
    /**
     * Размер кнопки
     */
    size?: ButtonSize;
    /**
     * Увеличивает кнопку на всю свободную ширину
     */
    fullWidth?: boolean;
    /**
     * Флаг отвечающий за работу кнопки
     */
    disabled?: boolean;
    color?: ButtonColor;
    /**
     * Содержимое кнопки
     */
    children?: ReactNode;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'outline',
        size = 'm',
        color = 'normal',
        square,
        fullWidth,
        disabled,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    /**
     * вынес модсы в отдельный объект (деструктуризация)
     */
    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
                cls[color],
            ])}
            disabled={disabled}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
