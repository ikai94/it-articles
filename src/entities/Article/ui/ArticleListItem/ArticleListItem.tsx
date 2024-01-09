import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from '../../ui/ArticleListItem/ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from '../../ui/ArticleListItem/ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

// происхоит проверка на view (BIG или SMALL), после чего отображается выбранная тематика
export const ArticleListItem = memo((props: ArticleListItemProps) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ArticleListItemRedesigned {...props} />}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
});
