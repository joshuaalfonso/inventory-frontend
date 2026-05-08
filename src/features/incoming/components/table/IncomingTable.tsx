// import { usePagination } from "@/shared/hooks/usePagination";
import { PAGE_SIZE } from "@/lib/constants";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, FormatNumber, Table } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import type { Incomings } from "../../incoming.model";
import TableCard from "@/shared/components/TableCard";
import IncomingTableRow from "./IncomingTableRow";



interface Props {
    incomings: Incomings[],
    page: number,
    setPage: (newPage: number) => void
    totalPages: number
}

const IncomingTable = ({ incomings, page, setPage, totalPages }: Props) => {

    console.log('incoming table')
        

    const customCardBg = useColorModeValue('white', 'bg.subtle');

    return (
        <>

            <TableCard>

                <Table.ScrollArea>

                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row bg={customCardBg}>
                                <Table.ColumnHeader>#</Table.ColumnHeader>
                                {/* <Table.ColumnHeader>PO Date</Table.ColumnHeader> */}
                                <Table.ColumnHeader>Incoming Date</Table.ColumnHeader>
                                <Table.ColumnHeader>Code</Table.ColumnHeader>
                                <Table.ColumnHeader>Sales Invoice #</Table.ColumnHeader>
                                <Table.ColumnHeader>Purchase Order #</Table.ColumnHeader>
                                <Table.ColumnHeader>Total Received</Table.ColumnHeader>
                                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {incomings?.map((item, index) => (
                                <IncomingTableRow 
                                    key={item.incoming_id}
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
                            gap={2}
                        >

                            <Button 
                                size="xs" 
                                variant={'ghost'}
                                colorPalette={'gray'}
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                            >
                                <LuChevronsLeft />
                            </Button>

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

                            <Button 
                                size="xs" 
                                variant={'ghost'}
                                colorPalette={'gray'}
                                onClick={() => setPage(totalPages)}
                                disabled={page === totalPages}
                            >
                                <LuChevronsRight />
                            </Button>

                        </Box>
                    </div>
                )}

            </TableCard>

        </>
    )
}

export default IncomingTable