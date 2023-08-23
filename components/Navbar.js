import React from 'react';
import Image from 'next/image'
import Logo from '../public/T_logo.png'
import {Dropdown} from "flowbite-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 border-gray-500 dark:border-gray-600 dark:bg-gray-900 bg-teal-500">
      <div className="flex justify-between md:items-center mx-auto max-w-screen-xl p-4 md:flex-row md:space-x-8">
        <a href="/">
          <Image src={Logo} alt="Logor" width={100} height={50} />
        </a>
        <div>
          <div className="flex md:space-x-10">
            <ExploreDropDown />
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="py-2 md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center py-2 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
        <LogIn_SignUp/>
      </div>
    </nav>
  );
};

function ExploreDropDown() {
  return (
    <Dropdown label="Explore">
      <div className='flex'>
        <div className='column'>
          <Dropdown.Item>
            <a href="#" className="block p-3 rounded-lg">
              <div className="font-semibold">Online Stores</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a href="#" className="block p-3 rounded-lg">
              <div className="font-semibold">Segmentation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a href="#" className="block p-3 rounded-lg">
              <div className="font-semibold">Marketing CRM</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </Dropdown.Item>
        </div>
        <div className='column'>
          <Dropdown.Item>
            <a href="#" className="block p-3 rounded-lg">
              <div className="font-semibold">Online Stores</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a href="#" className="block p-3 rounded-lg">
              <div className="font-semibold">Segmentation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a href="#" className="block p-3 rounded-lg">
              <div className="font-semibold">Marketing CRM</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </Dropdown.Item>
        </div>
      </div>
    </Dropdown>
  );
}

function LogIn_SignUp(){
  return(
    <div className='flex md:space-x-5'>
    <div>
    <a href="/login">
      <button className="bg-transparent hover:bg-blue-800 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-sky-400 hover:border-transparent rounded-lg">Log In</button>
    </a>
    </div>
    <div>
    <a href="/signup">
      <button className="bg-transparent hover:bg-blue-800 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-sky-400 hover:border-transparent rounded-lg">Sign Up</button>
    </a>
    </div>
  </div>
  );
}

export default Navbar;
