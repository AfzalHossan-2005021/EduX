import React, { useState } from 'react';
import VideoPlayer from '../../../../../components/VideoPlayer';

const CoursePage = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

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

export default CoursePage;

