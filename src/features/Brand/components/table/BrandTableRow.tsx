import { Button, Menu, Portal, Table } from "@chakra-ui/react"
import type { Brands } from "../../brand.model"
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"
import { useSoftDeleteBrand } from "../../hooks/useSoftDeleteBrand"


interface Props {
    row: Brands
    index: number
}


const BrandTableRow = ({row, index}: Props) => {

  const bg = useColorModeValue('white', 'bg.subtle');

  const openDialog = useBrandDialogStore(state => state.openDialog);

  const { softDeleteBrandMutation, isDeleting } = useSoftDeleteBrand();

  return (
    <Table.Row key={row.brand_id} bg={bg}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{row.brand_name}</Table.Cell>
        <Table.Cell>Eric Menk</Table.Cell>
        <Table.Cell>{row.created_at}</Table.Cell>
        <Table.Cell textAlign="end">
          
          <Menu.Root positioning={{ placement: "bottom-end" }}>
            <Menu.Trigger asChild>
              <Button 
                size={'xs'} 
                variant={'ghost'} 
                colorPalette={'gray'}
                loading={isDeleting}
              >
                  <LuEllipsis />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>

                  <Menu.Item 
                    value="edit" 
                    onClick={() => openDialog(row)}
                    cursor={'pointer'}
                  >
                    <LuPencil />
                    Edit
                  </Menu.Item>

                  {/* <Menu.Separator /> */}

                  <Menu.Item 
                    value="delete" 
                    cursor={'pointer'}
                    color="fg.error"
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                    onClick={() => softDeleteBrandMutation(row.brand_id)}
                  >
                    <LuTrash />
                    Delete
                  </Menu.Item>
                  
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

        </Table.Cell>
    </Table.Row>
  )
}

export default BrandTableRow  