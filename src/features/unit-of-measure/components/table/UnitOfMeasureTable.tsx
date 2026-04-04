import { usePagination } from "@/shared/hooks/usePagination";
import type { UnitOfMeasures } from "../../unitOfMeasure.model"
import { PAGE_SIZE } from "@/lib/constants";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, Input, InputGroup, Table } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";
import UnitOfMeasureTableRow from "./UnitOfMeasureTableRow";
import { useUnitOfMeasureDialogStore } from "../../hooks/useUnitOfMeasureDialogStore";


interface Props {
    unitOfMeasures: UnitOfMeasures[]
}

const UnitOfMeasureTable = ({ unitOfMeasures }: Props) => {

    const filteredBrands = unitOfMeasures;
        
    const {
        paginatedData,
        currentPage,
        totalPages,
        nextPage,
        prevPage
    } = usePagination(filteredBrands, PAGE_SIZE);

    const openDialog = useUnitOfMeasureDialogStore(state => state.openDialog);
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
                        // onChange={(e) => {
                        //     setSearch(e.target.value)
                        // }}
                    />
                    </InputGroup>
                    <Button 
                        size={'sm'}
                        variant={'solid'}
                        onClick={() => openDialog(null)}
                    >
                        Create
                    </Button>
                    {/* <CreateItemTypeButton /> */}
                </Box>


                <Table.Root size="sm">
                    <Table.Header>
                        <Table.Row bg={customCardBg}>
                            <Table.ColumnHeader>#</Table.ColumnHeader>
                            <Table.ColumnHeader>Unit of Measure</Table.ColumnHeader>
                            <Table.ColumnHeader>Created By</Table.ColumnHeader>
                            <Table.ColumnHeader>Created At</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paginatedData?.map((item, index) => (
                            <UnitOfMeasureTableRow 
                                key={item.unit_of_measure_id}
                                row={item} 
                                index={(currentPage - 1) * PAGE_SIZE + index + 1}
                            />
                        ))}
                    </Table.Body>
                </Table.Root>
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

export default UnitOfMeasureTable