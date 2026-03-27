import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateItemApi } from "../item.api";


export const useUpdateItem = () => {

    const queryClient = useQueryClient();

    const { mutate: updateItemMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateItemApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["items"]
            })
        }
    })

    return { updateItemMutation, isUpdating, error }

}