import { useState, useEffect, useRef } from "react";

export default function VideoPlayer() {
  const [urlVideo, getUrlVideo] = useState([
    {
      id: 1,
      nombre: "test",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      nombre: "test",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 3,
      nombre: "test",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ]);
  const [indexVideo, setIndexVideo] = useState(0);
  const listRef = useRef(null);

  const handleScrollUp = () => {
    if (indexVideo > 0){
      setIndexVideo(indexVideo - 1);
    } 
  };
  const handleScrollDown = () => {
    if (indexVideo >= 0){
      setIndexVideo(indexVideo + 1);
    } 
  };

  useEffect(() => {
    const handleWheel = (event: any) => {
      if (event.deltaY > 0) {
        //down
        handleScrollDown();
      } else if (event.deltaY < 0) {
        //up
        handleScrollUp();
      }
    };
    window.addEventListener("wheel", handleWheel);

    if (listRef.current) {

      if(indexVideo >= 0){
        listRef.current.style.transform = `translateY(-${indexVideo * 93}vh)`;
      }
      
    }
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [indexVideo]);

  return (
    <div>
      {/*   <button onClick={handleScrollUp}>Up</button>
      <button onClick={handleScrollDown}>Down</button> */}
      <div className="p-5 h500px bg-dark justify-content-center d-flex ">
        <div className="animationScroll" ref={listRef}>
          {urlVideo.map((url, index) => (
            <div className="d-flex" key={index}>
              <div className="videoWrapper">
                <video
                  className="cover rounded videoClass pb-5"
                  key={index}
                  src={url.url}
                  controls
                  /*  autoPlay */
                  muted
                  typeof="video/mp4"
                />
                <div className="video-overlay">
                  <h2 className="video-title">My Video Title</h2>
                  <p className="video-subtitle">My Video Subtitle</p>
                </div>
              </div>
              <div className="ms-3">
                <div className="mb-2">
                  <button className="btn btn-secondary p-3 rounded">
                    <i className="bi bi-hand-thumbs-up-fill text-white"></i>
                  </button>
                </div>
                <div className="mb-2">
                  <button className="btn btn-secondary p-3 rounded">
                    <i className="bi bi-hand-thumbs-down-fill text-white"></i>
                  </button>
                </div>
                <div className="mb-2">
                  <button className="btn btn-secondary p-3 rounded">
                    <i className="bi bi-chat-right-dots-fill text-white"></i>
                  </button>
                </div>
                <div className="mb-2">
                  <button className="btn btn-secondary p-3 rounded">
                    <i className="bi bi-share-fill text-white"></i>
                  </button>
                </div>
                <div className="mb-2">
                  <button className="btn btn-secondary p-3 rounded">
                    <i className="bi bi-three-dots text-white"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
