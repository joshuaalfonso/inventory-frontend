import { Button, Menu, Portal, Table } from "@chakra-ui/react"
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu"
import { useColorModeValue } from "@/components/ui/color-mode"

import  { useState } from "react"
import {  displayDateTime } from "@/lib/dateFormat"
import { getApiErrorMessage } from "@/lib/errorMessage"
import { ConfirmationDialog } from "@/shared/components/ReusableConfirmationDialog"
import type { Items } from "../../item.model"
import { useItemDialogStore } from "../../hooks/useItemDialogStore"
import { useSoftDeleteItem } from "../../hooks/useSoftDeleteItem"
import { sileo } from "sileo"


interface Props {
    row: Items
    index: number
}

const ItemTableRow = ({row, index}: Props) => {

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const bg = useColorModeValue('white', 'bg.subtle');

  const openDialog = useItemDialogStore(state => state.openDialog);

  const { softDeleteItemMutation, isDeleting } = useSoftDeleteItem();

  console.log('item table row', index)

  const handleSoftDelete = () => {

    softDeleteItemMutation(
      row.item_id,
      {
        onSuccess: (response) => {
            sileo.info({
                title: 'Confirmed',
                description: response.message
            })
        },
        onError: (err) => {
            console.error(err);
            sileo.error({
                title: 'Error',
                description: getApiErrorMessage(err),
            })
        }
      }
    )

  }

  return (
    <>
      <Table.Row key={row.item_id} bg={bg} color={'fg.muted'}>
          <Table.Cell>{index}</Table.Cell>
          <Table.Cell>{row.item_name}</Table.Cell>
          <Table.Cell>{row.brand_name}</Table.Cell>
          <Table.Cell>{row.category_name}</Table.Cell>
          <Table.Cell>{row.item_type_name}</Table.Cell>
          <Table.Cell>{row.unit_of_measure_name}</Table.Cell>
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
        message={`Are you sure you want to item '${row.item_name}'?`}
        isLoading={isDeleting}
      />

    </>
  )
}

export default ItemTableRow  