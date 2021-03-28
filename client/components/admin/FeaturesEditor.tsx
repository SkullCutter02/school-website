import React, { useState } from "react";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Feature } from "../../types/Feature";
import FeatureEditor from "./FeatureEditor";

const FeaturesEditor: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const fetchFeatures = async () => {
    const res = await fetch("/api/features");
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Feature[], Error>("admin-features", () =>
    fetchFeatures()
  );

  const addFeature = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/features", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: e.target.title.value,
          body: e.target.body.value,
        }),
      });
      await queryClient.prefetchQuery("admin-features");
      setExpand(false);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFeature = async (uuid: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this feature?")) {
        await fetch(`/api/features/${uuid}`, {
          method: "DELETE",
          credentials: "include",
        });
        await queryClient.prefetchQuery("admin-features");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                  onClick={() => removeFeature(feature.uuid)}
                />
              </div>
            ))}

            {data.length < 4 && (
              <p className="add-new-feature" onClick={() => setExpand((old) => !old)}>
                Add Feature {expand && "(Collapse)"}
              </p>
            )}

            {expand && data.length < 4 && <FeatureEditor onSubmit={addFeature} />}
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
          display: inline-block;
        }
      `}</style>
    </>
  );
};

export default FeaturesEditor;
