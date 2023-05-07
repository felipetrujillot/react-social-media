import { useState, useEffect, useRef } from "react";
import axios from "axios";

type resVideo = {};
export default function VideoPlayer() {
  const [indexVideo, setIndexVideo] = useState(0);
  const listRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [urlVideo, getUrlVideo] = useState([
    {
      id: 1,
      name: "test",
      description: "description example",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail:
        "https://images.pexels.com/photos/6381851/pexels-photo-6381851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "usuario1",
      isPlaying: true,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 2,
      name: "test",
      description: "description example",
      url: "https://www.javatpoint.com/oprweb/movie.mp4",
      thumbnail:
        "https://images.pexels.com/photos/12335881/pexels-photo-12335881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "tete",
      isPlaying: false,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 3,
      name: "test",
      description: "description example",
      url: "https://www.w3docs.com/build/videos/arcnet.io(7-sec).mp4",
      thumbnail:
        "https://images.pexels.com/photos/10487467/pexels-photo-10487467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "usuario",
      isPlaying: false,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 4,
      name: "test",
      description: "description example",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      thumbnail:
        "https://images.pexels.com/photos/11542850/pexels-photo-11542850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "usuario",
      isPlaying: false,
      avatar:
        "https://yt3.ggpht.com/yti/AHyvSCBD5sw66_mpeb96OzZ_vzwlHJ0K-c3xkpG1wxIBDA=s88-c-k-c0x00ffffff-no-rj-mo",
    },
    {
      id: 5,
      name: "test",
      description: "description example",
      url: "https://ia600208.us.archive.org/4/items/Popeye_forPresident/Popeye_forPresident_512kb.mp4",
      thumbnail:
        "https://images.pexels.com/photos/10487575/pexels-photo-10487575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "usuario",
      isPlaying: false,
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

  function toggleMute(id: number) {
    const video = document.getElementById("videoId" + id);
    if (video != null) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  }

  function togglePause(id: number) {
    const video = document.getElementById("videoId" + id);
    setIsPaused(!isPaused);
    return isPaused ? video.play() : video.pause();
  }

  const handleScrollUp = () => {
    if (indexVideo > 0) {
      urlVideo[indexVideo].isPlaying = false;
      setIndexVideo(indexVideo - 1);
      urlVideo[indexVideo - 1].isPlaying = true;
      setIsPaused(false)
    }
  };
  const handleScrollDown = () => {
    if (indexVideo >= 0 && urlVideo.length > indexVideo + 1) {
      urlVideo[indexVideo].isPlaying = false;
      setIndexVideo(indexVideo + 1);
      urlVideo[indexVideo + 1].isPlaying = true;
      setIsPaused(false)
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
                    id={"videoId" + url.id}
                    autoPlay
                    muted={isMuted}
                    loop
                    typeof="video/mp4"
                  />
                ) : (
                  <img
                    className="rounded videoClass pb-5"
                    style={{ objectFit: "cover" }}
                    src={url.thumbnail}
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
                          onClick={() => toggleMute(url.id)}
                        >
                          <i className={!isMuted ? 'bi bi-volume-up-fill' : 'bi bi-volume-mute'}></i>
                        </button>

                        <button
                          className="btn btn-secondary"
                          onClick={() => togglePause(url.id)}
                        >
                          <i className={isPaused ? 'bi bi-play' : 'bi bi-pause'}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-3">
                <div className="mb-2">
                  <button className="btn btn-secondary p-3 rounded">
                    <i className="bi bi-heart-fill text-white"></i>
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
