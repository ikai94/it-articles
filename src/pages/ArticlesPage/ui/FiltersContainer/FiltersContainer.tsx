import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        onChangeSort,
        sort,
        onChangeType,
        type,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
    } = useArticleFilters();

    return (
        <ArticlesFilters
            type={type}
            order={order}
            search={search}
            sort={sort}
            onChangeType={onChangeType}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            className={className}
        />
    );
});
