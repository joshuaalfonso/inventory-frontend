import { Badge, Button, Menu, Portal, Stack, Table, Text } from "@chakra-ui/react"
import type { InventoryAsset } from "../../inventoryAsset.model"
import { useColorModeValue } from "@/components/ui/color-mode"
import { displayDateTime } from "@/lib/dateFormat"
import { LuEllipsis, LuEye } from "react-icons/lu"





interface Props {
    row: InventoryAsset
    index: number
}



const InventoryAssetRow = ({ row, index }: Props) => {

    const bg = useColorModeValue('white', 'bg.subtle');

    return (
        <>
            <Table.Row key={row.item_id} bg={bg}>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{row.serial_number}</Table.Cell>
                <Table.Cell>
                    {row.brand_name} - {row.item_name}
                    <Stack direction={'row'} fontSize={'xs'} color={'fg.muted'}>
                        <Text>{row.category_name}</Text>
                        {/* <Separator orientation={'vertical'} />
                        <Text>{row.item_type_name}</Text> */}
                    </Stack>
                </Table.Cell>
              
                <Table.Cell>
                    <Badge colorPalette="green">Available</Badge>
                </Table.Cell>
                {/* <Table.Cell>{row.unit_of_measure_name}</Table.Cell> */}
                
                <Table.Cell>{displayDateTime(row.created_at)}</Table.Cell>
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

export default InventoryAssetRow