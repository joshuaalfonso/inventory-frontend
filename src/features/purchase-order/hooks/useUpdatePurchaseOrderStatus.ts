


import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePurchaseOrderStatusApi } from "../purchaseOrder.api";


export const useUpdatePurchaseOrderStatus = () => {

    const queryClient = useQueryClient();

    const { mutate: updatePurchaseOrderStatusMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updatePurchaseOrderStatusApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purchaseOrders"],
                exact: false
            })
        }
    })

    return { updatePurchaseOrderStatusMutation, isUpdating, error }

}