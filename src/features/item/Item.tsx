import { Box, Button, Heading, Input, InputGroup, Table } from "@chakra-ui/react"
import { LuEllipsis, LuSearch } from "react-icons/lu"



const items = [
  { id: 1, name: "Laptop", brand: 'Samsung', category: "Electronics", uom: 'pcs', price: 999.99 },
  { id: 2, name: "Coffee Maker", brand: 'Philips', category: "Home Appliances", uom: 'pcs', price: 49.99 },
  { id: 3, name: "Desk Chair", brand: 'Wilcon', category: "Furniture", uom: 'set', price: 150.0 },
  { id: 4, name: "Smartphone", brand: 'Apple', category: "Electronics", uom: 'unit', price: 799.99 },
  { id: 5, name: "Headphones", brand: 'JBL', category: "Accessories", uom: 'pcs', price: 199.99 },
]


const Item = () => {
  return (
    <>
      <Heading 
        size={'md'}
        mb={10}
      >Item</Heading>

      <Box 
        p={8} 
        borderWidth="1px"
        borderColor="border.disabled"
        color="fg.disabled"
        rounded={'md'}
      >

        <Box 
          mb={4} 
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
           <InputGroup startElement={<LuSearch />} w={200} >
              <Input 
                placeholder="Search keyword..."
                size={'sm'}
              />
            </InputGroup>
            <Button size={'sm'}>
              Create
            </Button>
        </Box>

        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Brand</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Uom</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.brand}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>{item.uom}</Table.Cell>
                <Table.Cell>Jan 22, 2026</Table.Cell>
                <Table.Cell textAlign="end">
                  <Button size={'sm'} variant={'ghost'} colorPalette={'gray'}>
                    <LuEllipsis />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
      </Table.Root>
      </Box>
    </>
  )
}

export default Item