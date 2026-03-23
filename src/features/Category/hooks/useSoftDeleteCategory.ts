import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteCategoryApi } from '../category.api';
import type { Categories } from '../category.model';

export const useSoftDeleteCategory = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteCategoryMutation, isPending: isDeleting } = useMutation({

    mutationFn: (category_id: number) => softDeleteCategoryApi(category_id),
    onSuccess: (_, category_id) => {

        const previous = queryClient.getQueryData(['categories']);
        queryClient.setQueryData(
            ['categories'], 
            (old: Categories[]) =>
                old?.filter((category: Categories) => category.category_id !== category_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteCategoryMutation, isDeleting }

};
