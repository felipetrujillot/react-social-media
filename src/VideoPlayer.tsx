import { useState, useEffect } from "react";

export default function VideoPlayer() {
  const [urlVideo, getUrlVideo] = useState([
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
      <div
        className="container p-5 h500px bg-dark justify-content-center d-flex"
      >

        <div>

            {urlVideo.map((url, index) => (

            <div className='videoWrapper'>
              <video
                className="cover rounded videoClass pb-5"
                key={index}
                src={url}
                controls
                /*  autoPlay */
                muted
              />
            </div>
            ))}
          </div>
      </div>
    </div>
  );
}
