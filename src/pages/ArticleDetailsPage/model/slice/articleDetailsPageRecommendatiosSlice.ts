import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import {
    fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

type Book = { bookId: string; title: string }

const recommendationsAdapter = createEntityAdapter<Article>({
    // получение айди (поле по которому будет идти нормализация)
    selectId: (article) => article.id,
});

// создание селектора с помощью которого будем получать комментарии (getInitialState - возвращает дефолтный стейт)
export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    // инициализируем дефолтное состояние, для полного отображения всех полей дженериком передаем <ArticleDetailsCommentsSchema>
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                // ошибку обновляем, если она была true
                state.error = undefined;
                // будем показывать какой нибудь спинер
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                // сохранение данных от сервера в state (обращаемся к commentsAdapter, выбираем setAll и первым аргументом передаем наши данные, а вторым что хотим добавить.
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articleDetailsPageRecommendationsReducer,
} = articleDetailsPageRecommendationsSlice;
