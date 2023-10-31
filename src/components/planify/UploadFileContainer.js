import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { isSubscriptionActive } from "../../utils/helpers/helper";
import { updatePreQualifyFile } from "../../store/actions/gc_qualify/gcQualify.actions";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

const UploadFileContainer = ({
  row,
  handleSetLoginModal,
  handleSetPaymentModal,
  handleSetFreeMode,
  price_id,
  free_mode_count,
  user
}) => {

  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const { loading } = useSelector((state) => state.preQualifyUpdate);
  useEffect(() => {
    if (
      row.max_upload !== "null" &&
      row.max_upload !== null &&
      row.max_upload !== undefined &&
      row.max_upload !== ""
    ) {
      const fileName = row.max_upload
        .split("/")
        .pop()
        .replaceAll("%20", " ")
        .slice(0, -4);
      setFile(fileName);
    }
  }, [row.max_upload]);

  const handleFileInput = (e) => {
    // handle validations
    const file_current = e.target.files[0];
    if (file_current?.size > 10240000) {
      toast.error("File size cannot exceed more than 10MB");
    } else {
      setFile(file_current["name"]); // Update the file state with the name
      let formData = new FormData();
      formData.append("upload", file_current);
      formData.append("company_account_id", row.id);
      dispatch(updatePreQualifyFile(formData));
    }
  };

  useEffect(() => {
    if (typeof file === "object") {
      setFile(file["name"]);
    }
  }, [file]);

  const handleClick = () => {
    if (!user) {
      handleSetLoginModal();
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      handleSetPaymentModal();
    } else {
      fileInput.current.click();
    }
  };

  const handleClick2 = () => {
    if (!user) {
      handleSetLoginModal();
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      handleSetPaymentModal();
    } else {
      if (row.max_upload !== null && row.max_upload !== undefined && row.max_upload !== "null") {
        fetch(row.max_upload, {
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
        toast.error(
          "Recently uploaded file not available for download. \nRefresh Page to download it."
        );
      } else {
        toast.error("No File Found");
      }
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
      <div className="d-flex">
        {loading ? (
            <Spinner animation="border" variant="primary" style={{marginLeft: '15px', alignSelf: 'center'}}/>
        ):(
          <>
            <Button
              onClick={handleClick}
              style={{
                width: "34%",
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
                width: "19%",
                marginLeft: "5px",
                fontSize: "12px",
                backgroundColor: "white",
                borderColor: "black",
                color: "black",
              }}
            >
              <BsDownload size={18}></BsDownload>
            </Button>
          </>
        )}
      </div>
      <div className="d-flex flex-column">
        <Form.Control
          value={file} // Use the file state to set the value of the input field
          style={{ width: "55%" }}
          disabled={true}
        />
      </div>
    </>
  );
};

export default UploadFileContainer;
