
import { useQuery } from "@tanstack/react-query";
import { getDepartmentApi } from "../department.api";



export const useDepartments = () => {
  const { data: departments, isPending, error } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartmentApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { departments, isPending, error }

};