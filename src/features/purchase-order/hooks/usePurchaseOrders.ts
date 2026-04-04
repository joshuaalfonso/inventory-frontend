





import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrderApi } from "../purchaseOrder.api";



export const usePurchaseOrders = () => {
  const { data: purchaseOrders, isPending, error } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: getPurchaseOrderApi,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30 
  });

  return { purchaseOrders, isPending, error }

};