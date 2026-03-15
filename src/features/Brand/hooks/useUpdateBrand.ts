import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBrandApi } from "../brand.api"


export const useUpdateBrand = () => {

    const queryClient = useQueryClient();

    const { mutate: updateBrandMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateBrandApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            })
        }
    })

    return { updateBrandMutation, isUpdating, error }

}