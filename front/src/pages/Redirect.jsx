import React from "react";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";

function Redirect() {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/home" />;
  } else {
    if (user.role === "ROLE_STUDENT") return <Navigate to="/student/home" />;
    else if (user.role === "ROLE_ADMIN") return <Navigate to="/admin/home" />;
    else return <Navigate to="/err" />;
  }
}

export default Redirect;
