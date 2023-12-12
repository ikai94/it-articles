import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

// создаю запрос для получения данных с сервера
// дженерикам передается 1 аргумент то что возвращает сервак, в данном случаи данные пользователя, а второй аргумент то что ожидается на вход, третим аргументом передается обработчик ошибок
export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    // authData передаем на прямую как тело запроса (можно было реализовать деструктуризацию с паролем и именем пользователя)
    async (text, thunkAPI) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkAPI;
        // достаем информацию о пользователи который оставляет комментарий (селекторы)
        const userData = getUserAuthData(getState());
        // достаем текст сообщения
        const article = getArticleDetailsData(getState());

        // проверка на авторизацию пользователя, на добавленный текст и пост
        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            // теперь можно сокращать маршрут до локалхоста, так как был указан в baseURL
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });

            // если с сервера пришел пустой запрос, то будет ошибка
            if (!response.data) {
                throw new Error();
            }

            // запрашиваем обновление коментариев по айди поста
            dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (e) {
            // rejectWithValue используется для обработки ошибок, который вытягивается из thunkAPI
            return rejectWithValue('error');
        }
    },
);
