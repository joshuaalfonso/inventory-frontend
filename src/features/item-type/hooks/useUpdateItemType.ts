

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateItemTypeApi } from "../itemType.api";


export const useUpdateItemType = () => {

    const queryClient = useQueryClient();

    const { mutate: updateItemTypeMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateItemTypeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["itemTypes"]
            })
        }
    })

    return { updateItemTypeMutation, isUpdating, error }

}