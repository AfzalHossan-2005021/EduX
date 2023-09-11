import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import VideoPlayer from '../../../../../components/VideoPlayer';

export default function LecturePage({ l_id }) {
  const router = useRouter();
  const s_id = secureLocalStorage.getItem('u_id');
  const { c_id, t_id } = router.query;
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/lecture_content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ s_id, c_id, t_id, l_id })
    }).then((res) => {
      return res.json();
    }).then((json_res) => {
      setDescription(json_res.description);
      setVideoUrl(json_res.video_link);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap w-full flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium underline title-font mt-10 text-gray-900">{description}</h1>
      </div>
      {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context
  const { l_id } = params
  return { props: { l_id } }
}