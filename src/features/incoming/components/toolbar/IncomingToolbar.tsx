



import {  Box, Button, Input, InputGroup, Menu, Portal, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { HiSortAscending } from "react-icons/hi"
import { LuSearch } from "react-icons/lu"
import { useColorModeValue } from "@/components/ui/color-mode"
import type { IncomingSortField } from "../../incoming.model"
import { useIncomingParams } from "../../hooks/useIncomingParams"



interface Props {
  searchInput: string,
  setSearchInput: (value: string) => void,
  setSort: (value: IncomingSortField, order: 'asc' | 'desc') => void,
}

interface filterItems {
  label: string,
  value: string,
  field: IncomingSortField,
  order: 'asc' | 'desc'
}


const sortItems: filterItems[] = [
  { value: "Crated At (recent first)", label: "created_at", field: 'incoming_id', order: "desc" },
  { value: "Created At (oldest first)", label: "created_at", field: 'incoming_id', order: "asc" },
  // { value: "Sales Invoice # (lowest first)", label: "sales_invoice_number", field: 'sales_invoice_number', order: "asc" },
  // { value: "Sales Invoice # (highest first)", label: "sales_invoice_number", field: 'sales_invoice_number', order: "desc" },
  // { value: "Purchase Order # (lowest first)", label: "purchase_order_number", field: 'purchase_order_number', order: "asc" },
  // { value: "Purchase Order # (highest first)", label: "purchase_order_number", field: 'purchase_order_number', order: "desc" },
//   { value: "Total Delivered (lowest first)", label: "total_received", field: 'total_received', order: "asc" },
//   { value: "Total Delivered (highest first)", label: "total_received", field: 'total_received', order: "desc" },
]


const IncomingToolbar = ({ searchInput, setSearchInput, setSort }: Props) => {

  const [value, setValue] = useState(sortItems[0]?.value);

  const bg = useColorModeValue("white", "bg.subtle");

  const { sort, search } = useIncomingParams();

  // const sortFilterValue = sortItems.find(item => item.field == sort);

  console.log(sort, search);

  return (
    <>
    
        <Box
            mb={4} 
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
        >

          <Stack direction={'row'}>

            <InputGroup startElement={<LuSearch />} w={200} >
              <Input
                  placeholder="Search keyword..."
                  size={'sm'}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  bg={bg}
              />
            </InputGroup>

            <Menu.Root>
              <Menu.Trigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  colorPalette={'gray'} 
                  bg={bg}
                >
                  <HiSortAscending/> Sort
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content minW="10rem">
                    <Menu.RadioItemGroup
                      value={value}
                      onValueChange={(e) => {

                        const selected = sortItems.find(item => e.value === item.value);

                        if (!selected) return
                        console.log(selected.value)
                        setValue(selected.value)
                        setSort(selected.field, selected.order)
                      }}
                    >
                      {sortItems.map((item) => (
                        <Menu.RadioItem key={item.value} value={item.value}>
                          {item.value}
                          <Menu.ItemIndicator />
                        </Menu.RadioItem>
                      ))}
                    </Menu.RadioItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

          </Stack>

        </Box>


        {/* <HStack mb={4}>

          { sortFilterValue?.value && (
            <Tag.Root 
              colorPalette={'gray'} 
              size={'lg'}
            >
              <Tag.Label>
                sort: { sortFilterValue.value }
                </Tag.Label>
            </Tag.Root>
          ) }

        </HStack> */}
    
    </>
  )

}

export default IncomingToolbar