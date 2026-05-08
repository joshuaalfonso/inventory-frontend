

import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { IncomingFormValues } from "./pages/Incoming-form/IncomingForm";
import type { Incomings, PaginatedIncoming, PaginatedIncomingIncomingParams } from "./incoming.model";



const TABLE_NAME = 'incoming';

export const getPaginatedIncomingApi = async (params: PaginatedIncomingIncomingParams) => {
    const { data } = await api.get<PaginatedIncoming>(
        `${TABLE_NAME}`,
        {
            params
        }
    );
    return data;
};

export const getSingleIncomingApi = async (incoming_id: Incomings['incoming_id']) => {
    const { data } = await api.get<Incomings>(
        `${TABLE_NAME}/${incoming_id}`
    );
    return data;
};


export const creatIncomingApi = async (newItem: IncomingFormValues) => {
    const { data } = await api.post<ApiResponse>(
        `${TABLE_NAME}`,
        newItem
    )
    return data;
};

