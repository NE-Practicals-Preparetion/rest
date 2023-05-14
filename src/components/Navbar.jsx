import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center mb-2'>
        <div className='flex items-center'>
            <h1 className='text-2xl text-[#092468] font-black'>App Title</h1>
        </div>

        {/* middle div to be hidden in small screens (small to big screen in that order)*/}
        {/* the center div to take 3 cols of the 5 in mid screen */}
        <div className='hidden md:flex md:col-span-3 items-center justify-center pl-16'>
            <div className='p-4 space-x-16 text-gray-500 text-sm'>
                <Link to="/">Register Owner</Link>
                <Link to="/">Register Car</Link>
                <Link to="/">History</Link>
            </div>
        </div>

        <div className='flex justify-end text-gray-500 font-black pr-2'>
            <Link to="/login">Logout</Link>
        </div>

    </header>
  )
}

export default Navbar