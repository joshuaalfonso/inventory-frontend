import { useColorModeValue } from "@/components/ui/color-mode"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import { Box } from "@chakra-ui/react"

const Layout = () => {

  // const bg = useColorModeValue('gray.50', 'black')
  const bg = useColorModeValue('gray.50', '#0e0e10')

  return (
    <Box 
      className="min-h-svh flex" 
      bg={bg}
    >

        <Sidebar />

        <div 
            className="flex-1 py-2.5! px-16!"
        >
            <Outlet />
        </div>

    </Box>
  )
}

export default Layout