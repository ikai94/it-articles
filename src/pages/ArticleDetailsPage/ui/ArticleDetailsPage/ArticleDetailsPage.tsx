import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddCommentForm } from 'features/addCommentForm';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import {
    ArticleDetailsPageHeader,
} from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import {
    fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { getArticleRecommendations } from '../../model/slice/articleDetailsPageRecommendatiosSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { articleDetailsPageReducer } from '../../model/slice';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    // получаем необходимый id из запроса(для отображения страницы по номеру)
    const { id } = useParams<{id: string}>();
    // селектор для вызова нормализованных данных
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

    // передаем функцию коллбэк пропсом
    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    // передаем колбек в наш созданный useEffect
    // диспатчим запросы на сервер
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t('Рекомендуем')}
                    />
                    <ArticleList
                        articles={recommendations}
                        isLoading={recommendationsIsLoading}
                        className={cls.recommendations}
                        target="_blank"
                    />
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t('Комментарии')}
                    />
                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList
                        isLoading={commentsIsLoading}
                        comments={comments}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
