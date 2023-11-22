import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// асинхронный фанк для подрузки списков
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход (id статьи), третим аргументом передается обработчик ошибок
export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
    >(
        'articles/initArticlesPage ',
        async (searchParams, thunkAPI) => {
            const { dispatch, getState } = thunkAPI;
            const inited = getArticlesPageInited(getState());

            // производим проверку, если запрос не инициализован, то тогда его производим. По флагу.
            if (!inited) {
                // получаем параметры из searchParams и потом их диспатчим
                const orderFromUrl = searchParams.get('order') as SortOrder;
                const sortFromUrl = searchParams.get('sort') as ArticleSortField;
                const typeFromUrl = searchParams.get('type') as ArticleType;
                const searchFromUrl = searchParams.get('search');

                if (orderFromUrl) {
                    dispatch(articlesPageActions.setOrder(orderFromUrl));
                }
                if (sortFromUrl) {
                    dispatch(articlesPageActions.setSort(sortFromUrl));
                }
                if (searchFromUrl) {
                    dispatch(articlesPageActions.setSearch(searchFromUrl));
                }
                if (typeFromUrl) {
                    dispatch(articlesPageActions.setType(typeFromUrl));
                }

                dispatch(articlesPageActions.initState());
                dispatch(fetchArticlesList({}));
            }
        },
    );
