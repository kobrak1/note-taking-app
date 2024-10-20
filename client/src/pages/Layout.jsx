import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Layout = () => {
    return (
        <div className="flex flex-col">
            <div>
                <Navbar />
            </div>
            <div className="relative top-40 w-full">
                <Outlet />
            </div>
        </div>
    )
}

const RequireAuth = () => {
    return (
        <div>
            
        </div>
    )
}

export default Layout;