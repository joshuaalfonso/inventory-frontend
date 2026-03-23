import { useCreateUnitOfMeasure } from "../../hooks/useCreateUnitOfMeasure";
import { useUpdateUnitOfMeasure } from "../../hooks/useUpdateUnitOfMeasure";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useEffect } from "react";
import { useUnitOfMeasureDialogStore } from "../../hooks/useUnitOfMeasureDialogStore";
import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react";



const defaultValue = {
    unit_of_measure_id: 0,
    unit_of_measure_name: ''
}

interface FormInputs {
    unit_of_measure_id: number;
    unit_of_measure_name: string;
}

const UnitOfMeasureDialog = () => {


    const isOpen = useUnitOfMeasureDialogStore(state => state.isOpen);
    const closeDialog = useUnitOfMeasureDialogStore(state => state.closeDialog);
    const selectedItem = useUnitOfMeasureDialogStore(state => state.selectedItem);

    const { createUnitOfMeasureMutation, isCreating } = useCreateUnitOfMeasure();
    const { updateUnitOfMeasureMutation, isUpdating } = useUpdateUnitOfMeasure();

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

    const mutate = selectedItem?.unit_of_measure_id ? updateUnitOfMeasureMutation : createUnitOfMeasureMutation;

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
                                            Unit of Measure
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {...register("unit_of_measure_name", { required: "Brand name is required" })}
                                            autoComplete="off"
                                        />

                                        {errors.unit_of_measure_name?.message && (
                                            // <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.unit_of_measure_name.message}</Text>
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

export default UnitOfMeasureDialog