import { Flex, FlexProps } from '../Flex/Flex';

// Omit позволяет назначить все пропсы FlexProps и исключить пропс (direction)
type VStackProps = Omit<FlexProps, 'direction'>;
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;
    return <Flex direction="column" {...props} align={align} />;
};
