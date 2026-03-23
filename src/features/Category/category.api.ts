import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { Categories, CreateEditCategory } from "./category.model";


export const getCategoryApi = async () => {
  const { data } = await api.get<Categories[]>("/category");
  return data;
};


export const createCategoryApi = async (newItem: CreateEditCategory) => {
  const { data } = await api.post<ApiResponse>(
    'category',
    newItem
  )
  return data;
}

export const updateCategoryApi = async (updatedItem: CreateEditCategory) => {
  const { data } = await api.put<ApiResponse>(
    'category',
    updatedItem
  )
  return data;
}

export const softDeleteCategoryApi = async (category_id: number) => {
  const { data } = await api.delete<ApiResponse>(
    `categoru/${category_id}`, 
  );
  return data
}