import React from 'react';
import Image from 'next/image';
import ProfilePic from '../public/profile_pic.jpg';
import secureLocalStorage from 'react-secure-storage';

const user = () => {
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
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Name</span>
                  <span class="ml-auto text-gray-900">Blue</span>
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Email</span>
                  <span class="ml-auto text-gray-900">Medium</span>
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Date of Birth</span>
                  <span class="ml-auto text-gray-900">4</span>
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Gender</span>
                  <span class="ml-auto text-gray-900">4</span>
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Course Taken</span>
                  <span class="ml-auto text-gray-900">4</span>
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Course Completed</span>
                  <span class="ml-auto text-gray-900">4</span>
                </div>
                <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span class="text-gray-500">course in Progress</span>
                  <span class="ml-auto text-gray-900">4</span>
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
                <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Company</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
};

export default user;
