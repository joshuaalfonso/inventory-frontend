// import { usePagination } from "@/shared/hooks/usePagination";
import type { PurchaseOrders } from "../../purchaseOrder.model"
import { PAGE_SIZE } from "@/lib/constants";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, Input, InputGroup, Table } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";
import PurchaseOrderTableRow from "./PurchaseOrderTableRow";
import { useNavigate } from "react-router-dom";
import { usePaginatedPurchaseOrders } from "../../hooks/usePaginatedPurchaseOrder";


interface Props {
    purchaseOrders: PurchaseOrders[]
}

const PurchaseOrderTable = ({ purchaseOrders }: Props) => {

    console.log('purchase order table')
    const navigate = useNavigate();

    const { 
        data, 
        page, 
        setPage,
        searchInput,
        setSearchInput
    } = usePaginatedPurchaseOrders();
        
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

                <Box
                    mb={4} 
                    css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                    }}
                >
                    <InputGroup startElement={<LuSearch />} w={200} >
                    <Input
                        placeholder="Search keyword..."
                        size={'sm'}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    </InputGroup>
                    <Button 
                        size={'sm'}
                        variant={'solid'}
                        onClick={() => navigate('new')}
                    >
                        Create
                    </Button>
                </Box>


                <Table.Root size="sm">
                    <Table.Header>
                        <Table.Row bg={customCardBg}>
                            <Table.ColumnHeader>#</Table.ColumnHeader>
                            {/* <Table.ColumnHeader>PO Date</Table.ColumnHeader> */}
                            <Table.ColumnHeader>PO #</Table.ColumnHeader>
                            <Table.ColumnHeader>Supplier</Table.ColumnHeader>
                            <Table.ColumnHeader>PR #</Table.ColumnHeader>
                            <Table.ColumnHeader>Total Price</Table.ColumnHeader>
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

                {data!.totalPages > 1 && (
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
                                Page {page} of {data!.totalPages}
                            </Box>

                            <Button 
                                size="xs" 
                                variant={'ghost'}
                                colorPalette={'gray'}
                                onClick={() => setPage(page + 1)}
                                disabled={page === data!.totalPages}
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