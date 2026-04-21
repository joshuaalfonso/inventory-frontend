






import { useQuery } from "@tanstack/react-query";
import { getInventoryConsumableApi } from "../inventoryConsumable.api";



export const useInventoryConsumables = () => {
  const { data: inventoryConsumables, isPending, error } = useQuery({
    queryKey: ["inventoryConsumables"],
    queryFn: getInventoryConsumableApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { inventoryConsumables, isPending, error }

};