import {  Heading} from "@chakra-ui/react"
import ItemDialog from "./components/dialog/ItemDialog";
import ItemTable from "./components/table/ItemTable";
import { useItems } from "./hooks/useItem";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
// import VirtualComboBox from "./components/VirtualComboBox";



const Item = () => {

  const { items, isPending, error } = useItems();

  if (isPending) return <LoadingSpinner />
  if (error) return <p>Failed to fetch items {error.name}</p>;

  return (
    <>
      <Heading 
        size={'md'}
        mb={10}
      >Item</Heading>

      <ItemTable items={items ?? []} />

      <ItemDialog />

      {/* <VirtualComboBox  /> */}
      
    </>
  )
}



export default Item