import React, { useRef } from "react";
import { Row } from "antd";
import BtnUpload from "./BtnUpload";

const ImageUpload = (props) => {
  const { files, setFiles, previewURLs, setPreviewURLs } = props;

  const fileUpload = useRef();

  const showFileUpload = () => {
    if (fileUpload) {
      fileUpload.current.click();
    }
  };

  const loadMultipleFiles = (event) => {
    event.preventDefault();

    const fileList = Array.from(event.target.files);
    setFiles(event.target.files);

    const mappedFiles = fileList.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewURLs(mappedFiles);
  };

  return (
    <>
      <Row justify="center" className="mt-1">
        <input
          type="file"
          multiple
          onChange={loadMultipleFiles}
          style={{ display: "none" }}
          ref={fileUpload}
        />
        <BtnUpload handleClick={showFileUpload} />
      </Row>
      <Row justify="center">(Tối đa 5 hình)</Row>
      <Row justify="center">
        <Row>
          {files.length > 0 &&
            previewURLs.length > 0 &&
            previewURLs.length <= 5 &&
            previewURLs.map((file) => {
              return (
                <img
                  key={file.preview}
                  src={file.preview}
                  alt={file.preview}
                  className="img__preview"
                />
              );
            })}
          {files.length === 0 &&
            previewURLs.length > 0 &&
            previewURLs.map((file) => {
              return (
                <img
                  key={file.preview}
                  src={`${process.env.REACT_APP_API_URL}/oisp/${file.preview}`}
                  alt={file.preview}
                  className="img__preview"
                />
              );
            })}
        </Row>
      </Row>
    </>
  );
};

export default ImageUpload;
