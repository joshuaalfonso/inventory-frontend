import { useNavigate, useParams } from "react-router-dom";
import { useSinglePurchaseOrder } from "../hooks/useSinglePurchaseOrder";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { Box, Button, DataList, FormatNumber, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LuMoveLeft, LuPhilippinePeso } from "react-icons/lu";


const PurchaseOrderDetail = () => {


    const navigate = useNavigate();

    const { purchase_order_id } = useParams();

    const { 
        purchaseOrder, 
        isPending: isPurchaseOrderLoading, 
        error
    } = useSinglePurchaseOrder(purchase_order_id ? +purchase_order_id : 0);

    const customCardBg = useColorModeValue('white', 'bg.subtle');

    if (isPurchaseOrderLoading && purchase_order_id) return <LoadingSpinner />;

    if (error) return <span>Error...</span>;

    if (!purchaseOrder) return <span>No data found</span>


    return (
        <>

            <Heading
                size={'md'} 
                mb={10}
            >
                Purchase Order Detail
            </Heading>
        
            <Box
                p={8}
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                rounded={'md'}
                bg={customCardBg}
            >

                <Box maxW="6xl" mx={'auto'} spaceY={8}>

                    <div>
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
                                <LuMoveLeft size={21} /> 
                                Go back
                            </Button>
                        </div>


                        <div>
                            <Text fontSize={'xl'}>
                                {purchaseOrder?.purchase_order_number}
                            </Text>
                        </div>
                    </div>

                    <Separator />

                    <ul>
                        {(purchaseOrder?.purchase_order_item ?? []).map((item) => (
                            <li key={item.purchase_order_item_id} className="grid grid-cols-1 md:grid-cols-5 gap-4 border-b! border-dashed last:border-b-0! py-4! w-full">


                                {/* <span className="my-auto!">{index + 1}</span> */}


                                <div>
                                    <h1 className="flex-1 my-auto! text-sm!">
                                        {item.item_name} - {item.brand_name}
                                    </h1>
                                    <Stack direction={'row'}>
                                        <Text 
                                            color={'fg.muted'} 
                                            fontSize={'xs'}
                                        >
                                            {item.category_name}
                                        </Text>
                                        <Separator orientation="vertical" />
                                        <Text 
                                            color={'fg.muted'} 
                                            fontSize={'xs'}
                                        >
                                            {item.item_type_name}
                                        </Text>
                                    </Stack>
                                </div>

                                <Stack gap={0}>
                                    <Text fontSize={'sm'}>
                                        {item.employee_name}
                                    </Text>
                                    <Text 
                                        fontSize={'xs'} 
                                        color={'fg.muted'}
                                    >
                                        {item.department_name}
                                    </Text>
                                </Stack>

                                <Stack direction={'row'} alignItems={'center'}>
                                    <Text fontSize={'sm'}>
                                        <FormatNumber value={item.ordered_quantity || 0} />
                                    </Text>
                                    <Text fontSize={'sm'}>{item.unit_of_measure_name}</Text>
                                </Stack>

                                <Stack direction={'row'} alignItems={'center'}>
                                    <Text fontSize={'sm'}><LuPhilippinePeso /></Text>
                                    <Text fontSize={'sm'}>
                                        <FormatNumber value={item.price || 0} />
                                    </Text>
                                </Stack>

                                <Stack direction={'row'} alignItems={'center'}>
                                    <Text fontSize={'sm'}><LuPhilippinePeso /></Text>
                                    <Text fontSize={'sm'}>
                                        <FormatNumber value={(item.ordered_quantity || 0) * (item.price || 0)} />
                                    </Text>
                                </Stack>

                            </li>
                        ))}
                    </ul>

                    <Separator />

                    <DataList.Root orientation="horizontal">

                        <DataList.Item gap={12}>
                            <DataList.ItemLabel>Total Quantity</DataList.ItemLabel>
                            <DataList.ItemValue>
                                <FormatNumber value={purchaseOrder.total_quantity || 0} />
                            </DataList.ItemValue>
                        </DataList.Item>

                        <DataList.Item gap={12}>
                            <DataList.ItemLabel>Total Price</DataList.ItemLabel>
                            <DataList.ItemValue>
                                <FormatNumber value={purchaseOrder.total_price || 0} />
                            </DataList.ItemValue>
                        </DataList.Item>

                        <DataList.Item gap={12}>
                            <DataList.ItemLabel>PO Date</DataList.ItemLabel>
                            <DataList.ItemValue>{purchaseOrder?.purchase_order_date}</DataList.ItemValue>
                        </DataList.Item>

                        <DataList.Item gap={12}>
                            <DataList.ItemLabel>Supplier</DataList.ItemLabel>
                            <DataList.ItemValue>{purchaseOrder?.supplier_name}</DataList.ItemValue>
                        </DataList.Item>

                        <DataList.Item gap={12}>
                            <DataList.ItemLabel>PR #</DataList.ItemLabel>
                            <DataList.ItemValue>{purchaseOrder?.purchase_request_number || '-'}</DataList.ItemValue>
                        </DataList.Item>

                    </DataList.Root>

                </Box>



            </Box>


        
        </>
    )

}

export default PurchaseOrderDetail