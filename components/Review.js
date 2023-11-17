import React from "react";

const Review = ({ reviewerName, rating, comment, date }) => (
  <div className="mb-8 p-4 border rounded-md shadow-md">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-semibold">{reviewerName}</h3>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      <div className="flex items-center">
        {/* Display stars based on the rating */}
        {Array.from({ length: rating }).map((_, index) => (
          <svg
            key={index}
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-yellow-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ))}
        <span className="text-gray-600 ml-2">{rating}</span>
      </div>
    </div>
    <p className="text-gray-700">{comment}</p>
  </div>
);

export default Review;
