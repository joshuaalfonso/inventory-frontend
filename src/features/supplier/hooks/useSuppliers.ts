





import { useQuery } from "@tanstack/react-query";
import { getSupplierApi } from "../supplier.api";



export const useSuppliers = () => {
  const { data: suppliers, isPending, error } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSupplierApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { suppliers, isPending, error }

};