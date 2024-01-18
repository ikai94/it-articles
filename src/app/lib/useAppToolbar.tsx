import { ReactElement } from 'react';
import { AppRoutes } from '@/shared/const/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

/**
 * Верхний слой для MainLayout скрола,
 */
export function useAppToolbar() {
    /**
     * Хук для вычисления изменения маршрута
     */
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    };

    /**
     * Текущий маршрут
     */
    return toolbarByAppRoute[appRoute];
}
