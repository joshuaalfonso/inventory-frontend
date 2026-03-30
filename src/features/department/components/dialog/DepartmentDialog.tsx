import { useEffect } from 'react'
import { useDepartmentDialogStore } from '../../hooks/useDepartmentDialogStore';
import { useCreateDepartment } from '../../hooks/useCreateDepartment';
import { useUpdateDepartment } from '../../hooks/useUpdateDepartment';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { sileo } from 'sileo';
import { getApiErrorMessage } from '@/lib/errorMessage';
import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from '@chakra-ui/react';



const defaultValue = {
    department_id: 0,
    department_name: ''
}

interface FormInputs {
    department_id: number;
    department_name: string;
}

const DepartmentDialog = () => {

    const isOpen = useDepartmentDialogStore(state => state.isOpen);
    const closeDialog = useDepartmentDialogStore(state => state.closeDialog);
    const selectedItem = useDepartmentDialogStore(state => state.selectedItem);

    const { createDepartmentMutation, isCreating } = useCreateDepartment();
    const { updateDepartmentMutation, isUpdating } = useUpdateDepartment();

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

        const mutate = selectedItem?.department_id ? updateDepartmentMutation : createDepartmentMutation;

        mutate(
            data,
            {
                onSuccess: (response) => {
                    sileo.success({
                        title: 'Success',
                        description: response.message
                    })
                    closeDialog();
                    reset(defaultValue);
                },
                onError: (err) => {
                    console.error(err);
                    sileo.error({
                        title: 'Error',
                        description: getApiErrorMessage(err),
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

    console.log('department dialog')


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
                                <Heading size={'xl'}>Department Form</Heading>
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
                                            Department Name
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {...register("department_name", { required: "Department name is required" })}
                                            autoComplete="off"
                                        />

                                        {errors.department_name?.message && (
                                            <Text color={'fg.error'}>{errors.department_name.message}</Text>
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

export default DepartmentDialog