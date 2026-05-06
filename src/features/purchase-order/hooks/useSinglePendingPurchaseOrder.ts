
import { useQuery } from "@tanstack/react-query";
import type { PurchaseOrders } from "../purchaseOrder.model";
import { getSinglePendingPurchaseOrderApi } from "../purchaseOrder.api";



export const useSinglePendingPurchaseOrder = (purchase_order_id: PurchaseOrders['purchase_order_id']) => {
  const { data: purchaseOrder, isPending, error } = useQuery({
    queryKey: ["pendingPurchaseOrders", purchase_order_id],
    queryFn: () => getSinglePendingPurchaseOrderApi(purchase_order_id),
    enabled: !!purchase_order_id,
  });

  return { purchaseOrder, isPending, error }

};