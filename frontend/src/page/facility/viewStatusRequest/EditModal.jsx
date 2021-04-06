import { Col, message, Row, Form as AntForm } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik, Field } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";
import ImageUpload from "../../../compoment/ImageMultipleUpload/ImageUpload";
import requestApi from "../../../helper/axios/facilityApi/requestApi";

const EditModal = (props) => {
  const { setShowEditModal, showEditModal, record, setIsRerender } = props;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const initForm = {
    fmName: record.fmName,
    fmBigGroup: record.fmBigGroup.label,
    purpose: record.purpose,
    quantity: record.quantity,
    specs: record.specs,
    imgCollection: record.imgCollection,
    unit: record.unit.label,
  };

  const [fmBigGroupType, setFmBigGroupType] = useState();
  const [fmUnit, setFmUnit] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const formRef = useRef();

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
    const imgPreview = record.imgCollection.map((item) => ({
      key: item,
      preview: item,
    }));
    setPreviewURLs(imgPreview);
  }, [record]);

  const handleCancel = (e) => {
    setShowEditModal(false);
  };

  const handleOk = async (ref) => {
    const formData = new FormData();
    if (files.length > 0) {
      for (let key of Object.keys(files)) {
        formData.append("imgCollection", files[key]);
      }
    }
    formData.append("facilityRequest", JSON.stringify(ref.current.values));
    try {
      await requestApi.editRequest(record._id, formData);
      message.success("This information was updated successfully.");
      setPreviewURLs([]);
      setFiles([]);
      setShowEditModal(false);
      setIsRerender((pre) => !pre);
    } catch (error) {
      message.error("Something went wrong.");
    }
  };

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

  return (
    <Modal
      title="Sửa thông tin đề xuất"
      visible={showEditModal}
      onOk={() => handleOk(formRef)}
      onCancel={handleCancel}
      width={960}
      maskClosable={false}
      destroyOnClose
      centered
      className="fm-edit"
    >
      <Formik
        initialValues={initForm}
        validationSchema={validationForm}
        innerRef={formRef}
      >
        {({ handleSubmit, submitCount, values }) => {
          return (
            <AntForm onFinish={handleSubmit} {...layout}>
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
                    style={{ minWidth: 200 }}
                  />
                </Col>
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
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="quantity"
                    label="Số lượng đề xuất *"
                    type="number"
                    submitCount={submitCount}
                    hasFeedback
                    defaultValue={values.quantity}
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
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
              <ImageUpload
                files={files}
                setFiles={setFiles}
                previewURLs={previewURLs}
                setPreviewURLs={setPreviewURLs}
              />
            </AntForm>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditModal;
