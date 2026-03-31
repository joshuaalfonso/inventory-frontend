import { useState } from "react";
import type { Employees } from "../../employee.model"
import { useColorModeValue } from "@/components/ui/color-mode";
import { useEmployeeDialogStore } from "../../hooks/useEmployeeDialogStore";
import { useSoftDeleteEmployee } from "../../hooks/useSoftDeleteEmployee";
import { sileo } from "sileo";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { Button, Menu, Portal, Table } from "@chakra-ui/react";
import { displayDateTime } from "@/lib/dateFormat";
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu";
import { ConfirmationDialog } from "@/shared/components/ReusableConfirmationDialog";





interface Props {
    row: Employees
    index: number
}


const EmployeeTableRow = ({row, index}: Props) => {


    const [isDeleteOpen, setDeleteOpen] = useState(false);

    const bg = useColorModeValue('white', 'bg.subtle');

    const openDialog = useEmployeeDialogStore(state => state.openDialog);

    const { softDeleteEmployeeMutation, isDeleting } = useSoftDeleteEmployee();

    console.log('employee table row', index)

    const handleSoftDelete = () => {

        softDeleteEmployeeMutation(
        row.employee_id,
        {
            onSuccess: () => {
                sileo.info({
                    title: 'Confirmed',
                    description: `'${row.employee_name}' is successfully deleted.`,
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
            <Table.Row key={row.employee_id} bg={bg}>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{row.employee_name}</Table.Cell>
                  <Table.Cell>{row.department_name}</Table.Cell>
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
                message={`Are you sure you want to delete '${row.employee_name}'?`}
                isLoading={isDeleting}
              />
        
        </>
    )
}

export default EmployeeTableRow