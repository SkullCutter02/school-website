import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";

import { Opportunity } from "../../types/Opportunity";

const OpportunityPage: React.FC = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const fetchOpportunity = async () => {
    const res = await fetch(`/api/opportunities/${uuid}`);
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Opportunity, Error>(
    ["opportunity", uuid],
    () => fetchOpportunity(),
    {
      enabled: !!uuid,
    }
  );

  return (
    <>
      <div className="page-container opportunity-container">
        {isLoading ? (
          <>
            <Skeleton height={100} style={{ marginBottom: "40px" }} />
            <Skeleton width={300} height={40} style={{ marginBottom: "40px" }} />
            <Skeleton height={140} />
          </>
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          data && (
            <div className="opportunity">
              {data?.imageUrl && <img src={data.imageUrl} alt="image" />}
              <h2>{data.name}</h2>
              <p dangerouslySetInnerHTML={{ __html: data.description }} />
              <br />
              <p>Contact Email: {data.contactEmail}</p>
            </div>
          )
        )}
      </div>

      <style jsx>{`
        .opportunity-container {
          width: 55%;
          padding: 40px;
        }

        h2 {
          font-weight: 400;
          margin-bottom: 30px;
        }

        p {
          font-family: Avenir, serif;
          font-weight: 200;
          font-size: 1rem;
          color: #292929;
          line-height: 1.7em;
        }

        img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          margin-bottom: 30px;
        }

        @media screen and (max-width: 1000px) {
          .opportunity-container {
            width: 75%;
          }
        }

        @media screen and (max-width: 600px) {
          .opportunity-container {
            width: 85%;
          }

          img {
            height: 200px;
          }
        }
      `}</style>
    </>
  );
};

export default OpportunityPage;
