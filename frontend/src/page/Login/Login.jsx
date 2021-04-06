import React, { useState } from "react";
import { Row, Col } from "antd";
import Tilt from "react-tilt";

import OISP_Logo from "../../asset/img/OISP_Logo.png";
import GoogleIcon from "./GoogleIcon";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = (props) => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const { from } = props.location.state || { from: { pathname: "/" } };

  const auth = useSelector((state) => state.auth);
  const isAuthenticate = auth.acToken ? true : false;

  if (redirectToReferrer || isAuthenticate) {
    return <Redirect to={from} />;
  }

  return (
    <div className="login-wrapper">
      <div className="login">
        <Row justify="space-between">
          <Col md={10} xs={24} className="d-none d-md-block login--logo">
            <Tilt className="Tilt" options={{ perspective: 600 }}>
              <img className="img-fluid" src={OISP_Logo} alt="OISP_Logo" />
            </Tilt>
          </Col>
          <Col md={14} xs={24}>
            <Row justify="center" className="login--header">
              Sign In With
            </Row>

            <Row justify="center" style={{ marginTop: "2rem" }}>
              <GoogleIcon setRedirectToReferrer={setRedirectToReferrer} />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
