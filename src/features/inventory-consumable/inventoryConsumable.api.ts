






import { api } from "@/lib/axios";
import type { InventoryConsumable } from "./inventoryConsumable.model";


const TABLE_NAME = 'inventory-consumable';

export const getInventoryConsumableApi = async () => {
  const { data } = await api.get<InventoryConsumable[]>(`/${TABLE_NAME}`);
  return data;
};


