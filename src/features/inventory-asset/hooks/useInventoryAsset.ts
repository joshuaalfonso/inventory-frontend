






import { useQuery } from "@tanstack/react-query";
import { getInventoryAssetApi } from "../inventoryAsset.api";



export const useInventoryAssets = () => {
  const { data: inventoryAssets, isPending, error } = useQuery({
    queryKey: ["inventoryAssets"],
    queryFn: getInventoryAssetApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { inventoryAssets, isPending, error }

};