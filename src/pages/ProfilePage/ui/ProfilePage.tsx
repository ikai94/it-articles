import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { ProfileRating } from '@/features/profileRating';
import { getUserAuthData } from '@/entities/User';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    // получаем необходимый id из запроса(для отображения страницы по номеру)
    const { id } = useParams<{ id: string }>();
    const authData = useSelector(getUserAuthData);

    if (!id) {
        return null;
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
                {authData?.id !== id && <ProfileRating profileId={id} />}
            </VStack>
        </Page>
    );
});

// дефолтный экспорт всегда используется для асинхронных компонентов
export default ProfilePage;
