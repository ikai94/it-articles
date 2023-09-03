import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход, третим аргументом передается обработчик ошибок
export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    // тела запроса не будет, так как это get запрос
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            // делаем запрос на бекенд
            const response = await extra.api.get<Profile>('/profile');
            return response.data;
        } catch (e) {
            console.log(e);
            // rejectWithValue используется для обработки ошибок, который вытягивается из thunkAPI
            return rejectWithValue('error');
        }
    },
);
