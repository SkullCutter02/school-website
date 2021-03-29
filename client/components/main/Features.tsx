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
      <SkeletonTheme color={"#606060"} highlightColor={"#777777"}>
        <div className="features-container">
          {isLoading ? (
            <>
              <div className="feature">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
              <div className="feature">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
              <div className="feature">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
              <div className="feature">
                <h1>
                  <Skeleton width={200} />
                </h1>
                <p>
                  <Skeleton height={windowWidth > 850 ? 300 : 140} />
                </p>
              </div>
            </>
          ) : isError ? (
            <p>{error.message}</p>
          ) : (
            <>
              <div className="feature">
                <h1>{data[0]?.title.toUpperCase() || "NOTHING HERE"}</h1>
                <p dangerouslySetInnerHTML={{ __html: data[0]?.body || "Nothing here yet..." }} />
              </div>
              <div className="feature">
                <h1>{data[1]?.title.toUpperCase() || "NOTHING HERE"}</h1>
                <p dangerouslySetInnerHTML={{ __html: data[1]?.body || "Nothing here yet..." }} />
              </div>
              <div className="feature">
                <h1>{data[2]?.title.toUpperCase() || "NOTHING HERE"}</h1>
                <p dangerouslySetInnerHTML={{ __html: data[2]?.body || "Nothing here yet..." }} />
              </div>
              <div className="feature">
                <h1>{data[3]?.title.toUpperCase() || "NOTHING HERE"}</h1>
                <p dangerouslySetInnerHTML={{ __html: data[3]?.body || "Nothing here yet..." }} />
              </div>
            </>
          )}
        </div>
      </SkeletonTheme>

      <style jsx>{`
        .features-container {
          width: 100%;
          height: 450px;
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

        .features-container .feature:nth-child(1) {
          background: #000;
          color: #fff;
        }

        .features-container .feature:nth-child(2) {
          background: #404040;
          color: #4ad19f;
        }

        .features-container .feature:nth-child(1) p,
        .features-container .feature:nth-child(2) p {
          color: #fff;
        }

        .features-container .feature:nth-child(3) {
          background: #ededed;
          color: #4ad19f;
        }

        .features-container .feature:nth-child(4) {
          background: #4ad19f;
          color: #fff;
        }

        .features-container .feature:nth-child(3) p,
        .features-container .feature:nth-child(4) p {
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
            grid-template-rows: 1fr 1fr;
            height: 550px;
          }
        }
      `}</style>
    </>
  );
};

export default Features;
