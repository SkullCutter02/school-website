import React from "react";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Feature } from "../../types/Feature";

const FeaturesEditor: React.FC = () => {
  const fetchFeatures = async () => {
    const res = await fetch("/api/features");
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Feature[], Error>("admin-features", () =>
    fetchFeatures()
  );

  return (
    <>
      <div className="features-editor">
        <h1>Features</h1>

        {isLoading ? (
          <Skeleton height={20} count={4} style={{ marginBottom: "15px" }} />
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <div className="features">
            {data.map((feature) => (
              <div className="feature">
                <p>
                  {feature.title}: {feature.body}
                </p>
                <FontAwesomeIcon
                  color={"grey"}
                  icon={faPencilAlt}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
                <FontAwesomeIcon
                  color={"grey"}
                  icon={faTrashAlt}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </div>
            ))}

            {data.length < 4 && <p className="add-new-feature">Add Feature</p>}
          </div>
        )}
      </div>

      <style jsx>{`
        p {
          font-weight: 300;
          font-size: 0.9rem;
        }

        .features-editor {
          width: 30%;
          min-width: 270px;
          border: 0.7px solid grey;
          position: relative;
          padding: 25px;
        }

        .features-editor > h1 {
          font-size: 1.3rem;
          font-weight: 400;
          margin-bottom: 20px;
        }

        .feature {
          margin-bottom: 15px;
          display: flex;
        }

        .feature p {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .add-new-feature {
          text-decoration: underline;
          color: grey;
          font-size: 0.8rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default FeaturesEditor;
