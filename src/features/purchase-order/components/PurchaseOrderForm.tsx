import { useColorModeValue } from "@/components/ui/color-mode";
import { useItems } from "@/features/item/hooks/useItem";
import { useSuppliers } from "@/features/supplier/hooks/useSuppliers";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import { RHFDatePicker } from "@/shared/components/RFHDatePicker";
import RHFVirtualComboBox from "@/shared/components/RHFVirtualComboBox";
import { Box, Button, Combobox, Field, Fieldset, Heading, Input, InputGroup, Portal, Separator, Stack, Text, useFilter, useListCollection } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef } from "react";
import { flushSync } from "react-dom";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import {  LuPhilippinePeso, LuSearch, LuTrash2, LuWeight } from "react-icons/lu";
import { useParams } from "react-router-dom";




interface PurchaseOrderItem {
  purchase_order_item_id: number;
  purchase_order_id: number;
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
  supplier_id?: number;
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
    ordered_quantity: 0,
    price: 0,
}

const PurchaseOrderForm = () => {

    const { items } = useItems();
    const { suppliers } = useSuppliers();

    const { purchase_order_id } = useParams();

    console.log(purchase_order_id);

    const { register, control, handleSubmit, formState: { errors, isDirty }  } =
    useForm<PurchaseOrderFormValues>({
      defaultValues: defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchase_order_item"
    });

    const onSubmit: SubmitHandler<PurchaseOrderFormValues> = (data) => {
        console.log(data);
    };

     const contentRef = useRef<HTMLDivElement | null>(null)

    const { startsWith } = useFilter({ sensitivity: "base" })

    const stableItems = useMemo(() => items ?? [], [items])

    const { collection, filter, reset } = useListCollection({
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

                    <Stack>
                        <Fieldset.Legend fontSize={'md'}>Purchase Order Form</Fieldset.Legend>
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
                                collection={collection}
                                onInputValueChange={(e) => filter(e.inputValue)}
                                scrollToIndexFn={handleScrollToIndexFn}
                                width=""
                                openOnClick
                                mt={2}
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
                                                console.log(item.brand_name);
                                                reset()
                                                append({
                                                    ...defaultItem,
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
                                                {item.item_name}
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
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b! last:border-b-0! py-6! w-full">
                                    
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


                                    <InputGroup 
                                        startElement={<LuWeight />} 
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

                                    <InputGroup 
                                        startElement={<LuPhilippinePeso />} 
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


                        {/* <Field.Root>
                            <Field.Label>Items</Field.Label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 justify-between w-full">
                                    <RHFVirtualComboBox
                                        key={`purchase_item_${field.id}`}
                                        name={`purchase_order_item.${index}.item_id` as const}
                                        control={control}
                                        items={items ?? []}
                                        label="Item"
                                        rules={{ 
                                            required: "Item is required", 
                                            validate: value => value != 0 || "Item is required" 
                                        }}
                                        placeholder="Search"
                                        itemToLabel={(item) => item.item_name}
                                        itemToValue={(item) => item.item_id}
                                    />    

                                    <Input
                                        type="number"
                                        placeholder="Qty"
                                        {...register(`purchase_order_item.${index}.ordered_quantity` as const, {
                                        valueAsNumber: true,
                                        min: 1
                                        })}
                                    />

                                    <Input
                                        type="number"
                                        placeholder="Price"
                                        {...register(`purchase_order_item.${index}.price` as const, {
                                        valueAsNumber: true,
                                        min: 0
                                        })}
                                    />

                                    <Button 
                                        type="button" 
                                        variant={'surface'} 
                                        colorPalette={'red'}
                                        onClick={() => remove(index)}
                                    >
                                        <LuTrash2 />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant={'surface'} 
                                onClick={() =>
                                    append({
                                        ...defaultValues.purchase_order_item[0]
                                    })
                                }
                                mt={4}
                            >
                                <LuPlus />
                            </Button>

                        </Field.Root> */}

                       

                    </Fieldset.Content>

                    <div className="flex justify-end">
                        <Button 
                            type="submit" 
                            alignSelf="flex-start" 
                            disabled={!isDirty}
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