

import { useQuery } from "@tanstack/react-query";
import { getItemApi } from "../item.api";



export const useItems = () => {
  const { data: items, isPending, error } = useQuery({
    queryKey: ["items"],
    queryFn: getItemApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { items, isPending, error }

};