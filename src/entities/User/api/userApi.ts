import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}

/**
 * отправляем патч запрос на обновление данных, для того чтоб переписать его в базе данных.
 */
const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // название для хука
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            // параметры которые будут использоваться
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        getUserDataById: build.query<User, string>({
            // параметры которые будут использоваться
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
