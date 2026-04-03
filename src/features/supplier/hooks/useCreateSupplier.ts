import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSupplierApi } from "../supplier.api";


export const useCreateSupplier = () => {

    const queryClient = useQueryClient();

    const { mutate: createSupplierMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createSupplierApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["suppliers"]
            })
        }
    })

    return { createSupplierMutation, isCreating, error }

}