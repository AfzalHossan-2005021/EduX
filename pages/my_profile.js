import Head from 'next/head';
import secureLocalStorage from 'react-secure-storage';
import { useState,useEffect } from 'react';

export default function My_Profile() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const storedData = secureLocalStorage.getItem('u_id');
    if (storedData) {
      setData(storedData);
    }
    else
    console.log("no data")
  }, []);z
  console.log(data,"fksjadbfhbasjd");
  return (
    <main>
      <div className='flex-col'>
        <Head>
          <title>EduX</title>
        </Head>
          <div className='parent'>
           <h1>My_Profile</h1>
           secureLocalStorage.getItem("u_id")
          </div>
      </div>
    </main>
  );
}
