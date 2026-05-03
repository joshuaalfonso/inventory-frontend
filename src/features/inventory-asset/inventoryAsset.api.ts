






import { api } from "@/lib/axios";
import type { InventoryAsset } from "./inventoryAsset.model";


const TABLE_NAME = 'inventory-asset';

export const getInventoryAssetApi = async () => {
  const { data } = await api.get<InventoryAsset[]>(`/${TABLE_NAME}`);
  return data;
};


