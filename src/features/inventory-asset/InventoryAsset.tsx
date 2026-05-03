import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useInventoryAssets } from "./hooks/useInventoryAsset"
import { Breadcrumb, Heading, Stack, Text } from "@chakra-ui/react";
import InventoryAssetTable from "./components/table/InventoryAssetTable";





const InventoryAsset = () => {

  const { inventoryAssets, isPending, error } = useInventoryAssets();

  if (isPending) return <LoadingSpinner />
  if (error) return <p>Failed to fetch asset {error.name}</p>;

  console.log(inventoryAssets)

  return (
    <>

      <Breadcrumb.Root mb={6}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Inventory</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
 
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Asset</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Stack mb={10}>

        <Heading>Assets</Heading>
        <Text fontSize={'sm'} color={'fg.muted'}>
          View and manage all assets
        </Text>

      </Stack>

      <InventoryAssetTable inventoryAssets={inventoryAssets ?? []} />

      
    </>
  )
}

export default InventoryAsset