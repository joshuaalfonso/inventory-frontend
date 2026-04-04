import { Alert, Button, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { usePurchaseOrders } from "./hooks/usePurchaseOrders";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { getApiErrorMessage } from "@/lib/errorMessage";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import PurchaseOrderTable from "./components/table/PurchaseOrderTable";








const PurchaseOrder = () => {

  const navigate = useNavigate();

  const { purchaseOrders, isPending, error } = usePurchaseOrders();
  

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
    
      <Heading
        size={'md'} 
        mb={10}
      >
        Purchase Order
      </Heading>

      {purchaseOrders?.length === 0 && !isPending && (
        <ReusableEmptyState>
          <Button onClick={()=> navigate(`new`)}>
            Create
          </Button>
        </ReusableEmptyState>
      ) }

      {(purchaseOrders ?? []).length > 0 && !isPending && (
        <PurchaseOrderTable
          purchaseOrders={purchaseOrders ?? []} 
        />
      ) }
    
    </>
  )
}

export default PurchaseOrder;

