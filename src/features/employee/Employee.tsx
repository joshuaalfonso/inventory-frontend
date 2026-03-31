import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useEmployees } from "./hooks/useEmployee";
import { useEmployeeDialogStore } from "./hooks/useEmployeeDialogStore";
import { Alert, Button, Heading } from "@chakra-ui/react";
import { getApiErrorMessage } from "@/lib/errorMessage";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import EmployeeTable from "./components/table/EmployeeTable";
import EmployeeDialog from "./components/dialog/EmployeeDialog";

const Employee = () => {


  const { employees, isPending, error } = useEmployees();
  
  const openDialog = useEmployeeDialogStore(state => state.openDialog);

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
        Employee
      </Heading>

      {employees?.length === 0 && (
        <ReusableEmptyState>
          <Button
            variant={'surface'} 
            onClick={() => openDialog()}
          >
            Create
          </Button>
        </ReusableEmptyState>
      ) }

      {(employees ?? []).length > 0 && (
        <EmployeeTable
          employees={employees ?? []} 
        />
      ) }


      <EmployeeDialog />
    
    </>
  )
}

export default Employee