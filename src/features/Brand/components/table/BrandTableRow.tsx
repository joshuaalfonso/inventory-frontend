import { Button, Table } from "@chakra-ui/react"
import type { Brands } from "../../brand.model"
import { LuEllipsis } from "react-icons/lu"


interface Props {
    row: Brands
    index: number
}


const BrandTableRow = ({row, index}: Props) => {
  return (
    <Table.Row key={row.brand_id}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{row.brand_name}</Table.Cell>
        <Table.Cell>Eric Menk</Table.Cell>
        <Table.Cell>{row.created_at}</Table.Cell>
        <Table.Cell textAlign="end">
        <Button size={'xs'} variant={'ghost'} colorPalette={'gray'}>
            <LuEllipsis />
        </Button>
        </Table.Cell>
    </Table.Row>
  )
}

export default BrandTableRow