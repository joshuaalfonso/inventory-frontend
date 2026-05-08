import { Button, FormatNumber, Menu, Portal, Table } from "@chakra-ui/react"
import type { Incomings } from "../../incoming.model"
import { useColorModeValue } from "@/components/ui/color-mode"
import { displayDate, displayDateTime } from "@/lib/dateFormat"
import { LuEllipsis, LuEye } from "react-icons/lu"
import { useNavigate } from "react-router-dom"



interface Props {
    row: Incomings
    index: number
}


const IncomingTableRow = ({ row, index }: Props) => {

    const navigate = useNavigate();

    const bg = useColorModeValue('white', 'bg.subtle');

    return (
        <>
            <Table.Row bg={bg}>
                <Table.Cell>{index}</Table.Cell>
                {/* <Table.Cell>{displayDate(row.purchase_order_date)}</Table.Cell> */}
                <Table.Cell>{displayDate(row.incoming_date)}</Table.Cell>
                <Table.Cell>
                    {row.incoming_code}
                </Table.Cell>
                <Table.Cell>
                    {row.sales_invoice_number}
                </Table.Cell>
                <Table.Cell>
                    {row.purchase_order_number}
                </Table.Cell>
                <Table.Cell>
                        <FormatNumber value={row.total_received} />
                </Table.Cell>
               
               
                <Table.Cell>{displayDateTime(row.created_at)}</Table.Cell>
                <Table.Cell textAlign="end">
                
                <Menu.Root positioning={{ placement: "bottom-end" }} lazyMount>
                    <Menu.Trigger asChild>
                    <Button
                        size={'xs'} 
                        variant={'ghost'} 
                        colorPalette={'gray'}
                    >
                        <LuEllipsis />
                    </Button>
                    </Menu.Trigger>
                    <Portal>
                    <Menu.Positioner>
                        <Menu.Content>

                        <Menu.Item 
                            value="view_details" 
                            onClick={() => navigate(`${row.incoming_id}`)}
                            cursor={'pointer'}
                        >
                            <LuEye />
                            View Details
                        </Menu.Item>

                       
                        </Menu.Content>
                    </Menu.Positioner>
                    </Portal>
                </Menu.Root>

                </Table.Cell>
            </Table.Row>

        </>
    )
}

export default IncomingTableRow