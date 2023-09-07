import React from 'react'
import { useState } from 'react';

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Madrid', 'Paris'],
        correctAnswer: 'Paris',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
    },
    // Add more questions here
];

export default function userCourseInfo({ e_id }) {

    const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(null));
    const [score, setScore] = useState(0);

    const handleOptionSelect = (questionIndex, option) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[questionIndex] = option;
        setSelectedOptions(updatedOptions);
    };

    const handleSubmit = () => {
        // Calculate the score
        let newScore = 0;
        for (let i = 0; i < questions.length; i++) {
            if (selectedOptions[i] === questions[i].correctAnswer) {
                newScore++;
            }
        }
        setScore(newScore);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">MCQ Quiz</h1>
            {questions.map((question, index) => (
                <div key={index} className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Question {index + 1}</h2>
                    <p className="mb-2">{question.question}</p>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li
                                key={optionIndex}
                                onClick={() => handleOptionSelect(index, option)}
                                className={`bg-gray-100 rounded-lg p-2 mb-2 cursor-pointer hover:bg-blue-100 ${selectedOptions[index] === option ? 'bg-blue-200' : ''
                                    }`}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Submit
            </button>
            {score !== null && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Your Score: {score} out of {questions.length}</h2>
                </div>
            )}
        </div>
    );
}


export const getServerSideProps = async (context) => {
    const { params } = context
    const { e_id } = params
    return { props: { e_id } }
}