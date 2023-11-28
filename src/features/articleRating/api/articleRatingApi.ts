import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

interface GetArticleRatingArg {
    userId: string;
    articleId: string;
}

interface RateArticleArg {
    userId: string;
    articleId: string;
    rate: number;
    feedback?: string;
}

// инициализация api для создания выборки из трех статей
const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // название для хука (возвращает массив статей, а принимает строки)
        getArticleRating: build.query<Rating[], GetArticleRatingArg>({
            // параметры которые будут использоваться
            query: ({ articleId, userId }) => ({
                url: '/article-rating',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            // параметры которые будут использоваться
            query: (arg) => ({
                url: '/article-rating',
                method: 'POST', // метод запроса
                body: arg, // тело запроса в который передаются аргументы
            }),
        }),
    }),
});

// инициализация автоматически созданного хука
export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
