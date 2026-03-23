import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useItemTypes } from "./hooks/useItemTypes";
import { Alert, Heading } from "@chakra-ui/react";
import { getApiErrorMessage } from "@/lib/errorMessage";
import ItemTypeTable from "./components/table/ItemTypeTable";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import ItemTypeDialog from "./components/dialog/ItemTypeDialog";
import CreateItemTypeButton from "./components/dialog/CreateItemTypeButton";


const ItemType = () => {

  const { itemTypes, isPending, error } = useItemTypes();

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
        Item Type
      </Heading>

      {itemTypes?.length === 0 && (
        <ReusableEmptyState>
          <CreateItemTypeButton />
        </ReusableEmptyState>
      ) }

      {(itemTypes ?? []).length > 0 && (
        <ItemTypeTable
          itemTypes={itemTypes ?? []} 
        />
      ) }


      <ItemTypeDialog />
    
    </>
  )
}

export default ItemType