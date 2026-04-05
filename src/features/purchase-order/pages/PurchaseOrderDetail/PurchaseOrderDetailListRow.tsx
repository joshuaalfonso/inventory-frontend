import { FormatNumber, Separator, Stack, Text } from "@chakra-ui/react"
import { LuPhilippinePeso } from "react-icons/lu"
import type { PurchaseOrderItem } from "../PurchaseOrderForm/PurchaseOrderForm"


interface Props {
    item: PurchaseOrderItem
}

const PurchaseOrderDetailListRow = ({ item }: Props) => {
    return (
        <li key={item.purchase_order_item_id} className="grid grid-cols-1 md:grid-cols-5 gap-4 border-b! border-dashed last:border-b-0! py-4! w-full">
    
            <div>
                <h1 className="flex-1 my-auto! text-sm!">
                    {item.item_name} - {item.brand_name}
                </h1>
                <Stack direction={'row'}>
                    <Text
                        color={'fg.muted'} 
                        fontSize={'xs'}
                    >
                        {item.category_name}
                    </Text>
                    <Separator orientation="vertical" />
                    <Text 
                        color={'fg.muted'} 
                        fontSize={'xs'}
                    >
                        {item.item_type_name}
                    </Text>
                </Stack>
            </div>

            <Stack gap={0}>
                <Text fontSize={'sm'}>
                    {item.employee_name}
                </Text>
                <Text 
                    fontSize={'xs'} 
                    color={'fg.muted'}
                >
                    {item.department_name}
                </Text>
            </Stack>

            <Stack direction={'row'} alignItems={'center'}>
                <Text fontSize={'sm'}>
                    <FormatNumber value={item.ordered_quantity || 0} />
                </Text>
                <Text fontSize={'sm'}>{item.unit_of_measure_name}</Text>
            </Stack>

            <Stack direction={'row'} alignItems={'center'}>
                <Text fontSize={'sm'}><LuPhilippinePeso /></Text>
                <Text fontSize={'sm'}>
                    <FormatNumber value={item.price || 0} />
                </Text>
            </Stack>

            <Stack direction={'row'} alignItems={'center'}>
                <Text fontSize={'sm'}><LuPhilippinePeso /></Text>
                <Text fontSize={'sm'}>
                    <FormatNumber value={(item.ordered_quantity || 0) * (item.price || 0)} />
                </Text>
            </Stack>

        </li>
    )
}

export default PurchaseOrderDetailListRow