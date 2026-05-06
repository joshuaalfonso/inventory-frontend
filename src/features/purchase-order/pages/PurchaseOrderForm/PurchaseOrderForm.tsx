import { useColorModeValue } from "@/components/ui/color-mode";
import { useEmployees } from "@/features/employee/hooks/useEmployee";
import { useItems } from "@/features/item/hooks/useItem";
import { useSuppliers } from "@/features/supplier/hooks/useSuppliers";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import { RHFDatePicker } from "@/shared/components/RFHDatePicker";
// import { RHFCombobox } from "@/shared/components/RHFComboBox";
// import { RHFCombobox } from "@/shared/components/RHFComboBox";
import RHFVirtualComboBox from "@/shared/components/RHFVirtualComboBox";
import { Box, Breadcrumb, Button, Field, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo } from "react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import type { Items } from "@/features/item/item.model";
import { useCreatePurchaseOrder } from "../../hooks/useCreatePurchaseOrder";
import { useUpdatePurchaseOrder } from "../../hooks/useUpdatePurchaseOrder";
import { useSinglePurchaseOrder } from "../../hooks/useSinglePurchaseOrder";
import ItemSelector from "./ItemSelector";
import PurchaseOrderItemRow from "./PurchaseOrderItemRow";



export interface PurchaseOrderItem {
  purchase_order_item_id: number;
  purchase_order_id: number;
  employee_id: number;
  employee_name: string;
  department_name: string;
  item_id: number;
  item_name: string;
  brand_name: string;
  category_name: string;
  item_type_name: string;
  unit_of_measure_name: string;
  ordered_quantity: number;

  price: number;
};

interface PurchaseOrderFormValues  {
  purchase_order_id: number;
  purchase_request_number: string;
  purchase_order_number: string;
  purchase_order_date: string;
  supplier_id: number;
  purchase_order_item: PurchaseOrderItem[];
};

const defaultValues = {
    purchase_order_id: 0,
    purchase_request_number: "",
    purchase_order_number: "",
    purchase_order_date: "",
    supplier_id: 0,
    purchase_order_item: []
}

const defaultItem = {
    purchase_order_item_id: 0, 
    purchase_order_id: 0, 
    item_id: 0,
    employee_id: 0,
    ordered_quantity: 0,
    price: 0,
}

const PurchaseOrderForm = () => {

    const navigate = useNavigate();
    const { items } = useItems();
    const { suppliers } = useSuppliers();
    const { employees } = useEmployees();
    const { createPurchaseOrderMutation, isCreating } = useCreatePurchaseOrder();
    const { updatePurchaseOrderMutation, isUpdating } = useUpdatePurchaseOrder();

    const isWorking = isCreating || isUpdating;

    const { purchase_order_id } = useParams();

    const { purchaseOrder, isPending: isPurchaseOrderLoading} = useSinglePurchaseOrder(purchase_order_id ? +purchase_order_id : 0);

    console.log('purchase order form');

    const { register, control, handleSubmit, reset, formState: { errors, isDirty }  } =
    useForm<PurchaseOrderFormValues>({
      defaultValues: defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchase_order_item"
    });

    const onSubmit: SubmitHandler<PurchaseOrderFormValues> = (data) => {

        const mutate = purchaseOrder?.purchase_order_id ? updatePurchaseOrderMutation : createPurchaseOrderMutation;

        mutate(
            data,
            {
                onSuccess: (response) => {
                    toaster.create({
                        title: "Success!",
                        description: response.message,
                        closable: true,
                        type: 'success'
                    })
                    navigate('/purchase-order')
                },
                onError: (err) => {
                    console.error(err);
                    toaster.create({
                        title: "Oops!",
                        description: getApiErrorMessage(err),
                        closable: true,
                        type: 'error'
                    })
                }
            }
        )

    };

    // const stableItems = useMemo(() => items ?? [], [items]);
    const employeeOptions = useMemo(() => employees ?? [], [employees]);


    const handleSelectItem = useCallback((item: Items) => {
        append({
            ...defaultItem,
            employee_name: '',
            department_name: '',
            item_id: item.item_id,
            item_name: item.item_name,
            brand_name: item.brand_name,
            category_name: item.category_name,
            item_type_name: item.item_type_name,
            unit_of_measure_name: item.unit_of_measure_name
        })
    }, [append]);

    const customCardBg = useColorModeValue('white', 'bg.subtle');

    useEffect(() => {
        if (purchaseOrder) {
            reset({
                ...purchaseOrder,
                purchase_order_date: purchaseOrder.purchase_order_date.split("T")[0]
            });
        }
    }, [purchaseOrder, reset]);

    if (isPurchaseOrderLoading && purchase_order_id) return <LoadingSpinner />

    return (

        <>

            <Breadcrumb.Root mb={10}>
                <Breadcrumb.List>
                    
                    <Breadcrumb.Item>
                        <Breadcrumb.Link href="#">Transaction</Breadcrumb.Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Separator />
            
                    <Breadcrumb.Item>
                        <Breadcrumb.Link>Purchase Order</Breadcrumb.Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Separator />

                    <Breadcrumb.Item>
                        <Breadcrumb.CurrentLink>{ purchase_order_id ? 'Edit' : 'New' }</Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
        
                </Breadcrumb.List>
            </Breadcrumb.Root>

            {/* <Stack 
                mb={10}
            >
                <Stack>

                <Heading>Purchase Order Form</Heading>

                <Text fontSize={'sm'} color={'fg.muted'}>
                   Fields with * are required
                </Text>

                </Stack>

            </Stack> */}

            <Box
                p={8}
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                rounded={'md'}
                bg={customCardBg}
            >

                <Fieldset.Root maxW="6xl" mx={'auto'}>

                    <div className="flex">
                        <Button 
                            width={'auto'} 
                            size={'xs'}
                            variant={'plain'}
                            color={'fg.muted'}
                            px={0}
                            gap={2}
                            onClick={() => navigate(-1)}
                        >
                            <LuMoveLeft size={20} /> 
                            Go back
                        </Button>
                    </div>

                    <Stack>
                        <Fieldset.Legend fontSize={'md'}>
                            Purchase Order Form
                        </Fieldset.Legend>

                        <Fieldset.HelperText>
                            Fields with * are required
                        </Fieldset.HelperText>

                    </Stack>

                    <Fieldset.Content spaceY={4}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <Field.Root required>
                                <Field.Label>
                                    PO # 
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input 
                                    {
                                        ...register(
                                            "purchase_order_number", 
                                            { 
                                                required: "PO # is required" 
                                            }
                                        )
                                    } 
                                    autoComplete="off" 
                                />

                                {errors.purchase_order_number?.message && (
                                    <Text color={'fg.error'} fontSize={'sm'}>
                                        {errors.purchase_order_number.message}
                                    </Text>
                                )}

                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>
                                    PO Date
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                {/* <Input 

                                /> */}
                               
                                <RHFDatePicker<PurchaseOrderFormValues>
                                    control={control}
                                    name="purchase_order_date"
                                    rules={{ required: "Date is required" }}
                                    // minDate={new Date("1900-01-01")}
                                    // maxDate={new Date("2026-12-31")}
                                />

                                {errors.purchase_order_date?.message && (
                                    <Text color={'fg.error'} fontSize={'sm'}>
                                        {errors.purchase_order_date.message}
                                    </Text>
                                )}

                            </Field.Root>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <Field.Root required>
                                <Field.Label>
                                    Supplier
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <RHFVirtualComboBox
                                    name="supplier_id"
                                    control={control}
                                    items={suppliers ?? []}
                                    label="Supplier"
                                    rules={{ 
                                        required: "Supplier is required", 
                                        validate: value => value != 0 || "Supplier is required" 
                                    }}
                                    placeholder="Search"
                                    itemToLabel={(item) => item.supplier_name}
                                    itemToValue={(item) => item.supplier_id}
                                />    
                                {errors.supplier_id?.message && (
                                    <Text color={'fg.error'} fontSize={'sm'}>
                                        {errors.supplier_id.message}
                                    </Text>
                                )}
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>
                                    PR #
                                    <Text 
                                        fontSize={'xs'} 
                                        color={'fg.muted'}
                                    >
                                        (Optional)
                                    </Text>
                                </Field.Label>
                                <Input 
                                    {
                                        ...register(
                                            "purchase_request_number"
                                        )
                                    } 
                                    autoComplete="off" 
                                />
                                {/* {errors.purchase_request_number?.message && (
                                    <Text color={'fg.error'} fontSize={'sm'}>
                                        {errors.purchase_request_number.message}
                                    </Text>
                                )} */}
                            </Field.Root>

                        </div>

                        <Field.Root>
                            <Field.Label>Items</Field.Label>

                            <ItemSelector
                                items={items ?? []} 
                                onSelect={handleSelectItem} 
                            />

                            {fields.map((field, index) => (
                                <PurchaseOrderItemRow
                                    key={field.id}
                                    field={field}
                                    index={index}
                                    control={control}
                                    register={register}
                                    remove={remove}
                                    customCardBg={customCardBg}
                                    employees={employeeOptions}
                                />
                            ))}

                            {fields.length === 0 && (
                                <ReusableEmptyState>

                                </ReusableEmptyState>
                            )}

                        </Field.Root>

                    </Fieldset.Content>

                    <div className="flex justify-end mt-10!">
                        <Button 
                            type="submit" 
                            alignSelf="flex-start" 
                            disabled={!isDirty}
                            loading={isWorking}
                            onClick={handleSubmit(onSubmit)} 
                        >
                            Create
                        </Button>
                    </div>

                </Fieldset.Root>

            </Box>
        
        </>

    )

}

export default PurchaseOrderForm