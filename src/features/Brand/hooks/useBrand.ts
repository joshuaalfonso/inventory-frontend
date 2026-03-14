import { useQuery } from "@tanstack/react-query";
import { getBrandApi } from "../brand.api";



export const useBrands = () => {
  const { data: brands, isPending, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrandApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { brands, isPending, error }

};