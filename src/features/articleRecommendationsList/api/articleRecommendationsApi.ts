import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

// инициализация api для создания выборки из трех статей
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // название для хука (возвращает массив статей, а принимает число)
        getArticleRecommendationsList: build.query<Article[], number>({
            // параметры которые будут использоваться
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

// инициализация автоматически созданного хука
export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
