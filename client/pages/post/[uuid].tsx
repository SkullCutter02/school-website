import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { TwitterShareButton, FacebookShareButton, WhatsappShareButton } from "react-share";

import { Post } from "../../types/Posts";

const PostPage: React.FC = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const queryClient = useQueryClient();

  const fetchPost = async (uuid: string | string[]) => {
    const res = await fetch(`/api/posts/${uuid}`);
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Post, Error>(["post", uuid], () => fetchPost(uuid), {
    enabled: !!uuid,
  });

  const buttonStyle: React.CSSProperties = {
    cursor: "pointer",
  };

  useEffect(() => {
    if (uuid) {
      const incrViews = async () => {
        await fetch(`/api/posts/${uuid}/views`, {
          method: "PATCH",
        });
        await queryClient.prefetchQuery(["post", uuid]);
      };

      try {
        incrViews().then();
      } catch (err) {
        console.log(err);
      }
    }
  }, [uuid]);

  return (
    <>
      <div className="post-container">
        {isLoading ? (
          <>
            <Skeleton width={200} height={30} style={{ marginBottom: "40px" }} />
            <Skeleton height={60} style={{ marginBottom: "40px" }} />
            <Skeleton height={100} />
          </>
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          data && (
            <div className="post">
              <div className="user-info">
                <p>
                  <i>{data.user}</i> • {format(parseISO(data.createdAt), "MMM d, yyyy")} •{" "}
                  {formatDistanceToNow(parseISO(data.createdAt))} ago
                </p>
              </div>

              <div className="post-info">
                <h2>{data.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: data.body }} />
              </div>

              {data?.images?.length > 0 && (
                <div className="images">
                  <h4>Image Attachments:</h4>
                  {data.images.map((image) => (
                    <img src={image} alt="image" key={image} />
                  ))}
                </div>
              )}

              <div className="share-buttons">
                <div className="icon">
                  <FacebookShareButton url={window.location.href} quote={data.title}>
                    <FontAwesomeIcon icon={faFacebookF} style={buttonStyle} />
                  </FacebookShareButton>
                </div>
                <div className="icon">
                  <TwitterShareButton url={window.location.href} title={data.title}>
                    <FontAwesomeIcon icon={faTwitter} style={buttonStyle} />
                  </TwitterShareButton>
                </div>
                <div className="icon">
                  <WhatsappShareButton url={window.location.href} title={data.title}>
                    <FontAwesomeIcon icon={faWhatsapp} style={buttonStyle} />
                  </WhatsappShareButton>
                </div>
              </div>

              <div className="views">
                <p>{data.views} views</p>
              </div>
            </div>
          )
        )}
      </div>

      <style jsx>{`
        .post-container {
          width: 70%;
          margin: 30px auto;
          border: 0.8px solid #000;
          padding: 40px 80px;
        }

        p {
          font-family: Avenir, serif;
        }

        .user-info p,
        .user-info p i,
        .views p {
          font-size: 0.8rem;
          font-weight: 200;
          letter-spacing: 0.5px;
          color: #3c3c3c;
          margin-bottom: 30px;
        }

        .views p {
          font-size: 0.9rem;
          margin-top: 20px;
          margin-bottom: -10px;
        }

        .post-info {
          margin-bottom: 30px;
        }

        .post-info h2 {
          font-weight: 400;
          margin-bottom: 30px;
        }

        .post-info p {
          font-weight: 200;
          font-size: 1rem;
          color: #292929;
          line-height: 1.7em;
        }

        .share-buttons {
          padding: 15px 0;
          border-top: 0.7px solid grey;
          border-bottom: 0.7px solid grey;
          display: flex;
        }

        .icon {
          margin-right: 40px;
        }

        .images {
          margin: 60px 0;
        }

        img {
          display: block;
          max-width: 100%;
          max-height: 240px;
          width: auto;
          height: auto;
          box-shadow: #7e7e7e 0 0 5px;
          margin: 30px 0;
        }

        @media screen and (max-width: 900px) {
          .post-container {
            width: 80%;
            padding: 40px 60px;
          }
        }

        @media screen and (max-width: 500px) {
          .post-container {
            width: 85%;
            padding: 40px 30px;
          }
        }
      `}</style>
    </>
  );
};

export default PostPage;
