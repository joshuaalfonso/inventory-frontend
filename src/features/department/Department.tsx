import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useDepartments } from "./hooks/useDepartment";
import { Alert, Button, Heading } from "@chakra-ui/react";
import { getApiErrorMessage } from "@/lib/errorMessage";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
// import CreateItemTypeButton from "../item-type/components/dialog/CreateItemTypeButton";
import DepartmentTable from "./components/table/DepartmentTable";
import { useDepartmentDialogStore } from "./hooks/useDepartmentDialogStore";
import DepartmentDialog from "./components/dialog/DepartmentDialog";



const Department = () => {

  const { departments, isPending, error } = useDepartments();

  const openDialog = useDepartmentDialogStore(state => state.openDialog);

  if (isPending) return <LoadingSpinner />;

  if (error) return (
    <Alert.Root status="error" mt={10}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          {getApiErrorMessage(error)}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );

  return (
    <>
    
      <Heading
        size={'md'} 
        mb={10}
      >
        Department
      </Heading>

      {departments?.length === 0 && (
        <ReusableEmptyState>
          <Button 
            variant={'surface'} 
            onClick={() => openDialog()}
          >
            Create
          </Button>
        </ReusableEmptyState>
      ) }

      {(departments ?? []).length > 0 && (
        <DepartmentTable
          departments={departments ?? []} 
        />
      ) }


      <DepartmentDialog />
    
    </>
  )

}

export default Department