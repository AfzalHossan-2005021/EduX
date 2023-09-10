import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

export default function instructor_signup({ isLoggedIn, setIsLoggedIn }) {
  let router = useRouter()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_Password] = useState("");
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    if (!name || !email || !password || !conf_password || !subject) {
      setError("All fields are necessary");
      setIsErrorOccured(true)
    }
    else if (password != conf_password) {
      setError("Confirmation password doesn't match");
      setIsErrorOccured(true)
    }
    else {
      event.preventDefault();
      const data = { name, email, password, subject };
      let req = await fetch('http://localhost:3000/api/instructor_signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      let res = await req.json()
      let { u_id } = res
      if (u_id != -1) {
        setIsLoggedIn(true)
        secureLocalStorage.setItem('u_id', u_id);
        secureLocalStorage.setItem('u_email', email);
        secureLocalStorage.setItem('u_name', name);
        router.replace('/instructor')
      }
      else {
        setIsErrorOccured(true)
        setError('User already exists')
        setName('')
        setEmail('')
        setSubject('')
        setPassword('')
        setConf_Password('')
      }
    }
  }

  useEffect(() => {
    let handler = () => {
      if (isErrorOccured) {
        setIsErrorOccured(false);
      }
    };
    document.addEventListener("mousedown", handler);
    if (isLoggedIn) {
      router.replace('/instructor')
    }
  });

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-900'>
      <div className='relative w-[380px] h-[570px] bg-gray-800 rounded-tr-3xl rounded-bl-3xl overflow-hidden'>
        <div className='absolute w-[380px] h-[650px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right'></div>
        <div className='absolute w-[380px] h-[650px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right'></div>
        <div className='absolute inset-1 bg-gray-800 rounded-tr-3xl rounded-bl-3xl z-10 p-5'>
          <form className='flex-col space-y-8'>
            <h2 className='text-xl font-semibold text-lime-500 text-center'>Sign up as an instructor</h2>
            {
              isErrorOccured && (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span class="block sm:inline">{error}</span>
                </div>
              )
            }
            <div className='relative flex flex-col'>
              <input type='text' required value={name} onChange={(e) => setName(e.target.value)} autoFocus placeholder='' className='relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer' />
              <i className='bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]' />
              <label className='peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8'>Enter Name</label>
            </div>
            <div className='relative flex flex-col'>
              <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus placeholder='' className='relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer' />
              <i className='bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]' />
              <label className='peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8'>Enter Email</label>
            </div>
            <div className='relative flex flex-col'>
              <input type='email' required value={subject} onChange={(e) => setSubject(e.target.value)} autoFocus placeholder='' className='relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer' />
              <i className='bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]' />
              <label className='peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8'>Enter Subject</label>
            </div>
            <div className='relative flex flex-col'>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoFocus placeholder='' className='relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer' />
              <i className='bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]' />
              <label className='peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8'>Enter Password</label>
            </div>
            <div className='relative flex flex-col'>
              <input type="password" required value={conf_password} onChange={(e) => setConf_Password(e.target.value)} autoFocus placeholder='' className='relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer' />
              <i className='bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]' />
              <label className='peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8'>Confirm Password</label>
            </div>
            <div className='flex justify-center'>
              <button className="border-solid border-lime-500 border-2 hover:bg-lime-500 rounded-md px-10 py-1.5 tracking-widest font-semibold text-white items-center" type="submit" onClick={handleSubmit}>Sign up</button>
            </div>
            <div>
             <h7 className='text-l font-semibold text-lime-500 text-center'>Signup as a student <Link href='/signup'><u>Signup</u></Link></h7>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}