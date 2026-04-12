

import { api } from "@/lib/axios";
import type { ApiResponse } from "@/shared/models/response";
import type { IncomingFormValues } from "./pages/Incoming-form/IncomingForm";



const TABLE_NAME = 'incoming';

// export const getPurchaseOrderApi = async () => {
//     const { data } = await api.get<any[]>(
//         `${TABLE_NAME}`
//     );
//     return data;
// };

// export const getPaginatedPurchaseOrderApi = async (params: any) => {
//     const { data } = await api.get<PaginatedPurchaseOrder>(
//         `${TABLE_NAME}/paginated`,
//         {
//             params
//         }
//     );
//     return data;
// };


// export const getSinglePurchaseOrderApi = async (purchase_order_id: number) => {
//     const { data } = await api.get<PurchaseOrders>(
//         `${TABLE_NAME}/${purchase_order_id}`
//     );
//     return data;
// };


export const creatIncomingApi = async (newItem: IncomingFormValues) => {
    const { data } = await api.post<ApiResponse>(
        `${TABLE_NAME}`,
        newItem
    )
    return data;
};

// export const updatePurchaseOrderApi = async (updatedItem: CreatePurchaseOrder) => {
//     const { data } = await api.put<ApiResponse>(
//         `${TABLE_NAME}`,
//         updatedItem
//     )
//     return data;
// };

// export const softDeletePurchaseOrderApi = async (purchase_order_id: CreatePurchaseOrder['purchase_order_id']) => {
//     const { data } = await api.delete<ApiResponse>(
//         `${TABLE_NAME}/${purchase_order_id}`, 
//     );
//     return data
// };