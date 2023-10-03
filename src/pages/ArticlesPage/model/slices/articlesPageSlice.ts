import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localestorage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

type Book = { bookId: string; title: string }

const articlesAdapter = createEntityAdapter<Article>({
    // получение айди (поле по которому будет идти нормализация)
    selectId: (article) => article.id,
});

// создание селектора с помощью которого будем получать комментарии (getInitialState - возвращает дефолтный стейт)
export const getArticle = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    // инициализируем дефолтное состояние, для полного отображения всех полей дженериком передаем <ArticleDetailsCommentsSchema>
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        page: 1,
        hasMore: true,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            // сохраняем по ключу состояние
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        // первоначальное состояние с сохранием в локалсторедж (инициализация происходит в useEffect в ArticlesPage)
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            // условие для лимита в зависимости от вида сетки
            state.limit = view === ArticleView.BIG ? 4 : 9;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                // ошибку обновляем, если она была true
                state.error = undefined;
                // будем показывать какой нибудь спинер
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                // сохранение данных от сервера в state (обращаемся к commentsAdapter, выбираем addMany(добавляем данные в конец списка) и первым аргументом передаем наши данные, а вторым что хотим добавить.
                articlesAdapter.addMany(state, action.payload);
                // если есть хотя бы один элемент, то на сервере данные есть.
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlesPageSlice;
