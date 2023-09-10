import { useRouter } from 'next/router';
import React, { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import VideoPlayer from '../../../../../components/VideoPlayer';

export default function LecturePage({ l_id }) {
  const router = useRouter();
  const u_id = secureLocalStorage.getItem('u_id');
  const { c_id , t_id} = router.query;
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  console.log(u_id);
  console.log(c_id);
  console.log(t_id);
  console.log(l_id);
  return (
    <div>
      <h1>Online Course</h1>
      <input
        type="text"
        placeholder="Enter YouTube Video URL"
        value={videoUrl}
        onChange={handleVideoUrlChange}
      />
      {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context
  const { l_id } = params
  return { props: { l_id } }
}