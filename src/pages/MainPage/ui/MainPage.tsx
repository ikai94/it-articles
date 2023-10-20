import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { HStack } from 'shared/ui/Stack';
import { ListBox } from 'shared/ui/ListBox/ListBox';

const MainPage = memo(() => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val:string) => {
        setValue(val);
    };

    return (
        <Page>
            {t('Главная страница')}
        </Page>
    );
});

export default MainPage;
