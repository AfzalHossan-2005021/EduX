import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import { BiRightArrow, BiDownArrow } from 'react-icons/bi';
import { MdOutlineTopic, MdOutlineQuiz } from 'react-icons/md';
import Link from 'next/link';

export default function userCourseInfo({ c_id }) {

  const [content, setContent] = useState([]);
  const u_id = secureLocalStorage.getItem('u_id');

  useEffect(() => {
    fetch('http://localhost:3000/api/user_course_content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ u_id, c_id })
    }).then((res) => {
      return res.json();
    }).then((json_res) => {
      setContent([]);
      for (let i = 0; i < json_res[0].length; i++) {
        const topic_content = [json_res[0][i], json_res[i + 1], json_res[json_res[0].length + i + 1]];
        setContent(content => [...content, topic_content]);
      }
    });
  }, []);

  const [isVisible, setIsVisible] = useState(Array(content.length).fill(false));

  const toggleVisibility = (index) => {
    const updatedVisibility = [...isVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsVisible(updatedVisibility);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='border border-gray-400 w-1/2 m-10 rounded-lg p-5'>
        {
          content.map((element, index) => {
            return <div className="p-2" key={index}>
              <div onClick={() => toggleVisibility(index)} className={(isVisible[index] ? 'border-b-2 border-blue-600' : 'border-2 border-white hover:border-2 hover:border-blue-600') + ' px-5 py-3 space-x-5 flex items-center w-full hover:bg-sky-100 overflow-hidden'}>
                <div>
                  {!isVisible[index] && <BiRightArrow />}
                  {isVisible[index] && <BiDownArrow />}
                </div>
                <div>
                  <h2 className="text-xl text-gray-900 font-bold title-font">{element[0].name} </h2>
                </div>
              </div>
              <div className={isVisible[index] ? '' : 'hidden'}>
                {
                  element[1].map((sub_element) => {
                    return <Link href={`/user/courses/topic/${sub_element.l_id}`}><div className="px-10 py-3 space-x-5 flex items-center w-full border-none hover:bg-sky-100 overflow-hidden">
                      <div><MdOutlineTopic /></div>
                      <div>
                        <h2 className="text-lg text-gray-900 font-normal title-font">{sub_element.description} </h2>
                      </div>
                    </div>
                    </Link>
                  })
                }
                <div className="px-10 py-3 space-x-5 flex items-center w-full border-none hover:bg-sky-100 overflow-hidden">
                  <div><MdOutlineQuiz /></div>
                  <div className='flex items-center justify-between '>
                    <div>
                      <h2 className="text-lg text-gray-900 font-normal title-font"> Quiz {element[2][0].e_id} </h2>
                    </div>
                    <div className='right-0'>
                      <h2 className="text-lg text-gray-900 font-normal title-font right-0"> Quiz {element[2][0].e_id} </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>;
          })
        }
      </div>
    </div>
  )
};

export const getServerSideProps = async (context) => {
  const { params } = context
  const { c_id } = params
  return { props: { c_id } }
}