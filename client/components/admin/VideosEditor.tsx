import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Video } from "../../types/Video";

const VideosEditor = () => {
  const queryClient = useQueryClient();

  const [expand, setExpand] = useState<boolean>(false);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    return res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Video[], Error>("admin-videos", () => fetchVideos());

  const addVideo = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/videos", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: e.target.link.value.trim(),
        }),
      });
      await queryClient.prefetchQuery("admin-videos");
      setExpand(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="videos-editor editor">
        <h1>Videos</h1>

        {isLoading ? (
          <Skeleton height={20} count={4} style={{ marginBottom: "15px" }} />
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <div className="videos">
            {data.map((video) => (
              <div className="video" key={video.uuid}>
                <a href={video.link}>{video.link}</a>
                <FontAwesomeIcon
                  color={"grey"}
                  icon={faTrashAlt}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </div>
            ))}

            <p className="add-new-video editor-add-feature" onClick={() => setExpand((old) => !old)}>
              Add Video {expand && "(Collapse)"}
            </p>

            {expand && (
              <form onSubmit={addVideo}>
                <input type="text" placeholder="Youtube Link" name="link" />
                <button type="submit">Confirm</button>
              </form>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .video {
          display: flex;
          margin-bottom: 15px;
        }

        .video a {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        input {
          width: 100%;
          margin: 20px 0 10px 0;
          padding: 5px;
        }

        button {
          float: right;
          cursor: pointer;
          border: 0.7px solid black;
          border-radius: 20px;
          padding: 5px 8px;
        }
      `}</style>
    </>
  );
};

export default VideosEditor;
