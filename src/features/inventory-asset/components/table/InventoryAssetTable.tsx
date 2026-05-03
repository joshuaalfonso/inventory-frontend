import { startTransition, useState, type ChangeEvent } from "react";
import type { InventoryAsset } from "../../inventoryAsset.model"
import { Box, Input, InputGroup, Table } from "@chakra-ui/react";
import { PAGE_SIZE } from "@/lib/constants";
import { useColorModeValue } from "@/components/ui/color-mode";
import TableCard from "@/shared/components/TableCard";
import { LuSearch } from "react-icons/lu";
import InventoryAssetRow from "./InventoryAssetRow";
import { usePagination } from "@/shared/hooks/usePagination";
import TablePagination from "@/shared/components/TablePagination";







interface Props {
    inventoryAssets: InventoryAsset[]
}


const InventoryAssetTable = ({ inventoryAssets }: Props) => {
    const [search, setSearch] = useState<string>('');
  
    console.log('inventory asset table', search)

    const filteredItems = inventoryAssets

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
                     
                  </Box>
  
  
                  <Table.Root size="sm">
                      <Table.Header>
                          <Table.Row bg={bg}>
                              <Table.ColumnHeader>#</Table.ColumnHeader>
                              <Table.ColumnHeader>Serial #</Table.ColumnHeader>
                              <Table.ColumnHeader>Item</Table.ColumnHeader>
                              <Table.ColumnHeader>Status</Table.ColumnHeader>
                              <Table.ColumnHeader>Created At</Table.ColumnHeader>
                              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                          </Table.Row>
                      </Table.Header>
                      <Table.Body>
                          {paginatedData?.map((item, index) => (
                              <InventoryAssetRow
                                  key={item.asset_tag}
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

export default InventoryAssetTable