import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteBrandApi } from '../brand.api';
import type { Brands } from '../brand.model';

export const useSoftDeleteBrand = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteBrandMutation, isPending: isDeleting } = useMutation({

    mutationFn: (brand_id: number) => softDeleteBrandApi(brand_id),
    onSuccess: (_, brand_id) => {

        const previous = queryClient.getQueryData(['brands']);
        queryClient.setQueryData(
            ['brands'], 
            (old: Brands[]) =>
                old?.filter((brand: Brands) => brand.brand_id !== brand_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteBrandMutation, isDeleting }

};
