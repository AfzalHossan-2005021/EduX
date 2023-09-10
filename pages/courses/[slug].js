import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function course_page({ slug }) {
  const [Course, setCourse] = useState([])
  const router = useRouter();
  useEffect(() => {
    fetch('http://localhost:3000/api/selected_course', {
      method: 'POST',
      body: JSON.stringify({ slug }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((a) => {
      return a.json();
    }).then((parsed) => {
      setCourse(parsed[0]);
    });
  }, []);
  
  const enrollment = async (event) => {
    event.preventDefault();
    console.log(Course.c_id);
    const u_id = secureLocalStorage.getItem('u_id');
    const c_id= Course.c_id;
    const data = { u_id,c_id };
    console.log(data);
    let req = await fetch('http://localhost:3000/api/enrollment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    let res = await req.json()
    console.log(res);
    let { message, u_balance ,c_value } = res
    if(message=="Valid")
    {
      secureLocalStorage.setItem('u_balance', u_balance);
      secureLocalStorage.setItem('c_value', c_value);
      secureLocalStorage.setItem('c_id', c_id);
      router.replace('/payment')
    }
    else
    {
      toast.warn('You do not have sufficent balance', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    console.log();
  }
  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 mx-auto">
        <div className="lg:w-4/5 mx-auto flex-col">
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{Course.title}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">{Course.rating} Reviews</span>
                <span className="text-gray-600 ml-3">Instructor : {Course.name}</span>
              </span>
            </div>
            <p className="leading-relaxed text-xl">{Course.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            </div>
            
            <div className="flex">
              <button  type="submit" onClick={enrollment} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Enroll</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <ToastContainer/>
            
          </div>
        </div>
      </div>
    </section>
  </>;
};


export const getServerSideProps = async (context) => {
  const { params } = context
  const { slug } = params
  return { props: { slug } }
}