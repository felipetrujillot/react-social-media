import { useState, useEffect, useRef } from "react";
import axios from "axios";

type resVideo = {};
export default function VideoPlayer() {
  const [indexVideo, setIndexVideo] = useState(0);

  const listRef = useRef(null);
  const [urlVideo, getUrlVideo] = useState([
    {
      id: 1,
      name: "test",
      description: "description example",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      username: "usuario",
      isPlaying : true,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 2,
      name: "test",
      description: "description example",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      username: "usuario",
      isPlaying : false,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 3,
      name: "test",
      description: "description example",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      username: "usuario",
      isPlaying : false,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 4,
      name: "test",
      description: "description example",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      username: "usuario",
      isPlaying : false,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 5,
      name: "test",
      description: "description example",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      username: "usuario",
      isPlaying : false,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
  ]);

  /**
   * Obtiene vídeos aleatorios de la api
   */
  const getVideos = async () => {
    await axios
      .get("/images")
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleScrollUp = () => {
    if (indexVideo > 0) {
      urlVideo[indexVideo].isPlaying = false
      setIndexVideo(indexVideo - 1);
      urlVideo[indexVideo - 1].isPlaying = true
    }
  };
  const handleScrollDown = () => {
    if (indexVideo >= 0 && urlVideo.length > indexVideo + 1) {
      urlVideo[indexVideo].isPlaying = false
      setIndexVideo(indexVideo + 1);
      urlVideo[indexVideo + 1].isPlaying = true
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
    if (listRef.current && indexVideo >= 0) {
      listRef.current.style.transform = `translateY(-${indexVideo * 93}vh)`;
    }
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [indexVideo]);

  return (
    <div>
      <div className="p-5 h500px bg-dark justify-content-center d-flex ">
        <div className="animationScroll" ref={listRef}>
          {urlVideo.map((url, index) => (
            <div className="d-flex" key={url.id}>
              <div className="videoWrapper">
                {url.isPlaying ? (
                  <video
                    className="cover rounded videoClass pb-5"
                    /*poster="https://images.pexels.com/photos/6381851/pexels-photo-6381851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/
                    key={index}
                    src={url.url}
                    id={"videoId"}
                    muted
                    autoPlay
                    typeof="video/mp4"
                  />
                ) : (
                  <img
                    className="rounded videoClass pb-5"
                    style={{ objectFit: "cover" }}
                    src="https://images.pexels.com/photos/6381851/pexels-photo-6381851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                )}

                <div className="video-overlay text-start">
                  <div className="w-100 text-start p-3">
                    <h3>{url.name}</h3>
                    <p>{url.description}</p>
                    <div className="d-flex">
                      <div>
                        <img
                          src={url.avatar}
                          height={50}
                          width={50}
                          className="avatar"
                        />
                      </div>
                      <div>
                        <p className="pt-2 ps-2 fw-b">@{url.username}</p>
                      </div>

                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => playContent()}
                        >
                          play
                        </button>
                      </div>
                    </div>
                  </div>
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
