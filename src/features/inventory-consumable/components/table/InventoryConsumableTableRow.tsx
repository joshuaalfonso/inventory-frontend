import { useColorModeValue } from "@/components/ui/color-mode";
// import { displayDateTime } from "@/lib/dateFormat";
import { Button, FormatNumber, Menu, Portal, Stack, Table, Text } from "@chakra-ui/react";
import type { InventoryConsumable } from "../../inventoryConsumable.model";
import { LuEllipsis, LuEye } from "react-icons/lu";



interface Props {
    row: InventoryConsumable
    index: number
}


const InventoryConsumableTableRow = ({ row, index }: Props) => {

    const bg = useColorModeValue('white', 'bg.subtle');

    return (
        <>
            <Table.Row key={row.item_id} bg={bg}>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>
                    {row.brand_name} {row.item_name}
                    <Text fontSize={'xs'} color={'fg.muted'}>
                        {row.category_name}
                    </Text>
                </Table.Cell>
                <Table.Cell>{row.item_type_name}</Table.Cell>
                {/* <Table.Cell>{row.unit_of_measure_name}</Table.Cell> */}
                <Table.Cell>
                    <Stack direction={'row'} gap={1}>
                        <FormatNumber value={row.quantity} />
                        <Text>{row.unit_of_measure_name}</Text>
                    </Stack>
                </Table.Cell>
                {/* <Table.Cell>{displayDateTime(row.created_at)}</Table.Cell> */}
                <Table.Cell textAlign="end">
                
                <Menu.Root positioning={{ placement: "bottom-end" }}>
                    <Menu.Trigger asChild>
                    <Button
                        size={'xs'} 
                        variant={'ghost'} 
                        colorPalette={'gray'}
                    >
                        <LuEllipsis />
                    </Button>
                    </Menu.Trigger>
                    <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
    
                            <Menu.Item 
                                value="edit" 
                                cursor={'pointer'}
                            >
                                <LuEye />
                                View
                            </Menu.Item>
    
                        </Menu.Content>
                    </Menu.Positioner>
                    </Portal>
                </Menu.Root>
    
                </Table.Cell>
            </Table.Row>
        
             
        
        </>
    )
}

export default InventoryConsumableTableRow