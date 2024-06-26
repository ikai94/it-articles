import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getCanEditArticle } from '../../model/selectors/article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';
import { Counter } from '@/entities/Counter';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const navigate = useNavigate();
        const canEdit = useSelector(getCanEditArticle);
        // получаем id статьи для последующего изменения
        const article = useSelector(getArticleDetailsData);

        // возвращаем обратно к списку статей
        const onBackToList = useCallback(() => {
            navigate(getRouteArticles());
        }, [navigate]);

        // изменяем статью
        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article?.id));
            }
        }, [article, navigate]);

        return (
            <HStack
                justify="between"
                max
                className={classNames('', {}, [className])}
            >
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>

                {canEdit && (
                    <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
                        {t('Редактировать')}
                    </Button>
                )}
            </HStack>
        );
    },
);
