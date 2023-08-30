
import DatePicker from '@/components/DatePicker';
import React from 'react';

const Home = () => {
  return (
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Error:</strong>
  <span class="block sm:inline">There was a problem signing up.</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <title>Close</title>
      <path d="M14.348 5.652a1 1 0 011.414 0l2 2a1 1 0 11-1.414 1.414L14 7.414l-2 2a1 1 0 11-1.414-1.414l2-2a1 1 0 011.414 0zM5.652 5.652a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L6 7.414l2 2a1 1 0 001.414-1.414l-2-2a1 1 0 00-1.414 0z"/>
    </svg>
  </span>
</div>

  );
};

export default Home;
