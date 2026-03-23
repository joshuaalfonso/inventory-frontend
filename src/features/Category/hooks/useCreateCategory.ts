import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategoryApi } from "../category.api";


export const useCreateCategory = () => {

    const queryClient = useQueryClient();

    const { mutate: createCategoryMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createCategoryApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            })
        }
    })

    return { createCategoryMutation, isCreating, error }

}