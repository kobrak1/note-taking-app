import React from "react"
import { useNavigate, Link } from 'react-router-dom'

import Logo from "./Logo"
import Button from "../Button"
import HeaderItem from "./HeaderItem"


const Header = () => {
    const navigate = useNavigate()

    // Function to remove auth data and navigate to the login page
    const handleLogout = () => {
        localStorage.removeItem('auth')
        navigate('/login')
    }

    // Extract username from auth data
    const extractUsername = () => {
        const auth = localStorage.getItem('auth')
        if (auth) {
            try {
                const username = JSON.parse(auth).username
                return username
            } catch (error) {
                console.error("Failed to parse auth data:", error)
            }
        }
        return 'Guest'
    }    

    return (
        <div className="flex justify-around items-center m-4">
            <Logo />
            <div className="flex">
                <Link to={'/'}>
                    <HeaderItem>Notes</HeaderItem>
                </Link>
                <Link to={'/create-new'}>
                    <HeaderItem>Create</HeaderItem>
                </Link>
            </div>
            <div className="flex">
                <HeaderItem> {extractUsername()} </HeaderItem>
                <Button className="py-1" handleClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Header