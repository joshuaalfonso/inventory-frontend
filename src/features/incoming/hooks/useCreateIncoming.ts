


import { useMutation, useQueryClient } from "@tanstack/react-query"
import { creatIncomingApi } from "../incoming.api";


export const useCreateIncoming = () => {

    const queryClient = useQueryClient();

    const { mutate: createIncomingMutation, isPending: isCreating, error } = useMutation({
        mutationFn: creatIncomingApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["incomings"]
            })
        }
    })

    return { createIncomingMutation, isCreating, error }

}