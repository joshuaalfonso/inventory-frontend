import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useInventoryConsumables } from "./hooks/useInventoryConsumable";
import { Heading } from "@chakra-ui/react";
import InventoryConsumableTable from "./components/table/InventoryConsumableTable";










const InventoryConsumable = () => {
    const { inventoryConsumables, isPending, error } = useInventoryConsumables();
  
    if (isPending) return <LoadingSpinner />
    if (error) return <p>Failed to fetch items {error.name}</p>;
  
    return (
      <>
        <Heading
          size={'md'}
          mb={10}
        >
            Inventory Consumable
        </Heading>
  
        <InventoryConsumableTable 
            inventoryConsumables={inventoryConsumables ?? []} 
        />
  
        
      </>
    )
}

export default InventoryConsumable