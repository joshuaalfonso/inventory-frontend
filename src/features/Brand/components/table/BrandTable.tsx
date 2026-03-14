import { Box, Button, Input, InputGroup, Table } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import type { Brands } from "../../brand.model"
import BrandTableRow from "./BrandTableRow"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"



interface Props {
    brands: Brands[]
}


const BrandTable = ({ brands }: Props) => {

    console.log('brand table')

    const openDialog = useBrandDialogStore(state => state.openDialog);

    return (
        <>
            <Box
                p={8}
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                rounded={'md'}
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
                    />
                    </InputGroup>
                    <Button 
                        size={'sm'}
                        onClick={() => openDialog(null)}
                    >
                        Create
                    </Button>
                </Box>


                <Table.Root size="sm">
                    <Table.Header>
                        <Table.Row>
                        <Table.ColumnHeader>#</Table.ColumnHeader>
                        <Table.ColumnHeader>Brand</Table.ColumnHeader>
                        <Table.ColumnHeader>Created By</Table.ColumnHeader>
                        <Table.ColumnHeader>Created At</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {brands?.map((item, index) => (
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