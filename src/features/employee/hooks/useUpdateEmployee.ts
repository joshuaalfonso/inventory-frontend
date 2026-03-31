import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateEmployeeApi } from "../employee.api";


export const useUpdateEmployee = () => {

    const queryClient = useQueryClient();

    const { mutate: updateEmployeeMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateEmployeeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            })
        }
    })

    return { updateEmployeeMutation, isUpdating, error }

}