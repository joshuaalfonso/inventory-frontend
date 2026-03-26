import { Button, Heading} from "@chakra-ui/react"
import { useItemDialogStore } from "./hooks/useItemDialogStore";
import ItemDialog from "./components/dialog/ItemDialog";
// import VirtualComboBox from "./components/VirtualComboBox";



const Item = () => {

  const openDialog = useItemDialogStore(state => state.openDialog);

  return (
    <>
      <Heading 
        size={'md'}
        mb={10}
      >Item</Heading>

      <Button
        onClick={() => openDialog(null)}
      >
        Create
      </Button>

      <ItemDialog />

      {/* <VirtualComboBox  /> */}
      
    </>
  )
}



export default Item