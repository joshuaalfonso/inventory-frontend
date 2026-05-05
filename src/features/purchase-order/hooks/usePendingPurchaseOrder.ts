


import { useQuery } from "@tanstack/react-query";
import { getPendingPurchaseOrderApi } from "../purchaseOrder.api";



export const usePendingPurchaseOrders = () => {
  const { data: pendingPurchaseOrders, isPending, error } = useQuery({
    queryKey: ["pendingPurchaseOrders"],
    queryFn: getPendingPurchaseOrderApi
  });

  return { pendingPurchaseOrders, isPending, error }

};