import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../../model/types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход (id статьи), третим аргументом передается обработчик ошибок
export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('');
    }

    try {
        // делаем запрос на бекенд и диспатчим в базу данных, не используя хуков/ При помощи .unwrap() разворачиваем и получаем результат
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('');
        }

        return response.jsonSettings;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
