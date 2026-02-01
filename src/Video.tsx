import "./Video.css";
import videoSrc from "./assets/video.mp4";

function Video() {
  return (
    <div className="video-page">
      <div className="video-container">
        <video controls autoPlay className="video-player">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Video;
