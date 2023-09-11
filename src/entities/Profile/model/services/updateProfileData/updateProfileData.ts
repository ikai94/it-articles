import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

// создаю запрос для обновления данных сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход, третим аргументом передается обработчик ошибок
export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    // тела запроса не будет, так как это get запрос
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const formData = getProfileForm(getState());

        try {
            // делаем запрос на бекенд (put отправляет запрос на обновление данных). В тело запроса передаем данные из формы
            const response = await extra.api.put<Profile>('/profile', formData);

            return response.data;
        } catch (e) {
            console.log(e);
            // rejectWithValue используется для обработки ошибок, который вытягивается из thunkAPI
            return rejectWithValue('error');
        }
    },
);
