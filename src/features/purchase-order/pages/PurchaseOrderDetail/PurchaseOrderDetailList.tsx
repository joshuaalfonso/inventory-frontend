import type { PurchaseOrders } from "../../purchaseOrder.model"
import PurchaseOrderDetailListRow from "./PurchaseOrderDetailListRow"


interface Props {
    purchaseOrder: PurchaseOrders
}

const PurchaseOrderDetailList = ({ purchaseOrder }: Props) => {
    return (
        <ul className="px-2!">
            {purchaseOrder?.purchase_order_item.map((item) => (
                <PurchaseOrderDetailListRow 
                    key={item.purchase_order_item_id}
                    item={item} 
                />
            ))}
        </ul>
    )
}

export default PurchaseOrderDetailList