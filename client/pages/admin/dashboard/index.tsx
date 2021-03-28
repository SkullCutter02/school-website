import React from "react";

import useAuth from "../../../hooks/useAuth";
import FeaturesEditor from "../../../components/admin/FeaturesEditor";

const DashboardPage = () => {
  useAuth();

  return (
    <>
      <main>
        <FeaturesEditor />
      </main>

      <style jsx>{`
        main {
          padding: 50px 80px;
        }
      `}</style>
    </>
  );
};

export default DashboardPage;
