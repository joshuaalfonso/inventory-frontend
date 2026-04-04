import { Button, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"








const PurchaseOrder = () => {

  const navigate = useNavigate();

  return (
    <>
    
      <Heading
        size={'md'} 
        mb={10}
      >
        Purchase Order
      </Heading>

      <Button onClick={()=> navigate(`new`)}>
        Create
      </Button>
    
    </>
  )
}

export default PurchaseOrder