import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Core.css";
import { toast } from "react-toastify";

const Core = ({ isEditMode, intialState, handleOnChange, page }) => {
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
          target: { name: "core_competencies_image", value: file_current },
        });
      };
      if (file_current) {
        reader.readAsDataURL(file_current);
      }
    }
  };

  const handleCompetencyChange = (index, value) => {
    const competencyData = intialState.core_competencies.split("=");
    competencyData[index] = value;
    const updatedCompetencies = competencyData.join("=");
    handleOnChange({
      target: { name: "core_competencies", value: updatedCompetencies },
    });
  };

  const handleCompetencyInfoChange = (index, value) => {
    const competencyInfoData = intialState.core_competencies_info.split("=");
    competencyInfoData[index] = value;
    const updatedCompetenciesInfo = competencyInfoData.join("=");
    handleOnChange({
      target: {
        name: "core_competencies_info",
        value: updatedCompetenciesInfo,
      },
    });
  };

  return (
    <>
      <div className="core">
        <div style={isEditMode?{ flexGrow: '1', marginRight: '10px' }:{ flexGrow: '0', marginRight: '0px' }}>
          {isEditMode ? (
            <Form.Control
              className="edit-textarea"
              as="input"
              name="core_competencies_header"
              value={intialState.core_competencies_header}
              style={{width: '80%'}}
              onChange={handleOnChange}
            />
          ) : (
            <h1 className="core_h">
              <b>{intialState.core_competencies_header}</b>
            </h1>
          )}
          {isEditMode ? (
            <div>
              {intialState.core_competencies?.split("=").map((item, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Core Competency"
                    name={`core_competencies[${index}]`}
                    value={item}
                    style={{width: '80%'}}
                    onChange={(e) =>
                      handleCompetencyChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <ul className="core-list">
              {intialState.core_competencies?.split("=").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        {page === "VersionA" && (
          <div>
            {isEditMode ? (
              <div className="edit-core">
                <div className="edit_core_info">
                  <Form.Label>Core Competencies Info</Form.Label>
                  {intialState.core_competencies_info
                    ?.split("=")
                    .map((item, index) => (
                      <div key={index}>
                        <Form.Control
                          type="text"
                          placeholder="Enter Core Competency Info"
                          name={`core_competencies_info[${index}]`}
                          value={item}
                          onChange={(e) =>
                            handleCompetencyInfoChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="core_right">
                {intialState.core_competencies_info
                  ?.split("=")
                  .map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </div>
            )}
          </div>
        )}

        {page !== "VersionA" && (
          <div className="core_img">
            {isEditMode ? (
              <>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <img
                  className="core_img"
                  src={pic ? pic : intialState.core_competencies_image}
                  alt="Uploaded"
                />
              </>
            ) : (
              intialState.core_competencies_image && (
                <img
                  className="core_img"
                  src={pic ? pic : intialState.core_competencies_image}
                  alt="Uploaded"
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Core;
