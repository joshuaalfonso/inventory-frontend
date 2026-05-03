import { Badge, Button, FormatNumber, Menu, Portal, Stack, Table, Text } from "@chakra-ui/react";
import type { PurchaseOrders } from "../../purchaseOrder.model"
import { useColorModeValue } from "@/components/ui/color-mode";
import { displayDate, displayDateTime } from "@/lib/dateFormat";
import { LuEllipsis, LuEye, LuPencil, LuPhilippinePeso } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getPurchaseOrderStatusPalette } from "@/lib/status";


interface Props {
    row: PurchaseOrders
    index: number
}

const PurchaseOrderTableRow = ({ row, index }: Props) => {

    const navigate = useNavigate();
    const bg = useColorModeValue('white', 'bg.subtle');

    return (
        <>
            <Table.Row bg={bg}>
                <Table.Cell>{index}</Table.Cell>
                {/* <Table.Cell>{displayDate(row.purchase_order_date)}</Table.Cell> */}
                <Table.Cell>
                    {row.purchase_order_number}
                    <Text fontSize={'xs'} color={'fg.muted'}>{displayDate(row.purchase_order_date)}</Text>
                </Table.Cell>
                <Table.Cell>{row.supplier_name || '-'}</Table.Cell>
                <Table.Cell>{row.purchase_request_number || '-'}</Table.Cell>
                <Table.Cell>
                    <Stack direction={'row'} alignItems={'center'}>
                        <LuPhilippinePeso />
                        <FormatNumber value={row.total_price} />
                    </Stack>
                </Table.Cell>
                <Table.Cell>
                    <Stack direction={'row'} alignItems={'center'}>
                        <FormatNumber value={row.total_delivered} />/<FormatNumber value={row.total_quantity} />
                    </Stack>
                </Table.Cell>
                <Table.Cell>
                    <Badge colorPalette={getPurchaseOrderStatusPalette(row.status)}>
                        { row.status }
                    </Badge>
                </Table.Cell>
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
                            value="view_details" 
                            onClick={() => navigate(`${row.purchase_order_id}`)}
                            cursor={'pointer'}
                        >
                            <LuEye />
                            View Details
                        </Menu.Item>

                        <Menu.Item 
                            value="edit" 
                            onClick={() => navigate(`${row.purchase_order_id}/edit`)}
                            cursor={'pointer'}
                        >
                            <LuPencil />
                            Edit
                        </Menu.Item>

                        {/* <Menu.Item 
                            value="delete" 
                            cursor={'pointer'}
                            color="fg.error"
                            _hover={{ bg: "bg.error", color: "fg.error" }}
                            onClick={() => setDeleteOpen(true)}
                        >
                            <LuTrash />
                            Delete
                        </Menu.Item> */}
                        
                        </Menu.Content>
                    </Menu.Positioner>
                    </Portal>
                </Menu.Root>

                </Table.Cell>
            </Table.Row>

        </>
    )


}

export default PurchaseOrderTableRow