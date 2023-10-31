import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Past.css";
import { toast } from "react-toastify";

const Past = ({ isEditMode, intialState, handleOnChange, page }) => {
  const [pic, setPic] = useState("");
  const handleImageUpload = (e) => {
    const file_current = e.target.files[0];
    if (file_current.size > 10240000) {
      toast.error("File size cannot exceed more than 10MB");
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPic(e.target.result); // Set the pic state with the uploaded image data
        handleOnChange({
          target: { name: "past_performance_image", value: file_current },
        });
      };
      if (file_current) {
        reader.readAsDataURL(file_current);
      }
    }
  };

  const handlePerformanceChange = (index, column, value) => {
    const performanceData = intialState.past_performance.split("=");
    performanceData[index * 2 + column] = value;
    const updatedPerformance = performanceData.join("=");
    handleOnChange({
      target: { name: "past_performance", value: updatedPerformance },
    });
  };

  return (
    <>
    <div className="past">
      <div className="past_img">
        {isEditMode ? (
          <>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <img
              className="past_img"
              src={pic ? pic : intialState.past_performance_image}
              alt="Uploaded"
            /></>
        ) : (
          intialState.past_performance_image && (
            <img
              className="past_img"
              src={pic ? pic : intialState.past_performance_image}
              alt="Uploaded"
            />
          )
        )}
      </div>

      <div className="performance" style={{textAlign:'start', minWidth:'150px'}}>
        {isEditMode ? (
          <Form.Control
            className="edit-textarea"
            as="input"
            name="past_performance_header"
            value={intialState.past_performance_header}
            onChange={handleOnChange}
          />
        ) : (
          <h1>
            <b>{intialState.past_performance_header}</b>
          </h1>
        )}
        {isEditMode ? (
          <tbody>
            {[0, 1, 2, 3].map((index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter Performance"
                    name={`past_performance[${index}][0]`}
                    value={
                      intialState.past_performance?.split("=")[index * 2] || ""
                    }
                    style={{width: '20vw'}}
                    onChange={(e) =>
                      handlePerformanceChange(index, 0, e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter Performance"
                    name={`past_performance[${index}][1]`}
                    value={
                      intialState.past_performance?.split("=")[index * 2 + 1] ||
                      ""
                    }
                    style={{width: '20vw'}}
                    onChange={(e) =>
                      handlePerformanceChange(index, 1, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <table className="performance-table">
            <tbody>
              {intialState.past_performance?.split("=").map(
                (item, index) =>
                  index % 2 === 0 && (
                    <tr key={index}>
                      <td>{item}</td>
                      <td>
                        {intialState.past_performance?.split("=")[index + 1] ||
                          ""}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </>
  );
};

export default Past;
