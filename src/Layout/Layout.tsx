import { useColorModeValue } from "@/components/ui/color-mode"
import { Outlet } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import '../bones/registry';
import Sidebar from "./components/sidebar/Sidebar";


const Layout = () => {

  // const bg = useColorModeValue('gray.50', 'black')
  const bg = useColorModeValue('gray.50', '#0e0e10')

  return (
    <Box 
      className="max-h-svh flex overflow-hidden" 
      bg={bg}
    >

        <Sidebar />

        <div 
            className="min-h-svh flex-1 py-5! px-8! md:px-16! overflow-auto"
        >
            <Outlet />
        </div>

    </Box>
  )
}

export default Layout