import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useInventoryConsumables } from "./hooks/useInventoryConsumable";
import { Breadcrumb, Heading, Stack, Text } from "@chakra-ui/react";
import InventoryConsumableTable from "./components/table/InventoryConsumableTable";










const InventoryConsumable = () => {
    const { inventoryConsumables, isPending, error } = useInventoryConsumables();
  
    if (isPending) return <LoadingSpinner />
    if (error) return <p>Failed to fetch items {error.name}</p>;
  
    return (
      <>
        <Breadcrumb.Root mb={6}>
          <Breadcrumb.List>
           
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Inventory</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
    
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>Consumable</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>

          </Breadcrumb.List>
        </Breadcrumb.Root>
        
        <Stack mb={10}>
  
          <Heading>Consumables</Heading>
          <Text fontSize={'sm'} color={'fg.muted'}>
            Track stock levels of items
          </Text>
  
        </Stack>
  
        <InventoryConsumableTable 
            inventoryConsumables={inventoryConsumables ?? []} 
        />
  
        
      </>
    )
}

export default InventoryConsumable