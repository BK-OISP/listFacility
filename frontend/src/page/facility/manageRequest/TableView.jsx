import { message, Table, Tooltip } from "antd";
import Column from "antd/lib/table/Column";
import React, { useState } from "react";
import { ExportOutlined } from "@ant-design/icons";

import localStorageService from "../../../helper/localStorage/localStorageService";
import Roles from "../../../helper/config/Roles";
import manageRequest from "../../../helper/axios/facilityApi/manageApi";
import EditModal from "./EditModal";
import OtherRoleModal from "./OtherRoleModal";

const TableView = (props) => {
  const { data, setDataTable, setIsRerender } = props;
  const PAGE_SIZE = 8;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordItem, setRecordItem] = useState(null);
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);

  const getCurrentRole = () => {
    const userRole = localStorageService.getRole();
    const designRole = [
      Roles.ACCOUNTANT_LEAD,
      Roles.DIRECTOR,
      Roles.FM_ADMIN_LEAD,
      Roles.FM_DEPUTY_HEAD,
      Roles.FM_FACILITY_TEAM_LEAD,
    ];
    for (const role of userRole) {
      if (designRole.includes(role)) {
        return role;
      }
    }
  };

  const getCurrentRoleKey = (role) => {
    switch (role) {
      case Roles.FM_DEPUTY_HEAD:
        return "isDeputyHeadApproval";
      case Roles.FM_FACILITY_TEAM_LEAD:
        return "isFMTeamLeadApproval";
      case Roles.FM_ADMIN_LEAD:
        return "isAdminLeadApproval";
      case Roles.ACCOUNTANT_LEAD:
        return "isAccountLeadApproval";
      case Roles.DIRECTOR:
        return "isDirectorApproval";
      default:
        break;
    }
  };

  const seenRequest = async (requestId) => {
    try {
      await manageRequest.seenRequest(requestId);
    } catch (error) {
      message.error("Something went wrong! Please try again", 5);
    }
  };

  const renderStatus = (text, record, index) => {
    const roleKey = getCurrentRoleKey(getCurrentRole());
    console.log("role", roleKey);
    if (
      record.status.overallStatus === false &&
      record.status[roleKey] === false
    ) {
      record.status.check = "Đã huỷ đề xuất";
      return "Đã huỷ đề xuất";
    }
    if (
      record.status.overallStatus === true &&
      record.status[roleKey] === false
    ) {
      record.status.check = "Chưa duyệt";
      return "Chưa duyệt";
    }
    if (
      record.status.overallStatus === true &&
      record.status[roleKey] === true
    ) {
      record.status.check = "Đã duyệt";
      return "Đã duyệt";
    }
    record.status.check = "Chưa duyệt";
    return "Chưa duyệt";
  };

  const sortHandler = (a, b) => {
    if (
      typeof a.status.check === "string" &&
      typeof b.status.check === "string"
    ) {
      return a.status.check.localeCompare(b.status.check);
    }
  };

  const openModalHandler = async (isOpen, record) => {
    const roleKey = getCurrentRoleKey(getCurrentRole());
    setRecordItem(record);
    setDataTable((pre) => {
      const data = pre;
      for (const item of data) {
        if (item._id === record._id) {
          item.isRead[roleKey] = true;
        }
      }
      return [...data];
    });
    await seenRequest(record._id);
    if (roleKey === "isFMTeamLeadApproval") {
      setIsModalOpen(isOpen);
    } else {
      setIsOtherModalOpen(true);
    }
  };

  return (
    <>
      {recordItem && isModalOpen && (
        <EditModal
          setIsRerender={setIsRerender}
          record={recordItem}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {recordItem && isOtherModalOpen && (
        <OtherRoleModal
          setIsRerender={setIsRerender}
          record={recordItem}
          isOtherModalOpen={isOtherModalOpen}
          setIsOtherModalOpen={setIsOtherModalOpen}
        />
      )}
      <Table
        dataSource={data}
        bordered
        pagination={{ pageSize: PAGE_SIZE }}
        scroll={{ x: 600, y: 600 }}
      >
        <Column title="#" dataIndex="fmNumber" key="fmNumber" width="4%" />
        <Column
          title="Danh mục đề xuất"
          dataIndex="fmName"
          key="fmName"
          width="20"
          render={(text, record) => {
            const roleKey = getCurrentRoleKey(getCurrentRole());
            if (!record.isRead[roleKey]) {
              return (
                <div
                  onClick={() => openModalHandler(true, record)}
                  className="manage-fm__name"
                >
                  <b>{text}</b>
                </div>
              );
            }
            return (
              <div
                onClick={() => openModalHandler(true, record)}
                className="manage-fm__name"
              >
                {text}
              </div>
            );
          }}
          sorter={(a, b) => {
            if (typeof a.fmName === "string" && typeof b.fmName === "string") {
              return a.fmName.localeCompare(b.fmName);
            }
          }}
        />
        <Column
          title="Nhân viên"
          dataIndex="fmEmployee"
          key="fmEmployee"
          width="20"
        />
        <Column
          title="Bộ phận"
          dataIndex="fmDepartment"
          key="fmDepartment"
          width="20"
        />
        <Column
          title="Ngày đề xuất"
          dataIndex="fmDate"
          key="fmDate"
          width="20"
          sorter={(a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)}
        />
        <Column
          title="Tình trạng"
          dataIndex="fmStatus"
          key="fmStatus"
          width="20"
          render={renderStatus}
          sorter={sortHandler}
        />
        <Column
          title="Thao tác"
          key="fmAction"
          render={(_, record) => {
            return (
              <div
                className="manage-fm__name"
                onClick={() => openModalHandler(true, record)}
              >
                <Tooltip title="Xem">
                  <ExportOutlined className="ant-icon icon-primary" />
                </Tooltip>
              </div>
            );
          }}
        />
      </Table>
    </>
  );
};

export default TableView;
