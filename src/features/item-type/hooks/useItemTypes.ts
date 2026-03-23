


import { useQuery } from "@tanstack/react-query";
import { getItemTypeApi } from "../itemType.api";



export const useItemTypes = () => {
  const { data: itemTypes, isPending, error } = useQuery({
    queryKey: ["itemTypes"],
    queryFn: getItemTypeApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { itemTypes, isPending, error }

};