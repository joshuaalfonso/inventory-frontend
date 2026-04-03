import { useForm, type SubmitHandler } from "react-hook-form"
import { useCreateSupplier } from "../../hooks/useCreateSupplier"
import { useSupplierDialogStore } from "../../hooks/useSupplierDialogStore"
import { useUpdateSupplier } from "../../hooks/useUpdateSupplier"
import { toaster } from "@/components/ui/toaster"
import { getApiErrorMessage } from "@/lib/errorMessage"
import { useEffect } from "react"
import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react"







const defaultValue = {
    supplier_id: 0,
    supplier_name: '',
    supplier_address: '',
    contact_person: '',
    contact_number: ''
}

interface FormInputs {
    supplier_id: number
    supplier_name: string
    supplier_address: string
    contact_person: string
    contact_number: string
}

const SupplierDialog = () => {

    const isOpen = useSupplierDialogStore(state => state.isOpen);
    const closeDialog = useSupplierDialogStore(state => state.closeDialog);
    const selectedItem = useSupplierDialogStore(state => state.selectedItem);

    const { createSupplierMutation, isCreating } = useCreateSupplier();
    const { updateSupplierMutation, isUpdating } = useUpdateSupplier();

    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors, isDirty } 
    } = useForm<FormInputs>({
        defaultValues: defaultValue
    });

    const isWorking = isCreating || isUpdating;

    const onSubmit: SubmitHandler<FormInputs> = data => {

        const mutate = selectedItem?.supplier_id ? updateSupplierMutation : createSupplierMutation;

        mutate(
            data,
            {
                onSuccess: (response) => {
                    toaster.create({
                        title: "Success!",
                        description: response.message,
                        closable: true,
                        // type: 'success'
                    })
                    closeDialog();
                    reset(defaultValue);
                },
                onError: (err) => {
                    console.error(err);
                    toaster.create({
                        title: "Oops!",
                        description: getApiErrorMessage(err),
                        closable: true,
                        // type: 'error'
                    })
                }
            }
        )
    };

    useEffect(() => {
        if (selectedItem) {
            reset(selectedItem);
        }
    }, [selectedItem, reset]);

    console.log('supplier dialog')


    return (
        <Dialog.Root 
            lazyMount 
            placement={'center'}
            initialFocusEl={() => null}
            size={{ mdDown: "xs", md: "lg" }}
            open={isOpen} 
            onOpenChange={(e) => {
                if (!e.open) {
                    closeDialog();
                    reset(defaultValue)
                }
            }}
        >
            {/* <Dialog.Trigger asChild>
                <Butto variant="outline">Open</Butto>
            </Dialog.Trigger> */}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>
                            <Stack>
                                <Heading size={'xl'}>Supplier Form</Heading>
                                <Text fontSize={'sm'} color={'fg.muted'}>
                                    Field with * is required
                                </Text>
                            </Stack>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset.Root size="lg" >

                                <Fieldset.Content>

                                    <Field.Root required>
                                        <Field.Label>
                                            Supplier Name
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input 
                                            {...register("supplier_name", { required: "Supplier name is required" })}
                                            autoComplete="off"
                                        />

                                        {errors.supplier_name?.message && (
                                            <Text color={'fg.error'}>{errors.supplier_name.message}</Text>
                                        )}
                                        
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>
                                            Supplier Address
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input 
                                            {...register("supplier_address")}
                                            autoComplete="off"
                                        />

                                        {errors.supplier_address?.message && (
                                            <Text color={'fg.error'}>{errors.supplier_address.message}</Text>
                                        )}
                                        
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>
                                            Contact Person
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input 
                                            {...register("contact_person")}
                                            autoComplete="off"
                                        />

                                        {errors.contact_person?.message && (
                                            <Text color={'fg.error'}>{errors.contact_person.message}</Text>
                                        )}
                                        
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>
                                            Contact #
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input 
                                            {...register("contact_number")}
                                            autoComplete="off"
                                        />

                                        {errors.contact_number?.message && (
                                            <Text color={'fg.error'}>{errors.contact_number.message}</Text>
                                        )}
                                        
                                    </Field.Root>
                                    

                                </Fieldset.Content>
                            </Fieldset.Root>
                        </form>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline" colorPalette={'gray'}>Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button
                            onClick={handleSubmit(onSubmit)} 
                            loading={isWorking}
                            disabled={!isDirty}
                        >
                            Save
                        </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild colorPalette={'gray'}>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )

}

export default SupplierDialog