import Image from 'next/image';
import React, { useEffect } from 'react';
import ProfilePic from '../public/profile_pic.jpg';
import secureLocalStorage from 'react-secure-storage';

const user = () => {
  const u_id = secureLocalStorage.getItem('u_id');
  let userInfo;
  useEffect(() => {
    fetch('http://localhost:3000/api/user_info',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ u_id })
    }).then((res) => {
      return res.json();
    }).then((json_res) => {
      userInfo = json_res[0];
      document.getElementById('name').innerHTML = userInfo.name;
      document.getElementById('email').innerHTML = userInfo.email;
      document.getElementById('dob').innerHTML = userInfo.date_of_birth;
      if(userInfo.gender == 'M')
        document.getElementById('gender').innerHTML = 'Male';
      else
        document.getElementById('gender').innerHTML = 'Female';
      document.getElementById('course_count').innerHTML = userInfo.course_count;
      document.getElementById('reg_date').innerHTML = userInfo.reg_date;
    });
  }, []);

  return (
    <div className='h-full w-full'>
      <section className="text-gray-600">
        <div className="container mx-auto flex flex-col">
          <div>
            <div className="flex flex-col px-28 sm:flex-row mt-10">
              <div className="sm:w-2/5 text-center sm:pr-16 sm:py-8 sm:pb-16">
                <Image src={ProfilePic} alt='profile picture' priority='true'></Image>
              </div>
              <div className="sm:w-2/3 sm:px-24 sm:py-8 sm:pt-16 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Name</span>
                  <span className="ml-auto text-gray-900"><p id='name'></p></span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Email</span>
                  <span className="ml-auto text-gray-900"><p id='email'></p></span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Date of Birth</span>
                  <span className="ml-auto text-gray-900"><p id='dob'></p></span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Gender</span>
                  <span className="ml-auto text-gray-900"><p id='gender'></p></span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Course Taken</span>
                  <span className="ml-auto text-gray-900"><p id='course_count'></p></span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500">Registration date</span>
                  <span className="ml-auto text-gray-900"><p id='reg_date'></p></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">In progress</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Completed</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default user;
