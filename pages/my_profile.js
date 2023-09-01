import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';




export default function My_Profile() {
  return (
    <main>
      <div className='flex-col'>
        <Head>
          <title>EduX</title>
        </Head>
        <div className='flex-col'>
          <div className='parent'>
            <div className="container"><h1 className="text-3xl font-bold underline">Welcome to EduX</h1></div>
            <div className="container"><h3>Explore and unlock your potential with EduX</h3></div>
            <div><h1>aaa</h1></div>
            
          </div>
          
        </div>
      </div>
    </main>
  );
}
