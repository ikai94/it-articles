import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from './AdditionalInfoContainer.module.scss';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);

    const navigate = useNavigate();
    // изменяем статью
    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article?.id));
        }
    }, [article, navigate]);

    if (!article) {
        return null;
    }

    return (
        <Card padding="24" border="partial" className={cls.card}>
            <ArticleAdditionalInfo
                views={article.views}
                author={article.user}
                createdAt={article.createdAt}
                onEdit={onEditArticle}
            />
        </Card>
    );
});
