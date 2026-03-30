import { Button, Menu, Portal, Table } from "@chakra-ui/react"
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu"
import { useColorModeValue } from "@/components/ui/color-mode"
import  { useState } from "react"
import {  displayDateTime } from "@/lib/dateFormat"
import { getApiErrorMessage } from "@/lib/errorMessage"
import { ConfirmationDialog } from "@/shared/components/ReusableConfirmationDialog"
import type { Departments } from "../../department.model"
import { useDepartmentDialogStore } from "../../hooks/useDepartmentDialogStore"
import { useSoftDeleteDepartment } from "../../hooks/useSoftDeleteDepartment"
import { sileo } from "sileo"


interface Props {
    row: Departments
    index: number
}

const DepartmentTableRow = ({row, index}: Props) => {

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const bg = useColorModeValue('white', 'bg.subtle');

  const openDialog = useDepartmentDialogStore(state => state.openDialog);

  const { softDeleteDepartmentMutation, isDeleting } = useSoftDeleteDepartment();

  console.log('department table row', index)

  const handleSoftDelete = () => {

    softDeleteDepartmentMutation(
      row.department_id,
      {
        onSuccess: () => {
            sileo.info({
                title: 'Confirmed',
                description: `'${row.department_name}' is successfully deleted.`,
            })
        },
        onError: (err) => {
           sileo.info({
                title: 'Error',
                description: getApiErrorMessage(err),
            })
        }
      }
    )

  }

  return (
    <>
      <Table.Row key={row.department_id} bg={bg}>
          <Table.Cell>{index}</Table.Cell>
          <Table.Cell>{row.department_name}</Table.Cell>
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
        message={`Are you sure you want to delete '${row.department_name}'?`}
        isLoading={isDeleting}
      />

    </>
  )
}

export default DepartmentTableRow  