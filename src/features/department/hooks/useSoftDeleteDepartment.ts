import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteDepartmentApi } from '../department.api';
import type { Departments } from '../department.model';

export const useSoftDeleteDepartment = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteDepartmentMutation, isPending: isDeleting } = useMutation({

    mutationFn: (department_id: number) => softDeleteDepartmentApi(department_id),
    onSuccess: (_, department_id) => {

        const previous = queryClient.getQueryData(['departments']);
        queryClient.setQueryData(
            ['departments'], 
            (old: Departments[]) =>
                old?.filter((department: Departments) => department.department_id !== department_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteDepartmentMutation, isDeleting }

};
