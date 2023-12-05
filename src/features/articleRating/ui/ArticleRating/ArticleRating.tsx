import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className,
        articleId,
    } = props;
    const { t } = useTranslation();
    // получаем данные авторизованного пользователя
    const userData = useSelector(getUserAuthData);

    // получение данных их базы данных
    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticle();

    // создаем функцию которую будет передавать данные для сервера
    const handlerRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                rate: starsCount,
                articleId,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onCancel = useCallback((starsCount: number) => {
        handlerRateArticle(starsCount);
    }, [handlerRateArticle]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handlerRateArticle(starsCount, feedback);
    }, [handlerRateArticle]);

    // отрисовка загрузки компонента
    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    // получаем данные о рейтинге
    const rating = data?.[0];

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
            hasFeedback
        />
    );
});

export default ArticleRating;
