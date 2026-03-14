import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"


const Layout = () => {


  return (
    <div className="min-h-svh flex">

        <Sidebar />

        <div 
            className="flex-1 py-2.5! px-16!"
        >
            <Outlet />
        </div>

    </div>
  )
}

export default Layout