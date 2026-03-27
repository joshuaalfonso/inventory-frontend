
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Items } from '../item.model';
import { softDeleteItemApi } from '../item.api';

export const useSoftDeleteItem = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteItemMutation, isPending: isDeleting } = useMutation({

    mutationFn: (item_id: number) => softDeleteItemApi(item_id),
    onSuccess: (_, item_id) => {

        const previous = queryClient.getQueryData(['items']);
        queryClient.setQueryData(
            ['items'], 
            (old: Items[]) =>
                old?.filter((item: Items) => item.item_id !== item_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteItemMutation, isDeleting }

};
