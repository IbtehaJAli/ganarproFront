import React, { useRef, useState } from "react";
import addIcon from "../../assets/icons/add.svg";

import "./Accordion.css";

const Accordion = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "accordion-active" : "");
    setHeightState(
      setActive === "accordion-active"
        ? "0px"
        : `${content.current.scrollHeight}px`
    );
  }
  return (
    <div className={`d-flex flex-column bg-white  ${props.accordionClass}`}>
      <button
        className={`accordion-filter px-0  d-flex bg-white text-black justify-content-between border-0 ${setActive}`}
        onClick={toggleAccordion}
      >
        <div className="accordion__title ">{props.title}</div>
        <img src={addIcon} alt="add" />
      </button>
      <div
        ref={content}
        className="accordion__content"
        style={{ maxHeight: `${setHeight}` }}
      >
        <div className="accordion__text">{props.children}</div>
      </div>
    </div>
  );
};

export default Accordion;
