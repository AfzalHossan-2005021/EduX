import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import { BiRightArrow } from 'react-icons/bi';

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
              <div onClick={() => toggleVisibility(index)} className="px-5 py-3 space-x-5 flex items-center w-full border-none hover:border hover:border-gray-400 rounded-lg  hover:bg-blue-100 overflow-hidden">
                <div><BiRightArrow /></div>
                <div>
                  <h2 className="text-lg text-gray-900 font-medium title-font">{element[0].name} </h2>
                </div>
              </div>
              <div className={isVisible[index] ? '' : 'hidden'}>
                {
                  element[1].map((sub_element) => {
                    return <div className="px-5 py-3 space-x-5 flex items-center w-full border-none hover:border hover:border-gray-400 rounded-lg  hover:bg-blue-100 overflow-hidden">
                      <div><BiRightArrow /></div>
                      <div>
                        <h2 className="text-lg text-gray-900 font-medium title-font">{sub_element.description} </h2>
                      </div>
                    </div>
                  })
                }
                <div className="px-5 py-3 space-x-5 flex items-center w-full border-none hover:border hover:border-gray-400 rounded-lg  hover:bg-blue-100 overflow-hidden">
                  <div><BiRightArrow /></div>
                  <div>
                    <h2 className="text-lg text-gray-900 font-medium title-font"> Quiz {element[2][0].e_id} </h2>
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