import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Row, Col, message, Button, Form as AntdForm } from "antd";

import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";
import ImageUpload from "../../../compoment/ImageMultipleUpload/ImageUpload";
import requestApi from "../../../helper/axios/facilityApi/requestApi";
import Modal from "antd/lib/modal/Modal";

const AddRequest = (props) => {
  const { isAddRequestOpen, setIsAddRequestOpen, setIsRerender } = props;
  const [fmBigGroupType, setFmBigGroupType] = useState();
  const [fmUnit, setFmUnit] = useState(null);
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const initForm = {
    fmName: "",
    fmBigGroup: "",
    purpose: "",
    quantity: 1,
    specs: "",
    imgUpload: "",
    unit: Array.isArray(fmUnit) ? fmUnit[0].value : "",
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const digitsOnly = (value) => /^\d+$/.test(value);

  const validationForm = Yup.object().shape({
    fmName: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    fmBigGroup: Yup.string().min(1).required("Vui lòng chọn thông tin"),
    purpose: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    quantity: Yup.string()
      .min(1)
      .required("Vui lòng nhập thông tin")
      .test("Digits only", "Vui lòng chỉ nhập số", digitsOnly),
    unit: Yup.string().required("Vui lòng nhập thông tin"),
  });

  useEffect(() => {
    const fetchFNBigGroup = async () => {
      try {
        const data = await requestApi.getAllFMType();
        setFmBigGroupType(data.allType);
        setFmUnit(data.unitType);
      } catch (error) {
        message.error(
          "Something went wrong! Please contact IT Support or try again",
          10
        );
      }
    };
    fetchFNBigGroup();
  }, []);

  const handleSubmitForm = async (values, actions) => {
    actions.setSubmitting(false);
    console.log(values);
    const formData = new FormData();
    for (let key of Object.keys(files)) {
      formData.append("imgCollection", files[key]);
    }
    formData.append("facilityRequest", JSON.stringify(values));
    try {
      await requestApi.postRequest(formData);
      actions.resetForm();
      actions.setSubmitting(false);
      setIsAddRequestOpen(false);
      setPreviewURLs([]);
      setFiles([]);
      setIsRerender((pre) => !pre);
      message.success("Upload Completed", 5);
    } catch (error) {
      console.log(error);
      message.error(
        "Something went wrong! Please contact IT Support or try again",
        10
      );
    }
  };

  return (
    <Modal
      title="Thêm đề xuất"
      visible={isAddRequestOpen}
      footer={null}
      centered
      width={960}
      onCancel={() => {
        setPreviewURLs([]);
        setFiles([]);
        setIsAddRequestOpen(false);
      }}
      maskClosable={false}
      destroyOnClose={true}
    >
      <div className="fm-rq">
        <Formik
          initialValues={initForm}
          validationSchema={validationForm}
          onSubmit={handleSubmitForm}
          enableReinitialize={true}
        >
          {({ handleSubmit, submitCount, values }) => {
            return (
              <AntdForm
                {...layout}
                onFinish={handleSubmit}
                className="fm-rq__wrapper"
              >
                <Row gutter={[48, 16]}>
                  <Col xs={24} lg={12}>
                    <Field
                      component={CreateAntField}
                      name="fmName"
                      type="text"
                      label="Danh mục đề xuất*"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      component={CreateAntField}
                      name="fmBigGroup"
                      type="select"
                      label="Loại danh mục *"
                      selectOptions={fmBigGroupType}
                      submitCount={submitCount}
                      hasFeedback
                      style={{ minWidth: 150 }}
                    />
                  </Col>
                </Row>
                <Row gutter={[48, 16]}>
                  <Col xs={24} lg={12}>
                    <Field
                      component={CreateAntField}
                      name="purpose"
                      label="Mục đích sử dụng*"
                      type="textarea"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      component={CreateAntField}
                      name="specs"
                      label="Quy cách cấu hình"
                      type="textarea"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                </Row>
                <Row gutter={[48, 16]}>
                  <Col xs={24} lg={12}>
                    <Field
                      component={CreateAntField}
                      name="quantity"
                      label="Số lượng đề xuất *"
                      type="number"
                      submitCount={submitCount}
                      hasFeedback
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Field
                      component={CreateAntField}
                      name="unit"
                      label="Đơn vị tính *"
                      type="select"
                      selectOptions={fmUnit}
                      submitCount={submitCount}
                      hasFeedback
                      defaultValue={values.unit}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
                {/* <Row>
                  <Col xs={24}>
                    <Collapse
                      // bordered={false}
                      defaultActiveKey={null}
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                    >
                      <Panel
                        header="Thông tin bổ sung (nếu có)"
                        key="1"
                        className="panel"
                      >
                        <div className="panel__content">aa</div>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row> */}

                <ImageUpload
                  files={files}
                  setFiles={setFiles}
                  previewURLs={previewURLs}
                  setPreviewURLs={setPreviewURLs}
                />

                <Row justify="center" style={{ marginTop: "2rem" }}>
                  <Button type="primary" htmlType="submit" className="border">
                    Gửi thông tin
                  </Button>
                </Row>
              </AntdForm>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddRequest;
