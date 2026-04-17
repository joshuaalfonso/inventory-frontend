import { useForm, type SubmitHandler } from "react-hook-form";
import { useCategoryDialogStore } from "../../hooks/useCategoryDialogStore";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useEffect } from "react";
import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";






const defaultValue = {
    category_id: 0,
    category_name: ''
}

interface FormInputs {
    category_id: number;
    category_name: string;
}

const CategoryDialog = () => {


    const isOpen = useCategoryDialogStore(state => state.isOpen);
    const closeDialog = useCategoryDialogStore(state => state.closeDialog);
    const selectedItem = useCategoryDialogStore(state => state.selectedItem);

    const { createCategoryMutation, isCreating } = useCreateCategory();
    const { updateCategoryMutation, isUpdating } = useUpdateCategory();

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

        const mutate = selectedItem?.category_id ? updateCategoryMutation : createCategoryMutation;

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
                                <Heading size={'xl'}>Category Form</Heading>
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
                                            Category Name
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {...register("category_name", { required: "Category name is required" })}
                                            autoComplete="off"
                                        />

                                        {errors.category_name?.message && (
                                            // <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.category_name.message}</Text>
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

export default CategoryDialog