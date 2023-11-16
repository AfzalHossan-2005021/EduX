import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

export default function course_page({ c_id }) {
  const router = useRouter()
  const [Course, setCourse] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [inEnrolled, setInEnrolled] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/api/selected_course', {
      method: 'POST',
      body: JSON.stringify({ c_id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((a) => {
      return a.json();
    }).then((parsed) => {
      setCourse(parsed[0]);
    });
    if (secureLocalStorage.getItem('u_id')) {
      setIsLoggedIn(true);
      fetch('http://localhost:3000/api/is_enrolled', {
        method: 'POST',
        body: JSON.stringify({ u_id: secureLocalStorage.getItem('u_id'), c_id }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((a) => {
        return a.json();
      }).then((parsed) => {
        if (parsed.is_enrolled == 1) {
          setInEnrolled(true);
        }
      })
    }
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    const u_id = secureLocalStorage.getItem('u_id');
    let req = await fetch('http://localhost:3000/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ u_id, c_id: Course.c_id })
    })
    let res = await req.json()
    let { code } = res
    if (code == 1) {
      router.push(`/user/courses/${Course.c_id}`)
    }
  }

  const addToWishlist = async (event) => {
    event.preventDefault();
    const u_id = secureLocalStorage.getItem('u_id');
    let req = await fetch('http://localhost:3000/api/add_to_wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ u_id, c_id })
    })
    let res = await req.json()
    let { code } = res
    if (code == 1) {
      router.reload()
    }
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

            {isLoggedIn && inEnrolled &&
            <a href={`/user/courses/${c_id}`}>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Go To Course</button>
            </a>
            }{isLoggedIn && !inEnrolled &&
              <div className="flex">
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleClick}>Enroll</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" onClick={addToWishlist}>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  </>
};


export const getServerSideProps = async (context) => {
  const { params } = context
  const { c_id } = params
  return { props: { c_id } }
}