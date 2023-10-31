import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./versionbutton.css";
import { AiOutlineEdit, AiFillDelete, AiOutlineLoading } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  DeleteStatement,
  GetTotalStatement,
  GetUserSpeicificStatement,
  ResetState,
} from "../../store/actions/PDF/pdf.actions";
import { useSelector } from "react-redux";

import { Button, Modal, FormControl } from "react-bootstrap";
import PDFVersion_A from "./Versions/PDFVersion_A";
import PDFVersion_B from "./Versions/PDFVersion_B";
import { toast } from "react-toastify";

const PDF = () => {
  const { pdfs, loading, error } = useSelector((state) => state.pdf);
  const [version, setVersion] = useState("");
  const [ok, setOk] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the pop-up
  const [DeleteName, setDeleteName] = useState(""); // State to control the pop-up
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const queryString = location?.search;
  // Remove the leading "?" character
  const queryParamValue = queryString.slice(1);
  const onOverview = () => {
    setOk(false);
    setVersion("");
    setShowPDF(false);
  };
  const onClick = () => {
    setOk(true);
    setVersion("");
  };
  const handleDelete = (p) => {
    setDeleteName(p);
    setShowPopup(true);
  };
  const ConfirmDelete = () => {
    dispatch(DeleteStatement(DeleteName, setShowPopup, setOk, setVersion));
  };
  const handleEdit = (p) => {
    setShowPDF(true);
    dispatch(GetUserSpeicificStatement(p, navigate, setVersion));
  };
  useEffect(() => {
    dispatch(GetTotalStatement());
  }, []);

  const handleVersion = (v) => {
    setVersion(v);
    setShowPDF(true);
    dispatch(ResetState(v));
  };

  const handleOnEdit = (e) => {
    setShowPDF(!e);
    if (e && !user) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (queryParamValue) {
      dispatch(
        GetUserSpeicificStatement(queryParamValue, navigate, setVersion)
      );
    }
  }, [queryParamValue]);
  return (
    <>
      <div style={{ overflow: "auto" }}>
        {ok && version === "" ? (
          <>
            <h1 id="nb" className="text-center mt-5">
              CHOOSE YOUR VERSION
            </h1>
            <div id="nb" className="version">
              <a className="link" onClick={() => handleVersion("A")}>
                <div className="v_box">
                  <img
                    className="v_pic"
                    src="https://res.cloudinary.com/dc367rgig/image/upload/v1694260593/VA_iup5ma.png"
                    alt="VERSION_A"
                  />
                </div>
              </a>
              <a className="link" onClick={() => handleVersion("B")}>
                <div className="v_box">
                  <img
                    className="v_pic"
                    src="https://res.cloudinary.com/dc367rgig/image/upload/v1694260594/VB_oljydc.png"
                    alt="VERSION_B"
                  />
                </div>
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="in_row">
              <div id="nb" className="CCP_List side_bar">
                {version !== 'A' ? (
                  <>
                    <h1 className="head">Capability Statements</h1>
                    {pdfs?.map((p) => {
                      return (
                        <div className="pdf_list">
                          {p}
                          <span className="icons">
                            {" "}
                            {loading && error == null ? (
                              <AiOutlineLoading size={20} color="blue" />
                            ) : (
                              <AiOutlineEdit
                                cursor="pointer"
                                onClick={() => handleEdit(p)}
                                size={20}
                                color="blue"
                              />
                            )}{" "}
                            <AiFillDelete
                              cursor="pointer"
                              onClick={() => handleDelete(p)}
                              size={20}
                              color="red"
                            />
                          </span>
                        </div>
                      );
                    })}
                  </>
                ): (
                  ""
                )}

                {pdfs?.length === 5 || version === 'A' || version === 'B' ? (
                  ""
                ) : (
                  <Button
                    onClick={onClick}
                    className="create_btn"
                    variant="primary"
                    size="lg"
                  >
                    Create New
                  </Button>
                )}

                {showPDF ? (
                  <div className="how_to">
                    <h1>How to Customize</h1>

                    <div>
                      <h2>🔹 Personalize with Your Logo</h2>
                      <h2>
                        Click 'Choose File', find and select your logo, then
                        upload.
                      </h2>
                    </div>

                    <div>
                      <h2>🔹 Update Imagery</h2>
                      <h2>
                        Go to 'Images', click 'Upload New Image', and confirm
                        your selections.
                      </h2>
                    </div>

                    <div>
                      <h2>🔹 Customize Content</h2>
                      <h2>
                        Headers and text. Click to edit and tailor the content
                        to reflect your business's information.
                      </h2>
                    </div>

                    <div>
                      <h2>🔹 Save Your Progress</h2>
                      <h2>
                        After edits, click 'Save', and assign a recognizable
                        name.
                      </h2>
                    </div>

                    <div>
                      <h2>🔹 Download</h2>
                      <h2>
                        Click 'Print to Download' for a print-ready copy. Adjust
                        print settings as needed
                      </h2>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {version === "A" ? (
                <div className="ttp">
                  <PDFVersion_A onOverview={onOverview} onEdit={handleOnEdit} />
                </div>
              ) : version === "B" ? (
                <div className="ttp">
                  {" "}
                  <PDFVersion_B
                    onOverview={onOverview}
                    onEdit={handleOnEdit}
                  />{" "}
                </div>
              ) : (
                <>
                  {" "}
                  <div className="c_main" id="nb">
                    <div className="c_head">
                      <img className="c_pic" src="Logo.png" alt="" />
                      <h1 className="c_h1">Capability Statement</h1>
                    </div>
                    <div className="c_info">
                      <h2 className="c_title">
                        Empower Your Enterprise: Showcase Your Experience with
                        Precision and Clarity
                      </h2>
                      <p className="c_para">
                        Boast your corprate image using the Ganarpro Capability
                        Statement. Tailored to engage the businesses of all
                        sizes, this instrument provides a one-page view that
                        encapsulates your firm's foundational strength. With the
                        availabilty of two modifiable templates, creates a
                        statement that aligns seamlessly with your brand's
                        voice. Present all pivotal company information on one
                        concise page.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {version === "A" ? (
              ""
            ) : version === "B" ? (
              ""
            ) : (
              <div className="key_features">
                <div className="bullets">
                  <h1 className="c_h1">
                    <b>Key Features</b>
                  </h1>
                  <hr></hr>
                  <ul>
                    <li>Save, Store, Refresh</li>
                    <li>2 Fully customizable templates</li>
                    <li>Suitable for all business types and sizes</li>
                  </ul>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  target="_blank"
                  onClick={onOverview}
                  href="https://learn.ganarpro.com/capability-statement-overview/"
                  className="learn_more"
                >
                  Learn More
                </Button>
              </div>
            )}
          </>
        )}

        <Modal id="nb" show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Are you Sure You want to Delete?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowPopup(false)}
            >
              Close
            </Button>
            <Button
              disabled={loading}
              variant="primary"
              size="lg"
              onClick={ConfirmDelete}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default PDF;
