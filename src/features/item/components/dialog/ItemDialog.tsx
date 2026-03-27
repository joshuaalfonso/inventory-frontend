import { Button, CloseButton, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text} from "@chakra-ui/react";
import { useItemDialogStore } from "../../hooks/useItemDialogStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBrands } from "@/features/brand/hooks/useBrand";
import { useCategories } from "@/features/category/hooks/useCategories";
import { useItemTypes } from "@/features/item-type/hooks/useItemTypes";
import RHFVirtualComboBox from "../../../../shared/components/RHFVirtualComboBox";
import { useUnitOfMeasures } from "@/features/unit-of-measure/hooks/useUnifOfMeasures";
import { useCreateItem } from "../../hooks/useCreateItem";
import { useUpdateItem } from "../../hooks/useUpdateItem";
import { sileo } from "sileo";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useEffect } from "react";


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
    const selectedItem = useItemDialogStore(state => state.selectedItem);

    const { createItemMutation, isCreating } = useCreateItem();
    const { updateItemMutation, isUpdating } = useUpdateItem();

    const isWorking = isCreating || isUpdating;

    console.log('item dialog')

    const { brands } = useBrands();
    const { categories } = useCategories();
    const { itemTypes } = useItemTypes();
    const { unitOfMeasures } = useUnitOfMeasures();


    const { 
        register, 
        handleSubmit,
        reset,
        control,
        formState: { errors, isDirty } 
    } = useForm<FormInputs>({
        defaultValues: defaultValue
    });

    const onSubmit: SubmitHandler<FormInputs> = data => {
        const mutate = selectedItem?.brand_id ? updateItemMutation : createItemMutation;

        const newData = {
            ...data,
            brand_id: +data.brand_id,
            category_id: +data.category_id,
            item_type_id: +data.item_type_id,
            unit_of_measure_id: +data.unit_of_measure_id,
        }

        mutate(
            newData,
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

    }

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
                                            <Text color={'fg.error'}>{errors.item_name.message}</Text>
                                        )}
                                        
                                    </Field.Root>


                                    <Field.Root required>
                                        <Field.Label>
                                            Brand
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <RHFVirtualComboBox
                                            name="brand_id"
                                            control={control}
                                            items={brands ?? []}
                                            label="Brand"
                                            rules={{ 
                                                required: "Brand is required", 
                                                validate: value => value != 0 || "Brand is required" 
                                            }}
                                            placeholder="Search"
                                            itemToLabel={(item) => item.brand_name}
                                            itemToValue={(item) => item.brand_id}
                                        />    

                                        {errors.brand_id?.message && (
                                            <Text color={'fg.error'}>{errors.brand_id.message}</Text>
                                        )}
                                        
                                    </Field.Root>  

                                    <Field.Root required>
                                        <Field.Label>
                                            Category
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <RHFVirtualComboBox 
                                            name="category_id"
                                            control={control}
                                            items={categories ?? []}
                                            label="Category"
                                            rules={{ 
                                                required: "Category is required", 
                                                validate: value => value != 0 || "Category is required" 
                                            }}
                                            placeholder="Search "
                                            itemToLabel={(item) => item.category_name}
                                            itemToValue={(item) => item.category_id}
                                        />      

                                        {errors.category_id?.message && (
                                            <Text color={'fg.error'}>{errors.category_id.message}</Text>
                                        )}
                                        
                                    </Field.Root>  
                                    

                                    <Field.Root required>
                                        <Field.Label>
                                            Type
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <RHFVirtualComboBox 
                                            name="item_type_id"
                                            control={control}
                                            items={itemTypes ?? []}
                                            label="Item Type"
                                            rules={{ 
                                                required: "Type is required", 
                                                validate: value => value != 0 || "Type is required" 
                                            }}
                                            placeholder="Search"
                                            itemToLabel={(item) => item.item_type_name}
                                            itemToValue={(item) => item.item_type_id}
                                        />        

                                        {errors.item_type_id?.message && (
                                            <Text color={'fg.error'}>{errors.item_type_id.message}</Text>
                                        )}
                                        
                                    </Field.Root>  


                                    <Field.Root required>
                                        <Field.Label>
                                            Unit of Measure
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <RHFVirtualComboBox 
                                            name="unit_of_measure_id"
                                            control={control}
                                            items={unitOfMeasures ?? []}
                                            label="Unit of Measure"
                                            rules={{ 
                                                required: "Unit is required", 
                                                validate: value => value != 0 || "Unit is required" 
                                            }}
                                            placeholder="Search"
                                            itemToLabel={(item) => item.unit_of_measure_name}
                                            itemToValue={(item) => item.unit_of_measure_id}
                                        />           

                                        {errors.unit_of_measure_id?.message && (
                                            <Text color={'fg.error'}>
                                                {errors.unit_of_measure_id.message}
                                            </Text>
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

export default ItemDialog