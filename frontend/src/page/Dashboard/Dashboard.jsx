import React from "react";

import { Row } from "antd";

import TodoCard from "../../compoment/card/todocard/TodoCard";

const Dashboard = (props) => {
  return (
    <>
      <Row justify="space-between">
        <TodoCard type="primary" icon="analytics" header="100+" text="Todo" />
        <TodoCard type="success" icon="analytics" header="100+" text="Todo" />
        <TodoCard type="danger" icon="analytics" header="100+" text="Todo" />
        <TodoCard type="warning" icon="analytics" header="100+" text="Todo" />
      </Row>
    </>
  );
};
export default Dashboard;
