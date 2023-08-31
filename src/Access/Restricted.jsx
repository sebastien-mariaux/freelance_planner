import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { urlGet } from "../api/base";
import { routes } from "../api/routes";
import { useErrorHandler } from "react-error-boundary";

export default function Restricted() {
  const [userData, setUserData] = React.useState(null);

  const getUserData = async () => {
    urlGet(routes.userInfo).then((data) => {
      setUserData(data);
    });
  };

  if (!userData) {
    getUserData();
    return <div>Chargement...</div>;
  }

  if (userData?.payed_user === true || userData?.privileged_user === true || userData?.recent_member === true) {
    return <Outlet />;
  }
  return <Navigate to="/subscribe" replace={true} />;
}
