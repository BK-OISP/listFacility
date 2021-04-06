import React from "react";
import Modal from "antd/lib/modal/Modal";
import { Button, Col, Image, Row } from "antd";

const ViewModal = (props) => {
  const { setShowViewModal, showViewModal, record } = props;
  console.log(record);
  return (
    <Modal
      title="Xem lại đề xuất"
      visible={showViewModal}
      onCancel={() => setShowViewModal(false)}
      centered
      width={960}
      destroyOnClose
      footer={[
        <Button key="back" onClick={() => setShowViewModal(false)}>
          Return
        </Button>,
      ]}
    >
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col xs={24} md={12}>
          Danh mục đề xuất: {record.fmName}
        </Col>
        <Col xs={24} md={12}>
          Loại danh mục: {record.fmBigGroup.label}
        </Col>
        <Col xs={24} md={12}>
          Số lượng đề xuất: {record.quantity}
        </Col>
        <Col xs={24} md={12}>
          Đơn vị tính: {record.unit.label}
        </Col>
        <Col xs={24} md={12}>
          Quy cách: {record.specs}
        </Col>
        <Col xs={24} md={12}>
          Mục dích sử dụng: {record.purpose}
        </Col>
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
    </Modal>
  );
};

export default ViewModal;
