import { Button, Heading} from "@chakra-ui/react"
import { useItemDialogStore } from "./hooks/useItemDialogStore";
import ItemDialog from "./components/dialog/ItemDialog";


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

      
    </>
  )
}

export default Item