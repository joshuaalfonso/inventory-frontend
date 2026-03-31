import { Button, Menu, Portal, Table } from "@chakra-ui/react"
import type { Brands } from "../../brand.model"
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"
import { useSoftDeleteBrand } from "../../hooks/useSoftDeleteBrand"
import  { useState } from "react"
import { toaster } from "@/components/ui/toaster"
import {  displayDateTime } from "@/lib/dateFormat"
import { getApiErrorMessage } from "@/lib/errorMessage"
import { ConfirmationDialog } from "@/shared/components/ReusableConfirmationDialog"


interface Props {
    row: Brands
    index: number
}

const BrandTableRow = ({row, index}: Props) => {

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const bg = useColorModeValue('white', 'bg.subtle');

  const openDialog = useBrandDialogStore(state => state.openDialog);

  const { softDeleteBrandMutation, isDeleting } = useSoftDeleteBrand();

  console.log('brand table row', index)

  const handleSoftDelete = () => {

    softDeleteBrandMutation(
      row.brand_id,
      {
        onSuccess: () => {
          toaster.create({
            title: 'Confirmed',
            description: `'${row.brand_name}' is successfully deleted.`,
            // type: 'success'
          })
        },
        onError: (err) => {
          toaster.create({
            title: 'Error',
            description: getApiErrorMessage(err),
            // type: 'error'
          })
        }
      }
    )

  }

  return (
    <>
      <Table.Row key={row.brand_id} bg={bg} color={'fg.muted'}>
          <Table.Cell>{index}</Table.Cell>
          <Table.Cell>{row.brand_name}</Table.Cell>
          <Table.Cell>Eric Menk</Table.Cell>
          <Table.Cell>{displayDateTime(row.created_at)}</Table.Cell>
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


                    <Menu.Item 
                      value="delete" 
                      cursor={'pointer'}
                      color="fg.error"
                      _hover={{ bg: "bg.error", color: "fg.error" }}
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

      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleSoftDelete}
        title="Delete Confirmation?"
        message={`Are you sure you want to delete '${row.brand_name}'?`}
        isLoading={isDeleting}
      />

    </>
  )
}

export default BrandTableRow  