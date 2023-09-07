import React from 'react'

export default function userCourseInfo({ l_id }){
  return (
    <div>lecture page-{l_id}</div>
  )
};

export const getServerSideProps = async (context) => {
    const { params } = context
    const { l_id } = params
    return { props: { l_id } }
  }
