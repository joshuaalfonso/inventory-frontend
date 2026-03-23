import { useState } from "react";
import type { UnitOfMeasures } from "../../unitOfMeasure.model"
import { useColorModeValue } from "@/components/ui/color-mode";
import { useUnitOfMeasureDialogStore } from "../../hooks/useUnitOfMeasureDialogStore";
import { useSoftDeleteUnitOfMeasure } from "../../hooks/useSoftDeleteUnitOfMeasure";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { Button, Menu, Portal, Table } from "@chakra-ui/react";
import { displayDateTime } from "@/lib/dateFormat";
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu";
import { ConfirmationDialog } from "@/shared/components/ReusableConfirmationDialog";

interface Props {
    row: UnitOfMeasures
    index: number
}

const UnitOfMeasureTableRow = ({ row, index }: Props) => {

    const [isDeleteOpen, setDeleteOpen] = useState(false);
            
    const bg = useColorModeValue('white', 'bg.subtle');

    const openDialog = useUnitOfMeasureDialogStore(state => state.openDialog);

    const { softDeleteUnitOfMeausureMutation, isDeleting } = useSoftDeleteUnitOfMeasure();

    const handleSoftDelete = () => {

        softDeleteUnitOfMeausureMutation(
            row.unit_of_measure_id,
            {
                onSuccess: () => {
                    toaster.create({
                    title: 'Confirmed',
                    description: `'${row.unit_of_measure_name}' is successfully deleted.`,
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
            <Table.Row bg={bg}>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{row.unit_of_measure_name}</Table.Cell>
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

            <ConfirmationDialog
                isOpen={isDeleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleSoftDelete}
                title="Delete Confirmation?"
                message={`Are you sure you want to delete '${row.unit_of_measure_name}'?`}
                isLoading={isDeleting}
            />
        
        </>
    )


}

export default UnitOfMeasureTableRow