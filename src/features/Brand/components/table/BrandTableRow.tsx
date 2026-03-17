import { Button, CloseButton, Dialog, Menu, Portal, Table } from "@chakra-ui/react"
import type { Brands } from "../../brand.model"
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"
import { useSoftDeleteBrand } from "../../hooks/useSoftDeleteBrand"
import { useState } from "react"
import { toaster } from "@/components/ui/toaster"


interface Props {
    row: Brands
    index: number
}


const BrandTableRow = ({row, index}: Props) => {

  const [isDeleteOpen, setDeleteOpen] = useState(false)

  const bg = useColorModeValue('white', 'bg.subtle');

  const openDialog = useBrandDialogStore(state => state.openDialog);

  const { softDeleteBrandMutation, isDeleting } = useSoftDeleteBrand();

  const handleSoftDelete = () => {

    softDeleteBrandMutation(
      row.brand_id,
      {
        onSuccess: () => {
          toaster.create({
            title: 'Confirmed',
            description: `'${row.brand_name}' is successfully deleted.`,
            type: 'info'
          })
        }
      }
    )

  }

  return (
    <>
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
                      // onClick={() => softDeleteBrandMutation(row.brand_id)}
                      onClick={() => setDeleteOpen(true)}
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
      <Dialog.Root 
        role="alertdialog" 
        lazyMount 
        initialFocusEl={() => null}
        placement={'center'}
        open={isDeleteOpen} 
        onOpenChange={(e) => setDeleteOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Confirmation?</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <p>
                  Are you sure you want to delete '{row.brand_name}' ?
                </p>
              </Dialog.Body>

              <Dialog.Footer>

                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" colorPalette={'gray'}>Cancel</Button>
                </Dialog.ActionTrigger>

                <Button 
                  colorPalette="red" 
                  onClick={handleSoftDelete}
                  loading={isDeleting}
                >
                  Yes, Delete.
                </Button>


              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" colorPalette={'gray'} />
              </Dialog.CloseTrigger>

            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

export default BrandTableRow  