import { CSSProperties, useMemo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '../../ui/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import UserIcon from '../../assets/icons/user-filled.svg';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

export const Avatar = ({
    className,
    src,
    size = 100,
    alt,
    fallbackInverted,
}: AvatarProps) => {
    const mods: Mods = {};
    // мемоизируем так как это стайл и это объект
    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    /**
     * Подгрузка скелетона
     */
    const fallback = <Skeleton width={size} height={size} border="50%" />;
    /**
     * Подгрузка запасной аватарки в случаи ошибки
     */
    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            width={size}
            height={size}
            Svg={UserIcon}
        />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            alt={alt}
            src={src}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
