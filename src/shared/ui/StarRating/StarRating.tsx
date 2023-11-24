import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon';
import StarIcon from '../../assets/icons/star.svg';

interface StarRatingProps {
    className?: string;
    // клик на выбранную звезду
    onSelect?: (starsCount: number) => void;
    // размер звезд
    size?: number;
    // уже выбранные звезды
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        selectedStars = 0,
        size = 30,
        onSelect,
    } = props;
    // количество выбранных звезд
    const [currentStarsCount, setCurrentStarsCount] = useState(0);
    // проверяем выбрано ли хоть одно значение
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    // прокидываем функцию в функцию через замыкание
    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    // когда вышли за пределы звезд
    const onLeave = () => () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(
                        cls.StarIcon,
                        {
                            [cls.hovered]: currentStarsCount >= starNumber,
                            [cls.selected]: isSelected,
                        },
                        [],
                    )}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}

                />
            ))}
        </div>
    );
});
