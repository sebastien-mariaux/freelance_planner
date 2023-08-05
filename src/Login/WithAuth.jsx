import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function WithAuth() {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace={true} />;
}
