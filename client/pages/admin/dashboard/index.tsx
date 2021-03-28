import React from "react";

import useAuth from "../../../hooks/useAuth";

const DashboardPage = () => {
  useAuth();

  return <>Dashboard</>;
};

export default DashboardPage;
