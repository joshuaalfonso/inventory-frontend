import { Heading } from "@chakra-ui/react";
import { useBrands } from "./hooks/useBrand"
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import BrandTable from "./components/table/BrandTable";
import BrandDialog from "./components/dialog/BrandDialog";

const Brand = () => {

  const { brands, isPending, error } = useBrands();

  if (isPending) return <LoadingSpinner />
  if (error) return <p>Failed to fetch brands {error.name}</p>;

  return (
    <>
    
      <Heading 
        size={'md'} 
        mb={10}
      >
        Brand
      </Heading>

      <BrandTable 
        brands={brands ?? []} 
      />

      <BrandDialog />
    
    </>
  )
}

export default Brand