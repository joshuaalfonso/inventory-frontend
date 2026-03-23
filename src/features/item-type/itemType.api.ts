

import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { CreateEditItemType, ItemTypes } from "./itemType.model";


const TABLE_NAME = 'item-type';

export const getItemTypeApi = async () => {
    const { data } = await api.get<ItemTypes[]>(
        `${TABLE_NAME}`
    );
    return data;
};


export const createItemTypeApi = async (newItem: CreateEditItemType) => {
    const { data } = await api.post<ApiResponse>(
        `${TABLE_NAME}`,
        newItem
    )
    return data;
};

export const updateItemTypeApi = async (updatedItem: CreateEditItemType) => {
    const { data } = await api.put<ApiResponse>(
        `${TABLE_NAME}`,
        updatedItem
    )
    return data;
};

export const softDeleteItemTypeApi = async (item_type_id: CreateEditItemType['item_type_id']) => {
    const { data } = await api.delete<ApiResponse>(
        `${TABLE_NAME}/${item_type_id}`, 
    );
    return data
};