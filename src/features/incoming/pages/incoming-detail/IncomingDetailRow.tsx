import { FormatNumber, Separator, Stack, Text } from "@chakra-ui/react"
import type { IncomingItem } from "../../incoming.model"




interface Props {
    item: IncomingItem
}


const IncomingDetailRow = ({ item }: Props) => {
    return (
        <li key={item.incoming_item_id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b! border-dashed last:border-b-0! py-4! w-full">
            
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


            <Stack direction={'column'} gap={0} alignItems={'start'}>
                <Text fontSize={'sm'}>
                    <FormatNumber value={item.received_quantity || 0} /> { item.unit_of_measure_name }
                </Text>
                <Text 
                    color={'fg.muted'} 
                    fontSize={'xs'}

                >
                    Received Quantity
                </Text>
            </Stack>

           

        </li>
    )
}

export default IncomingDetailRow