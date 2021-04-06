import { Result } from "antd";
import React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import localStorageService from "../../helper/localStorage/localStorageService";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticate = auth.acToken ? true : false;

  const checkAuthorization = useCallback((appRoles) => {
    const userRole = localStorageService.getRole();
    if (appRoles) {
      for (const role of appRoles) {
        if (userRole.includes(role)) {
          return true;
        }
      }
    }
    return false;
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        //unauthenticated
        if (!isAuthenticate) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        //authenticated && authorized
        if (isAuthenticate && checkAuthorization(roles)) {
          return <Component {...props} />;
        }

        //not authorized
        return (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
