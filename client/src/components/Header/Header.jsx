import React from "react"
import { useNavigate } from 'react-router-dom'

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
            const username = JSON.parse(auth).username
            return username
        }
        return 'Guest'
    }

    return (
        <div className="flex justify-around items-center m-4">
            <Logo />
            <div className="flex">
                <HeaderItem>Notes</HeaderItem>
                <HeaderItem>Create</HeaderItem>
            </div>
            <div className="flex">
                <HeaderItem> {extractUsername()} </HeaderItem>
                <Button className="py-1" handleClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Header