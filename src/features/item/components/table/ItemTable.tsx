import { startTransition, useState, type ChangeEvent } from "react";
import type { Items } from "../../item.model";
import { usePagination } from "@/shared/hooks/usePagination";
import { PAGE_SIZE } from "@/lib/constants";
import { useItemDialogStore } from "../../hooks/useItemDialogStore";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, Input, InputGroup, Table } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import ItemTableRow from "./ItemTableRow";
import TablePagination from "@/shared/components/TablePagination";
import TableCard from "@/shared/components/TableCard";


interface Props {
    items: Items[]
}

const ItemTable = ({ items }: Props) => {

    const [search, setSearch] = useState<string>('');

    console.log('item table', search)

    const filteredItems = items

    const {
        paginatedData,
        currentPage,
        totalPages,
        nextPage,
        prevPage
    } = usePagination(filteredItems, PAGE_SIZE);

    const openDialog = useItemDialogStore(state => state.openDialog);
    const bg = useColorModeValue('white', 'bg.subtle');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        startTransition(() => {
            setSearch(value);
        });
    };


    return (
        <>
            
            <TableCard>

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
                    <Button
                        size={'sm'}
                        variant={'solid'}
                        onClick={() => openDialog(null)}
                    >
                        Create
                    </Button>
                </Box>


                <Table.Root size="sm">
                    <Table.Header>
                        <Table.Row bg={bg}>
                            <Table.ColumnHeader>#</Table.ColumnHeader>
                            <Table.ColumnHeader>Item</Table.ColumnHeader>
                            <Table.ColumnHeader>Brand</Table.ColumnHeader>
                            <Table.ColumnHeader>Category</Table.ColumnHeader>
                            <Table.ColumnHeader>Type</Table.ColumnHeader>
                            <Table.ColumnHeader>Unit</Table.ColumnHeader>
                            <Table.ColumnHeader>Created At</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paginatedData?.map((item, index) => (
                            <ItemTableRow
                                key={item.item_id}
                                row={item} 
                                index={(currentPage - 1) * PAGE_SIZE + index + 1}
                            />
                        ))}
                    </Table.Body>
                </Table.Root>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNext={nextPage}
                    onPrev={prevPage}
                />

            </TableCard>

        </>
    )

}

export default ItemTable