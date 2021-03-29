import React from "react";
import { useQuery } from "react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Feature } from "../../types/Feature";
import useWindowWidth from "../../hooks/useWindowWidth";

const Features: React.FC = () => {
  const fetchFeatures = async () => {
    const res = await fetch("/api/features");
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Feature[], Error>("features", () => fetchFeatures());

  const windowWidth = useWindowWidth();

  return (
    <>
      <div className="features-container">
        {isLoading ? (
          <>
            <SkeletonTheme color={"#606060"} highlightColor={"#949494"}>
              <div className="feature one">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
            </SkeletonTheme>
            <SkeletonTheme color={"#818181"} highlightColor={"#9d9d9d"}>
              <div className="feature two">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
            </SkeletonTheme>
            <SkeletonTheme color={"#fcfcfc"} highlightColor={"#eeeeee"}>
              <div className="feature three">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
            </SkeletonTheme>
            <SkeletonTheme color={"#34b887"} highlightColor={"#219f6e"}>
              <div className="feature four">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
            </SkeletonTheme>
          </>
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <>
            <div className="feature one">
              <h1>{data[0]?.title.toUpperCase() || "NOTHING HERE"}</h1>
              <p dangerouslySetInnerHTML={{ __html: data[0]?.body || "Nothing here yet..." }} />
            </div>
            <div className="feature two">
              <h1>{data[1]?.title.toUpperCase() || "NOTHING HERE"}</h1>
              <p dangerouslySetInnerHTML={{ __html: data[1]?.body || "Nothing here yet..." }} />
            </div>
            <div className="feature three">
              <h1>{data[2]?.title.toUpperCase() || "NOTHING HERE"}</h1>
              <p dangerouslySetInnerHTML={{ __html: data[2]?.body || "Nothing here yet..." }} />
            </div>
            <div className="feature four">
              <h1>{data[3]?.title.toUpperCase() || "NOTHING HERE"}</h1>
              <p dangerouslySetInnerHTML={{ __html: data[3]?.body || "Nothing here yet..." }} />
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .features-container {
          width: 100%;
          height: auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        .features-container .feature {
          min-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
          padding: 60px 40px;
          font-family: "League Gothic", serif;
          height: 100%;
        }

        .features-container .feature h1 {
          font-weight: 800;
          font-size: 1.8rem;
          margin-bottom: 20px;
          letter-spacing: 3px;
        }

        .features-container .feature p {
          font-weight: 200;
          font-size: 1rem;
          line-height: 1.3em;
          margin-top: 10px;
          width: 60%;
        }

        .features-container .one {
          background: #000;
          color: #fff;
        }

        .features-container .two {
          background: #404040;
          color: #4ad19f;
        }

        .features-container .one p,
        .features-container .two p {
          color: #fff;
        }

        .features-container .three {
          background: #ededed;
          color: #4ad19f;
        }

        .features-container .four {
          background: #4ad19f;
          color: #fff;
        }

        .features-container .three p,
        .features-container .four p {
          color: #000;
        }

        @media screen and (max-width: 1300px) {
          .features-container .feature {
            padding: 60px 20px;
          }

          .features-container .feature p {
            width: 80%;
          }

          .features-container .feature h1 {
            font-size: 1.5rem;
          }
        }

        @media screen and (max-width: 1100px) {
          .features-container .feature h1 {
            font-size: 1.2rem;
          }
        }

        @media screen and (max-width: 800px) {
          .features-container {
            grid-template-columns: 1fr 1fr;
          }

          .features-container .feature p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default Features;
