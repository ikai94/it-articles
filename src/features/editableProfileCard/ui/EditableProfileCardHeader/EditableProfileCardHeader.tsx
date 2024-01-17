import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation('profile');
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        // проверка на авторизованного пользователя
        const canEdit = authData?.id === profileData?.id;
        // флаг для отрисовки кнопки редактировать или отменить
        const readonly = useSelector(getProfileReadOnly);
        const dispatch = useAppDispatch();

        // оборачивает в useCallback так как необходимо сохранить ссылку на эту функцию и она будет передаваться аргументом
        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding="24" border="partial" max>
                        <HStack
                            justify="between"
                            max
                            className={classNames('', {}, [className])}
                        >
                            <Text title={t('Профиль')} />
                            {/* проверяем на авторизованного пользователя и только потом отрисовываем */}
                            {canEdit && (
                                <div>
                                    {/* по флагу будет менять кнопку (отменить и редактировать) */}
                                    {readonly ? (
                                        <Button onClick={onEdit}>
                                            {t('Редактировать')}
                                        </Button>
                                    ) : (
                                        <HStack gap="8">
                                            <Button
                                                onClick={onCancelEdit}
                                                color="error"
                                            >
                                                {t('Отменить')}
                                            </Button>
                                            <Button
                                                onClick={onSave}
                                                color="success"
                                            >
                                                {t('Сохранить')}
                                            </Button>
                                        </HStack>
                                    )}
                                </div>
                            )}
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        justify="between"
                        max
                        className={classNames('', {}, [className])}
                    >
                        <TextDeprecated title={t('Профиль')} />
                        {/* проверяем на авторизованного пользователя и только потом отрисовываем */}
                        {canEdit && (
                            <div>
                                {/* по флагу будет менять кнопку (отменить и редактировать) */}
                                {readonly ? (
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onEdit}
                                    >
                                        {t('Редактировать')}
                                    </ButtonDeprecated>
                                ) : (
                                    <HStack gap="8">
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE_RED}
                                            onClick={onCancelEdit}
                                        >
                                            {t('Отменить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE}
                                            onClick={onSave}
                                        >
                                            {t('Сохранить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                }
            />
        );
    },
);
