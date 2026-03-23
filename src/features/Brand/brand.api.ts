import { api } from "@/lib/axios";
import type { Brands, CreateBrand, UpdateBrand } from "./brand.model";
import type { ApiResponse } from "@/shared/models/response";


export const getBrandApi = async () => {
  const { data } = await api.get<Brands[]>("/brand");
  return data;
};


export const createBrandApi = async (newItem: CreateBrand) => {
  const { data } = await api.post<ApiResponse>(
    'brand',
    newItem
  )
  return data;
}

export const updateBrandApi = async (updatedItem: UpdateBrand) => {
  const { data } = await api.put<ApiResponse>(
    'brand',
    updatedItem
  )
  return data;
}

export const softDeleteBrandApi = async (brand_id: number) => {
  const { data } = await api.delete<ApiResponse>(
    `brand/${brand_id}`, 
  );
  return data
}