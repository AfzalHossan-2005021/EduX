import { useState } from 'react';

const RateCourse = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [rating, setRating] = useState(0); // Initialize with a default rating value
  const [review, setReview] = useState('');

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleRatingChange = (event) => {
    // Handle rating input change here
    const newRating = parseInt(event.target.value);
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    // Handle review input change here
    setReview(event.target.value);
  };

  const submitRating = () => {
    // Handle submission of rating and review data here
    console.log('Rating:', rating);
    console.log('Review:', review);
    // You can send this data to your backend or perform any desired actions
    // Reset the form or hide the div after submission, if needed
    setIsDivVisible(false);
  };

  return (
    <div>
      <button
        onClick={toggleDivVisibility}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Rate the Course
      </button>

      {isDivVisible && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <p>Rate the course:</p>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  onChange={handleRatingChange}
                />
                <span className="ml-1">★</span>
              </label>
            ))}
          </div>
          <textarea
            className="mt-2 p-2 w-full border rounded"
            placeholder="Write a review..."
            value={review}
            onChange={handleReviewChange}
          ></textarea>
          <button
            onClick={submitRating}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default RateCourse;
