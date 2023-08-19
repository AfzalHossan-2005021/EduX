import React, { useEffect, useState } from 'react';
import Head from 'next/head'


export default function Home() {
  const [Courses, setCourses] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/top_rated_courses').then((a) => {
      return a.json();
    }).then((parsed) => {
      setCourses(parsed);
    })
  }, []);


  return (
    <main>
      <div>
        <Head>
          <title>EduX</title>
        </Head>
      </div>
      <div>
        <div><h1>Welcome to EduX</h1></div>
        <div><h1>Most popular courses</h1></div>
        {Courses.map((course) => {
          return <div>
            <a>
              <h2>Course ID : {course.c_id}</h2>
              <p>Title: {course.title}</p>
              <p>Rating : {course.rating}</p>
              <p>Rank : {course.rank}</p>
            </a>
          </div>
        })}
      </div>

    </main>
  )
}