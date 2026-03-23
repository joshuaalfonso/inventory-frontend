import { useQuery } from "@tanstack/react-query";
import { getUnitOfMeasureApi } from "../unitOfMeasure.api";



export const useUnitOfMeasures = () => {
  const { data: unitOfMeasures, isPending, error } = useQuery({
    queryKey: ["unitOfMeasures"],
    queryFn: getUnitOfMeasureApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { unitOfMeasures, isPending, error }

};