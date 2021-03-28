import React from "react";

import useAuth from "../../../hooks/useAuth";
import FeaturesEditor from "../../../components/admin/FeaturesEditor";
import VideosEditor from "../../../components/admin/VideosEditor";

const DashboardPage = () => {
  useAuth();

  return (
    <>
      <main>
        <FeaturesEditor />
        <VideosEditor />
      </main>

      <style jsx>{`
        main {
          padding: 50px 80px;
          display: flex;
          justify-content: space-evenly;
        }

        @media screen and (max-width: 800px) {
          main {
            justify-content: space-between;
          }
        }

        @media screen and (max-width: 700px) {
          main {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

export default DashboardPage;
