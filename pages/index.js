import React, { useEffect, useState } from 'react';
import Head from 'next/head'

export default function Home() {
  const [Courses, setCourses] = useState([])
  const [PopularCourses, setPopularCourses] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/top_rated_courses').then((a) => {
      return a.json();
    }).then((parsed) => {
      setCourses(parsed);
    })
    fetch('http://localhost:3000/api/popular_courses').then((a) => {
      return a.json();
    }).then((parsed) => {
      setPopularCourses(parsed);
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
        <div class='parent'>
          <div class="container"><h1>Welcome to EduX</h1></div>
          <div class="container"><h3>Explore and unlock your potential with EduX</h3></div>
          <div><h1>Top rated courses</h1></div>
          {Courses.map((course) => {
            return <div class='child inline-block-child'>
              <h2>Course ID : {course.c_id}</h2>
              <p>Title: {course.title}</p>
              <p>Rating : {course.rating}</p>
              <p>Rank : {course.rank}</p>
            </div>
          })}
        </div>
        <div class='parent'>
          <div><h1>Most Popular courses</h1></div>
          {PopularCourses.map((course) => {
            return <div class='child inline-block-child'>
              <h2>Course ID : {course.c_id}</h2>
              <p>Title: {course.title}</p>
              <p>Enroll : {course.student_count} students</p>
              <p>Rank : {course.rank}</p>
            </div>
          })}
        </div>
      </div>
    </main>
  )
}