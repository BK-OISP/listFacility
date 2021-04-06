import React, { useCallback, useState, useMemo } from "react";
import { Button, Table, Space, Tooltip, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  DeleteRowOutlined,
} from "@ant-design/icons";

import requestApi from "../../../helper/axios/facilityApi/requestApi";
import EditModal from "./EditModal";
import showTime from "../../../helper/other/ConvertDate";
import ViewModal from "./ViewModal";

const TableCompoment = (props) => {
  const { data, setIsRerender } = props;
  const { Column, ColumnGroup } = Table;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [recordItem, setRecordItem] = useState(null);

  const PAGE_SIZE = 5;

  const renderStatus = useCallback((checkingStatus, record, index) => {
    // console.log(record);
    if (record.overallStatus) {
      //true = dang chờ
      if (checkingStatus) {
        return (
          <Tooltip title="Đã duyệt!">
            <CheckCircleOutlined className="icon-success ant-icon" />
          </Tooltip>
        );
      } else
        return (
          <Tooltip title="Đang chờ">
            <ExclamationCircleOutlined className="icon-warning ant-icon" />
          </Tooltip>
        );
    } else {
      if (checkingStatus) {
        return (
          <Tooltip title="Đã duyệt!">
            <CheckCircleOutlined className="icon-success ant-icon" />
          </Tooltip>
        );
      }
      if (checkingStatus === false) {
        return (
          <Tooltip title="Đã huỷ">
            <CloseCircleOutlined className="icon-danger ant-icon" />
          </Tooltip>
        );
      }
      if (checkingStatus === null) {
        return (
          <Tooltip title="Yêu cầu bị huỷ">
            <DeleteRowOutlined className="icon-refuse ant-icon" />
          </Tooltip>
        );
      }
    }
    //reject rồi
  }, []);

  const handleDeleteRequest = useCallback(
    async (record) => {
      try {
        await requestApi.deleteRequest(record._id);
        message.success("The information was deleted successfully.");
        setIsRerender((pre) => !pre);
      } catch (error) {
        message.error("Something went wrong.");
      }
    },
    [setIsRerender]
  );

  const handleModal = useCallback((record) => {
    if (
      record.overallStatus &&
      !!record.isDeputyHeadApproval === false &&
      !!record.isFMTeamLeadApproval === false &&
      !!record.isAdminLeadApproval === false &&
      !!record.isAccountLeadApproval === false &&
      !!record.isDirectorApproval === false
    ) {
      setRecordItem(record);
      setShowEditModal(true);
    } else {
      setRecordItem(record);
      setShowViewModal(true);
    }
  }, []);

  return useMemo(
    () => (
      <>
        {recordItem && showEditModal && (
          <EditModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            record={recordItem}
            setIsRerender={setIsRerender}
          />
        )}
        {recordItem && showViewModal && (
          <ViewModal
            showViewModal={showViewModal}
            setShowViewModal={setShowViewModal}
            record={recordItem}
          />
        )}
        <Table
          dataSource={data}
          bordered
          pagination={{ pageSize: PAGE_SIZE }}
          scroll={{ x: 600, y: 600 }}
        >
          <Column title="#" dataIndex="number" key="number" width="4%" />
          <Column
            title="Danh mục đề xuất"
            dataIndex="fmName"
            key="fmName"
            width="25%"
            render={(text, record) => (
              <>
                {text}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "gray",
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  -- Cập nhật {showTime(record.updatedAt)}
                </span>
              </>
            )}
          />
          <ColumnGroup title="Tiến độ phê duyệt" width="58%">
            <Column
              title="Trưởng bộ phận"
              dataIndex="isDeputyHeadApproval"
              key="isDeputyHeadApproval"
              render={renderStatus}
            />
            <Column
              title="Cơ sở vật chất"
              dataIndex="isFMTeamLeadApproval"
              key="isFMTeamLeadApproval"
              render={renderStatus}
              c
            />
            <Column
              title="Hành chính tổng hợp"
              dataIndex="isAdminLeadApproval"
              key="isAdminLeadApproval"
              render={renderStatus}
            />
            <Column
              title="Kế toán"
              dataIndex="isAccountLeadApproval"
              key="isAccountLeadApproval"
              render={renderStatus}
            />
            <Column
              title="Ban Giám đốc"
              dataIndex="isDirectorApproval"
              key="isDirectorApproval"
              render={renderStatus}
            />
          </ColumnGroup>
          <Column
            title="Thao tác"
            width="15%"
            render={(record) => (
              <Space size="middle">
                <Tooltip title="View/Edit">
                  <Button
                    type="text"
                    icon={<EditOutlined className="ant-icon icon-primary" />}
                    onClick={() => handleModal(record)}
                  />
                </Tooltip>
                <Popconfirm
                  placement="topLeft"
                  title="Bạn có muốn xoá đề xuất?"
                  onConfirm={() => handleDeleteRequest(record)}
                >
                  <Button
                    type="text"
                    icon={<DeleteOutlined className="ant-icon icon-danger" />}
                  />
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </>
    ),
    [
      data,
      renderStatus,
      handleDeleteRequest,
      handleModal,
      showEditModal,
      recordItem,
      setIsRerender,
      setShowViewModal,
      showViewModal,
    ]
  );
};

export default TableCompoment;
