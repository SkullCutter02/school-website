import React from "react";
import { useQuery } from "react-query";
import YouTube from "react-youtube";

import { Video } from "../../types/Video";
import Spinner from "../reuseable/Spinner";

const Videos = () => {
  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Video[], Error>("videos", () => fetchVideos());

  return (
    <>
      <div className="videos-container">
        {isLoading ? (
          <>
            <Spinner size={50} />
            <div className="placeholder" />
          </>
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <div className="videos">
            {data?.map((video) => (
              <div className="video" key={video.uuid}>
                <div className="youtube-video">
                  <YouTube videoId={video.link.split("v=")[1]} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .videos-container {
          position: relative;
          margin-top: 60px;
          margin-bottom: 20px;
        }

        .placeholder {
          height: 400px;
          visibility: hidden;
        }

        .videos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-content: center;
          grid-row-gap: 50px;
          width: 90%;
          margin: 30px auto;
        }

        .video {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
          margin-bottom: 40px;
        }

        .youtube-video {
          width: 85%;
          height: 100%;
          margin: 0 auto;
        }

        @media screen and (max-width: 1000px) {
          .video:not(.one-video) {
            height: 250px;
          }
        }

        @media screen and (max-width: 700px) {
          .video:not(.one-video) {
            height: 200px;
          }

          .one-video {
            width: 80vw;
          }
        }

        @media screen and (max-width: 600px) {
          .videos {
            grid-template-columns: 1fr;
          }

          .video {
            height: 300px;
          }

          .one-video {
            width: 85vw;
          }
        }
      `}</style>
    </>
  );
};

export default Videos;
