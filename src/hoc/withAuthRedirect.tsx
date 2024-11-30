import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuth } from "../components/redux/auth-selectors.ts";

export function withAuthRedirect<P>(Component: React.ComponentType<P>) {
  const RedirectComponent: React.FC<P> = (props) => {
	const isAuth = useSelector(getIsAuth);
    const location = useLocation();

    if (!isAuth) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Component {...props} />;
  };

  return RedirectComponent;
}