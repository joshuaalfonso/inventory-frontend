
import { useQuery } from "@tanstack/react-query";
import { getSinglePurchaseOrderApi } from "../purchaseOrder.api";
import type { PurchaseOrders } from "../purchaseOrder.model";



export const useSinglePurchaseOrder = (purchase_order_id: PurchaseOrders['purchase_order_id']) => {
  const { data: purchaseOrder, isPending, error } = useQuery({
    queryKey: ["purchaseOrders", purchase_order_id],
    queryFn: () => getSinglePurchaseOrderApi(purchase_order_id),
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30,
    enabled: !!purchase_order_id,
  });

  return { purchaseOrder, isPending, error }

};