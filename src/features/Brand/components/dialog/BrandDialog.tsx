import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react"
import { useBrandDialogStore } from "../../hooks/useBrandDialogStore"

import { useForm, type SubmitHandler } from "react-hook-form";

interface FormInputs {
  brand_name: string;
}

const BrandDialog = () => {

    const isOpen = useBrandDialogStore(state => state.isOpen);
    const closeDialog = useBrandDialogStore(state => state.closeDialog);

    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors } 
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data);
    };

    console.log('brand dialog')

    return (
        <Dialog.Root 
            lazyMount 
            placement={'center'}
            initialFocusEl={() => null}
            size={{ mdDown: "full", md: "lg" }}
            open={isOpen} 
            onOpenChange={(e) => {
                if (!e.open) {
                    closeDialog();
                    reset()
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
                                    Please provide details below.
                                </Text>
                            </Stack>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset.Root size="lg">

                                <Fieldset.Content>
                                    <Field.Root>
                                        <Field.Label>Brand Name</Field.Label>
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
                        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
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