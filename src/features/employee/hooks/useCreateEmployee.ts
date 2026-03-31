import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEmployeeApi } from "../employee.api";


export const useCreateEmployee = () => {

    const queryClient = useQueryClient();

    const { mutate: createEmployeeMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createEmployeeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            })
        }
    })

    return { createEmployeeMutation, isCreating, error }

}