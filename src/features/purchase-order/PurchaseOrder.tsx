import { Alert, Breadcrumb, Button, Heading, Stack, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { getApiErrorMessage } from "@/lib/errorMessage";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import PurchaseOrderTable from "./components/table/PurchaseOrderTable";
import { usePaginatedPurchaseOrders } from "./hooks/usePaginatedPurchaseOrder";
import PurchaseOrderToolbar from "./components/toolbar/PurchaseOrderToolbar";



const PurchaseOrder = () => {

  const navigate = useNavigate();

  const { 
    data, 
    isPending, 
    error, 
    page, 
    setPage, 
    searchInput, 
    setSearchInput,
    setSort,
    setStatus
  } = usePaginatedPurchaseOrders();

  if (isPending) return <LoadingSpinner />;

  if (error) return (
    <Alert.Root status="error" mt={10}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          {getApiErrorMessage(error)}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );

  return (
    <>
    

      <Breadcrumb.Root mb={6}>
        <Breadcrumb.List>
          
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Transaction</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
  
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Purchase Order</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>

        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Stack 
        mb={10} 
        direction={'row'} 
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack>

          <Heading>Purchase Order</Heading>

          <Text fontSize={'sm'} color={'fg.muted'}>
            View and manage all orders
          </Text>

        </Stack>

        <Button  onClick={()=> navigate(`new`)}>
          Create
        </Button>

      </Stack>

      <PurchaseOrderToolbar 
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSort={setSort}
        setStatus={setStatus}
      />

      {data.data?.length === 0 && (
        <ReusableEmptyState>
          {/* <Button onClick={()=> navigate(`new`)}>
            Create
          </Button> */}
        </ReusableEmptyState>
      ) }

      {(data.data ?? []).length > 0 && (
        <>
          <PurchaseOrderTable
            purchaseOrders={data.data ?? []} 
            page={page ?? 1}
            setPage={setPage}
            totalPages={data.totalPages}
          />
        </>
      ) }
    
    </>
  )
}

export default PurchaseOrder;

