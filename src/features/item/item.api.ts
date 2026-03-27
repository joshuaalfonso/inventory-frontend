import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { CreateItem, Items } from "./item.model";


const TABLE_NAME = 'item';

export const getItemApi = async () => {
  const { data } = await api.get<Items[]>(`/${TABLE_NAME}`);
  return data;
};


export const createItemApi = async (newItem: CreateItem) => {
  const { data } = await api.post<ApiResponse>(
    `/${TABLE_NAME}`,
    newItem
  )
  return data;
}

export const updateItemApi = async (updatedItem: CreateItem) => {
 const { data } = await api.put<ApiResponse>(
    `/${TABLE_NAME}`,
    updatedItem
  )
  return data;
}

export const softDeleteItemApi = async (item_id: number) => {
  const { data } = await api.delete<ApiResponse>(
    `/${TABLE_NAME}/${item_id}`, 
  );
  return data
}