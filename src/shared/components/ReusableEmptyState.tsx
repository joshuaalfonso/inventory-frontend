import { ButtonGroup, EmptyState, VStack } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { HiColorSwatch } from "react-icons/hi"

interface Props {
  children?: ReactNode
}

const ReusableEmptyState = ({ children }: Props) => {

    // const customCardBg = useColorModeValue('white', 'bg.subtle');

    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                <HiColorSwatch />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                <EmptyState.Title>Empty</EmptyState.Title>
                <EmptyState.Description>
                    Add a new item to get started
                </EmptyState.Description>
                </VStack>
                {children && <ButtonGroup>{children}</ButtonGroup>}
            </EmptyState.Content>
        </EmptyState.Root>
    )
}

export default ReusableEmptyState