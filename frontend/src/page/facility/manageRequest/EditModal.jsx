import React, { useRef, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import {
  Descriptions,
  Row,
  Form as AntdForm,
  Col,
  Button,
  Space,
  Image,
  Divider,
  message,
} from "antd";
import { Field, Formik } from "formik";
import * as Yup from "yup";

import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";
import Roles from "../../../helper/config/Roles";
import localStorageService from "../../../helper/localStorage/localStorageService";
import convertMoney from "../../../helper/other/ConvertMoney";
import manageRequest from "../../../helper/axios/facilityApi/manageApi";

const HEAD_ROLE = [
  Roles.FM_FACILITY_TEAM_LEAD,
  Roles.FM_DEPUTY_HEAD,
  Roles.FM_ADMIN_LEAD,
  Roles.DIRECTOR,
  Roles.ACCOUNTANT_LEAD,
];

const getCurrentRole = (userRole) => {
  for (const role of userRole) {
    if (HEAD_ROLE.includes(role)) {
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

const EditModal = (props) => {
  let disabledButton = false;
  const { setIsRerender, record, isModalOpen, setIsModalOpen } = props;
  const [totalPrice, setTotalPrice] = useState({
    label:
      record.unitPricePredict > 0
        ? convertMoney(record.unitPricePredict * record.quantity)
        : 0,
    value:
      record.unitPricePredict > 0
        ? record.unitPricePredict * record.quantity
        : 0,
  });
  const [formType, setFormType] = useState({
    isApprove: null,
    isDraft: false,
  });
  const formRef = useRef();
  const roleKey = getCurrentRoleKey(
    getCurrentRole(localStorageService.getRole())
  );
  if (record.status.isFMTeamLeadApproval !== null) {
    disabledButton = true;
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const initForm = {
    specs: record ? record.specs : "",
    unitPricePredict: record ? record.unitPricePredict : "",
    note:
      record && record.notes && record.notes[roleKey]
        ? record.notes[roleKey]
        : "",
  };

  const handleTotalPrice = (value) => {
    const total = value * record.quantity;
    setTotalPrice((pre) => ({
      label: convertMoney(total),
      value: total,
    }));
  };

  const handleSubmitForm = async () => {
    const facilityRequest = {
      ...formRef.current.values,
      isFMLeadApprove: formType.isApprove,
      isDraft: formType.isDraft,
    };

    try {
      await manageRequest.putFMTeamLeadEditRequest(record._id, facilityRequest);

      message.success("Task saved!", 5);
      setIsModalOpen(false);
      setIsRerender((pre) => !pre);
    } catch (error) {
      message.error("Something went wrong! Can't save your request!", 5);
    }
  };

  const handleClose = () => {
    setTotalPrice({ label: 0, value: 0 });
    setIsModalOpen(false);
  };

  const validationRejectForm = Yup.object().shape({
    note: Yup.string().min(1).required("Vui l??ng nh???p th??ng tin"),
    unitPricePredict: Yup.number().notRequired(),
    specs: Yup.string().min(1).notRequired("Vui l??ng nh???p th??ng tin"),
  });
  const validationAcceptForm = Yup.object().shape({
    unitPricePredict: Yup.number()
      .moreThan(0, "Vui l??ng nh???p s??? l???n h??n 0")
      .typeError("Vui l??ng ch??? nh???p s???")
      .required("Vui l??ng nh???p th??ng tin"),
    specs: Yup.string().min(1).required("Vui l??ng nh???p th??ng tin"),
    note: Yup.string().min(1).notRequired("Vui l??ng nh???p th??ng tin"),
  });

  return (
    <Modal
      title="Chi ti???t ????? xu???t"
      visible={isModalOpen}
      width={960}
      centered
      footer={null}
      onCancel={handleClose}
      destroyOnClose
    >
      <Descriptions title="Th??ng tin ng?????i ????? xu???t" bordered>
        <Descriptions.Item label="T??n nh??n vi??n">
          {record.employeeId.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="B??? ph???n">
          {record.employeeId.department}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="center">Th??ng tin ????? xu???t</Divider>
      <Row gutter={[48, 16]}>
        <Col xs={24} sm={12}>
          T??n danh m???c: {record.fmName}
        </Col>
        <Col xs={24} sm={12}>
          Lo???i danh m???c: {record.fmBigGroup.label}
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col xs={24} sm={12}>
          S??? l?????ng: {record.quantity}
        </Col>
        <Col xs={24} sm={12}>
          ????n v??? t??nh: {record.unit.label}
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col xs={24}>M???c ????ch: {record.purpose}</Col>
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
      <Divider orientation="center">Th??ng tin b??? sung</Divider>

      <Formik
        initialValues={initForm}
        onSubmit={handleSubmitForm}
        innerRef={formRef}
        validationSchema={
          formType.isApprove ? validationAcceptForm : validationRejectForm
        }
      >
        {({ handleSubmit, submitCount, values }) => {
          return (
            <AntdForm onFinish={handleSubmit} {...layout}>
              <Row gutter={[48, 16]}>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="unitPricePredict"
                    type="number"
                    label="????n gi?? (d??? ki???n)*"
                    submitCount={submitCount}
                    hasFeedback
                    setOtherValue={handleTotalPrice}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Row>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <strong>Th??nh ti???n:</strong>
                    </Col>
                    <Col offset={1}>
                      <strong>{totalPrice.label} VND</strong>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[48, 16]}>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="specs"
                    type="textarea"
                    label="Quy c??ch*"
                    submitCount={submitCount}
                    hasFeedback
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="note"
                    type="textarea"
                    label="Ghi ch??"
                    submitCount={submitCount}
                    hasFeedback
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
                    Duy???t ????? xu???t
                  </Button>
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    onClick={() =>
                      setFormType({
                        isApprove: false,
                        isDraft: false,
                      })
                    }
                    disabled={disabledButton}
                  >
                    Hu??? ????? xu???t
                  </Button>
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
                    L??u t???m
                  </Button>
                  <Button onClick={handleClose}>????ng</Button>
                </Space>
              </Row>
            </AntdForm>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditModal;
