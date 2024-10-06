import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center max-w-[1200px] min-w-[375px] xl:w-full lg:w-[80%] p-2 px-[30px] mx-auto mt-8 mb-4 border rounded-full text-primary  bg-slate-500">
      <div className="logo">
        <Link to={"/"} className='text-red-500 sm:text-primary'>LOGO</Link>
      </div>
      <div className="flex flex-row gap-1">
        <Link to={"/"} className="px-2 cursor-pointer">Home</Link>
        <Link to={"/notes"} className="px-2 cursor-pointer">Notes</Link>
      </div>
      <div className="flex flex-row gap-1">
        <Link to={"/login"} className="px-2 cursor-pointer">Login</Link>
        <Link to={"/register"} className="px-2 cursor-pointer">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar
