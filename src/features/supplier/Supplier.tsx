// import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useSuppliers } from "./hooks/useSuppliers";
import { Alert, Button, Heading } from "@chakra-ui/react";
import { getApiErrorMessage } from "@/lib/errorMessage";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import SupplierTable from "./components/table/SupplierTable";
import { useSupplierDialogStore } from "./hooks/useSupplierDialogStore";
import SupplierDialog from "./components/dialog/SupplierDialog";

const Supplier = () => {


  const { suppliers, isPending, error } = useSuppliers();

  const openDialog = useSupplierDialogStore(state => state.openDialog);

  // if (isPending) return <LoadingSpinner />;

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
        Supplier
      </Heading>

      {suppliers?.length === 0 && !isPending && (
        <ReusableEmptyState>
          {/* <CreateItemTypeButton /> */}
          <Button onClick={() => openDialog()}>
            Create
          </Button>
        </ReusableEmptyState>
      ) }

      {(suppliers ?? []).length > 0 && !isPending && (
        <SupplierTable
          suppliers={suppliers ?? []} 
        />
      ) }

      <SupplierDialog />
    
    </>
  )

}

export default Supplier