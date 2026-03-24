import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react";
import { useItemDialogStore } from "../../hooks/useItemDialogStore";
import { useForm, type SubmitHandler } from "react-hook-form";



const defaultValue = {
    item_id: 0,
    item_name: '',
    brand_id: 0,
    category_id: 0,
    item_type_id: 0,
    unit_of_measure_id: 0
}

interface FormInputs {
    item_id: number
    item_name: string
    brand_id: number
    category_id: number
    item_type_id: number
    unit_of_measure_id: number
}



const ItemDialog = () => {

    const isOpen = useItemDialogStore(state => state.isOpen);
    const closeDialog = useItemDialogStore(state => state.closeDialog);

    console.log('item dialog')

   


    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors, isDirty } 
    } = useForm<FormInputs>({
        defaultValues: defaultValue
    });

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data)
    }

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
                                <Heading size={'xl'}>Item Form</Heading>
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
                                            Item Name
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {...register("item_name", { required: "Item name is required" })}
                                            autoComplete="off"
                                        />

                                        {errors.item_name?.message && (
                                            // <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.item_name.message}</Text>
                                        )}
                                        
                                        {/* <Field.ErrorText>This is an error text</Field.ErrorText> */}
                                    </Field.Root>


                                    {/* <RHFCombobox
                                        name="brand_id"
                                        control={control}
                                        label="Brand"
                                        rules={{
                                            required: "Brand is required",
                                        }}
                                        items={brands ?? []}
                                        getLabel={(item) => item.brand_name}
                                        getValue={(item) => item.brand_id}
                                    /> */}

                                    {/* <Field.Root required>
                                        <Field.Label>
                                            Brand
                                            <Field.RequiredIndicator />
                                        </Field.Label>

                                        <RHFCombobox
                                            name="brand_id"
                                            control={control}
                                            label=""
                                            rules={{
                                                required: "Brand is required",
                                            }}
                                            items={frameworks ?? []}
                                        />

                                        {errors.brand_id?.message && (
                                            <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.brand_id.message}</Text>
                                        )}
                                        
                                        <Field.ErrorText>This is an error text</Field.ErrorText>
                                    </Field.Root> */}

                                    

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
                            loading={false}
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

export default ItemDialog