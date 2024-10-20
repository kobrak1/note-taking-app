import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='flex justify-center items-center fixed z-10 bg-white py-8 w-full shadow-lg'>
      <nav className="flex flex-row justify-between items-center max-w-[1200px] w-full p-2 px-[30px] mx-auto border rounded-full text-primary bg-slate-500">
        <div className="logo">
          <Link to={"/"} className='text-red-500 sm:text-primary'>LOGO</Link>
        </div>
        <div className="flex flex-row gap-1">
          <Link to={"/"} className="px-2 cursor-pointer">Home</Link>
          <Link to={"/notes"} className="px-2 cursor-pointer"> My notes</Link>
          <Link to={"/"} className="px-2 cursor-pointer">Search</Link>
        </div>
        <div className="flex flex-row gap-1">
          <Link to={"/login"} className="px-2 cursor-pointer">Login</Link>
          <Link to={"/register"} className="px-2 cursor-pointer">Register</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
