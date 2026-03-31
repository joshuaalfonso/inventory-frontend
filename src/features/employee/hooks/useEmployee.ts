
import { useQuery } from "@tanstack/react-query";
import { getEmployeeApi } from "../employee.api";



export const useEmployees = () => {
  const { data: employees, isPending, error } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployeeApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { employees, isPending, error }

};