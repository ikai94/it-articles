import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlock } from '../../model/types/article';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { renderArticleBlock } from '../../ui/ArticleDetails/renderBlock';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <AvatarDeprecated
                    size={200}
                    src={article?.img}
                    className={cls.avatar}
                />
            </HStack>
            <TextDeprecated
                className={cls.title}
                title={article?.title}
                text={article?.subtitle}
                size={TextSize.L}
            />
            <VStack gap="4" max>
                <HStack gap="8" className={cls.articleInfo}>
                    <IconDeprecated Svg={EyeIcon} className={cls.icon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack gap="8" className={cls.articleInfo}>
                    <IconDeprecated Svg={CalendarIcon} className={cls.icon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>
            {/* перебор массива блоков, в callback renderBlock будет попадать block из массива blocks  */}
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};
const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <Text title={article?.title} size="l" bold />
            <Text text={article?.subtitle} size="l" bold />
            <AppImage
                fallback={<Skeleton width="100%" height={420} border="16px" />}
                src={article?.img}
                className={cls.img}
            />
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    // получение данных с сервера о статьях
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    // так как компонент обвернут в DynamicModuleLoader то необходимо менять только содержимое этой разметки. Соответственно в зависимости от условия будет отрисовываться содержимое
    let content;
    if (isLoading) {
        content = (
            <>
                <SkeletonDeprecated
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <SkeletonDeprecated
                    className={cls.title}
                    width={300}
                    height={32}
                />
                <SkeletonDeprecated
                    className={cls.skeleton}
                    width={600}
                    height={24}
                />
                <SkeletonDeprecated
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
                <SkeletonDeprecated
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
            </>
        );
    } else if (error) {
        content = (
            <TextDeprecated
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    } else {
        content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Redesigned />}
                off={<Deprecated />}
            />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
