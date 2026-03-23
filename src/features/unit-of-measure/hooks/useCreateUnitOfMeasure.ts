import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUnitOfMeasureApi } from "../unitOfMeasure.api";


export const useCreateUnitOfMeasure = () => {

    const queryClient = useQueryClient();

    const { mutate: createUnitOfMeasureMutation, isPending: isCreating, error } = useMutation({
        mutationFn: createUnitOfMeasureApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["unitOfMeasures"]
            })
        }
    })

    return { createUnitOfMeasureMutation, isCreating, error }

}