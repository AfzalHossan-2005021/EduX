import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/T_logo.png';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCaretUp, AiOutlineCaretDown, AiOutlineCloseCircle } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { BiHeart } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';


import secureLocalStorage from 'react-secure-storage';

const Navbar = () => {
  const searchDivRef = useRef();
  const WishListRef = useRef();
  const userDropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (secureLocalStorage.getItem('u_id')) {
      setisLoggedIn(true);
    };
  });

  const toggleWishList = () => {
    if (WishListRef.current.classList.contains('translate-x-full')) {
      WishListRef.current.classList.remove('translate-x-full');
      WishListRef.current.classList.add('translate-x-0');
    } else if (!WishListRef.current.classList.contains('translate-x-full')) {
      WishListRef.current.classList.remove('translate-x-0');
      WishListRef.current.classList.add('translate-x-full');
    }
  };

  const toggleDropdown = () => {
    if (userDropdownRef.current.classList.contains('hidden')) {
      userDropdownRef.current.classList.remove('hidden');
    } else if (!userDropdownRef.current.classList.contains('hidden')) {
      userDropdownRef.current.classList.add('hidden');
    }
  };

  const logout = () => {
    secureLocalStorage.removeItem('u_id');
    setisLoggedIn(false);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/all_courses')
      .then((Response) => Response.json())
      .then((json) => { setAllCourses(json) });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-200 to-slate-400 z-20">
      <div className="flex h-full p-3 space-x-5 justify-between">
        <div className='absolute'>
          <Link href="/">
            <Image src={Logo} alt="Logo" height='50' priority={true} />
          </Link>
        </div>
        <ExploreDropDown isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='w-2/5 md:space-y-12' ref={searchDivRef}>
          <SearchBar allCourses={allCourses} setResults={setResults} containerRef={searchDivRef} />
          <SearchResultsList results={results} setResults={setResults} />
        </div>
        <div className='flex-col'>
          <div className='flex space-x-5 pr-5 items-center justify-end'>
            {
              !isLoggedIn && <LogIn_SignUp />
            }
            {
              isLoggedIn &&
              <div className='flex space-x-5'>
                <button> <BiHeart onClick={toggleWishList} className='text-4xl' /> </button>
                <button> <BsPersonCircle onClick={toggleDropdown} className='text-4xl' /></button>
              </div>
            }
          </div>
          {
            isLoggedIn &&
            <div className="flex-col hidden mr-2 md:order-2" ref={userDropdownRef}>
              <div className="z-50 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{secureLocalStorage.getItem('u_name')}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{secureLocalStorage.getItem('u_email')}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a href="/user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="/" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</a>
                  </li>
                </ul>
              </div>
              <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
          }
        </div>
        <div ref={WishListRef} className='sidebar absolute top-0 right-0 bg bg-emerald-500 p-10 transform transition-transform translate-x-full'>
          <h2 className='font-bold text-xl'>WishList</h2>
          <span onClick={toggleWishList} className="absolute top-2 right-2 cursor-pointer text-xl"><AiOutlineCloseCircle /></span>
          <ol>
            <li><span>course</span></li>
          </ol>
        </div>
      </div>
    </nav>
  );
};

function ExploreDropDown({ isOpen, setIsOpen }) {
  return (
    <div className='absolute left-48 md:space-y-12'>
      <button className='absolute bg-blue-600 hover:bg-blue-700 flex items-center w-32 h-10 shadow-xlr justify-between p-2 font-bold text-lg rounded-l-lg tracking-wider border-transparent border-4 duration-5 group active:text-white active:border-white'
        onClick={() => setIsOpen((prev) => !prev)}>
        Explore
        {
          !isOpen ? (
            <AiOutlineCaretDown />
          ) : (
            <AiOutlineCaretUp />
          )
        }
      </button>
      {
        isOpen && (
          <div className='relative group-focus:block bg-white flex shadow-xl'>
            <div className='column'>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Information Technology</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Science and Engineering</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Mathematics and Logic</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
            </div>
            <div className='column'>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Arts and Humanities</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Social Science</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Language Learning</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
            </div>
          </div>
        )
      }
    </div>
  );
}

function SearchBar({ allCourses, setResults, containerRef }) {
  const [input, setInput] = useState('');
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current.contains(e.target)) {
        handleChange('');
      }
    };
    document.addEventListener('mousedown', handler);
  });

  const fetchData = (value) => {
    const results = allCourses.filter((course) => {
      return (value && course && course.title && course.title.toLowerCase().includes(value));
    });
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className='absolute left-[340px] bg-white w-[498px] h-10 rounded-r-lg shadow-lg px-0 flex items-center'>
      <input id='search_input' className='bg-transparent h-full w-[440px] text-xl ml-1.5 outline-none'
        placeholder='Type to search...' value={input} onChange={(e) => handleChange(e.target.value)} />
      <button className='absolute left-[450px] bg-blue-600 hover:bg-blue-700 border-none w-12 h-10 rounded-r-lg p-3'>
        <FaSearch color='white' size='20px' />
      </button>
    </div>
  );
}

function SearchResultsList({ results, setResults }) {
  return (
    <div className='relative left-[308px] w-[480px] bg-white flex-col shadow-md max-h-80 overflow-auto'>
      {
        results.map((result, id) => {
          return (
            <button className='w-full' onClick={() => setResults([])}>
              <Link key={id} href={`/courses/${result.title}`}>
                <div key={id} className='py-5 px-2 hover:bg-zinc-300 text-sky-600'>
                  {result.title}
                </div>
              </Link>
            </button>
          );
        })
      }
    </div>
  );
}

function LogIn_SignUp() {
  return (
    <div className='flex space-x-5'>
      <div>
        <a href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl transform hover:scale-110 motion-reduce:transform-none">Log In</button>
        </a>
      </div>
      <div>
        <a href="/signup">
          <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl transform hover:scale-110 motion-reduce:transform-none">Sign Up</button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
