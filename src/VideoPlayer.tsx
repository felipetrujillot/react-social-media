import { useState, useEffect } from "react";

function VideoPlayer() {
  const [urlVideo, getUrlVideo] = useState([
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ]);

  useEffect(() => {
    function handleWheel(event) {
      if (event.deltaY > 0) {
        console.log("Scrolling down");
      } else if (event.deltaY < 0) {
        console.log("Scrolling up");
      }
    }
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div>
      {urlVideo.map((url, index) => (
        <video 
        width="400"
        height="800"
        className="cover rounded"
        key={index} 
        src={url} 
        controls 
       /*  autoPlay */
        muted
        />
      ))}
    </div>
  );
}

export default VideoPlayer;
