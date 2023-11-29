import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileRating, useRateProfile } from '../api/profileRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
    const {
        className,
        profileId,
    } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetProfileRating({
        userId: userData?.id ?? '',
        profileId,
    });

    const [rateProfileMutation] = useRateProfile();

    const onHandleRateProfile = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateProfileMutation({
                rate: starsCount,
                profileId,
                feedback,
                userId: userData?.id ?? '',
            });
        } catch (e) {
            console.log(e);
        }
    }, [profileId, rateProfileMutation, userData?.id]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        onHandleRateProfile(starsCount, feedback);
    }, [onHandleRateProfile]);

    const onCancel = useCallback((starsCount: number) => {
        onHandleRateProfile(starsCount);
    }, [onHandleRateProfile]);

    const rating = data?.[0];

    if (isLoading) {
        return (
            <Skeleton width="100%" height={140} />
        );
    }

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            className={className}
            title={t('Оцените профиль!')}
            feedbackTitle={t('Оставьте свой отзыв об этом профиле, это важно для нас')}
            rate={rating?.rate}
            hasFeedback
        />
    );
});

export default ProfileRating;
