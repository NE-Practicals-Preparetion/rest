import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  //handle toggling sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className='pr-5 md:grid grid-cols-2 md:grid-cols-5 justify-between items-center mb-2'>
      <div className='flex w-full md:flex items-center justify-between'>
        <h1 className='text-2xl text-[#092468] font-black'>
          <Link to='/dashboard'>App Title</Link>
        </h1>
        <div className='md:hidden ml-4'>
          <button
            className='text-gray-500 focus:outline-none'
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav
        className={`${
          isSidebarOpen ? 'md:block' : 'hidden'
        } md:hidden fixed top-0 right-0 top-[7vh] w-[70vw] h-[93vh] bg-white shadow`}
      >
        <div className='flex flex-col justify-center p-12 space-y-8 text-gray-500 text-sm h-full'>
          <Link
            to='/#'
            className='hover:text-[#092468]'
            onClick={toggleSidebar}
          >
            Register Owner
          </Link>
          <Link
            to='/register-car'
            className='hover:text-[#092468]'
            onClick={toggleSidebar}
          >
            Register Car
          </Link>
          <Link
            to='/dashboard'
            className='hover:text-[#092468]'
            onClick={toggleSidebar}
          >
            History
          </Link>
          <Link
            to='/login'
            className='hover:text-[#092468] font-black'
            onClick={() => {
              toggleSidebar();
              handleLogout();
            }}
          >
            Logout
          </Link>
        </div>
      </nav>

      <div className='hidden md:flex md:col-span-3 items-center justify-center pl-16'>
            <div className='p-4 space-x-16 text-gray-500 text-sm'>
                <Link to="/#">Register Owner</Link>
                <Link to="/register-car">Register Car</Link>
                <Link to="/dashboard">History</Link>
            </div>
        </div>

        <div className='hidden md:flex justify-end text-gray-500 font-black pr-2' onClick={handleLogout}>
            <Link to="/login">Logout</Link>
        </div>
    </header>
  );
}

export default Navbar;