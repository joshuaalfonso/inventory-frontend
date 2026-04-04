

import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { CreatePurchaseOrder, PurchaseOrders } from "./purchaseOrder.model";


const TABLE_NAME = 'purchase-order';

export const getPurchaseOrderApi = async () => {
    const { data } = await api.get<PurchaseOrders[]>(
        `${TABLE_NAME}`
    );
    return data;
};


export const createPurchaseOrderApi = async (newItem: CreatePurchaseOrder) => {
    const { data } = await api.post<ApiResponse>(
        `${TABLE_NAME}`,
        newItem
    )
    return data;
};

export const updatePurchaseOrderApi = async (updatedItem: CreatePurchaseOrder) => {
    const { data } = await api.put<ApiResponse>(
        `${TABLE_NAME}`,
        updatedItem
    )
    return data;
};

export const softDeletePurchaseOrderApi = async (purchase_order_id: CreatePurchaseOrder['purchase_order_id']) => {
    const { data } = await api.delete<ApiResponse>(
        `${TABLE_NAME}/${purchase_order_id}`, 
    );
    return data
};