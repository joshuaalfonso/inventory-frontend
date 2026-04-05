import { useNavigate, useParams } from "react-router-dom";
import { useSinglePurchaseOrder } from "../../hooks/useSinglePurchaseOrder";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { Box, Button, DataList, FormatNumber, Heading, Separator, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LuMoveLeft } from "react-icons/lu";
import PurchaseOrderDetailList from "./PurchaseOrderDetailList";


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

    if (error) return <span>Failed to load...</span>;

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

       

                    <div>
                        <Heading fontSize={'sm'} color={'fg.muted'}>
                            Items
                        </Heading>
                        <PurchaseOrderDetailList 
                            purchaseOrder={purchaseOrder} 
                        />
                    </div>

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