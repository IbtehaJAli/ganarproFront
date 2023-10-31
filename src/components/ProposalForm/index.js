import React, { useEffect, useState } from "react";
import { Accordion, Alert, Button, Col, Form, Row } from "react-bootstrap";
import { StyledAccordionHeader, StyledForm } from "./proposalForm.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectType,
  getProjectTypeDetail,
  saveProposal,
  updateProposal,
} from "../../store/actions/proposals/proposals.actions";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

import StateDropdown from "../StateDropdown";
import {
  PROPOSAL_RESSET_VALUES,
  PROPOSAL_SET_VALUES,
} from "../../store/constants/proposalConstants";
import {
  formatPhoneNumber,
  isSubscriptionActive,
  userSubscribedPlans,
} from "../../utils/helpers/helper";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { TOTAL_FREE_MODE_COUNT } from "../../utils/constants/api";
import { getStateLaborPricingList } from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";

const StyledClearButton = styled(Button)`
  font-size: 12px;
  height: 25px;
  text-transform: lowercase;
  color: #fff;
  float: right;
  &:hover {
    color: #fff;
  }
  &:a {
    color: #fff;
  }
`;

const ProposalForm = ({ setModalShow, setPaymentModalShow }) => {
  const navigate = useNavigate();
  let params = useParams();
  let [searchParams] = useSearchParams();
  const bid_amount = searchParams.get("bidAmount");
  const project_type = searchParams.get("project_type");
  const project_name = searchParams.get("project_name");
  const project_state = searchParams.get("state");
  const { search } = window.location;
  const show_tab = new URLSearchParams(search).get("bidAmount");
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);

  const { id } = params;
  const { user } = useSelector((state) => state.auth);
  const { user: profile } = useSelector((state) => state.userDetails);
  const { error: errorForm, loading: createLoader } = useSelector(
    (state) => state.proposalCreate
  );
  const { proposal, loading } = useSelector((state) => state.proposalDetail);
  const values = useSelector((state) => state.proposalValues);
  const { projectTypes } = useSelector((state) => state.projectTypeList);
  const { error: updateError } = useSelector((state) => state.projectUpdate);
  const [message] = useState("");
  const { stateLabors } = useSelector((state) => state.stateLaborPricingList);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    let newValues = values;
    if (user) {
      newValues = {
        ...values,
        ...profile,
        current_date: new Date().toUTCString().slice(0, 16),
      };
    }
    dispatch(saveProposal(newValues));
  };

  const updateHandler = (e) => {
    e.preventDefault();
    let newValues = values;
    if (user) {
      newValues = {
        ...values,
        ...user,
        current_date: new Date().toUTCString().slice(0, 16),
      };
    }
    dispatch(updateProposal(id, newValues));
  };

  const handleSetModal = (e) => {
    e.preventDefault();
    localStorage.setItem("proposal", JSON.stringify(values));
    setModalShow(true);
  };

  const clearForm = (e) => {
    e.preventDefault();
    dispatch({ type: PROPOSAL_RESSET_VALUES });
    navigate("/my_proposal");
  };

  const handleSetPaymentModalShow = (e) => {
    e.preventDefault();
    localStorage.setItem("proposal", JSON.stringify(values));
    setPaymentModalShow(true);
  };
  // let isSubActive =
  //   profile?.free_template_count > 0 || profile?.subscription_id;
  const price_id = process.env.REACT_APP_PROPOSAL_APP;

  let handleButton = submitHandler;
  let buttonText = "Generate Proposal";
  if (!user) {
    handleButton = handleSetModal;
  } else if (
    !isSubscriptionActive(user, price_id, user, free_mode_count) &&
    id
  ) {
    handleButton = handleSetPaymentModalShow;
    buttonText = "Update Proposal";
  } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
    handleButton = handleSetPaymentModalShow;
  } else if (user && proposal && id) {
    handleButton = updateHandler;
    buttonText = "Update Proposal";
  }

  const handleChange = (evt) => {
    const { name, value: newValue } = evt.target;

    dispatch({ type: PROPOSAL_SET_VALUES, payload: { [name]: newValue } });
  };

  const handleChangeProjectType = (e, typeId) => {
    // setProjectTypeId(typeId);
    const { name, value } = e.target;
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("project_type", value);

    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (project_type) {
      dispatch({
        type: PROPOSAL_SET_VALUES,
        payload: { project_type, bid_amount, project_name, project_state },
      });
      dispatch(getProjectTypeDetail(project_type));
    }
    dispatch(getStateLaborPricingList());

    dispatch(getProjectType());
  }, [
    bid_amount,
    dispatch,
    id,
    project_name,
    project_state,
    project_type,
    values?.project_type,
  ]);
  return (
    <StyledForm className="my-5">
      {message && (
        <Alert variant="danger" className="text-capitalize">
          <Alert.Heading>Required Fields!</Alert.Heading>
          {message}
        </Alert>
      )}
      {updateError && (
        <Alert variant="danger">
          <Alert.Heading>Required Fields!</Alert.Heading>
          <ul>
            {Object.keys(updateError).map((error, index) => {
              return (
                <li key={index}>
                  {error} {updateError[error].toString()}
                </li>
              );
            })}
          </ul>
        </Alert>
      )}
      {errorForm && (
        <Alert variant="danger">
          <Alert.Heading>Required Fields!</Alert.Heading>
          <ul>
            {Object.keys(errorForm).map((error, index) => {
              return (
                <li key={index}>
                  {error} {errorForm[error].toString()}
                </li>
              );
            })}
          </ul>
        </Alert>
      )}
      {loading && id ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item className="bg-white" eventKey="0">
            <StyledClearButton
              className="p-1 m-2 btn-danger"
              onClick={clearForm}
            >
              clear form
            </StyledClearButton>
            <StyledAccordionHeader className="fs-1">
              Project Information
            </StyledAccordionHeader>
            <Accordion.Body>
              <Row className="my-4">
                <Form.Group as={Col} controlId="formGridProjectName">
                  <Form.Label>
                    Project Name{" "}
                    <span className="text-danger fw-bolder">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    placeholder="Enter project name"
                    name="project_name"
                    value={values.project_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridProject Type">
                  <Form.Label className="fw-bolder">
                    Project Scope Type{" "}
                    <span className="text-danger fw-bolder">*</span>
                  </Form.Label>
                  <Form.Select
                    name="project_type"
                    onChange={(e) => handleChangeProjectType(e, e.target.value)}
                    value={values?.project_type ? values?.project_type : ""}
                    required
                  >
                    <option>Choose...</option>
                    {projectTypes.map((item) => {
                      return (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="my-3">
                <Col>
                  <Form.Group controlId="formGridStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      placeholder="Enter Street"
                      name="project_street"
                      value={values.project_street}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridCProjectCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="project_city"
                      value={values.project_city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="my-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    name="project_state"
                    value={values.project_state}
                  >
                    <option value="">Choose</option>
                    {stateLabors.map((item) => {
                      return (
                        <option key={item.area_name} value={item.area_name}>
                          {item.area_name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridProjectZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    name="project_zip"
                    value={values.project_zip}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="my-3">
                <Col
                  md="4"
                  className="mx-auto justify-content-center text-center"
                >
                  <Form.Group as={Col} controlId="formGridBidAmount">
                    <Form.Label className="fw-bolder">Bid Amount</Form.Label>
                    <Form.Control
                      type="text"
                      name="bid_amount"
                      value={values.bid_amount}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="bg-white" eventKey="1">
            <StyledAccordionHeader>Customer Information</StyledAccordionHeader>
            <Accordion.Body>
              <Row className="my-4">
                <Form.Group as={Col} controlId="formGridCustomerCompanyName">
                  <Form.Label>
                    Customer Company Name{" "}
                    <span className="text-danger fw-bolder">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    name="customer_company_name"
                    value={values.customer_company_name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCustomerStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    name="customer_street"
                    value={values.customer_street}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="my-3">
                <Form.Group as={Col} controlId="formGridCustomerCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="customer_city"
                    value={values.customer_city}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    name="customer_state"
                    value={values.customer_state}
                  >
                    <option value="">Choose</option>
                    {stateLabors.map((item) => {
                      return (
                        <option key={item.area_name} value={item.area_name}>
                          {item.area_name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCustomerZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    name="customer_zip"
                    value={values.customer_zip}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="my-4">
                <h4 className=" my-3 font-weight-bold">Project Contact 1</h4>
                <Form.Group as={Col} controlId="formGridProjectContact1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="project_contact_1_name"
                    value={values.project_contact_1_name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridProjectContact1Phone">
                  <Form.Label>Phone No</Form.Label>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    inputClassName="form-control"
                    allowDropdown={false}
                    countries={["us"]}
                    preferredCountries={["us"]}
                    type="tel"
                    autoComplete="tel"
                    onPhoneNumberChange={(isValid, phone) => {
                      dispatch({
                        type: PROPOSAL_SET_VALUES,
                        payload: {
                          project_contact_1_phone: formatPhoneNumber(phone),
                        },
                      });
                    }}
                    value={values.project_contact_1_phone}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridProjectContact1Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="project_contact_1_email"
                    value={values.project_contact_1_email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="my-4">
                <h4 className=" my-3 font-weight-bold">Project Contact 2</h4>
                <Form.Group as={Col} controlId="formGridProjectContact2Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="project_contact_2_name"
                    value={values.project_contact_2_name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridProjectContact2Phone">
                  <Form.Label>Phone No</Form.Label>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    inputClassName="form-control"
                    allowDropdown={false}
                    countries={["us"]}
                    preferredCountries={["us"]}
                    type="tel"
                    autoComplete="tel"
                    onPhoneNumberChange={(isValid, phone) => {
                      dispatch({
                        type: PROPOSAL_SET_VALUES,
                        payload: {
                          project_contact_2_phone: formatPhoneNumber(phone),
                        },
                      });
                    }}
                    value={values.project_contact_2_phone}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridProjectContact2Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="project_contact_2_email"
                    value={values.project_contact_2_email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Row>
            <Col className="text-center p-5">
              <Button
                variant="primary"
                type="submit"
                onClick={handleButton}
                disabled={createLoader || loading}
              >
                <h4 className="p-2">
                  {" "}
                  {buttonText}{" "}
                  {(createLoader || loading) && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  <span className="visually-hidden">Loading...</span>{" "}
                </h4>
              </Button>
            </Col>
          </Row>
        </Accordion>
      )}
    </StyledForm>
  );
};
export default ProposalForm;
