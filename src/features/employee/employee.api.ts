
import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { CreateEmployee, Employees } from "./employee.model";


const TABLE_NAME = 'employee';

export const getEmployeeApi = async () => {
  const { data } = await api.get<Employees[]>(`/${TABLE_NAME}`);
  return data;
};


export const createEmployeeApi = async (newItem: CreateEmployee) => {
  const { data } = await api.post<ApiResponse>(
    `/${TABLE_NAME}`,
    newItem
  )
  return data;
}

export const updateEmployeeApi = async (updatedItem: CreateEmployee) => {
  const { data } = await api.put<ApiResponse>(
    `/${TABLE_NAME}`,
    updatedItem
  )
  return data;
}

export const softDeleteEmployeeApi = async (employee_id: number) => {
  const { data } = await api.delete<ApiResponse>(
    `/${TABLE_NAME}/${employee_id}`, 
  );
  return data
}