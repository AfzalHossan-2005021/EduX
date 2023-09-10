import React from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';

const payment = () => {
    const router = useRouter();
    const balance =secureLocalStorage.getItem('u_balance');
    const value=  secureLocalStorage.getItem('c_value');
    const sbalance= toString();
    const pay = async (event) => {
        event.preventDefault();
        console.log(balance, value);
        const u_id = secureLocalStorage.getItem('u_id');
        const c_id= secureLocalStorage.getItem('c_id');
        const user_balance =secureLocalStorage.getItem('u_balance');
        const course_value=secureLocalStorage.getItem('c_value');
        const data = { u_id , c_id, user_balance, course_value};
        console.log(data);
        let req = await fetch('http://localhost:3000/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
    })
    let res = await req.json()
    console.log(res);
    router.replace('/user');
    }
    const back = () => {
        console.log('back');
        router.replace('/user');
    }

    /*
    <h2 className='text-xl font-semibold text-lime-500 text-center'>your balance {balance}</h2>
            <h2 className='text-xl font-semibold text-lime-500 text-center'>Course fee {value}</h2>
            <h2 className='text-xl font-semibold text-lime-500 text-center'>your new balance {balance-value}</h2>
    */
  return (
    <div>
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-900'>
      <div className='relative w-[380px] h-[320px] bg-gray-800 rounded-tr-3xl rounded-bl-3xl overflow-hidden'>
        <div className='absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right'></div>
        <div className='absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right'></div>
        <div className='absolute inset-1 bg-gray-800 rounded-tr-3xl rounded-bl-3xl z-10 p-5'>
        
          <form className='flex-col space-y-8'>
            <h2 className='text-xl font-semibold text-lime-500 text-center'>your balance </h2>
            <h2 className='text-xl font-semibold text-lime-500 text-center'>Course fee </h2>
            <h2 className='text-xl font-semibold text-lime-500 text-center'>your new balance </h2>
            <div className='flex justify-center'>
              <button type="submit" onClick={pay} className="border-solid border-lime-500 border-2 hover:bg-lime-500 rounded-md px-10 py-1.5 tracking-widest font-semibold text-white items-center">Confirm payment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default payment;
