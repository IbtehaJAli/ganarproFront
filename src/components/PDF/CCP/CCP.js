import React from "react";
import { Form } from "react-bootstrap";
import "./CCP.css";

const CCP = ({ isEditMode, intialState, handleOnChange,page }) => {
  const handleDifferenceBulletsChange = (index, value) => {
    const bulletsData = intialState.difference_bullets.split("=");
    bulletsData[index] = value;
    const updatedCompetencies = bulletsData.join("=");
    handleOnChange({
      target: { name: "difference_bullets", value: updatedCompetencies },
    });
  };

  return (
    <div className="ccp">

      {isEditMode ? (
        <Form.Control
          className="edit-textarea"
          as="input"
          name="difference_header"
          value={intialState.difference_header}
          onChange={handleOnChange}
        />
      ) : (
        <h1 className="ccp_h" style={isEditMode?{marginTop:'25px'}:{}}>
          <b>{intialState.difference_header}</b>
        </h1>
      )}

      {isEditMode ? (
        <Form.Control
          className="edit-textarea"
          as="textarea"
          rows={4}
          name="difference"
          value={intialState.difference}
          onChange={handleOnChange}
        />
      ) : (
        <p>{intialState.difference}</p>
      )}
      {
        page !== "A" && <>{isEditMode ? (
          <div>
            {intialState.difference_bullets?.split("=").map((item, index) => (
              <div key={index}>
                <Form.Control
                  type="text"
                  placeholder="Enter Bullets"
                  name={`difference_bullets[${index}]`}
                  value={item}
                  onChange={(e) =>
                    handleDifferenceBulletsChange(index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <ul className="ccp-list">
            {intialState.difference_bullets?.split("=").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}</>
      }

    </div>
  );
};

export default CCP;
