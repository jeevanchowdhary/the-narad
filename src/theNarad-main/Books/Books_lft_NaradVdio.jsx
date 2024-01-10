import React from "react";
import videoFile from "../Books/naradVideo.mp4";
import "./booksVideo.css";
const VideoPlayer = () => {
    return (
        <div>
            <video controls width="100%" height="650" loop>
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
