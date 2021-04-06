import React from "react";
import { Row, Col } from "antd";

const TodoCard = (props) => {
  const { type, icon, header, text } = props;
  return (
    <Col sm={12} md={6} className={`counter bg-${type}`}>
      <Row justify="center">
        <Col>
          <span className="material-icons">{icon}</span>
        </Col>
      </Row>
      <Row className="counter__header" justify="center">
        <Col>
          <h3>{header}</h3>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <p>{text}</p>
        </Col>
      </Row>
    </Col>
  );
};
export default TodoCard;
