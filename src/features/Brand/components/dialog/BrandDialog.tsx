import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"

import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateBrand } from "../../hooks/useCreateBrand";

import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useEffect } from "react";
import { useUpdateBrand } from "../../hooks/useUpdateBrand";



const defaultValue = {
    brand_id: 0,
    brand_name: ''
}

interface FormInputs {
    brand_id: number;
    brand_name: string;
}

const BrandDialog = () => {

    const isOpen = useBrandDialogStore(state => state.isOpen);
    const closeDialog = useBrandDialogStore(state => state.closeDialog);
    const selectedItem = useBrandDialogStore(state => state.selectedItem);

    const { createBrandMutation, isCreating } = useCreateBrand();
    const { updateBrandMutation, isUpdating } = useUpdateBrand();

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

        const mutate = selectedItem?.brand_id ? updateBrandMutation : createBrandMutation;

        mutate(
            data,
            {
                onSuccess: (response) => {
                    toaster.create({
                        title: "Hooray 🥳!",
                        description: response.message,
                        closable: true,
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
                                <Heading size={'xl'}>Brand Form</Heading>
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
                                            Brand Name
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {...register("brand_name", { required: "Brand name is required" })}
                                        />

                                        {errors.brand_name?.message && (
                                            // <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.brand_name.message}</Text>
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

export default BrandDialog