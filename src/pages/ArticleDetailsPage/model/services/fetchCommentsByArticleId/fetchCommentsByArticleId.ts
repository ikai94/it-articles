import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход (id статьи), третим аргументом передается обработчик ошибок
export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
    >(
        'articleDetails/FetchCommentsByArticleId ',
        // тела запроса не будет, так как это get запрос
        async (articleId, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            if (!articleId) {
                return rejectWithValue('error');
            }

            try {
            // делаем запрос на бекенд
                const response = await extra.api.get<Comment[]>('/comments', {
                    params: {
                        articleId,
                        _expand: 'user',
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
            // rejectWithValue используется для обработки ошибок, который вытягивается из thunkAPI
                return rejectWithValue('error');
            }
        },
    );
