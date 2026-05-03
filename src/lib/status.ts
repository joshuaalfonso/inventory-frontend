import type { PurchaseOrders } from "@/features/purchase-order/purchaseOrder.model"






export const getPurchaseOrderStatusPalette = (status: PurchaseOrders['status']) => {

    switch (status) {
        case 'Awaiting cheque':
            return 'yellow'
        case 'Cheque released':
            return 'blue'
        case 'Revised':
            return 'red'
        case 'Completed':
            return 'green'
    }

}