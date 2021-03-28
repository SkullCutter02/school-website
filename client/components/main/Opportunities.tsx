import React from "react";
import { useQuery } from "react-query";

import { Opportunity } from "../../types/Opportunity";
import Spinner from "../reuseable/Spinner";

const Opportunities: React.FC = () => {
  const fetchOpportunities = async () => {
    const res = await fetch("/api/opportunities");
    return await res.json();
  };

  const { isLoading, isError, error, data } = useQuery<Opportunity[], Error>("opportunities", () =>
    fetchOpportunities()
  );

  return (
    <>
      <main>
        <div className="opportunities-container">
          <h1>Opportunities and Clubs</h1>

          {isLoading ? (
            <Spinner size={50} />
          ) : isError ? (
            <p>{error.message}</p>
          ) : (
            <div className="opportunities">
              {data.map((opportunity) => (
                <div className="opportunity">
                  <img
                    src={
                      opportunity.imageUrl ||
                      "https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg"
                    }
                    alt="image"
                  />
                  <div className="opportunity-text">
                    <h2>{opportunity.name.toUpperCase()}</h2>
                    <div className="line" />
                    <p
                      className="description"
                      dangerouslySetInnerHTML={{ __html: opportunity.description }}
                    />
                    <div className="line" />
                    <p className="contact-email">Contact Email: {opportunity.contactEmail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        main {
          min-height: 200px;
          position: relative;
        }

        .opportunities-container {
          width: 83%;
          margin: 0 auto;
        }

        .opportunities-container > h1 {
          font-size: 1.3rem;
          font-weight: 200;
        }

        .opportunities {
          display: grid;
          width: 100%;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-column-gap: 40px;
          grid-row-gap: 30px;
          margin: 40px 0;
        }

        .opportunity {
          min-width: 100%;
          box-shadow: #b3b3b3 0 0 6px;
        }

        .opportunity img {
          width: 100%;
          object-fit: cover;
          height: 170px;
        }

        .opportunity-text {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .opportunity-text h2 {
          font-size: 1.2rem;
          letter-spacing: 0.3px;
          line-height: 1.3em;
        }

        .line {
          height: 0.7px;
          width: 100%;
          background: #b3b3b3;
          margin: 20px 0;
        }

        .opportunity-text .description,
        .opportunity-text .contact-email {
          font-size: 0.9rem;
          font-weight: 300;
          letter-spacing: 0.2px;
          line-height: 1.3em;
        }

        .contact-email {
          word-wrap: break-word;
        }

        @media screen and (max-width: 1100px) {
          .opportunities {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        @media screen and (max-width: 800px) {
          .opportunities {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media screen and (max-width: 500px) {
          .opportunities {
            grid-template-columns: 1fr;
            margin-bottom: 60px;
          }

          .opportunity {
            width: 70%;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
};

export default Opportunities;
