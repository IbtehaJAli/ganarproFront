import React, { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

const CompanyFileUploader = ({
  onFileSelectSuccess,
  onFileSelectError,
  name,
  set_file,
  file_url,
}) => {
  const fileInput = useRef(null);

  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [file_loading, setFileLoading] = useState(true);

  useEffect(() => {
    if (file_loading) {
      setFile(set_file || "");
      setFileUrl(file_url || "");
      if (
        file_url !== "null" &&
        file_url !== null &&
        file_url !== undefined &&
        file_url !== ""
      ) {
        const fileName = file_url
          .split("/")
          .pop()
          .replaceAll("%20", " ")
          .slice(0, -4);
        setFile(fileName);
        setFileLoading(false);
      } else if (
        set_file["name"] !== undefined &&
        set_file["name"] !== "null" &&
        set_file["name"] !== ""
      ) {
        setFile(set_file["name"]);
        setFileLoading(false);
      }
    }
  }, [set_file, file_url]);

  const handleFileInput = (e) => {
    // handle validations
    const file_current = e.target.files[0];
    if (file_current?.size > 10240000) {
      onFileSelectError({ error: "File size cannot exceed more than 10MB" });
    } else {
      setFile(file_current["name"]); // Update the file state with the name
      onFileSelectSuccess(file_current);
    }
  };

  useEffect(() => {
    if (typeof file === "object") {
      setFile(file["name"]);
    }
  }, [file]);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleClick2 = () => {
    if (fileUrl !== null || fileUrl !== "null") {
      fetch(fileUrl, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement("a");
          a.href = url;
          a.download = file;
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    } else if (file) {
      alert(
        "Unable to Download recent uploaded file. \nRefresh Page to download it."
      );
    } else {
      alert("No File Found");
    }
  };

  return (
    <>
      <Form.Control
        ref={fileInput}
        accept=".pdf, image/*"
        type="file"
        onChange={handleFileInput}
        style={{ display: "none" }}
      />
      <br />
      <div className="d-flex">
        <Form.Control
          name={name}
          value={file} // Use the file state to set the value of the input field
          style={{ width: "70%" }}
          disabled={true}
        />
        <Button
          onClick={handleClick}
          style={{
            width: "30%",
            marginLeft: "5px",
            fontSize: "13px",
            backgroundColor: "white",
            borderColor: "black",
            color: "black",
          }}
        >
          Upload
        </Button>
        <Button
          onClick={handleClick2}
          style={{
            width: "15%",
            marginLeft: "5px",
            fontSize: "12px",
            backgroundColor: "white",
            borderColor: "black",
            color: "black",
          }}
        >
          <BsDownload size={18}></BsDownload>
        </Button>
      </div>
    </>
  );
};
export default CompanyFileUploader;
