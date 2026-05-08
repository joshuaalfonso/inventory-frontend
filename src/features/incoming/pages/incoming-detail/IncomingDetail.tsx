import { useNavigate, useParams } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useSingleIncoming } from "../../hooks/useSingleIncoming";
import { Box, Breadcrumb, Button, DataList, FormatNumber, Heading, Separator, Text } from "@chakra-ui/react";
import { LuMoveLeft } from "react-icons/lu";
import { displayDate } from "@/lib/dateFormat";
import IncomingDetailList from "./IncomingDetailList";



const IncomingDetail = () => {


  const navigate = useNavigate();

  const { incoming_id } = useParams();

  const { 
      incoming, 
      isPending, 
      error
  } = useSingleIncoming(incoming_id ? +incoming_id : 0);

  const customCardBg = useColorModeValue('white', 'bg.subtle');

  if (isPending && incoming_id) return <LoadingSpinner />;

  if (error) return <span>Failed to load...</span>;

  if (!incoming) return <span>No data found</span>


  return (
    <>
    
        <Breadcrumb.Root mb={6}>
            <Breadcrumb.List>
            
            <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Transaction</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
    
            <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Incoming</Breadcrumb.Link>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
                <Breadcrumb.CurrentLink> Detail </Breadcrumb.CurrentLink>
            </Breadcrumb.Item>

            </Breadcrumb.List>
        </Breadcrumb.Root>
    
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
                            {incoming?.incoming_code}
                        </Text>
                    </div>
                </div>

                <Separator />

    

                <div>
                    <Heading fontSize={'sm'} color={'fg.muted'}>
                        Items
                    </Heading>
                    <IncomingDetailList 
                        incoming={incoming} 
                    />
                </div>

                <Separator />

                <DataList.Root orientation="horizontal">

                    <DataList.Item gap={12}>
                        <DataList.ItemLabel>Total Received</DataList.ItemLabel>
                        <DataList.ItemValue>
                            <FormatNumber value={incoming.total_received || 0} />
                        </DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item gap={12}>
                        <DataList.ItemLabel>PO #</DataList.ItemLabel>
                        <DataList.ItemValue>
                            { incoming.purchase_order_number }
                        </DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item gap={12}>
                        <DataList.ItemLabel>Sales Invoice #</DataList.ItemLabel>
                        <DataList.ItemValue>
                            { incoming.sales_invoice_number }
                        </DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item gap={12}>
                        <DataList.ItemLabel>Created At</DataList.ItemLabel>
                        <DataList.ItemValue>
                          {displayDate(incoming?.created_at)}
                        </DataList.ItemValue>
                    </DataList.Item>

                </DataList.Root>

            </Box>

        </Box>

    </>
  )

}

export default IncomingDetail