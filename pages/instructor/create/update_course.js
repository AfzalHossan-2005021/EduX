import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

export default function update_course() {
  
    
    
  
  return (
    <div>
      <div className='w-full min-h-screen flex justify-center items-center bg-gray-900'>
        <div className='relative w-[600px] h-[360px] bg-gray-800 rounded-tr-3xl rounded-bl-3xl overflow-hidden'>
          <div className='absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right'></div>
          <div className='absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right'></div>
          <div className='absolute inset-1 bg-gray-800 rounded-tr-3xl rounded-bl-3xl z-10 p-5'>
            <form className='flex-col space-y-8'>
              <h2 className='text-xl font-semibold text-lime-500 text-center'>update</h2>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}