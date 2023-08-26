import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export default function My_Profile() {
  return (
    <main>
      <div>
        <Head>
          <title>EduX</title>
        </Head>
        <Navbar/>
          <div className='parent'>
           <h1>mvlkdfsl</h1>
          </div>
        <Footer/>
      </div>
    </main>
  );
}
