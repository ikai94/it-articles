import { Flex, FlexProps } from '../Flex/Flex';

// Omit позволяет назначить все пропсы FlexProps и исключить пропс (direction)
type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: HStackProps) => {
    return <Flex direction="row" {...props} />;
};
