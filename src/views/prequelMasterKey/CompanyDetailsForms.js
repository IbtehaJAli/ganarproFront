import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Image,
  ProgressBar,
} from "react-bootstrap";
import {
  StyledAccordionHeader,
  StyledForm,
} from "../../components/ProposalForm/proposalForm.styled";
import { getCompanyFromsCompletion } from "../../store/actions/company_details/companyDetails.actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import styled from "styled-components";
import BasicCompanyInfo from "./companyDetailForms/basicComapnyForm";
import ContinueCompanyInfo from "./companyDetailForms/continueCompanyForm";
import "./CompanyDetailsForms.css";
import SocialForm from "./companyDetailForms/socialForm";
import OrganizationDetailForm from "./companyDetailForms/organizationDetailsForm";
import ProjectHistoryForm from "./companyDetailForms/projectHistoryForm";
import CurrentWorkProgressForm from "./companyDetailForms/currentWorkProgressForm";
import CompletedWorkForm from "./companyDetailForms/completedWorkForm";
import InsuranceForm from "./companyDetailForms/insuranceForm";
import SafetyForm from "./companyDetailForms/safetyForm";
import FinanceForm from "./companyDetailForms/financeForm";
import SupplierForm from "./companyDetailForms/supplierForm";
import LegalForm from "./companyDetailForms/legalForm";
import ShippingForm from "./companyDetailForms/shippingForm";
import useIsMobile from "../../utils/helpers/use-is-mobile";
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { current } from "@reduxjs/toolkit";
import LoginModal from "../../components/LoginModal";

const TOTAL_FORMS = 13; // Total number of forms

const CompanyDetailsForms = () => {
  const navigate = useNavigate();
  const [current_page, setCurrentPage] = useState(1);
  const [displayHeaders, setDisplayHeaders] = useState(true);
  const [form_data, setFormData] = useState(new Array(13).fill({}));
  const [classList, setClassList] = useState([
    { current: false, previous: false, checked: true },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
    { current: false, previous: false, checked: false },
  ]);
  const formChecksRef = useRef([]);
  const [percentage, setPercentage] = useState(0);

  const progressInfo = useSelector((state) => state.progressInfo);
  const { loading, error, progress_info } = progressInfo;
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    formChecksRef.current.forEach((node, index) => {
      node.parentNode.lastChild.addEventListener("click", () => {
        handleUpdateClass(index);
        setCurrentPage(index + 1);
      });
    });

    dispatch(getCompanyFromsCompletion());
  }, []);

  useEffect(() => {
    if(current_page === 1)
      setDisplayHeaders(true);
    else
      setDisplayHeaders(false);

  }, [current_page]);

  useEffect(() => {
    if (progress_info) {
      let count = parseInt(progress_info.count);
      setPercentage(count);
      for (let model in progress_info.models) {
        const formattedString = progress_info.models[model].replace(
          /([a-z])([A-Z])/g,
          "$1 $2"
        );
        formChecksRef.current.forEach((node, index) => {
          if (node){
            node = node.parentNode;
            let label = node.children[1].textContent;
            if (
              (label.includes(formattedString) ||
              (formattedString.includes("Org Details")  && label.includes("Details") ) ||
              (formattedString.includes("Shipping Receivings") && label.includes("Shipping") ))
            ) {
              setClassList((prevList) => {
                const updatedList = [...prevList];
                updatedList[index]["previous"] = true;
                updatedList[index]["checked"] = true;
                updatedList[index]["current"] = index === current_page - 1;
                return updatedList;
              });
            }
          }
        });
      }
      setClassList((prevList) => {
        const updatedList = [...prevList];
        updatedList[current_page - 1]["current"] = true;
        updatedList[current_page - 1]["checked"] = true;
        return updatedList;
      });
    }
  }, [progress_info, error]);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setClassList((prevList) => {
      const updatedList = [...prevList];
      updatedList[current_page - 1]["current"] = false;
      updatedList[current_page - 1]["checked"] =
        updatedList[current_page - 1]["previous"];
      updatedList[current_page - 2]["current"] = true;
      updatedList[current_page - 2]["checked"] = true;
      return updatedList;
    });
  };

  const handleFormSubmit = (formIndex, data) => {

    if (!user) {
      navigate('/login');
    }

    let dd = {};
    data.forEach((value, key) => {
      dd[key] = value;
    });

    setFormData((prevData) => {
      const updated = [...prevData];
      updated[formIndex] = dd;
      return updated;
    });

    setClassList((prevList) => {
      const updatedList = [...prevList];
      updatedList[formIndex]["previous"] = false;
      updatedList[formIndex]["checked"] = false;
      updatedList[formIndex]["current"] = false;
      return updatedList;
    });
    if (formIndex < TOTAL_FORMS - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentPage(1);
    }
    dispatch(getCompanyFromsCompletion());
  };

  const disableHeaders = () => {
    setDisplayHeaders(false);
  }

  const handleLabelClick = (index) => {
    handleUpdateClass(index);
    setCurrentPage(index + 1);
  };

  const handleLogin = () => {
    if (!user) {
      setLoginModalShow(true);
    }
  };
  const handleUpdateClass = (index) => {
    setClassList((prevList) => {
      return prevList.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            current: true,
            checked: true,
          };
        } else {
          return {
            ...item,
            current: false,
            checked: item.previous,
          };
        }
      });
    });
  };

  // Custom style for the label
  const labelStyle = {
    color: "#F68E39", // Set the desired label color here
    fontWeight: "bold", // Add any additional styles if needed
    marginTop: "-5px",
  };

  return (
    <>
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <Row className={displayHeaders ? "text-start header-card" : "d-none"}>
            <Col style={{fontSize:'18px'}}>
              <h1 className="mb-4"><b>Ganarpro Prequel MasterKey</b></h1>
              <h2 className="mb-4">Manage, store, and share Company details, publicly or privately</h2>
              <p className="mb-5">Ganarpro Prequel MasterKey is a comprehensive cloud-based vendor application form that centralizes business details for easy management from any location, streamlining the process.</p>
              <a href="https://www.ganarpro.com/support/guide-how-to-use-ganarpro-prequel-masterkey/" target="_blank" style={{ fontSize:'15px', textAlign: 'justify', textDecoration:'none' }}> <h3><b>How it Works <FaArrowUpRightFromSquare /></b></h3> </a>
            </Col>
            <Col xs={isMobile ? 12 : 5 } className={isMobile ? 'mobile-view-card' : ''}>
              <div className="upper-card">
                <h3>Build your company</h3>
                <Button className="btn btn-warning" style={{fontSize:'17px'}} onClick={ (e) => disableHeaders()} >Get started</Button>
              </div>
              <div className={isMobile ? 'upper-card' : 'upper-card mt-4'}>
                <h2>Pricing (US) </h2>
                <p>You pay monthly to store your data in your private repository.  You can freely use and store data until you reach the company details section.</p>
                <hr></hr>
                <a href="#" style={{ textAlign: 'justify', textDecoration:'none' }} > Learn More <FaArrowUpRightFromSquare /> </a>
              </div>
            </Col>
          </Row>
          <Row>
            {isMobile ? (
              ""
            ) : (
              <Col
                xs={4}
                style={{ width: "25%" }}
                className="d-flex flex-column align-items-center mt-5"
              >
                <Row>
                  <Form.Label>
                    <b>Company Details</b>
                  </Form.Label>
                  <ProgressBar
                    now={percentage}
                    style={{
                      height: "8px",
                      margin: "6px",
                      padding: "0px",
                      width: "90%",
                    }}
                  ></ProgressBar>
                  {loading ? (
                    <div style={labelStyle}>... Loading Progress </div>
                  ) : (
                    <div style={labelStyle}>{`${percentage}% Completed`}</div>
                  )}
                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[0].current ? "current" : ""} ${
                      classList[0].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Basic Company"
                    checked={classList[0].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(0);
                    }}
                    ref={(el) => (formChecksRef.current[0] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[1].current ? "current" : ""} ${
                      classList[1].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Company Info Continued"
                    checked={classList[1].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(1);
                    }}
                    ref={(el) => (formChecksRef.current[1] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[2].current ? "current" : ""} ${
                      classList[2].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Socials"
                    checked={classList[2].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(2);
                    }}
                    ref={(el) => (formChecksRef.current[2] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[3].current ? "current" : ""} ${
                      classList[3].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Organization Details"
                    checked={classList[3].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(3);
                    }}
                    ref={(el) => (formChecksRef.current[3] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[4].current ? "current" : ""} ${
                      classList[4].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Project History"
                    checked={classList[4].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(4);
                    }}
                    ref={(el) => (formChecksRef.current[4] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[5].current ? "current" : ""} ${
                      classList[5].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Current Work in Progress"
                    checked={classList[5].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(5);
                    }}
                    ref={(el) => (formChecksRef.current[5] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[6].current ? "current" : ""} ${
                      classList[6].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Completed Work in Last 5 Years"
                    checked={classList[6].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(6);
                    }}
                    ref={(el) => (formChecksRef.current[6] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[7].current ? "current" : ""} ${
                      classList[7].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Insurance"
                    checked={classList[7].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(7);
                    }}
                    ref={(el) => (formChecksRef.current[7] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[8].current ? "current" : ""} ${
                      classList[8].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Safety"
                    checked={classList[8].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(8);
                    }}
                    ref={(el) => (formChecksRef.current[8] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${classList[9].current ? "current" : ""} ${
                      classList[9].previous ? "previous" : ""
                    }`}
                    style={{ paddingLeft: "58px" }}
                    label="Finance"
                    checked={classList[9].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(9);
                    }}
                    ref={(el) => (formChecksRef.current[9] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${
                      classList[10].current ? "current" : ""
                    } ${classList[10].previous ? "previous" : ""}`}
                    style={{ paddingLeft: "58px" }}
                    label="Suppliers"
                    checked={classList[10].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(10);
                    }}
                    ref={(el) => (formChecksRef.current[10] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${
                      classList[11].current ? "current" : ""
                    } ${classList[11].previous ? "previous" : ""}`}
                    style={{ paddingLeft: "58px" }}
                    label="Legal"
                    checked={classList[11].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(11);
                    }}
                    ref={(el) => (formChecksRef.current[11] = el)}
                  />

                  <Form.Check
                    type="checkbox"
                    className={`mt-3 ${
                      classList[12].current ? "current" : ""
                    } ${classList[12].previous ? "previous" : ""}`}
                    style={{ paddingLeft: "58px" }}
                    label="Shipping/Receiving"
                    checked={classList[12].checked}
                    onChange={(e) => {
                      e.target.checked = true;
                      handleLabelClick(12);
                    }}
                    ref={(el) => (formChecksRef.current[12] = el)}
                  />
                </Row>
              </Col>
            )}
            <Col className="text-start">
              {isMobile ? (
                <>
                  <ProgressBar
                    now={percentage || 0}
                    style={{
                      height: "8px",
                      margin: "0px",
                      marginBottom: "5px",
                      padding: "0px",
                      width: "100%",
                    }}
                  ></ProgressBar>
                  <div style={labelStyle}>{`${
                    percentage || 0
                  }% Completed`}</div>
                </>
              ) : (
                ""
              )}
              {current_page === 1 && (
                <BasicCompanyInfo
                  sendData={(data) => handleFormSubmit(0, data)}
                  PreviousData={form_data[current_page - 1]}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 2 && (
                <ContinueCompanyInfo
                  sendData={(data) => handleFormSubmit(1, data)}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 3 && (
                <SocialForm
                  sendData={(data) => handleFormSubmit(2, data)}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 4 && (
                <OrganizationDetailForm
                  sendData={(data) => {
                    handleFormSubmit(3, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 5 && (
                <ProjectHistoryForm
                  sendData={(data) => {
                    handleFormSubmit(4, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 6 && (
                <CurrentWorkProgressForm
                  sendData={(data) => {
                    handleFormSubmit(5, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 7 && (
                <CompletedWorkForm
                  sendData={(data) => {
                    handleFormSubmit(6, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 8 && (
                <InsuranceForm
                  sendData={(data) => {
                    handleFormSubmit(7, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 9 && (
                <SafetyForm
                  sendData={(data) => {
                    handleFormSubmit(8, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 10 && (
                <FinanceForm
                  sendData={(data) => {
                    handleFormSubmit(9, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 11 && (
                <SupplierForm
                  sendData={(data) => {
                    handleFormSubmit(10, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 12 && (
                <LegalForm
                  sendData={(data) => {
                    handleFormSubmit(11, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
              {current_page === 13 && (
                <ShippingForm
                  sendData={(data) => {
                    handleFormSubmit(12, data);
                  }}
                  PreviousData={form_data[current_page - 1]}
                  movePrevious={handlePrevious}
                  handleLogin={handleLogin}
                />
              )}
            </Col>
          </Row>
        </div>
        <Col sm={10} className={displayHeaders? '': 'd-none'}>
          <Row className="text-start">
            <h2>Benefits</h2>
            <div className="card-custom">
              <Col>
                <h3>One platform</h3>
                <p>Prequel MasterKey streamlines the process of gathering your complete business profile data, saving you from the hassle of searching multiple sources. Keep everything organized in a single location.</p>
              </Col>
              <div className="col-separator"></div>
              <div className="col-separator-visible"></div>
              <div className="col-separator"></div>
              <Col>
                <h3>Secure</h3>
                <p>Your data is securely stored within a private repository and encrypted to ensure its protection.</p>
              </Col>
            </div>
          </Row>
          <br/><br/>
          <Row className="text-start">
            <h2>Related Service</h2>
            <div className="card-custom">
              <Col>
                <h3>Prequalification </h3>
                <p>Access blank subcontractor applications.</p>
              </Col>
              <div className="col-separator"></div>
              <div className="col-separator-visible"></div>
              <div className="col-separator"></div>
              <Col>
                <h3>GC Planify</h3>
                <p>Add your prequalification app to increase supplier network.</p>
              </Col>
            </div>
          </Row>
        </Col>
      </div>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </div>
    </>
  );
};
export default CompanyDetailsForms;
