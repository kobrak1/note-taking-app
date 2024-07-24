import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const authCheck = () =>{
    const isAuthenticated = !!localStorage.getItem('auth')
    return isAuthenticated
}

const PrivateRoutes = () =>{
    const isAuth = authCheck()
    return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoutes