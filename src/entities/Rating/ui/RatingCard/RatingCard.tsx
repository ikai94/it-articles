import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onCancel,
        feedbackTitle,
        onAccept,
        hasFeedback,
        title,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [starsCount, setStarsCount] = useState<number>(rate);
    const [feedback, setFeedback] = useState<string>('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            // проверка на передачу true и последующее вспылытие модального окна
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    // отправка данных
    const acceptHandler = useCallback(() => {
        // закрытие модального окна
        setIsModalOpen(false);
        // отправка данных о коичестве звезд и сам отзыв на верхний модуль
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    // отправка данных
    const canselHandler = useCallback(() => {
        // закрытие модального окна
        setIsModalOpen(false);
        // отправка данных о количестве звезд
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack align="center" gap="8" max>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Text
                            title={starsCount ? t('Спасибо за оценку!') : title}
                        />
                    }
                    off={
                        <TextDeprecated
                            title={starsCount ? t('Спасибо за оценку!') : title}
                        />
                    }
                />

                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack gap="32" max>
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack gap="16" justify="end" max>
                                    <Button onClick={canselHandler}>
                                        {t('Закрыть')}
                                    </Button>
                                    <Button onClick={acceptHandler}>
                                        {t('Отправить')}
                                    </Button>
                                </HStack>
                            }
                            off={
                                <HStack gap="16" justify="end" max>
                                    <ButtonDeprecated
                                        onClick={canselHandler}
                                        theme={ButtonTheme.OUTLINE_RED}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated onClick={acceptHandler}>
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={canselHandler}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <Button
                                    fullWidth
                                    onClick={acceptHandler}
                                    size="l"
                                >
                                    {t('Отправить')}
                                </Button>
                            }
                            off={
                                <ButtonDeprecated
                                    fullWidth
                                    onClick={acceptHandler}
                                    size={ButtonSize.L}
                                >
                                    {t('Отправить')}
                                </ButtonDeprecated>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card max border="partial" padding="24" className={className}>
                    {content}
                </Card>
            }
            off={
                <CardDeprecated className={className} max>
                    {content}
                </CardDeprecated>
            }
        />
    );
});
