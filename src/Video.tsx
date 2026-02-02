import "./Video.css";

function Video() {
  return (
    <div className="video-page">
      <div className="video-container">
        <iframe
          className="video-player"
          src="https://www.youtube.com/embed/9XNkqxkcpA0?autoplay=1&playsinline=1"
          title="Video"
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default Video;
