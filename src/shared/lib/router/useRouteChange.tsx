import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

/**
 * Нахождение открытой страницы для отображения пути
 */
export function useRouteChange() {
    const location = useLocation();
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

    /**
     * matchPath сравнивает значение и возвращает необходимый путь или null
     */
    useEffect(() => {
        Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);

    /**
     * Возвращаем текущую открытую страницу
     */
    return appRoute;
}
