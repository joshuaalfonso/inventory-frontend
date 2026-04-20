import { Button, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"



const Incoming = () => {


  const navigate = useNavigate();

  return (
    <>
        
      <Heading
        size={'md'} 
        mb={10}
      >
        Incoming
      </Heading>


      <Button onClick={() => navigate('new')}>
        Create
      </Button>
    
    </>
  )
}

export default Incoming