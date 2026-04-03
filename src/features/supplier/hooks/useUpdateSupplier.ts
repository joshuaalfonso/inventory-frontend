

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSupplierApi } from "../supplier.api";


export const useUpdateSupplier = () => {

    const queryClient = useQueryClient();

    const { mutate: updateSupplierMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateSupplierApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["suppliers"]
            })
        }
    })

    return { updateSupplierMutation, isUpdating, error }

}