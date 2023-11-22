import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

// ожидаем пропсы на вход
interface FetchArticlesListProps {
    replace?: boolean
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
            // передаем в квери параметры
            const limit = getArticlesPageLimit(getState());
            const sort = getArticlesPageSort(getState());
            const order = getArticlesPageOrder(getState());
            const search = getArticlesPageSearch(getState());
            const page = getArticlesPageNum(getState());
            const type = getArticlesPageType(getState());

            try {
                addQueryParams({
                    sort, order, search, type,
                });

                // делаем запрос на бекенд и получаем необходимые параметры (в параметры вставляем запросы которые были необходимы по документации json-server)
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        q: search,
                        type: type === ArticleType.ALL ? undefined : type,
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
