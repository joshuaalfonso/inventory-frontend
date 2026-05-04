import { Box, Button, Input, InputGroup, Menu, Portal, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { HiSortAscending } from "react-icons/hi"
import { LuFilter, LuSearch } from "react-icons/lu"
import type { PoSortField } from "../../purchaseOrder.model"
import { useColorModeValue } from "@/components/ui/color-mode"



interface Props {
  searchInput: string,
  setSearchInput: (value: string) => void,
  setSort: (value: PoSortField, order: 'asc' | 'desc') => void,
  setStatus: (value: string) => void,
}

interface filterItems {
  label: string,
  value: string,
  field: PoSortField,
  order: 'asc' | 'desc'
}


const sortItems: filterItems[] = [
  { value: "PO Date (earliest first)", label: "purchase_order_date", field: 'purchase_order_date', order: "asc" },
  { value: "PO Date (recent first)", label: "purchase_order_date", field: 'purchase_order_date', order: "desc" },
  // { value: "PO # (asc)", label: "purchase_order_number", field: 'purchase_order_number', order: "asc" },
  // { value: "PO # (desc)", label: "purchase_order_number", field: 'purchase_order_number', order: "desc" },
  { value: "Total Price (lowest first)", label: "total_price", field: 'total_price', order: "asc" },
  { value: "Total Price (highest first)", label: "total_price", field: 'total_price', order: "desc" },
]

const statusItems = [
  { value: "All", label: "All" },
  { value: "Awaiting cheque", label: "Awaiting cheque" },
  { value: "Cheque released", label: "Cheque released" },
  { value: "Revised", label: "Revised" },
  { value: "Completed", label: "Completed" },
]


const PurchaseOrderToolbar = ({ searchInput, setSearchInput, setSort, setStatus }: Props) => {

  const [statusFilter, setStatusFilter] = useState(statusItems[0]?.value);

  const [value, setValue] = useState(sortItems[1]?.value);

  const bg = useColorModeValue("white", "bg.subtle");

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
                  aria-label="Filter Status" 
                  size={'sm'} 
                  variant={'outline'}
                  colorPalette={'gray'}
                  bg={bg}
                >
                <LuFilter /> 
              </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content minW="10rem">
                    <Menu.RadioItemGroup
                      value={statusFilter}
                      onValueChange={(e) => {
                        if (!e) return
                        setStatus(e.value);
                        setStatusFilter(e.value)
                      }}
                    >
                      {statusItems.map((item) => (
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
    
    </>
  )

}

export default PurchaseOrderToolbar