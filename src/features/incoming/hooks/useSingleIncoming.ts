




import { useQuery } from "@tanstack/react-query";
import type { Incomings } from "../incoming.model";
import { getSingleIncomingApi } from "../incoming.api";



export const useSingleIncoming = (incoming_id: Incomings['incoming_id']) => {
  const { data: incoming, isPending, error } = useQuery({
    queryKey: ["incomings", incoming_id],
    queryFn: () => getSingleIncomingApi(incoming_id),
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30,
    enabled: !!incoming_id,
  });

  return { incoming, isPending, error }

};