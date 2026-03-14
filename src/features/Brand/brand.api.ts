import { api } from "@/lib/axios";
import type { Brands } from "./brand.model";


export const getBrandApi = async () => {
  const { data } = await api.get<Brands[]>("/brand");
  return data;
};