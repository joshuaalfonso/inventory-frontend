

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createItemApi } from "../item.api";


export const useCreateItem = () => {

    const queryClient = useQueryClient();

    const { mutate: createItemMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createItemApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["items"]
            })
        }
    })

    return { createItemMutation, isCreating, error }

}