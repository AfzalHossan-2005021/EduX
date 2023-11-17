import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

export const getServerSideProps = async (context) => {
  const { params } = context
  const { e_id } = params
  return { props: { e_id } }
}

export default function userCourseInfo({ e_id }) {
  const router = useRouter();
  const s_id = secureLocalStorage.getItem('u_id');
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(new Array(5).fill(null));

  useEffect(() => {
    fetch('http://localhost:3000/api/exam_questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ e_id })
    }).then((res) => {
      return res.json();
    }).then((json_res) => {
      setQuestions(json_res);
    });
  }, []);

  const handleOptionSelect = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedOptions[i] == questions[i].right_ans) {
        newScore += questions[i].marks;
      }
    }
    fetch('http://localhost:3000/api/update_mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ s_id, e_id, score: newScore })
    }).then(() => {
      router.replace(`/user/courses/topic/exam/result/${e_id}`)
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">MCQ Quiz</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Question {question.serial}</h2>
          <p className="mb-2">{question.q_description}</p>
          <ul>
            {['opt1', 'opt2', 'opt3', 'opt4'].map((optionKey, optionIndex) => (
              <li
                key={optionIndex}
                className={`mb-2 flex items-center cursor-pointer`}
              >
                <input
                  type="radio"
                  id={`q${index}_option${optionIndex}`}
                  name={`q${index}`}
                  value={question[optionKey]}
                  checked={selectedOptions[index] == optionIndex+1}
                  onChange={() => handleOptionSelect(index, optionIndex+1)}
                  className="mr-2"
                />
                <label htmlFor={`q${index}_option${optionIndex}`}>{question[optionKey]}</label>
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
    </div>
  );
}