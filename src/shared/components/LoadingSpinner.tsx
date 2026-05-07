import { Center } from "@chakra-ui/react"



const LoadingSpinner = () => {
  return (
    <Center h={200}>
        {/* <Spinner color="teal.500" size="lg" /> */}

       <div className="w-10 h-10 rounded-full animate-spin
        [background:radial-gradient(farthest-side,_#00bba7_94%,_#0000)_top/6.4px_6.4px_no-repeat,conic-gradient(#0000_30%,_#00bba7)]
        [-webkit-mask:radial-gradient(farthest-side,_#0000_calc(100%_-_6.4px),_#000_0)]">
      </div>

    </Center>
  )
}

export default LoadingSpinner