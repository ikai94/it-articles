import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutations } from '../../api/featureFlagsApi';
import { getAllFeatureFlag } from '../setGetFeatures';

interface UpdateFeatureFlagsOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход (id статьи), третим аргументом передается обработчик ошибок
export const updateFeatureFlags = createAsyncThunk<
    void,
    UpdateFeatureFlagsOptions,
    ThunkConfig<string>
>('user/saveJsonSettings', async ({ userId, newFeatures }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    try {
        await dispatch(
            updateFeatureFlagsMutations({
                userId,
                features: {
                    ...getAllFeatureFlag(),
                    ...newFeatures,
                },
            }),
        );

        // перезагружаем страницу, так как не обновятся изменения
        window.location.reload();
        return undefined;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
