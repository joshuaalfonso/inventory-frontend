import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBrandApi } from "../brand.api"


export const useCreateBrand = () => {

    const queryClient = useQueryClient();

    const { mutate: createBrandMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createBrandApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            })
        }
    })

    return { createBrandMutation, isCreating, error }

}