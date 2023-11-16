import React from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const ExploreDropDown = ({ isOpen, setIsOpen }) => {
  return (
    <div className="absolute left-48 md:space-y-12">
      <button
        className="absolute bg-blue-600 hover:bg-blue-700 flex items-center w-32 h-10 shadow-xlr justify-between p-2 font-bold text-lg rounded-l-lg tracking-wider border-transparent border-4 duration-5 group active:text-white active:border-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Explore
        {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
      </button>
      {isOpen && (
        <div className="relative group-focus:block bg-white flex shadow-xl">
          <div className="column">
            <a href="#" className="hover:bg-blue-200 block p-3">
              <div className="font-semibold">Information Technology</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
            <a href="#" className="hover:bg-blue-200 block p-3">
              <div className="font-semibold">Science and Engineering</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
            <a href="#" className="hover:bg-blue-200 block p-3">
              <div className="font-semibold">Mathematics and Logic</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </div>
          <div className="column">
            <a href="#" className="hover:bg-blue-200 block p-3">
              <div className="font-semibold">Arts and Humanities</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
            <a href="#" className="hover:bg-blue-200 block p-3">
              <div className="font-semibold">Social Science</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
            <a href="#" className="hover:bg-blue-200 block p-3">
              <div className="font-semibold">Language Learning</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you are already using.
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreDropDown;
