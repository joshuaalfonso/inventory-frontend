import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteItemTypeApi } from '../itemType.api';
import type { ItemTypes } from '../itemType.model';

export const useSoftDeleteItemType = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteItemTypeMutation, isPending: isDeleting } = useMutation({

    mutationFn: (item_type_id: number) => softDeleteItemTypeApi(item_type_id),
    onSuccess: (_, item_type_id) => {

        const previous = queryClient.getQueryData(['itemTypes']);
        queryClient.setQueryData(
            ['itemTypes'], 
            (old: ItemTypes[]) =>
                old?.filter((itemTypes: ItemTypes) => itemTypes.item_type_id !== item_type_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteItemTypeMutation, isDeleting }

};
