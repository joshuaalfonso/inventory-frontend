import { useColorModeValue } from "@/components/ui/color-mode";
import { usePurchaseOrders } from "@/features/purchase-order/hooks/usePurchaseOrders";
import { useSinglePurchaseOrder } from "@/features/purchase-order/hooks/useSinglePurchaseOrder";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import { RHFDatePicker } from "@/shared/components/RFHDatePicker";
import RHFVirtualComboBox from "@/shared/components/RHFVirtualComboBox";
import { Box, Button, Field, Fieldset, Float, Heading, Input, InputGroup, Separator, Stack, Text } from "@chakra-ui/react"
import { useEffect } from "react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCreateIncoming } from "../../hooks/useCreateIncoming";
import AssetItemsField from "./components/AssetInputField";


export interface IncomingItem {
  incoming_item_id: number;
  purchase_order_id: number;
  employee_name: string;
  department_name: string;
  item_id: number;
  item_name: string;
  brand_name: string;
  category_name: string;
  item_type_name: string;
  unit_of_measure_name: string;
  ordered_quantity: number;
  received_quantity: number;
  asset_item?: AssetItem[];
};

export interface IncomingFormValues  {
  incoming_id: number;
  purchase_order_id: number;
  incoming_date: string;
  incoming_item: IncomingItem[];
};

export interface AssetItem {
  serial_number: string;
  asset_tag?: string;
}

const defaultValues = {
    incoming_id: 0,
    purchase_order_id: 0,
    incoming_date: "",
    incoming_item: []
}

// const defaultItem = {
//     incoming_item_id: 0, 
//     purchase_order_id: 0, 
//     item_id: 0,
//     received_quantity: 0,
// }


const IncomingForm = () => {


    const navigate = useNavigate();

    const { createIncomingMutation, isCreating } = useCreateIncoming();

    const form = useForm<IncomingFormValues>({
    defaultValues,
    });

    const { control, handleSubmit, register, setValue, watch, formState: { errors, isDirty } } = form;

    const { fields, replace } = useFieldArray({
        control,
        name: "incoming_item",
    });

    const selectedPO = watch("purchase_order_id");

    const { purchaseOrder } = useSinglePurchaseOrder(selectedPO);

    console.log(purchaseOrder)

    const customCardBg = useColorModeValue('white', 'bg.subtle');

    const { purchaseOrders } = usePurchaseOrders();

    const onSubmit: SubmitHandler<IncomingFormValues> = (data) => {
    
        console.log(data)

        createIncomingMutation(data)

    };

    useEffect(() => {

        if (!purchaseOrder?.purchase_order_item) return

        const mappedItems = purchaseOrder.purchase_order_item.map(item => ({
            incoming_item_id: 0,
            ...item,
            received_quantity: 0, 
            asset_item: [],
        }));

        replace(mappedItems);

    }, [selectedPO, purchaseOrder, replace]);


    return (
        <>

                
            <Heading
                size={'md'} 
                mb={10}
            >
                Incoming
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
                            Incoming Form
                        </Fieldset.Legend>

                        <Fieldset.HelperText>
                            Please provide order details below.
                        </Fieldset.HelperText>

                    </Stack>

                    <Fieldset.Content spaceY={4}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <Field.Root required>
                                <Field.Label>
                                    PO
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <RHFVirtualComboBox
                                    name="purchase_order_id"
                                    control={control}
                                    items={purchaseOrders ?? []}
                                    label="PO"
                                    rules={{ 
                                        required: "PO is required", 
                                        validate: value => value != 0 || "PO is required" 
                                    }}
                                    placeholder="Search"
                                    itemToLabel={(item) => `${item.purchase_order_number} - ${item.supplier_name}`}
                                    itemToValue={(item) => item.purchase_order_id}
                                />    
                                {errors.purchase_order_id?.message && (
                                    <Text color={'fg.error'} fontSize={'sm'}>
                                        {errors.purchase_order_id.message}
                                    </Text>
                                )}
                            </Field.Root>


                            <Field.Root required>
                                <Field.Label>
                                    Incoming Date
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                
                                <RHFDatePicker<IncomingFormValues>
                                    control={control}
                                    name="incoming_date"
                                    rules={{ required: "Date is required" }}
                                    // minDate={new Date("1900-01-01")}
                                    // maxDate={new Date("2026-12-31")}
                                />

                                {errors.incoming_date?.message && (
                                    <Text color={'fg.error'} fontSize={'sm'}>
                                        {errors.incoming_date.message}
                                    </Text>
                                )}

                            </Field.Root>
                        </div>

                        <Field.Root>
                            <Field.Label>Items</Field.Label>

                            {fields.map((field, index) => (
                                <div key={field.id} className="border-b! border-dashed last:border-b-0! py-6! w-full ">
                                
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                        <div>
                                            <h1 className="flex-1 my-auto! text-sm!">
                                                {field.item_name} - {field.brand_name}
                                            </h1>
                                            <Stack direction={'row'}>
                                                <Text fontSize={'xs'} color={'fg.muted'}>
                                                {field.category_name}
                                                </Text>
                                                <Separator orientation="vertical" />
                                                <Text fontSize={'xs'} color={'fg.muted'}>
                                                {field.item_type_name}
                                                </Text>
                                            </Stack>
                                        </div>
                                    
                                        <div>
                                            <h1 className="flex-1 my-auto! text-sm!">
                                                {field.employee_name} 
                                            </h1>
                                            <Text fontSize={'xs'} color={'fg.muted'}>{field.department_name}</Text>
                                        </div>
                                        
                                        <Box position="relative">
                                            <InputGroup endElement={<span>{field.unit_of_measure_name}</span>}>
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                {...register(`incoming_item.${index}.ordered_quantity`, {
                                                valueAsNumber: true,
                                                min: 0
                                                })}
                                                disabled 
                                            />
                                            </InputGroup>
                                            <Float offsetX="9" placement={'top-start'} bg={customCardBg} px={1.5}>
                                            <Text fontSize={'xs'} color={'fg.muted'}>Ordered</Text>
                                            </Float>
                                        </Box>

                                        <Box position="relative">

                                            <InputGroup endElement={<span>{field.unit_of_measure_name}</span>} >
                                                <Input
                                                    type="number"
                                                    placeholder="Qty"
                                                    {...register(`incoming_item.${index}.received_quantity`, {
                                                        valueAsNumber: true,
                                                        min: {
                                                            value: 1,
                                                            message: "Minimum quantity is 1"
                                                        },
                                                        max: {
                                                            value: field.ordered_quantity,
                                                            message: `Cannot exceed ordered quantity (${field.ordered_quantity})`
                                                        }
                                                    })}
                                                />
                                            </InputGroup>
                                            {errors.incoming_item?.[index]?.received_quantity && (
                                                <Text color={'fg.error'} fontSize={'sm'} mt={1}>
                                                    {errors.incoming_item[index].received_quantity.message}
                                                </Text>
                                            )}
                                            <Float offsetX="10" placement={'top-start'} bg={customCardBg} px={1.5}>
                                            <Text fontSize={'xs'} color={'fg.muted'}>Received </Text>
                                            </Float>
                                        </Box>
                                    
                                    </div>

                                    <AssetItemsField
                                        index={index}
                                        control={control}
                                        register={register}
                                        itemType={field.item_type_name}
                                        setValue={setValue}
                                    />

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
                            loading={isCreating}
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

export default IncomingForm