import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateItemType } from "../../hooks/useCreateItemType";
import { useItemTypeDialogStore } from "../../hooks/useItemTypeDialogStore";
import { useUpdateItemType } from "../../hooks/useUpdateItemType";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useEffect } from "react";
import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react";

const defaultValue = {
    item_type_id: 0,
    item_type_name: ''
}

interface FormInputs {
    item_type_id: number;
    item_type_name: string;
}

const ItemTypeDialog = () => {

    const isOpen = useItemTypeDialogStore(state => state.isOpen);
    const closeDialog = useItemTypeDialogStore(state => state.closeDialog);
    const selectedItem = useItemTypeDialogStore(state => state.selectedItem);

    const { createItemTypeMutation, isCreating } = useCreateItemType();
    const { updateItemTypeMutation, isUpdating } = useUpdateItemType();

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

        const mutate = selectedItem?.item_type_id ? updateItemTypeMutation : createItemTypeMutation;

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

    console.log('brand dialog')

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
                                <Heading size={'xl'}>Item Type Form</Heading>
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
                                            Item Type
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {...register("item_type_name", { required: "Brand name is required" })}
                                            autoComplete="off"
                                        />

                                        {errors.item_type_name?.message && (
                                            // <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.item_type_name.message}</Text>
                                        )}
                                        
                                        {/* <Field.ErrorText>This is an error text</Field.ErrorText> */}
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

export default ItemTypeDialog