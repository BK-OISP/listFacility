import React, { useState } from "react";
import {
  Col,
  Descriptions,
  Divider,
  Image,
  Row,
  Form as AntdForm,
  Space,
  Button,
  message,
  Popconfirm,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import * as Yup from "yup";

import Roles from "../../../helper/config/Roles";
import localStorageService from "../../../helper/localStorage/localStorageService";
import { Field, Formik } from "formik";
import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";
import manageRequest from "../../../helper/axios/facilityApi/manageApi";

const getCurrentRole = () => {
  const userRole = localStorageService.getRole();
  const designRole = [
    Roles.ACCOUNTANT_LEAD,
    Roles.DIRECTOR,
    Roles.FM_ADMIN_LEAD,
    Roles.FM_DEPUTY_HEAD,
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

const OtherRoleModal = (props) => {
  const {
    setIsRerender,
    record,
    isOtherModalOpen,
    setIsOtherModalOpen,
  } = props;
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };
  let disabledButton = false;
  const roleKey = getCurrentRoleKey(getCurrentRole());
  const [formType, setFormType] = useState({
    isApprove: null,
    isDraft: false,
  });
  if (record.status[roleKey] !== null) {
    disabledButton = true;
  }

  const initForm = {
    note: record.notes[roleKey] ? record.notes[roleKey] : "",
  };
  const validationRejectForm = Yup.object().shape({
    note: Yup.string().min(1).required("Vui lòng nhập thông tin"),
  });
  const validationAcceptForm = Yup.object().shape({
    note: Yup.string().min(1).notRequired(),
  });

  const handleSubmitForm = async (values, action) => {
    console.log(roleKey);
    const facilityRequest = {
      note: values.note,
      [roleKey]: formType.isApprove,
      isDraft: formType.isDraft,
    };
    try {
      await manageRequest.putEditRequest(record._id, facilityRequest);
      message.success("Task saved!", 5);
      setIsOtherModalOpen(false);
      setIsRerender((pre) => !pre);
    } catch (error) {
      message.error("Something wentwrong! Please try again", 5);
    }
  };

  const handleClose = () => {
    setIsOtherModalOpen(false);
  };

  return (
    <Modal
      title="Chi tiết đề xuất"
      visible={isOtherModalOpen}
      onCancel={() => setIsOtherModalOpen(false)}
      centered
      footer={null}
      width={960}
      destroyOnClose
    >
      <Descriptions title="Thông tin người đề xuất" bordered>
        <Descriptions.Item label="Tên nhân viên">
          {record.employeeId.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Bộ phận">
          {record.employeeId.department}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="center">Thông tin đề xuất</Divider>
      <Row gutter={[48, 16]}>
        <Col xs={24} sm={12}>
          Tên danh mục: {record.fmName}
        </Col>
        <Col xs={24} sm={12}>
          Loại danh mục: {record.fmBigGroup.label}
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col xs={24} sm={12}>
          Số lượng: {record.quantity}
        </Col>
        <Col xs={24} sm={12}>
          Đơn vị tính: {record.unit.label}
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col xs={24} sm={12}>
          Đơn giá:{" "}
          {record.unitPricePredict > 0
            ? `${record.unitPricePredict} VNĐ`
            : "Đang cập nhật"}
        </Col>
        <Col xs={24} sm={12}>
          Tổng tiền:{" "}
          {record.totalPricePredict > 0
            ? `${record.totalPricePredict} VNĐ`
            : "Đang cập nhật"}
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col xs={24}>Mục đích: {record.purpose}</Col>
      </Row>
      <Row gutter={16} justify="center">
        {record.imgCollection.length > 0 &&
          record.imgCollection.map((item) => (
            <Col key={item}>
              <Image
                width={150}
                height={150}
                src={`${process.env.REACT_APP_API_URL}/oisp/${item}`}
              />
            </Col>
          ))}
      </Row>
      <Divider orientation="center">Thông tin bổ sung</Divider>
      <Formik
        initialValues={initForm}
        validationSchema={
          formType.isApprove ? validationAcceptForm : validationRejectForm
        }
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit, submitCount, values }) => {
          return (
            <AntdForm
              onFinish={handleSubmit}
              {...layout}
              id="otherManageRequestForm"
            >
              <Row>
                <Col xs={24}>
                  <Field
                    component={CreateAntField}
                    name="note"
                    type="textarea"
                    label="Ghi chú"
                    submitCount={submitCount}
                    hasFeedback
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
              <Row justify="center" className="mb-1">
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() =>
                      setFormType({
                        isApprove: true,
                        isDraft: false,
                      })
                    }
                    disabled={disabledButton}
                  >
                    Duyệt đề xuất
                  </Button>
                  {/* <Button
                    type="primary"
                    htmlType="submit"
                    danger
                    onClick={() =>
                      setFormType({
                        isApprove: false,
                        isDraft: false,
                      })
                    }
                    disabled={disabledButton}
                  >
                    Huỷ đề xuất
                  </Button> */}
                  <Popconfirm
                    title="Bạn có chắc chắn muốn huỷ đề xuất của nhân viên không?"
                    okText="Đúng vậy"
                    cancelText="Sai"
                    okButtonProps={{
                      htmlType: "submit",
                      form: "otherManageRequestForm",
                      type: "default",
                    }}
                    cancelButtonProps={{ type: "primary" }}
                    onConfirm={() => {
                      setFormType({
                        isApprove: false,
                        isDraft: false,
                      });
                    }}
                    onCancel={() => {}}
                  >
                    <Button type="primary" danger disabled={disabledButton}>
                      Huỷ đề xuất
                    </Button>
                  </Popconfirm>
                </Space>
              </Row>
              <Row justify="end" className="justify-content-sm-center">
                <Space>
                  <Button
                    type="primary"
                    className="btn-success"
                    htmlType="submit"
                    onClick={() => {
                      setFormType({
                        isApprove: null,
                        isDraft: true,
                      });
                    }}
                    disabled={disabledButton}
                  >
                    Lưu tạm
                  </Button>
                  <Button onClick={handleClose}>Đóng</Button>
                </Space>
              </Row>
            </AntdForm>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default OtherRoleModal;
