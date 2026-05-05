




export interface Incomings {
    incoming_id: number
    incoming_date: string
    purchase_order_id: number
    purchase_order_number: string
    sales_invoice_number: string
    total_received: number
    created_at: string
}


export interface PaginatedIncoming {
  page: number
  limit: number
  total: number
  totalPages: number
  data: Incomings[]
}

export interface PaginatedIncomingIncomingParams {
    page?: number;
    limit?: number;
    purchase_order_id?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}



export type IncomingSortField =
  | 'incoming_date'
  | 'purchase_order_number'
  | 'sales_invoice_number'
  | 'total_received'
  | 'created_at'