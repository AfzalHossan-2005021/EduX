import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {
  const opts = {
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // Set to 1 if you want the video to autoplay
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default VideoPlayer;