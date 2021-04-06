import React from "react";

const BtnUpload = (props) => {
  const { handleClick } = props;

  return (
    <div
      onClick={handleClick}
      className="btn btn__upload text-center border"
      style={{ marginBottom: "1rem" }}
    >
      Chọn hình ảnh (nếu có)
    </div>
  );
};

export default BtnUpload;
