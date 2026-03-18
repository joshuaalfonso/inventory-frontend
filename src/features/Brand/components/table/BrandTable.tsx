import { Box, Button, Input, InputGroup, Table } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import type { Brands } from "../../brand.model"
import BrandTableRow from "./BrandTableRow"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"
import { useColorModeValue } from "@/components/ui/color-mode"
import {  useMemo, useState } from "react"


interface Props {
    brands: Brands[]
}


const BrandTable = ({ brands }: Props) => {

    console.log('brand table')

    const [search, setSearch] = useState<string>('');
    // const [debouncedSearch, setDebouncedSearch] = useState(search);

    const filteredBrands = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) return brands;

        return brands.filter(p =>
            p.brand_name?.toLowerCase().includes(keyword)
        );
    }, [brands, search]);

    const openDialog = useBrandDialogStore(state => state.openDialog);
    const bg = useColorModeValue('white', 'bg.subtle');

    // useEffect(() => {
    //     const t = setTimeout(() => setDebouncedSearch(search), 200);
    //     return () => clearTimeout(t);
    // }, [search]);

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
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
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
                        {filteredBrands?.map((item, index) => (
                            <BrandTableRow 
                                key={item.brand_id}
                                row={item} 
                                index={index} 
                            />
                        ))}
                    </Table.Body>
                </Table.Root>

            </Box>

        </>
    )
}

export default BrandTable