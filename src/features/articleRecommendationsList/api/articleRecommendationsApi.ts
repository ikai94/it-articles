import { rtkApi } from 'shared/api/rtkApi';

// инициализация api для создания выборки из трех статей
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // название для хука
        getArticleRecommendationsList: build.query({
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
