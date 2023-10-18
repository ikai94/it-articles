import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer } from '../../model/slice/articleDetailsCommentsSlice';
import {
    articleDetailsPageRecommendationsReducer,
} from './articleDetailsPageRecommendatiosSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    comments: articleDetailsCommentsReducer,
    recommendations: articleDetailsPageRecommendationsReducer,
});
