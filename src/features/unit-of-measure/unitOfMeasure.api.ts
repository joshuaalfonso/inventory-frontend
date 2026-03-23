import { api } from "@/lib/axios";
import type { CreateEditUnifOfMeasure, UnitOfMeasures } from "./unitOfMeasure.model";
import type { ApiResponse } from "@/shared/models/response";


const TABLE_NAME = 'unit-of-measure';

export const getUnitOfMeasureApi = async () => {
    const { data } = await api.get<UnitOfMeasures[]>(
        `${TABLE_NAME}`
    );
    return data;
};


export const createUnitOfMeasureApi = async (newItem: CreateEditUnifOfMeasure) => {
    const { data } = await api.post<ApiResponse>(
        `${TABLE_NAME}`,
        newItem
    )
    return data;
};

export const updateUnitOfMeasureApi = async (updatedItem: CreateEditUnifOfMeasure) => {
    const { data } = await api.put<ApiResponse>(
        `${TABLE_NAME}`,
        updatedItem
    )
    return data;
};

export const softDeleteUnitOfMeasureApi = async (unit_of_measure_id: CreateEditUnifOfMeasure['unit_of_measure_id']) => {
    const { data } = await api.delete<ApiResponse>(
        `${TABLE_NAME}/${unit_of_measure_id}`, 
    );
    return data
};