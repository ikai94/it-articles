import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    // осуществляет проверку на наличие элемента (true or false)
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {/* так как используем один компонент на два роута (создание и редактирование) то отрисовываем согласно проверки по id */}
            {isEdit
                ? t('Редактирование статьи с ID = ') + id
                : t('Создание новой статьи') }
        </Page>
    );
});

export default ArticleEditPage;
