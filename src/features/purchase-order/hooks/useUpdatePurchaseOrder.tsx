

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePurchaseOrderApi } from "../purchaseOrder.api";


export const useUpdatePurchaseOrder = () => {

    const queryClient = useQueryClient();

    const { mutate: updatePurchaseOrderMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updatePurchaseOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purchaseOrders"]
            })
        }
    })

    return { updatePurchaseOrderMutation, isUpdating, error }

}