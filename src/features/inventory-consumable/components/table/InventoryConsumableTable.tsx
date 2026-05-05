import { startTransition, useState, type ChangeEvent } from "react";
import type { InventoryConsumable } from "../../inventoryConsumable.model";
import { usePagination } from "@/shared/hooks/usePagination";
import { PAGE_SIZE } from "@/lib/constants";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, Input, InputGroup, Table } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";
import InventoryConsumableTableRow from "./InventoryConsumableTableRow";


interface Props {
    inventoryConsumables: InventoryConsumable[]
}


const InventoryConsumableTable = ({inventoryConsumables}: Props) => {

    const [search, setSearch] = useState<string>('');

    console.log('inventory consumable table', search)
    
    const filteredItems = inventoryConsumables

    const {
        paginatedData,
        currentPage,
        totalPages,
        nextPage,
        prevPage
    } = usePagination(filteredItems, PAGE_SIZE);

     const bg = useColorModeValue('white', 'bg.subtle');
    
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        startTransition(() => {
            setSearch(value);
        });
    };


    return (
        <>
            <Box
                p={8}
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                rounded={'md'}
                bg={bg}
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
                        onChange={handleSearch}
                    />
                    </InputGroup>
                   
                </Box>

                <Table.ScrollArea>
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row bg={bg}>
                                <Table.ColumnHeader>#</Table.ColumnHeader>
                                <Table.ColumnHeader>Item</Table.ColumnHeader>
                                <Table.ColumnHeader>Brand</Table.ColumnHeader>
                                <Table.ColumnHeader>Category</Table.ColumnHeader>
                                <Table.ColumnHeader>Type</Table.ColumnHeader>
                                <Table.ColumnHeader>Stock on Hand</Table.ColumnHeader>
                                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {paginatedData?.map((item, index) => (
                                <InventoryConsumableTableRow
                                    key={item.item_id}
                                    row={item} 
                                    index={(currentPage - 1) * PAGE_SIZE + index + 1}
                                />
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>

                { totalPages > 1 && (
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
                                onClick={prevPage} 
                                disabled={currentPage === 1}
                            >
                                <LuChevronLeft />
                            </Button>

                            <Box fontSize={'xs'}>
                                Page {currentPage} of {totalPages}
                            </Box>

                            <Button 
                                size="xs" 
                                variant={'ghost'}
                                colorPalette={'gray'}
                                onClick={nextPage} 
                                disabled={currentPage === totalPages}
                            >
                                <LuChevronRight />
                            </Button>

                        </Box>
                    </div>
                ) }

            </Box>

        </>
    )
}

export default InventoryConsumableTable