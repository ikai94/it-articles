import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { ValidateProfileError } from '../../consts/consts';

// создаю запрос для обновления данных сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход, третим аргументом передается обработчик ошибок
export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
    >(
        'profile/updateProfileData',
        // тела запроса не будет
        async (_, thunkAPI) => {
            const { extra, rejectWithValue, getState } = thunkAPI;

            const formData = getProfileForm(getState());

            const errors = validateProfileData(formData);

            // проверка на ошибки в валидации
            if (errors.length) {
                return rejectWithValue(errors);
            }

            try {
            // делаем запрос на бекенд (put отправляет запрос на обновление данных). В тело запроса передаем данные из формы
                const response = await extra.api.put<Profile>(
                    `/profile/${formData?.id}`,
                    formData,
                );

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                // rejectWithValue используется для обработки ошибок, который вытягивается из thunkAPI
                return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
            }
        },
    );
