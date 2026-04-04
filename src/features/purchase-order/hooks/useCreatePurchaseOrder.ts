import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPurchaseOrderApi } from "../purchaseOrder.api";


export const useCreatePurchaseOrder = () => {

    const queryClient = useQueryClient();

    const { mutate: createPurchaseOrderMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createPurchaseOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purchaseOrders"]
            })
        }
    })

    return { createPurchaseOrderMutation, isCreating, error }

}