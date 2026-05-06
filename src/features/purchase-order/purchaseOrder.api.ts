

import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { CreatePurchaseOrder, PaginatedPurchaseOrderParams, PurchaseOrders } from "./purchaseOrder.model";


export interface PaginatedPurchaseOrder {
  page: number
  limit: number
  total: number
  totalPages: number
  data: PurchaseOrders[]
}

const TABLE_NAME = 'purchase-order';

export const getPurchaseOrderApi = async () => {
    const { data } = await api.get<PurchaseOrders[]>(
        `${TABLE_NAME}`
    );
    return data;
};

export const getPaginatedPurchaseOrderApi = async (params: PaginatedPurchaseOrderParams) => {
    const { data } = await api.get<PaginatedPurchaseOrder>(
        `${TABLE_NAME}/paginated`,
        {
            params
        }
    );
    return data;
};

export const getPendingPurchaseOrderApi = async () => {
    const { data } = await api.get<PurchaseOrders[]>(
        `${TABLE_NAME}/pending`
    );
    return data;
};

export const getSinglePendingPurchaseOrderApi = async (purchase_order_id: number) => {
    const { data } = await api.get<PurchaseOrders>(
        `${TABLE_NAME}/pending/${purchase_order_id}`
    );
    return data;
};


export const getSinglePurchaseOrderApi = async (purchase_order_id: number) => {
    const { data } = await api.get<PurchaseOrders>(
        `${TABLE_NAME}/${purchase_order_id}`
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

export const updatePurchaseOrderStatusApi = async (updatedItem: { purchase_order_id: CreatePurchaseOrder['purchase_order_id'] , status: CreatePurchaseOrder['status']}) => {
    const { data } = await api.put<ApiResponse>(
        `${TABLE_NAME}/status`,
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