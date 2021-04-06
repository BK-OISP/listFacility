import React, { useEffect } from "react";
import { message, Row } from "antd";

import Heading from "../../../compoment/Heading/Heading";
import manageRequest from "../../../helper/axios/facilityApi/manageApi";
import { useState } from "react";
import TableView from "./TableView";
import showTime from "../../../helper/other/ConvertDate";

const MangeRequest = () => {
  const [isRerender, setIsRerender] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    const getAllRequest = async () => {
      try {
        const response = await manageRequest.getAllRequest();
        console.log(response.allRequest);
        const convertedData = response.allRequest.map((item, index) => ({
          ...item,
          key: item._id,
          fmNumber: ++index,
          fmEmployee: item.employeeId.fullName,
          fmDepartment: item.employeeId.department,
          fmStatus: item.status.overallStatus,
          fmDate: showTime(item.updatedAt),
        }));
        setDataTable(convertedData);
      } catch (error) {
        console.log(error);
        message.error(error.message, 5);
      }
    };
    getAllRequest();
  }, [isRerender]);

  return (
    <div className="px-1 py-1 table manage-fm">
      <Row className="mb-1">
        <Heading title="Quản lý đề xuất" />
      </Row>
      <TableView
        data={dataTable}
        setDataTable={setDataTable}
        setIsRerender={setIsRerender}
      />
    </div>
  );
};

export default MangeRequest;
