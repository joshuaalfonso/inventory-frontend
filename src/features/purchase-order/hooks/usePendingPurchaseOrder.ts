


import { useQuery } from "@tanstack/react-query";
import { getPendingPurchaseOrderApi } from "../purchaseOrder.api";



export const usePendingPurchaseOrders = () => {
  const { data: pendingPurchaseOrders, isPending, error } = useQuery({
    queryKey: ["pendingPurchaseOrders"],
    queryFn: getPendingPurchaseOrderApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { pendingPurchaseOrders, isPending, error }

};