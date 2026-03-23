import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createItemTypeApi } from "../itemType.api";


export const useCreateItemType = () => {

    const queryClient = useQueryClient();

    const { mutate: createItemTypeMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createItemTypeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["itemTypes"]
            })
        }
    })

    return { createItemTypeMutation, isCreating, error }

}