import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Head.css";

const Head = ({ isEditMode, intialState, handleOnChange, Logo_Url, page }) => {

  const [pic, setPic] = useState("");
  const handleImageUpload = (e) => {
    const file_current = e.target.files[0];
    if (file_current.size > 10240000) {
      toast.error("File size cannot exceed more than 10MB");
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPic(e.target.result);
        handleOnChange({
          target: { name: "logo_image", value: file_current },
        });
      };
      if (file_current) {
        reader.readAsDataURL(file_current);
      }
    }
  };

  return (
    <>
      <div className="head">
        <div className="main">
          <div className="logo">
            {isEditMode ? (
              <>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <img
                  className="logo"
                  src={pic ? pic : intialState.logo_image}
                  alt="Uploaded"
                />
                <br></br>
              </>
            ):(
              <>
                <img
                  className="logo"
                  src={pic ? pic : intialState.logo_image}
                  alt="default-logo"
                />
              </>
            )}
          </div>

          <div className="heading">
            {isEditMode ? (
              <Form.Control
                className="edit_info"
                type="text"
                name="header_name"
                style={{ fontSize: 'x-large' }}
                value={intialState.header_name}
                onChange={handleOnChange}>

              </Form.Control>
            ):(
              <h1 className="head_h"><b>{intialState.header_name}</b></h1>
            )}
          </div>
        </div>

        {page === "VersionA" ? (
          <>
          <div className="info">
            {isEditMode ? (
              <>
                <Form.Control
                  className="edit_info"
                  type="text"
                  placeholder="Company info"
                  name="company_info"
                  value={intialState.company_info}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="company_address1"
                  placeholder="company address 1"
                  value={intialState.company_address1}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  placeholder="companyAddress2"
                  name="company_address2"
                  value={intialState.company_address2}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="owner_name"
                  value={intialState.owner_name}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="owner_phone"
                  value={intialState.owner_phone}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="owner_email"
                  value={intialState.owner_email}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="url"
                  value={intialState.url}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
              </>
            ) : (
              <>
                <p className="company-info">{intialState.company_info}</p>
                <p className="company-address">{intialState.company_address1}</p>
                <p className="company-address">{intialState.company_address2}</p>
                <p className="owner-info">{intialState.owner_name}</p>
                <p className="owner-info">{intialState.owner_phone}</p>
                <p className="owner-info">{intialState.owner_email}</p>
                <p className="website">
                  <a target="_blank" href={intialState.url}>{intialState.url}</a>
                </p>
              </>
            )}
          </div>
          </>
        ):(
          <>
          <div className="info">
            {isEditMode ? (
              <>
                <Form.Control
                  className="edit_info"
                  type="text"
                  placeholder="compony info"
                  name="company_info"
                  value={intialState.company_info}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="company_address1"
                  placeholder="company address 1"
                  value={intialState.company_address1}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  placeholder="companyAddress2"
                  name="company_address2"
                  value={intialState.company_address2}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="owner_name"
                  value={intialState.owner_name}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="owner_phone"
                  value={intialState.owner_phone}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="edit_info"
                  type="text"
                  name="owner_email"
                  value={intialState.owner_email}
                  style={{ width: '25vw', textAlign: 'right' }}
                  onChange={handleOnChange}
                />
              </>
            ) : (
              <>
                <p className="company-info">{intialState.company_info}</p>
                <p className="company-address">{intialState.company_address1}</p>
                <p className="company-address">{intialState.company_address2}</p>
                <p className="owner-info">{intialState.owner_name}</p>
                <p className="owner-info">{intialState.owner_phone}</p>
                <p className="owner-info">{intialState.owner_email}</p>
              </>
            )}
          </div>
          </>
        )}

      </div>
      <div className="line"></div>
    </>
  );
};

export default Head;
