import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/T_logo.png';
import {FaSearch} from 'react-icons/fa';
import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineCaretUp, AiOutlineCaretDown, AiOutlineShoppingCart, AiOutlineUser, AiOutlineCloseCircle} from 'react-icons/ai';
import secureLocalStorage from 'react-secure-storage';


const Navbar = () => {
  const searchDivRef = useRef();
  const cartRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const toggleCart = () => {
    if (cartRef.current.classList.contains('translate-x-full')) {
      cartRef.current.classList.remove('translate-x-full');
      cartRef.current.classList.add('translate-x-0');
    } else if (!cartRef.current.classList.contains('translate-x-full')) {
      cartRef.current.classList.remove('translate-x-0');
      cartRef.current.classList.add('translate-x-full');
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-200 to-slate-400 shadow-2xl z-20">
      <div className="flex h-full p-3 md:space-x-5 justify-between">
        <div className='absolute'>
          <Link href="/">
            <Image src={Logo} alt="Logo" height='50' priority={true}/>
          </Link>
        </div>
        <ExploreDropDown isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='w-2/5 md:space-y-12' ref={searchDivRef}>
          <SearchBar setResults={setResults} containerRef={searchDivRef} />
          <SearchResultsList results={results} />
        </div>
        <div className='flex space-x-5 pr-5'>
          <button onClick={toggleCart} className='cursor-pointer'> <AiOutlineShoppingCart className='text-4xl' /> </button>
          {
            !(secureLocalStorage.getItem('user_id')) && 
            <LogIn_SignUp />
          }
          {
            secureLocalStorage.getItem('user_id') &&
            <div className='space-x-5'>
              <button> <AiOutlineUser className='text-4xl' /></button>
            </div>
          }
        </div>
        <div ref={cartRef} className='sidebar absolute top-0 right-0 bg bg-emerald-500 p-10 transform transition-transform translate-x-full'>
          <h2 className='font-bold text-xl'>Cart</h2>
          <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer text-xl"><AiOutlineCloseCircle /></span>
          <ol>
            <li><span>course</span></li>
          </ol>
        </div>
      </div>
    </nav>
  );
};

function ExploreDropDown({isOpen, setIsOpen}) {
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

function SearchBar({setResults, containerRef}) {
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

function SearchResultsList({results}) {
  return (
    <div className='relative left-[308px] w-[495px] bg-white flex-col shadow-md max-h-80 overflow-auto'>
      {
        results.map((result, id) => {
          return (
            <Link href={`/courses/${result.title}`}>
              <div key={id} className='py-5 px-2 hover:bg-zinc-300 text-sky-600'>
                {result.title}
              </div>
            </Link>
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

function Cart() {
  <button> cart </button>;
}

export default Navbar;
