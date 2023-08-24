import React, { useState } from 'react';
import Image from 'next/image'
import Logo from '../public/T_logo.png'
import { FaSearch } from 'react-icons/fa'
import { Dropdown } from "flowbite-react";

const Navbar = () => {
  const [results, setResults] = useState([]);
  return (
    <nav className="top-0 h-16 left-0 right-0 bg-slate-200 shadow-2xl">
      <div className="flex h-full p-3 md:space-x-5 ">
        <div className='pb-4'>
        <a href="/">
          <Image src={Logo} alt="Logor" height='50'/>
        </a>
        </div>
        <ExploreDropDown />
        <LogIn_SignUp />
      </div>
    </nav>
  );
};

function ExploreDropDown() {
  return (
    <Dropdown label="Explore" height = '10'>
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

function LogIn_SignUp() {
  return (
    <div className='flex md:space-x-5'>
      <div className='md:pl-[448px] sm: pl-16'>
        <a href="/login">
          <button className="bg-blue-700 hover:bg-blue-800 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl">Log In</button>
        </a>
      </div>
      <div>
        <a href="/signup">
          <button className="bg-blue-700 hover:bg-blue-800 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl">Sign Up</button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
