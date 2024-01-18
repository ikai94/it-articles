// eslint-disable-next-line kai-plugin/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlag } from '@/shared/lib/features/lib/setGetFeatures';

/**
 * декоратор, роль которого возвращать отображение нового интерфейса по выбранному флагу редизайна, для подгрузки дополнительных стилей обвернут в класс
 */
export const NewDesignDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlag(), isAppRedesigned: true });
    return (
        <div className="app_redesigned">
            <StoryComponent />
            );
        </div>
    );
};
