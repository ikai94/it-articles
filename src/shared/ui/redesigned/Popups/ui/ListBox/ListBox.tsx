import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import { HStack } from '../../../../redesigned/Stack/HStack/HStack';
import { Button } from '../../../Button/Button';
import { Icon } from '../../../Icon/Icon';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

// выпадающий список взятый из библиотеки headlessui
export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        defaultValue,
        value,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
    } = props;

    // объявление классов на фрагмент Options
    const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

    // сделано для переводов
    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    return (
        <HStack
            gap="4"
            className={classNames('', { [cls.readonly]: readonly })}
        >
            {label && <span>{`${label}:`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(
                    cls.ListBox,
                    { [cls.readonly]: readonly },
                    [className, popupCls.popup],
                )}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    as={Button}
                    variant="filled"
                    aria-disabled={readonly}
                    addonRight={<Icon Svg={ArrowIcon} />}
                    className={cls.trigger}
                >
                    {selectedItem?.content ?? defaultValue}
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {/* навешиваем hover эффект */}
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                        [popupCls.selected]: selected,
                                    })}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}
