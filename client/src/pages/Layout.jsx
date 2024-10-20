import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Layout = () => {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="children">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;