import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDepartmentApi } from "../department.api";


export const useCreateDepartment = () => {

    const queryClient = useQueryClient();

    const { mutate: createDepartmentMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createDepartmentApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"]
            })
        }
    })

    return { createDepartmentMutation, isCreating, error }

}