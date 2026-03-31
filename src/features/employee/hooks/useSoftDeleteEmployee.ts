import { useMutation, useQueryClient } from '@tanstack/react-query';
import { softDeleteEmployeeApi } from '../employee.api';
import type { Employees } from '../employee.model';

export const useSoftDeleteEmployee = () => {

  const queryClient = useQueryClient();

  const { mutate: softDeleteEmployeeMutation, isPending: isDeleting } = useMutation({

    mutationFn: (employee_id: number) => softDeleteEmployeeApi(employee_id),
    onSuccess: (_, employee_id) => {

        const previous = queryClient.getQueryData(['employees']);
        queryClient.setQueryData(
            ['employees'], 
            (old: Employees[]) =>
                old?.filter((employee: Employees) => employee.department_id !== employee_id
            )
        );

        return { previous };

    },
    
  });

  return { softDeleteEmployeeMutation, isDeleting }

};
