import React from "react";

import useAuth from "../../../hooks/useAuth";
import FeaturesEditor from "../../../components/admin/FeaturesEditor";
import VideosEditor from "../../../components/admin/VideosEditor";
import OpportunitiesEditor from "../../../components/admin/OpportunitiesEditor";
import PostsEditor from "../../../components/admin/PostsEditor";

const DashboardPage = () => {
  useAuth();

  return (
    <>
      <main className="top">
        <FeaturesEditor />
        <VideosEditor />
      </main>
      <main>
        <OpportunitiesEditor />
        <PostsEditor />
      </main>

      <style jsx>{`
        .top {
          margin-top: 20px;
        }

        main {
          padding: 30px 80px 0 80px;
          display: flex;
          justify-content: space-evenly;
        }

        @media screen and (max-width: 800px) {
          main {
            justify-content: space-between;
          }
        }

        @media screen and (max-width: 750px) {
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
