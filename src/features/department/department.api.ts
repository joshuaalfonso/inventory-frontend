
import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { CreateDepartment, Departments } from "./department.model";


const TABLE_NAME = 'department';

export const getDepartmentApi = async () => {
  const { data } = await api.get<Departments[]>(`/${TABLE_NAME}`);
  return data;
};


export const createDepartmentApi = async (newItem: CreateDepartment) => {
  const { data } = await api.post<ApiResponse>(
    `/${TABLE_NAME}`,
    newItem
  )
  return data;
}

export const updateDepartmentApi = async (updatedItem: CreateDepartment) => {
  const { data } = await api.put<ApiResponse>(
    `/${TABLE_NAME}`,
    updatedItem
  )
  return data;
}

export const softDeleteDepartmentApi = async (department_id: number) => {
  const { data } = await api.delete<ApiResponse>(
    `/${TABLE_NAME}/${department_id}`, 
  );
  return data
}