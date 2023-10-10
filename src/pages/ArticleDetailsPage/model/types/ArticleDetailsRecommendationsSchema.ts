import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

// наследуемся от EntityState, так как это дефолтный тип для состояния
export interface ArticleDetailsRecommendationsSchema extends EntityState<Article>{
    isLoading?: boolean;
    error?: string;
}
