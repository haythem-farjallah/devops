import React from "react";
import { Outlet } from "react-router-dom";
import VisitorLayout from "../components/layout/VisitorLayout";

const VesitorRoute = () => {
  return (
    <VisitorLayout visitor={true}>
      <Outlet />
    </VisitorLayout>
  );
};

export default VesitorRoute;
