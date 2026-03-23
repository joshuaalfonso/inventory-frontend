

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUnitOfMeasureApi } from "../unitOfMeasure.api";


export const useUpdateUnitOfMeasure = () => {

    const queryClient = useQueryClient();

    const { mutate: updateUnitOfMeasureMutation, isPending: isUpdating, error } = useMutation({
        mutationFn: updateUnitOfMeasureApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["unitOfMeasures"]
            })
        }
    })

    return { updateUnitOfMeasureMutation, isUpdating, error }

}