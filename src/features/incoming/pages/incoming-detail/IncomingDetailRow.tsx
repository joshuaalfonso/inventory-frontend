import { Button, CloseButton, DataList, Dialog, FormatNumber, Input, Portal, Separator, Stack, Text, Textarea, VStack } from "@chakra-ui/react"
import type { IncomingItem } from "../../incoming.model"


interface Props {
    item: IncomingItem
}

const IncomingDetailRow = ({ item }: Props) => {
    return (
        <li 
            key={item.incoming_item_id} 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b! border-dashed last:border-b-0! py-4! w-full"
        >
            
            <div>
                <h1 className="flex-1 my-auto! text-sm!">
                    {item.brand_name} {item.item_name} 
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

            <VStack alignItems={'start'}>
                <Dialog.Root 
                    lazyMount 
                    initialFocusEl={() => null}
                    size={{ base: "sm", md: "md" }}
                >
                    <Dialog.Trigger asChild>
                        <Button 
                            variant="ghost" 
                            colorPalette={'teal'} 
                            size={'xs'}
                            my={'auto'}
                        >
                            Adjust
                        </Button>
                    </Dialog.Trigger>
                    <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Adjustment Form</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body pb="8">
                            <DataList.Root orientation="horizontal">
                            <DataList.Item>
                                <DataList.ItemLabel>Item Name</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    <strong> { item.brand_name } { item.item_name }</strong>
                                </DataList.ItemValue>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.ItemLabel>Current Received</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    <strong>{item.received_quantity} </strong>
                                    &nbsp;
                                    {item.unit_of_measure_name}
                                </DataList.ItemValue>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.ItemLabel>Actual Quantity</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    <Input />
                                </DataList.ItemValue>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.ItemLabel>Difference</DataList.ItemLabel>
                                <DataList.ItemValue>2</DataList.ItemValue>
                            </DataList.Item>

                            </DataList.Root>

                            {/* <DataList.Root mt="8">
                                <DataList.Item>
                                <DataList.ItemLabel>Difference</DataList.ItemLabel>
                                <DataList.ItemValue>-2</DataList.ItemValue>
                                </DataList.Item>
                            </DataList.Root> */}

                            <DataList.Root mt="8">
                                <DataList.Item>
                                <DataList.ItemLabel>Reason</DataList.ItemLabel>
                                <Textarea placeholder="" />
                                </DataList.Item>
                            </DataList.Root>


                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" colorPalette={'gray'} />
                        </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </VStack>

        </li>
    )
}

export default IncomingDetailRow