// import { usePagination } from "@/shared/hooks/usePagination";
import type { PurchaseOrders } from "../../purchaseOrder.model"
import { PAGE_SIZE } from "@/lib/constants";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, FormatNumber, Table } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PurchaseOrderTableRow from "./PurchaseOrderTableRow";



interface Props {
    purchaseOrders: PurchaseOrders[],
    page: number,
    setPage: (newPage: number) => void
    totalPages: number
}

const PurchaseOrderTable = ({ purchaseOrders, page, setPage, totalPages }: Props) => {

    console.log('purchase order table')
    // const navigate = useNavigate();

    // const { 
    //     data, 
    //     page, 
    //     setPage,
    // } = usePaginatedPurchaseOrders();
        
    const customCardBg = useColorModeValue('white', 'bg.subtle');

    return (
        <>

            <Box
                p={8}
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                rounded={'md'}
                bg={customCardBg}
            >

                <Table.ScrollArea>
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row bg={customCardBg}>
                                <Table.ColumnHeader>#</Table.ColumnHeader>
                                {/* <Table.ColumnHeader>PO Date</Table.ColumnHeader> */}
                                <Table.ColumnHeader>PO #</Table.ColumnHeader>
                                <Table.ColumnHeader>Supplier</Table.ColumnHeader>
                                <Table.ColumnHeader>PR #</Table.ColumnHeader>
                                <Table.ColumnHeader>Total Price</Table.ColumnHeader>
                                <Table.ColumnHeader>Total Quantity</Table.ColumnHeader>
                                <Table.ColumnHeader>Status</Table.ColumnHeader>
                                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {purchaseOrders?.map((item, index) => (
                                <PurchaseOrderTableRow 
                                    key={item.purchase_order_id}
                                    row={item} 
                                    index={(page - 1) * PAGE_SIZE + index + 1}
                                />
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>

                {totalPages > 1 && (
                    <div 
                        className="flex justify-end items-center"
                    >
                        <Box
                            mt={4}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={4}
                        >
                            <Button 
                                size="xs" 
                                variant={'ghost'}
                                colorPalette={'gray'}
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                <LuChevronLeft />
                            </Button>

                            <Box fontSize={'xs'}>
                                Page <FormatNumber value={page} /> of <FormatNumber value={totalPages} />
                            </Box>

                            <Button 
                                size="xs" 
                                variant={'ghost'}
                                colorPalette={'gray'}
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                            >
                                <LuChevronRight />
                            </Button>

                        </Box>
                    </div>
                )}

            </Box>

        </>
    )
}

export default PurchaseOrderTable