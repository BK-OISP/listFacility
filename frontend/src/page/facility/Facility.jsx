import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";

import PrivateRoute from "../../compoment/privateRoute/PrivateRoute";
import Roles from "../../helper/config/Roles";
import MangeRequest from "./manageRequest/MangeRequest";
import ViewStatusRequest from "./viewStatusRequest/ViewStatusRequest";

const Facility = (props) => {
  let routes;
  const match = useRouteMatch();

  routes = (
    <Switch>
      <PrivateRoute
        path={`${match.path}/status`}
        roles={[Roles.FULLTIME]}
        component={ViewStatusRequest}
      />

      <PrivateRoute
        path={`${match.path}/manage`}
        roles={[
          Roles.FM_DEPUTY_HEAD,
          Roles.ACCOUNTANT_LEAD,
          Roles.DIRECTOR,
          Roles.FM_ADMIN_LEAD,
          Roles.FM_FACILITY_TEAM_LEAD,
        ]}
        component={MangeRequest}
      />

      <Redirect to={`${match.path}/status`} />
    </Switch>
  );

  return <div>{routes}</div>;
};

export default Facility;
