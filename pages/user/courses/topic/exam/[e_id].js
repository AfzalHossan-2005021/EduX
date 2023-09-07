import React from 'react'

export default function userCourseInfo({ e_id }){
  return (
    <div>lecture page-{e_id}</div>
  )
};

export const getServerSideProps = async (context) => {
    const { params } = context
    const { e_id } = params
    return { props: { e_id } }
  }
