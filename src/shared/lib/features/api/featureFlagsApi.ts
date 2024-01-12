import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
    userId: string;
    features: Partial<FeatureFlags>;
}

/**
 * отправляем патч запрос на обновление данных, для того чтоб переписать его в базе данных.
 */
const featureFlagsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // название для хука
        updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
            // параметры которые будут использоваться
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
});

export const updateFeatureFlagsMutations =
    featureFlagsApi.endpoints.updateFeatureFlags.initiate;
