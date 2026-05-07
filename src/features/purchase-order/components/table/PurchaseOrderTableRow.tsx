import { Badge, Button, CloseButton, Dialog, FormatNumber, Menu, Portal, Stack, Table, Text } from "@chakra-ui/react";
import type { CreatePurchaseOrder, PurchaseOrders } from "../../purchaseOrder.model"
import { useColorModeValue } from "@/components/ui/color-mode";
import { displayDate, displayDateTime } from "@/lib/dateFormat";
import { LuCheck, LuCheckCheck, LuEllipsis, LuEye, LuPencil, LuPhilippinePeso, LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getPurchaseOrderStatusPalette } from "@/lib/status";
import { useUpdatePurchaseOrderStatus } from "../../hooks/useUpdatePurchaseOrderStatus";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";


interface Props {
    row: PurchaseOrders
    index: number
}

const PurchaseOrderTableRow = ({ row, index }: Props) => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [pendingUpdate, setPendingUpdate] = useState<{
        purchase_order_id: CreatePurchaseOrder['purchase_order_id']
        status: CreatePurchaseOrder['status']
        bttnColor?: 'blue' | 'red' | 'green' | 'yellow' | 'gray' | 'purple'
    } | null>(null);

    const { updatePurchaseOrderStatusMutation, isUpdating } = useUpdatePurchaseOrderStatus();

    const handleOpenConfirmation = (
        purchase_order_id: CreatePurchaseOrder['purchase_order_id'],
        status: CreatePurchaseOrder['status'],
        bttnColor?: 'blue' | 'red' | 'green' | 'yellow' | 'gray' | 'purple'
    ) => {
        setPendingUpdate({
            purchase_order_id,
            status,
            bttnColor
        })

        setOpen(true)
    }

    const handleConfirm = () => {
        if (!pendingUpdate) return

        updatePurchaseOrderStatusMutation(
            pendingUpdate,
            {
                onSuccess: (response) => {
                    toaster.create({
                        title: 'Confirmed',
                        description: response.message
                    })
                    setOpen(false)
                }, 
                onError: (err) => {
                    toaster.create({
                        title: 'Confirmed',
                        description: err.message,
                        type: 'error'
                    })
                    setOpen(false)
                }
            }
        )

        // setOpen(false)
        // setPendingUpdate(null)
    }


    const bg = useColorModeValue('white', 'bg.subtle');


    return (
        <>
            <Table.Row bg={bg}>
                <Table.Cell>{index}</Table.Cell>
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
                    <Badge variant={'surface'} colorPalette={getPurchaseOrderStatusPalette(row.status)}>
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

                        { row.status == 'Cheque released' && (
                            <Menu.Item 
                                value="completed" 
                                onClick={() => handleOpenConfirmation(
                                    row.purchase_order_id,
                                    'Completed',
                                    'green'
                                )}
                                cursor={'pointer'}
                                disabled={isUpdating}
                            >
                                <LuCheckCheck />
                                Completed
                            </Menu.Item>
                        )}

                        { row.status == 'Awaiting cheque' && (
                            <Menu.Item 
                                value="cheque-released" 
                                onClick={() => handleOpenConfirmation(
                                    row.purchase_order_id,
                                    'Cheque released',
                                    'blue'
                                )}
                                cursor={'pointer'}
                                disabled={isUpdating}
                            >
                                <LuCheck />
                                Cheque released
                            </Menu.Item>
                        )}

                        { row.status == 'Awaiting cheque' && (
                            <Menu.Item 
                                value="revised" 
                                onClick={() => handleOpenConfirmation(
                                    row.purchase_order_id,
                                    'Revised',
                                    'red'
                                )}
                                cursor={'pointer'}
                                disabled={isUpdating}
                            >
                                <LuX />
                                Revised
                            </Menu.Item>
                        )}

                        { row.status == 'Awaiting cheque' && (
                             <Menu.Item 
                                value="edit" 
                                onClick={() => navigate(`${row.purchase_order_id}/edit`)}
                                cursor={'pointer'}
                            >
                                <LuPencil />
                                Edit
                            </Menu.Item>
                        ) }

                        </Menu.Content>
                    </Menu.Positioner>
                    </Portal>
                </Menu.Root>

                </Table.Cell>
            </Table.Row>

            <Dialog.Root 
                lazyMount 
                open={open} 
                onOpenChange={(e) => setOpen(e.open)}
                placement={'center'}
            >
                {/* <Dialog.Trigger asChild>
                    <Button variant="outline">Open</Button>
                </Dialog.Trigger> */}
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Confirmation</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Text>
                                    Are you sure you want to change this
                                    purchase order status to{" "}
                                    <strong>{pendingUpdate?.status}</strong>?
                                </Text>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="ghost" colorPalette={'gray'}>Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button 
                                    onClick={handleConfirm}
                                    colorPalette={pendingUpdate?.bttnColor}
                                    loading={isUpdating}
                                >
                                    Yes, {pendingUpdate?.status}
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" colorPalette={'gray'} />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

        </>
    )


}

export default PurchaseOrderTableRow