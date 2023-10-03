import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
   isLoading?: boolean;
   error?: string;

   // вид отображения
   view: ArticleView;

   // пагинация
   page: number;
   limit?: number;
   hasMore: boolean;
}
