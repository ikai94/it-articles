// eslint-disable-next-line kai-plugin/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

/**
 * декоратор, роль которого возвращать отображение нового интерфейса по флагу
 */
export const FeaturesFlagsDecorator =
    (features: FeatureFlags) => (StoryComponent: Story) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
