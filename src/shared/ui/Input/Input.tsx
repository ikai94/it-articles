import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

// Omit позволяет забрать из типов все пропсы, но исключить те которые не нужны (первым агрументом то что хотим забрать, а вторым аргументом что хотим исключить)
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

// используем расширение для пропсов
interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}

// мемо позволяет избежать лишних перересовок компонентов
export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props;

    // сделано для добавления фокуса физически в инпут
    const ref = useRef<HTMLInputElement>(null);
    // отображение каретки
    const [isFocused, setIsFocused] = useState(false);
    // позиция каретки
    const [caretPosition, setCaretPosition] = useState(0);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    // 1.если этого поля нет, то вернется undefined(?.)
    // 2.позиция будет ровняться длине строки
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    // это процесс выхода из фокуса
    const onBlur = () => {
        setIsFocused(false);
    };

    // это процесс отображения фокуса на инпуте
    const onFocus = () => {
        setIsFocused(true);
    };

    // отвечает за точное указание коретки
    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    return (
    // отрисовываться будет только в том случаи, если пропс placeholder указан* это же касается и isFocused/
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={cls.caret}
                        // 9 px ширина символа с дефолтным размером и соответственно длина строки умножается на ширину симфола и получается расстояние от левого края
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    );
});
