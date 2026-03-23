import { Button } from "@chakra-ui/react";
import { useItemTypeDialogStore } from "../../hooks/useItemTypeDialogStore";


const CreateItemTypeButton = () => {

  const openDialog = useItemTypeDialogStore(state => state.openDialog);

  return (
    <>
      <Button 
        size={'sm'}
        variant={'solid'}
        onClick={() => openDialog(null)}
      >
        Create
      </Button>
    </>
  )

}

export default CreateItemTypeButton