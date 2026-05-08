




export interface Incomings {
    incoming_id: number
    incoming_code: string
    incoming_date: string
    purchase_order_id: number
    purchase_order_number: string
    sales_invoice_number: string
    total_received: number
    created_at: string
    incoming_item: IncomingItem[]
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

export interface IncomingItem {
  incoming_item_id: number
  incoming_id: number
  item_id: number
  item_name: string
  brand_name: string
  category_name: string
  item_type_name: string
  unit_of_measure_name: string
  received_quantity: number
}




export type IncomingSortField =
  | 'incoming_id'
  | 'incoming_date'
  | 'purchase_order_number'
  | 'sales_invoice_number'
  | 'total_received'
  | 'created_at'