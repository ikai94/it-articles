import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

interface GetProfileRatingArg {
    userId: string;
    profileId: string;
}

interface RateProfileArg {
    userId: string;
    profileId: string;
    rate: number;
    feedback?: string;
}

// инициализация api для создания выборки из трех статей
const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // название для хука (возвращает массив статей, а принимает строки)
        getProfileRating: build.query<Rating[], GetProfileRatingArg>({
            // параметры которые будут использоваться
            query: ({ profileId, userId }) => ({
                url: '/profile-rating',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        rateProfile: build.mutation<void, RateProfileArg>({
            // параметры которые будут использоваться
            query: (arg) => ({
                url: '/profile-rating',
                method: 'POST', // метод запроса
                body: arg, // тело запроса в который передаются аргументы
            }),
        }),
    }),
});

// инициализация автоматически созданного хука
export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
