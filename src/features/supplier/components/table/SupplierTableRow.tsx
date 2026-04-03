import { useState } from "react";
import type { Suppliers } from "../../supplier.model"
import { useColorModeValue } from "@/components/ui/color-mode";
import { useSupplierDialogStore } from "../../hooks/useSupplierDialogStore";
import { useSoftDeleteSupplier } from "../../hooks/useSoftDeleteSupplier";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { Button, Menu, Portal, Table } from "@chakra-ui/react";
import { displayDateTime } from "@/lib/dateFormat";
import { LuEllipsis, LuPencil, LuTrash } from "react-icons/lu";
import { ConfirmationDialog } from "@/shared/components/ReusableConfirmationDialog";


interface Props {
    row: Suppliers
    index: number
}


const SupplierTableRow = ({ row, index }: Props) => {


    const [isDeleteOpen, setDeleteOpen] = useState(false);
            
    const bg = useColorModeValue('white', 'bg.subtle');

    const openDialog = useSupplierDialogStore(state => state.openDialog);

    const { softDeleteSupplierMutation, isDeleting } = useSoftDeleteSupplier();

    const handleSoftDelete = () => {

        softDeleteSupplierMutation(
            row.supplier_id,
            {
                onSuccess: () => {
                    toaster.create({
                    title: 'Confirmed',
                    description: `'${row.supplier_name}' is successfully deleted.`,
                    })
                },
                onError: (err) => {
                    toaster.create({
                    title: 'Error',
                    description: getApiErrorMessage(err),
                    })
                }
            }
        )

    }

    return (
        <>
            <Table.Row bg={bg}>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{row.supplier_name}</Table.Cell>
                <Table.Cell>{row.supplier_address || '-'}</Table.Cell>
                <Table.Cell>{row.contact_number || '-'}</Table.Cell>
                <Table.Cell>{row.contact_person || '-'}</Table.Cell>
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
                message={`Are you sure you want to delete '${row.supplier_name}'?`}
                isLoading={isDeleting}
            />
        
        </>
    )

}

export default SupplierTableRow