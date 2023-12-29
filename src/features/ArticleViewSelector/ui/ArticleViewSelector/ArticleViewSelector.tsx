import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '@/entities/Article';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    // переключение отображения
    onViewClick: (view: ArticleView) => void;
}

// массив списков отображения
const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, onViewClick, view } = props;
    const { t } = useTranslation();

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(
                        cls.ArticleViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                    border="round"
                >
                    <HStack gap="8">
                        {viewTypes.map((viewType, index) => (
                            <Icon
                                Svg={viewType.icon}
                                clickable
                                onClick={onClick(viewType.view)}
                                className={classNames(
                                    '',
                                    {
                                        [cls.notSelected]:
                                            viewType.view !== view,
                                    },
                                    [],
                                )}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div
                    className={classNames(cls.ArticleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType, index) => (
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                            key={index}
                        >
                            <IconDeprecated
                                height={24}
                                width={24}
                                Svg={viewType.icon}
                                className={classNames(
                                    '',
                                    {
                                        [cls.notSelected]:
                                            viewType.view !== view,
                                    },
                                    [],
                                )}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});
