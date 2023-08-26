import React, { useState } from 'react';
import Image from 'next/image'
import Logo from '../public/T_logo.png'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'

const Navbar = () => {
  const [results, setResults] = useState([]);
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-200 to-slate-400 shadow-2xl">
      <div className="flex h-full p-3 md:space-x-5 justify-between">
        <div className='absolute'>
          <a href="/">
            <Image src={Logo} alt="Logor" height='50' />
          </a>
        </div>
        <ExploreDropDown />
        <div className='w-2/5 md:space-y-12'>
          <SearchBar setResults={setResults} />
          <SearchResultsList results={results} />
        </div>
        <LogIn_SignUp />
      </div>
    </nav>
  );
};

function ExploreDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='absolute left-48 md:space-y-12'>
      <button className='absolute bg-blue-600 hover:bg-blue-700 flex items-center w-32 h-10 shadow-xlr justify-between p-2 font-bold text-lg rounded-l-lg tracking-wider border-transparent border-4 duration-300 active:text-white active:border-white'
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
          // <div className='bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
          //   {
          //     list.map((item, i) => {
          //       <div className='flex w-full justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4'>
          //         <h3>{item.city}</h3>
          //         <h3>{item.emotion}</h3>
          //       </div>
          //     })
          //   }
          // </div>
          <div className='relative bg-white flex shadow-xl'>
            <div className='column'>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Online Stores</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Segmentation</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Marketing CRM</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
            </div>
            <div className='column'>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Online Stores</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Segmentation</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that you are already using.
                </span>
              </a>
              <a href="#" className="hover:bg-blue-200 block p-3">
                <div className="font-semibold">Marketing CRM</div>
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

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch('http://localhost:3000/api/all_courses')
      .then((Response) => Response.json())
      .then((json) => {
        const results = json.filter((course) => {
          return (value && course && course.title && course.title.toLowerCase().includes(value));
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className='absolute left-[340px] bg-white w-[498px] h-10 rounded-r-lg shadow-lg px-0 flex items-center'>
      <input className='bg-transparent h-full w-[440px] text-xl ml-1.5 outline-none'
        placeholder='Type to search...' value={input} onChange={(e) => handleChange(e.target.value)} />
      <button className='absolute left-[450px] bg-blue-600 hover:bg-blue-700 border-none w-12 h-10 rounded-r-lg p-3'>
        <FaSearch color='white' size='20px' />
      </button>
    </div>
  );
}

function SearchResultsList({ results }) {
  return (
    <div className='relative left-[310px] w-full bg-white flex-col shadow-md max-h-80 overflow-auto'>
      {
        results.map((result, id) => {
          return (
            <div key={id} className='py-5 px-2.5 hover:bg-zinc-600 text-sky-600'
              onClick={(e) => alert(`you clicked on {result}`)}>
              {result.title}
            </div>
          );
        })
      }
    </div>
  );
}

function LogIn_SignUp() {
  return (
    <div className='absolute left-[840px] flex md:space-x-5'>
      <div className='md:pl-[448px] sm: pl-16'>
        <a href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl">Log In</button>
        </a>
      </div>
      <div>
        <a href="/signup">
          <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl">Sign Up</button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
