import React, { useState } from "react";
import { Row, Col, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Heading from "../../../compoment/Heading/Heading";

import TableCompoment from "./TableCompoment";
import { useEffect } from "react";
import requestApi from "../../../helper/axios/facilityApi/requestApi";
import AddRequest from "../add/AddRequest";

const ViewStatusRequest = () => {
  const [isRerender, setIsRerender] = useState(false);
  const [data, setData] = useState([]);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);

  useEffect(() => {
    const fetchAllRequest = async () => {
      try {
        const response = await requestApi.getAllRequestEmpId();
        const dataTable = response.allRequest.map((item, index) => {
          return {
            ...item,
            number: index + 1,
            key: item._id,
            ...item.status,
          };
        });
        setData(dataTable);
      } catch (err) {
        message.error(err.message, 5);
      }
    };
    fetchAllRequest();
  }, [isRerender]);

  const handleOpenRequest = () => {
    setIsAddRequestOpen(true);
  };

  return (
    <>
      <AddRequest
        setIsAddRequestOpen={setIsAddRequestOpen}
        isAddRequestOpen={isAddRequestOpen}
        setIsRerender={setIsRerender}
      />
      <div className="px-1 py-1 table fm-viewall">
        <Row className="mb-1">
          <Heading title="Các đề xuất của bạn" />

          <Col className="ml-auto text-right d-flex align-center">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="border"
              onClick={handleOpenRequest}
            >
              Thêm đề xuất
            </Button>
          </Col>
        </Row>
        <TableCompoment data={data} setIsRerender={setIsRerender} />
        <p style={{ fontStyle: "italic", color: "grey" }}>
          Lưu ý: Bạn chỉ có thể thay đổi / xoá đề xuất trước khi trưởng phòng
          phê duyệt.
        </p>
      </div>
    </>
  );
};

export default ViewStatusRequest;
