import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteSupplierApi } from '../supplier.api';
import type { Suppliers } from '../supplier.model';

export const useSoftDeleteSupplier = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteSupplierMutation, isPending: isDeleting } = useMutation({

    mutationFn: (supplier_id: number) => softDeleteSupplierApi(supplier_id),
    onSuccess: (_, supplier_id) => {

        const previous = queryClient.getQueryData(['suppliers']);
        queryClient.setQueryData(
            ['suppliers'], 
            (old: Suppliers[]) =>
                old?.filter((suppliers: Suppliers) => suppliers.supplier_id !== supplier_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteSupplierMutation, isDeleting }

};
