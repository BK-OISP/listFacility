import React from "react";
import { Row, Col, Typography } from "antd";

const Heading = (props) => {
  const { Title } = Typography;
  const { title } = props;
  return (
    <Row>
      <Col>
        <Title level={3}>{title}</Title>
      </Col>
    </Row>
  );
};

export default Heading;
