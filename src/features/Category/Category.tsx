import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useCategories } from "./hooks/useCategories";
import { Alert, Heading } from "@chakra-ui/react";
import { getApiErrorMessage } from "@/lib/errorMessage";
import CategoryTable from "./components/table/CategoryTable";
import CategoryDialog from "./components/dialog/CategoryDialog";



const Category = () => {

  const { categories, isPending, error } = useCategories();

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
        Category
      </Heading>

      <CategoryTable
        categories={categories ?? []} 
      />

      <CategoryDialog />
    
    </>
  );

}

export default Category