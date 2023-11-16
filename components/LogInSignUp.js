import React from "react";

const LogInSignUp = () => {
  return (
    <div className="flex space-x-5">
      <div>
        <a href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl transform hover:scale-110 motion-reduce:transform-none">
            Log In
          </button>
        </a>
      </div>
      <div>
        <a href="/signup">
          <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white items-center w-20 h-10 rounded-lg shadow-xl transform hover:scale-110 motion-reduce:transform-none">
            Sign Up
          </button>
        </a>
      </div>
    </div>
  );
};

export default LogInSignUp;
