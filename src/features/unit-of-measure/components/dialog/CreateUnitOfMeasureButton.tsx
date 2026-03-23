import { useUnitOfMeasureDialogStore } from '../../hooks/useUnitOfMeasureDialogStore';
import { Button } from '@chakra-ui/react';

const CreateUnitOfMeasureButton = () => {
  const openDialog = useUnitOfMeasureDialogStore(state => state.openDialog);
  
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

export default CreateUnitOfMeasureButton