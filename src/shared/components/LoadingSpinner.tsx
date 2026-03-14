import { Center, Spinner } from "@chakra-ui/react"



const LoadingSpinner = () => {
  return (
    <Center h={200}>
        <Spinner color="teal.500" size="lg" />
    </Center>
  )
}

export default LoadingSpinner