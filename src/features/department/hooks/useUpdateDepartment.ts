import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateDepartmentApi } from "../department.api";


export const useUpdateDepartment = () => {

    const queryClient = useQueryClient();

    const { mutate: updateDepartmentMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateDepartmentApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"]
            })
        }
    })

    return { updateDepartmentMutation, isUpdating, error }

}