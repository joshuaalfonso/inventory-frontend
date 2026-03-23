import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useUnitOfMeasures } from "./hooks/useUnifOfMeasures";
import { Alert, Heading } from "@chakra-ui/react";
import { getApiErrorMessage } from "@/lib/errorMessage";
import ReusableEmptyState from "@/shared/components/ReusableEmptyState";
import UnitOfMeasureTable from "./components/table/UnitOfMeasureTable";
import CreateUnitOfMeasureButton from "./components/dialog/CreateUnitOfMeasureButton";
import UnitOfMeasureDialog from "./components/dialog/UnitOfMeasureDialog";


const UnitOfMeasure = () => {
  const { unitOfMeasures, isPending, error } = useUnitOfMeasures();
  
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
          Unt of Measure=
        </Heading>
  
        {unitOfMeasures?.length === 0 && (
          <ReusableEmptyState>
            <CreateUnitOfMeasureButton />
          </ReusableEmptyState>
        ) }
  
        {(unitOfMeasures ?? []).length > 0 && (
          <UnitOfMeasureTable
            unitOfMeasures={unitOfMeasures ?? []} 
          />
        ) }
  
        <UnitOfMeasureDialog />
      
      </>
    )
}

export default UnitOfMeasure