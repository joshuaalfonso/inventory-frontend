import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteUnitOfMeasureApi } from '../unitOfMeasure.api';
import type { UnitOfMeasures } from '../unitOfMeasure.model';

export const useSoftDeleteUnitOfMeasure = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteUnitOfMeausureMutation, isPending: isDeleting } = useMutation({

    mutationFn: (unit_of_measure_id: number) => softDeleteUnitOfMeasureApi(unit_of_measure_id),
    onSuccess: (_, unit_of_measure_id) => {

        const previous = queryClient.getQueryData(['unitOfMeasures']);
        queryClient.setQueryData(
            ['unitOfMeasures'], 
            (old: UnitOfMeasures[]) =>
                old?.filter((unitOfMeasures: UnitOfMeasures) => unitOfMeasures.unit_of_measure_id !== unit_of_measure_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteUnitOfMeausureMutation, isDeleting }

};
