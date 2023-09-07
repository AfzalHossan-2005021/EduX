import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
    const getYouTubeVideoId = (url) => {
        const match = url.match(/[?&]v=([^?&]+)/);
        return match && match[1];
    };

    const videoId = getYouTubeVideoId(videoUrl);

    const aspectRatio = 9 / 16;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const playerWidth = screenWidth * 0.5;
    const playerHeight = playerWidth * aspectRatio;

    return (
        <div className="video-player">
            <iframe
                width={`${playerWidth}px`}
                height={`${playerHeight}px`}
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                title="YouTube Video Player"
            ></iframe>
        </div>
    );
};

export default VideoPlayer;