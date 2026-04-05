import { useColorModeValue } from "@/components/ui/color-mode";
import { useEmployees } from "@/features/employee/hooks/useEmployee";
import { useItems } from "@/features/item/hooks/useItem";
import { useSuppliers } from "@/features/supplier/hooks/useSuppliers";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import { RHFDatePicker } from "@/shared/components/RFHDatePicker";
import { RHFCombobox } from "@/shared/components/RHFComboBox";
// import { RHFCombobox } from "@/shared/components/RHFComboBox";
import RHFVirtualComboBox from "@/shared/components/RHFVirtualComboBox";
import { Box, Button, Combobox, Field, Fieldset, Float, Heading, Input, InputGroup, Portal, Separator, Stack, Text, useFilter, useListCollection } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";
import { flushSync } from "react-dom";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { LuMoveLeft, LuSearch, LuTrash2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useCreatePurchaseOrder } from "../hooks/useCreatePurchaseOrder";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/errorMessage";
import { useSinglePurchaseOrder } from "../hooks/useSinglePurchaseOrder";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useUpdatePurchaseOrder } from "../hooks/useUpdatePurchaseOrder";



interface PurchaseOrderItem {
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

    console.log(purchaseOrder)

    console.log(purchase_order_id);

    const { register, control, handleSubmit, reset, formState: { errors, isDirty }  } =
    useForm<PurchaseOrderFormValues>({
      defaultValues: defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchase_order_item"
    });

    const onSubmit: SubmitHandler<PurchaseOrderFormValues> = (data) => {
        console.log(data);

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

    const contentRef = useRef<HTMLDivElement | null>(null)

    const { startsWith } = useFilter({ sensitivity: "base" })

    const stableItems = useMemo(() => items ?? [], [items])

    const { collection, filter } = useListCollection({
        initialItems: stableItems,
        filter: startsWith,
        itemToString: (item) => item.item_name,
        itemToValue: (item) => String(item.item_id),
    })

    const virtualizer = useVirtualizer({
        count: collection.size,
        getScrollElement: () => contentRef.current,
        estimateSize: () => 28,
        overscan: 10,
    })

    const handleScrollToIndexFn = ({ index }: { index: number }) => {
        flushSync(() => {
            virtualizer.scrollToIndex(index, {
                align: "center",
            })
        })
    }

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

            <Heading
                size={'md'} 
                mb={10}
            >
                Purchase Order
            </Heading>
        
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
                        Please provide order details below.
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
                            {/* <Input name="name" /> */}
                            <Combobox.Root
                                key="item-combobox"
                                collection={collection}
                                onInputValueChange={(e) => filter(e.inputValue)}
                                scrollToIndexFn={handleScrollToIndexFn}
                                width=""
                                openOnClick
                                mt={2}
                                variant={'subtle'}
                            >
                            {/* <Combobox.Label>Select</Combobox.Label> */}
                            <Combobox.Control>
                                <Combobox.Input placeholder="Search item..." />
                                <Combobox.IndicatorGroup>
                                    <Combobox.ClearTrigger />
                                    {/* <Combobox.Trigger onClick={reset} /> */}
                                    <LuSearch />
                                </Combobox.IndicatorGroup>
                            </Combobox.Control>
                            <Portal>
                                <Combobox.Positioner>
                                <Combobox.Content ref={contentRef}>
                                    <Combobox.Empty>No items found</Combobox.Empty>
                                    <div
                                    style={{
                                        height: `${virtualizer.getTotalSize()}px`,
                                        width: "100%",
                                        position: "relative",
                                    }}
                                    >
                                    {virtualizer.getVirtualItems().map((virtualItem) => {
                                        const item = collection.items[virtualItem.index]
                                        return (
                                        <Combobox.Item
                                            key={item.item_id}
                                            item={item}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: `${virtualItem.size}px`,
                                                transform: `translateY(${virtualItem.start}px)`,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                            onClick={() => {
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
                                            }}
                                        >
                                            <Combobox.ItemText truncate>   
                                                {item.item_name} - {item.brand_name}
                                            </Combobox.ItemText>
                                            <Combobox.ItemIndicator />
                                        </Combobox.Item>
                                        )
                                    })}
                                    </div>
                                </Combobox.Content>
                                </Combobox.Positioner>
                            </Portal>
                            </Combobox.Root>

                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 border-b! border-dashed last:border-b-0! py-6! w-full">
                                    
                                    <div>
                                        <h1 className="flex-1 my-auto! text-sm!">
                                            {field.item_name} - {field.brand_name}
                                        </h1>
                                        <Stack direction={'row'}>
                                            <Text 
                                                color={'fg.muted'} 
                                                fontSize={'xs'}
                                            >
                                                {field.category_name}
                                            </Text>
                                            <Separator orientation="vertical" />
                                            <Text 
                                                color={'fg.muted'} 
                                                fontSize={'xs'}
                                            >
                                                {field.item_type_name}
                                            </Text>
                                        </Stack>
                                    </div>

                                    <Box position="relative">
                                        <RHFCombobox 
                                            name={`purchase_order_item.${index}.employee_id` as const}
                                            control={control}
                                            items={employees ?? []}
                                            label=""
                                            rules={{ 
                                                required: "Employee is required", 
                                                validate: value => value != 0 || "Employee is required" 
                                            }}
                                            placeholder="Employee"
                                            getLabel={(item) => item.employee_name}
                                            getValue={(item) => item.employee_id}
                                        />
                                        {/* <RHFVirtualComboBox
                                            name={`purchase_order_item.${index}.employee_id` as const}
                                            control={control}
                                            items={employees ?? []}
                                            label="Item"
                                            rules={{ 
                                                required: "Employee is required", 
                                                validate: value => value != 0 || "Employee is required" 
                                            }}
                                            placeholder="Employee"
                                            itemToLabel={(item) => item.employee_name}
                                            itemToValue={(item) => item.employee_id}
                                        /> */}
                                         <Float offsetX="11" placement={'top-start'} bg={customCardBg} px={1.5}>
                                            <Text fontSize={'xs'} color={'fg.muted'}>
                                                Employee
                                            </Text>
                                        </Float>
                                    </Box>


                                    <Box position="relative">
                                        <InputGroup 
                                            // startElement={<LuRuler />} 
                                            endElement={<span className="uppercase">{field.unit_of_measure_name}</span>}
                                        >
                                            <Input
                                                type="number"
                                                placeholder="Qty"
                                                {...register(`purchase_order_item.${index}.ordered_quantity` as const, {
                                                valueAsNumber: true,
                                                min: 1
                                                })}
                                            />
                                        </InputGroup>
                                        <Float offsetX="10" placement={'top-start'} bg={customCardBg} px={1.5}>
                                            <Text fontSize={'xs'} color={'fg.muted'}>
                                                Quantity
                                            </Text>
                                        </Float>
                                    </Box>

                                    <Box position="relative">
                                        
                                        <InputGroup 
                                            // startElement={<LuPhilippinePeso />} 
                                            endElement="PHP"
                                        >
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                {...register(`purchase_order_item.${index}.price` as const, {
                                                    valueAsNumber: true,
                                                    min: 0
                                                })}
                                            />
                                        </InputGroup>

                                        <Float offsetX="7" placement={'top-start'} bg={customCardBg} px={1.5}>
                                            <Text fontSize={'xs'} color={'fg.muted'}>
                                                Price
                                            </Text>
                                        </Float>

                                    </Box>

                                    <div className="flex justify-center">
                                        <Button 
                                            type="button" 
                                            variant={'ghost'} 
                                            colorPalette={'red'}
                                            onClick={() => remove(index)}
                                        >
                                            <LuTrash2 />
                                        </Button>
                                    </div>

                                    
                                </div>
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