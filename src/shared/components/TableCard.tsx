import { useColorModeValue } from "@/components/ui/color-mode";
import { Box } from "@chakra-ui/react";


interface Props {
  children: React.ReactNode;
}


const TableCard = ({ children }: Props) => {

    const bg = useColorModeValue("white", "bg.subtle");


    return (
        <Box
            p={8}
            borderWidth="1px"
            borderColor="border.disabled"
            rounded="md"
            bg={bg}
        >
            {children}
        </Box>
    )
}

export default TableCard