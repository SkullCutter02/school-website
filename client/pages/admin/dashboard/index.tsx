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
      `}</style>
    </>
  );
};

export default DashboardPage;
