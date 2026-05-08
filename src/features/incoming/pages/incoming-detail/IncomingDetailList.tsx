import type { Incomings } from "../../incoming.model"
import IncomingDetailRow from "./IncomingDetailrow"





interface Props {
    incoming: Incomings
}


const IncomingDetailList = ({ incoming }: Props) => {
    return (
        <ul className="px-2!">
            {incoming?.incoming_item.map((item) => (
                <IncomingDetailRow 
                    key={item.incoming_item_id}
                    item={item} 
                />
            ))}
        </ul>
    )
}

export default IncomingDetailList