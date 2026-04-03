

import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { CreateEditSupplier, Suppliers } from "./supplier.model";


const TABLE_NAME = 'supplier';

export const getSupplierApi = async () => {
    const { data } = await api.get<Suppliers[]>(
        `${TABLE_NAME}`
    );
    return data;
};


export const createSupplierApi = async (newItem: CreateEditSupplier) => {
    const { data } = await api.post<ApiResponse>(
        `${TABLE_NAME}`,
        newItem
    )
    return data;
};

export const updateSupplierApi = async (updatedItem: CreateEditSupplier) => {
    const { data } = await api.put<ApiResponse>(
        `${TABLE_NAME}`,
        updatedItem
    )
    return data;
};

export const softDeleteSupplierApi = async (supplier_id: CreateEditSupplier['supplier_id']) => {
    const { data } = await api.delete<ApiResponse>(
        `${TABLE_NAME}/${supplier_id}`, 
    );
    return data
};