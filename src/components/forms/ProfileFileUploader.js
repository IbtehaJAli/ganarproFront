import React, { useRef } from "react";
import { Form } from "react-bootstrap";

const ProfileFileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    // onFileSelect(e.target.files[0]);
    const file = e.target.files[0];
    if (file.size > 1024000)
      onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else onFileSelectSuccess(file);
  };

  return (
    <Form.Control
      accept="image/*"
      style={{ marginLeft: "1.5em" }}
      type="file"
      name="company_name"
      onChange={handleFileInput}
      className="w-80 "
    />
  );
};

export default ProfileFileUploader;
