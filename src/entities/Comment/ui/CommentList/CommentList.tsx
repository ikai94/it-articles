import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../../ui/CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        isLoading,
        comments,
    } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {/* отрисовка по количеству комментариев */}
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        className={cls.comment}
                        comment={comment}
                        key={comment.id}
                    />
                ))
                : <Text text={t('Комментарии отсутствуют')} />}
        </div>
    );
});
