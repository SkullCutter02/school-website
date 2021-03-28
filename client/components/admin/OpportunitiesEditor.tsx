import React from "react";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Opportunity } from "../../types/Opportunity";

const OpportunitiesEditor = () => {
  const fetchOpportunities = async () => {
    const res = await fetch("/api/opportunities");
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Opportunity[], Error>("admin-opportunities", () =>
    fetchOpportunities()
  );

  return (
    <>
      <div className=" opportunities-editor editor">
        <h1>Opportunities</h1>
        {isLoading ? (
          <Skeleton height={20} count={4} style={{ marginBottom: "15px" }} />
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <div className="opportunities">
            {data.map((opportunity) => (
              <div className="opportunity" key={opportunity.uuid}>
                <p>
                  {opportunity.name}: {opportunity.description}
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

            <Link href={"/admin/dashboard/opportunity/create"}>
              <p className="editor-add-feature">Add Opportunity</p>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .opportunity {
          margin-bottom: 15px;
          display: flex;
        }

        .opportunity p {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
};

export default OpportunitiesEditor;
