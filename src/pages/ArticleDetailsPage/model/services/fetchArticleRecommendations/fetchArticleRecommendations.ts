import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход (id статьи), третим аргументом передается обработчик ошибок
export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
    >(
        'articleDetailsPage/fetchArticleRecommendations ',
        async (props, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                // делаем запрос на бекенд и получаем необходимые параметры (в параметры вставляем запросы которые были необходимы по документации json-server)
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _limit: 4,
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
