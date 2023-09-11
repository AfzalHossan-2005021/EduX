import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

export default function create_course() {
  const router = useRouter();

  const [titlee, setTitlee] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(" ");
  const [isErrorOccured, setIsErrorOccured] = useState(false);

  const creates = async (event) => {
    event.preventDefault();
    if (titlee=='' || description=='') {
      setError("All fields are necessary");
      setIsErrorOccured(true);
    }
    else {
      event.preventDefault();
      const u_id = secureLocalStorage.getItem('u_id');
      console.log(titlee);
      const data = {u_id, titlee, description };
      console.log(data,'basdjash');
      let req = await fetch('http://localhost:3000/api/create_courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      let res = await req.json()
      let { message} = res
      if (message == "Valid") {
      router.replace('/instructor');}
      else {
        setIsErrorOccured(true)
        setError(message)
        setTitlee('')
        setDescription('')
      }
    }
  }
  
  return (
    <div>
      <div className='w-full min-h-screen flex justify-center items-center bg-gray-900'>
        <div className='relative w-[600px] h-[360px] bg-gray-800 rounded-tr-3xl rounded-bl-3xl overflow-hidden'>
          <div className='absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right'></div>
          <div className='absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right'></div>
          <div className='absolute inset-1 bg-gray-800 rounded-tr-3xl rounded-bl-3xl z-10 p-5'>
            <form className='flex-col space-y-8'>
              <h2 className='text-xl font-semibold text-lime-500 text-center'>Create Course</h2>
              {
                isErrorOccured && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )
              }
              <div className='relative flex flex-col'>
                <input type="text" required value={titlee} onChange={(e) => setTitlee(e.target.value)} autoFocus placeholder='' className='relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer' />
                <i className='bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]' />
                <label className='peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8'>Enter Title</label>
              </div>
              <div className='relative flex flex-col'>
                <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} autoFocus placeholder='' className='relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer' />
                <i className='bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]' />
                <label className='peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8'>Enter Description</label>
              </div>
              <div className='flex justify-center'>
                <button type="submit" onClick={creates} className="border-solid border-lime-500 border-2 hover:bg-lime-500 rounded-md px-10 py-1.5 tracking-widest font-semibold text-white items-center">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}