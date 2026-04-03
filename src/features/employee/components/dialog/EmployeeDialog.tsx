import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import { useEmployeeDialogStore } from "../../hooks/useEmployeeDialogStore";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { sileo } from "sileo";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useEffect } from "react";
import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text } from "@chakra-ui/react";
import RHFVirtualComboBox from "@/shared/components/RHFVirtualComboBox";
import { useDepartments } from "@/features/department/hooks/useDepartment";


const defaultValue = {
    employee_id: 0,
    employee_name: '',
    department_id: 0,
    email: ''
}

interface FormInputs {
    employee_id: number;
    employee_name: string;
    department_id: number;
    email: string;
}

const EmployeeDialog = () => {


    const isOpen = useEmployeeDialogStore(state => state.isOpen);
    const closeDialog = useEmployeeDialogStore(state => state.closeDialog);
    const selectedItem = useEmployeeDialogStore(state => state.selectedItem);

    const { departments } = useDepartments();

    const { createEmployeeMutation, isCreating } = useCreateEmployee();
    const { updateEmployeeMutation, isUpdating } = useUpdateEmployee();

    const { 
        register, 
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty } 
    } = useForm<FormInputs>({
        defaultValues: defaultValue
    });

    const isWorking = isCreating || isUpdating;

    const onSubmit: SubmitHandler<FormInputs> = data => {

        const mutate = selectedItem?.employee_id ? updateEmployeeMutation : createEmployeeMutation;

        mutate(
            {
                ...data,
                department_id: +data.department_id
            },
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

    console.log('employee dialog')

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
                                <Heading size={'xl'}>Employee Form</Heading>
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
                                            Employee Name
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {
                                                ...register(
                                                    "employee_name", 
                                                    { 
                                                        required: "Department name is required",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Must be at least 8 characters"
                                                        }
                                                    })
                                            }
                                            autoComplete="off"
                                        />

                                        {errors.employee_name?.message && (
                                            <Text color={'fg.error'}>{errors.employee_name.message}</Text>
                                        )}
                                        
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>
                                            Department
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <RHFVirtualComboBox 
                                            name="department_id"
                                            control={control}
                                            items={departments ?? []}
                                            label="Department"
                                            rules={{ 
                                                required: "Unit is required", 
                                                validate: value => value != 0 || "Unit is required" 
                                            }}
                                            placeholder="Search"
                                            itemToLabel={(item) => item.department_name}
                                            itemToValue={(item) => item.department_id}
                                        />           

                                        {errors.department_id?.message && (
                                            <Text color={'fg.error'}>
                                                {errors.department_id.message}
                                            </Text>
                                        )}
                                        
                                    </Field.Root>  

                                    <Field.Root required>
                                        <Field.Label>
                                            Email
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {
                                                ...register(
                                                    "email", 
                                                    { 
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: "Invalid email address"
                                                        }
                                                    }
                                                )
                                            }
                                            autoComplete="off"
                                        />

                                        {errors.email?.message && (
                                            <Text color={'fg.error'}>{errors.email.message}</Text>
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
                            { selectedItem?.employee_id ? 'Apply changes' : 'Create' }
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

export default EmployeeDialog