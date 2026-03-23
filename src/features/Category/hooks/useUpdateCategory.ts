import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCategoryApi } from "../category.api";


export const useUpdateCategory = () => {

    const queryClient = useQueryClient();

    const { mutate: updateCategoryMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateCategoryApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            })
        }
    })

    return { updateCategoryMutation, isUpdating, error }

}