import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../../ui/ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleRating } from '@/features/articleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../../ui/DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../../ui/AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    // получаем необходимый id из запроса(для отображения страницы по номеру)
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <StickyContentLayout
                        content={
                            <Page
                                className={classNames(
                                    cls.ArticleDetailsPage,
                                    {},
                                    [className],
                                )}
                            >
                                <VStack gap="16" max>
                                    <DetailsContainer />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments id={id} />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContainer />}
                    />
                }
                off={
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <VStack gap="16" max>
                            <ArticleDetailsPageHeader />
                            <ArticleDetails id={id} />
                            <ToggleFeatures
                                feature="isArticleRatingEnabled"
                                on={<ArticleRating articleId={id} />}
                                off={
                                    <Card>
                                        {t('Оценка статей скоро появится!')}
                                    </Card>
                                }
                            />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
