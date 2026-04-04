



interface PurchaseOrderItem {
  purchase_order_item_id: number;
  purchase_order_id: number;
  employee_id: number;
  item_id: number;
  item_name: string;
  brand_name: string;
  category_name: string;
  item_type_name: string;
  unit_of_measure_name: string;
  ordered_quantity: number;
  price: number;
};

export interface PurchaseOrders {
  purchase_order_id: number;
  purchase_request_number: string;
  purchase_order_number: string;
  purchase_order_date: string;
  supplier_id: number;
  purchase_order_item: PurchaseOrderItem[];
};


export interface CreatePurchaseOrder {
    purchase_order_id: number;
    purchase_request_number: string;
    purchase_order_number: string;
    purchase_order_date: string;
    supplier_id: number;
    purchase_order_item: PurchaseOrderItem[];
}