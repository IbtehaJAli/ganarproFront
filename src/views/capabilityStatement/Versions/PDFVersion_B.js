import React, { useEffect, useState } from "react";
import "./PDF.css";
import Head from "../../../components/PDF/Head/Head";
import About from "../../../components/PDF/About/About";
import Core from "../../../components/PDF/Core/Core";
import Past from "../../../components/PDF/Past Performance/Past";
import CCP from "../../../components/PDF/CCP/CCP";
import { FaEdit } from "react-icons/fa";
import { Button, Modal, FormControl } from "react-bootstrap";
import ColorPicker from "../../../components/PDF/Color/ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  EditCapabilityStatement,
  SaveCapabilityStatement,
} from "../../../store/actions/PDF/pdf.actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "paper-css/paper.css"; // Import the Paper CSS stylesheet

const PDFVersion_B = ({ onOverview, onEdit }) => {
  const Data = useSelector((state) => state.pdf);
  const [loading, setLoading] = useState(false);

  const pdf = Data.values;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = user ? user : -1;

  const [name, setName] = useState(pdf?.pdf_name);

  const pdfWrapper = useRef(null);

  const [intialState, setIntialState] = useState({
    userId: id,
    version: "B",
    header_name: pdf?.header_name,
    logo_image: pdf?.logo_image,
    pdf_name: pdf?.pdf_name,
    company_info: pdf.company_info,
    company_address1: pdf.company_address1,
    company_address2: pdf.company_address2,
    owner_name: pdf.owner_name,
    owner_email: pdf.owner_email,
    owner_phone: pdf.owner_phone,
    url: pdf.url,
    about_us_header: pdf.about_us_header,
    about_us: pdf.about_us,
    core_competencies_header: pdf.core_competencies_header,
    core_competencies: pdf.core_competencies,
    core_competencies_image: pdf.core_competencies_image,
    core_competencies_info: pdf.core_competencies_info,
    past_performance_header: pdf.past_performance_header,
    past_performance: pdf.past_performance,
    past_performance_image: pdf.past_performance_image,
    difference_header: pdf.difference_header,
    difference: pdf.difference,
    difference_bullets: pdf.difference_bullets,
  });
  const [borderColor, setBorderColor] = useState("black");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the pop-up

  useEffect(() => {
    onEdit(isEditMode);
  },[isEditMode]);

  useEffect(() => {
    setIntialState({
      userId: id,
      version: "B",
      header_name: pdf?.header_name,
      logo_image: pdf?.logo_image,
      pdf_name: pdf?.pdf_name,
      company_info: pdf.company_info,
      company_address1: pdf.company_address1,
      company_address2: pdf.company_address2,
      owner_name: pdf.owner_name,
      owner_email: pdf.owner_email,
      owner_phone: pdf.owner_phone,
      url: pdf.url,
      about_us_header: pdf.about_us_header,
      about_us: pdf.about_us,
      core_competencies_header: pdf.core_competencies_header,
      core_competencies: pdf.core_competencies,
      core_competencies_image: pdf.core_competencies_image,
      core_competencies_info: pdf.core_competencies_info,
      past_performance_header: pdf.past_performance_header,
      past_performance: pdf.past_performance,
      past_performance_image: pdf.past_performance_image,
      difference_header: pdf.difference_header,
      difference: pdf.difference,
      difference_bullets: pdf.difference_bullets,
    });
    setName(pdf?.pdf_name);
  }, [pdf]);

  const handleOnChange = (e) => {
    setIntialState({
      ...intialState,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleBorderColorChange = (color) => {
    setBorderColor(color);
  };

  const handlePopup = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    setShowPopup(true); // Show the pop-up
  };
  const handleSave = (e) => {
    let formData = new FormData();
    for (const key in intialState) {
      if (intialState[key] !== undefined) {
        formData.append(key, intialState[key]);
      }
    }
    // Check if any field is empty
    const isEmptyField = Object.values(intialState).some(
      (value) => value === ""
    );
    if (isEmptyField) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    if (name === intialState.pdf_name){
      dispatch(EditCapabilityStatement(formData, setIsEditMode, setShowPopup));
    } else {
      dispatch(SaveCapabilityStatement(formData, setIsEditMode, setShowPopup));
      setName(intialState.pdf_name);
    }

  };

  const handlePrint = (e) => {
    setIsEditMode(false);
    e.preventDefault();
    document.title = intialState.pdf_name;
    // Print the content
    window.print();
    document.title = "Ganarpro";
  };

  const handleClose = () => {
    setShowPopup(false); // Close the pop-up
  };

  return (
    <>
      <div id="nb" className="actions_bar">
        <div className="edit">
          <ColorPicker
            borderColor={borderColor}
            onBorderColorChange={handleBorderColorChange}
          />
          {!isEditMode && (
            <div className="edit-button" onClick={handleEditClick}>
              <span>Edit</span>
              <FaEdit size={20} />
            </div>
          )}
          {isEditMode && (
            <Button
              variant="danger"
              size="lg"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </Button>
          )}
        </div>
        <div>
          <Button
            variant="primary"
            size="lg"
            onClick={onOverview}
            style={{ fontSize: "17px" }}
          >
            Overview
          </Button>
        </div>
      </div>

      <div>
        <div id="B_cont" className="A4">
          <div className="PDF_main" style={{ borderColor }}>
            <Head
              handleOnChange={handleOnChange}
              intialState={intialState}
              isEditMode={isEditMode}
              Logo_Url={Data?.logo_url}
            />
            <br />
            <About
              handleOnChange={handleOnChange}
              intialState={intialState}
              isEditMode={isEditMode}
            />
            <br />
            <Core
              handleOnChange={handleOnChange}
              intialState={intialState}
              isEditMode={isEditMode}
            />
            <br />
            <Past
              handleOnChange={handleOnChange}
              intialState={intialState}
              isEditMode={isEditMode}
              page="VersionB"
            />
            <br />
            <CCP
              handleOnChange={handleOnChange}
              intialState={intialState}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
      <div className="s-p" id="nb">
        <Button variant="primary" size="lg" onClick={handlePopup}>
          Save
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handlePrint}
          className={isEditMode ? "d-none" : ""}
        >
          Print
        </Button>
      </div>

      {/* Modal for PDF Name and Print */}
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set PDF Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            value={intialState.pdf_name}
            name="pdf_name"
            placeholder="Enter pdf name"
            onChange={handleOnChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="lg" onClick={handleClose}>
            Close
          </Button>

          <Button
            disabled={Data.loading}
            variant="primary"
            size="lg"
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PDFVersion_B;
