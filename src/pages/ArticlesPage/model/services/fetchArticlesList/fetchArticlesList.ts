import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

// ожидаем пропсы на вход
interface FetchArticlesListProps {
    page?: number;
}

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход (id статьи), третим аргументом передается обработчик ошибок
export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
    >(
        'articles/fetchArticlesList ',
        async (props, thunkAPI) => {
            const {
                extra, rejectWithValue, dispatch, getState,
            } = thunkAPI;
            const { page = 1 } = props;
            const limit = getArticlesPageLimit(getState());

            try {
            // делаем запрос на бекенд (в параметры вставляем запросы которые были необходимы по документации)
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
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
