import { Box, Button, Input, InputGroup, Table } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import BrandTableRow from "./BrandTableRow"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"
import { useColorModeValue } from "@/components/ui/color-mode"
import {   useState, type ChangeEvent } from "react"
import { useBrandSearch } from "../../hooks/useBrandSearch"
import { usePagination } from "@/shared/hooks/usePagination"
import { PAGE_SIZE } from "@/lib/constants"
import type { Brands } from "../../brand.model"
import { useDebounce } from "@/shared/hooks/useDebounce"
import TablePagination from "@/shared/components/TablePagination"


interface Props {
    brands: Brands[]
}

const BrandTable = ({ brands }: Props) => {

    console.log('brand table')

    const [search, setSearch] = useState<string>('');

    const debouncedSearch = useDebounce(search, 300);

    const filteredBrands = useBrandSearch(brands, debouncedSearch);

    const {
        paginatedData,
        currentPage,
        totalPages,
        nextPage,
        prevPage
    } = usePagination(filteredBrands, PAGE_SIZE);

    const openDialog = useBrandDialogStore(state => state.openDialog);
    const bg = useColorModeValue('white', 'bg.subtle');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    };

    
    return (
        <>

            <Box
                p={8}
                borderWidth="1px"
                borderColor="border.disabled"
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
                            <Table.ColumnHeader>Brand</Table.ColumnHeader>
                            <Table.ColumnHeader>Created By</Table.ColumnHeader>
                            <Table.ColumnHeader>Created At</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paginatedData?.map((item, index) => (
                            <BrandTableRow 
                                key={item.brand_id}
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

            </Box>

        </>
    )
}

export default BrandTable