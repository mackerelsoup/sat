import "./Video.css";

function Video() {
  return (
    <div className="video-page">
      <div className="video-container">
        <iframe
          className="video-player"
          src="https://player.cloudinary.com/embed/?cloud_name=dtceiqtbp&public_id=20260201_001502_pzhdhh&autoplay=true"
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
