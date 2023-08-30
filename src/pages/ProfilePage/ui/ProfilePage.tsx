import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducers } from 'entities/Profile';

const reducers: ReducerList = {
    profile: profileReducers,
};

interface ProfilePageProps {
    className?: string;
}
const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                {t('Profile page')}
            </div>
        </DynamicModuleLoader>

    );
});

// дефолтный экспорт всегда используется для асинхронных компонентов
export default ProfilePage;
