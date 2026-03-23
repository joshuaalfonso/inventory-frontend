import { useQuery } from "@tanstack/react-query";
import { getCategoryApi } from "../category.api";



export const useCategories = () => {
  const { data: categories, isPending, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { categories, isPending, error }

};