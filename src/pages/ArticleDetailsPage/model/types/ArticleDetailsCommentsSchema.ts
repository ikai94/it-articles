import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

// наследуемся от EntityState, так как это дефолтный тип для состояния
export interface ArticleDetailsCommentsSchema extends EntityState<Comment>{
    isLoading?: boolean;
    error?: string;
}
