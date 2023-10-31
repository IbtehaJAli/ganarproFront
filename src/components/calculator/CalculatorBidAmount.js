import React, { useEffect, useState } from "react";
import {
  Accordion,
  Alert,
  Col,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-intl-tel-input/dist/main.css";
import { StyledAccordionHeader, StyledForm } from "./CalculatorForm.styled";
import Select from "react-select";
import {
  BID_AMOUNT_SET_VALUES,
  COST_PROFIT_SET_VALUES,
} from "../../store/constants/mortgageConstant";
import {
  getBidAmountPricingDetail,
  getProjectTypePricingList,
  getStateLaborPricingDetail,
  getStateLaborPricingList,
} from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";
import Spinner from "../spinner/Spinner";
import { useParams } from "react-router-dom";
import { isSubscriptionActive } from "../../utils/helpers/helper";
import { setFreeModeAction } from "../../store/actions/users/users.actions";
import { USER_SET_FREE_MODE_SUCCESS } from "../../store/constants/userConstants";
import CloseIcon from "../../assets/icons/CloseIcon";
import styled from "styled-components";
import ToolTip from "../tooltip/ToolTip";
import { useRef } from "react";

const StyledFloatingLabel = styled(FloatingLabel)`
  label {
    z-index: 0;
  }
`;

const phaseData = [
  { value: "rough", label: "Rough", key: 1, cost: 105 },
  { value: "final", label: "Final", key: 2, cost: 175 },
  { value: "fluff", label: "Fluff", key: 3, cost: 70 },
];

const notSureData = [
  { value: 2532, label: "Extra Small" },
  { value: 13000, label: "Small" },
  { value: 67385, label: "Medium" },
  { value: 250650, label: "Large" },
  { value: 730000, label: "Extra Large" },
];
// const storiesData = [
//   { name: 1, value: 0 },
//   { name: 2, value: 0.01 },
//   { name: 3, value: 0.02 },
//   { name: 4, value: 0.03 },
//   { name: 5, value: 0.04 },
// ];

const CalculatorBidAmount = ({
  handleSetLoginModal,
  handleSetPaymentModalShow,
  bidAmount,
  noOfDaysExpected,
  handleBidAmountChange,
  setFormTouched,
}) => {
  const { error: errorForm } = useSelector(
    (state) => state.cleanUpEstimateCreate
  );
  const { stateLabors } = useSelector((state) => state.stateLaborPricingList);

  const {
    loading: stateLaborLoader,
    one_day_work,
    average_labor_rate,
  } = useSelector((state) => state.stateLaborPricing);
  const { projectTypePricing } = useSelector(
    (state) => state.projectTypePricingList
  );
  const [selectedKey, setSelectedKey] = useState(true);
  const [showCalculatorNote, setShowCalculatorNote] = useState(true);

  const values = useSelector((state) => state.bidAmountValues);
  const { loading } = useSelector((state) => state.cleanUpEstimateDetail);
  const { user } = useSelector((state) => state.auth);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const { user: profile } = useSelector((state) => state.userDetails);
  const costValues = useSelector((state) => state.costProfitValues);
  let params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const price_id = process.env.REACT_APP_CALC_APP;
  const estimatedDaysWorkingRef = useRef(null);
  const noOfLivingUnitRef = useRef(null);
  const buildingSqftRef = useRef(null);

  const hideLivingUnit = [
    "Senior living Retirement",
    "Residence Home",
    "Multifamily-Residential",
    "Mixed use",
  ].includes(values.project_type);

  useEffect(() => {
    if (stateLabors.length === 0) {
      dispatch(getStateLaborPricingList());
    }
    if (projectTypePricing.length === 0) {
      dispatch(getProjectTypePricingList());
    }

    if (values?.project_type !== "" && values?.phase !== "") {
      dispatch(getBidAmountPricingDetail(values?.project_type, values?.phase));
    }
    if (
      values?.project_type !== "" &&
      values?.phase !== "" &&
      values?.state !== ""
    ) {
      dispatch(getStateLaborPricingDetail(values?.state));
    }
  }, [
    dispatch,
    values?.phase,
    values?.project_type,
    projectTypePricing.length,
    values?.state,
    stateLabors.length,
  ]);
  const handleChange = (evt) => {
    const { name, value: newValue } = evt.target;

    if (
      !user &&
      (name === "square_foot" || name === "notes" || name === "project_name")
    ) {
      handleSetLoginModal(evt);
      return;
    } else if (
      !isSubscriptionActive(profile, price_id, user, free_mode_count)
    ) {
      handleSetPaymentModalShow();
      return;
    }

    if (name === "square_foot" && costValues.unknown_sqft_size) {
      return;
    }

    dispatch({ type: BID_AMOUNT_SET_VALUES, payload: { [name]: newValue } });
    if (name === "projectType" && newValue !== "" && values?.phase !== "") {
      dispatch(getBidAmountPricingDetail(newValue, values?.phase));
    }
    handleBidAmountChange();
  };
  const handleClick = (evt) => {
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { emergency_pricing: evt.target.checked },
    });
  };
  const handleNoStoriesCheck = (evt) => {
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { no_stories_check: evt.target.checked },
    });
  };
  const handleUseUnitPricingCheck = (evt) => {
    const { name } = evt.target;

    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { [name]: evt.target.checked },
    });
  };

  const handleLivingUnitPricingCheck = (evt) => {
    const { name } = evt.target;
    setFormTouched(true);
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { [name]: evt.target.checked },
    });
    const newProjectType = projectTypePricing?.filter(
      (project) =>
        project.project_type === "Multifamily-Residential" ||
        project.project_type === "Senior living Retirement" ||
        project.project_type === "Residence Home" ||
        project.project_type === "Mixed use"
    );

    if (evt.target.checked) {
      dispatch({
        type: "PROJECT_TYPE_PRICING_LIST_SUCCESS",
        payload: newProjectType,
      });
      dispatch({
        type: COST_PROFIT_SET_VALUES,
        payload: { use_number_of_days: false },
      });
      dispatch({
        type: BID_AMOUNT_SET_VALUES,
        payload: { phase: "rough_final_fluff" },
      });
      dispatch({
        type: BID_AMOUNT_SET_VALUES,
        payload: { totalSumOfPhases: 350 },
      });
      dispatch({
        type: "BID_AMOUNT_SET_VALUES",
        payload: { price_per_sqft: false },
      });
    } else {
      dispatch(getProjectTypePricingList());
    }

    if (!evt.target.checked && !costValues?.use_number_of_days) {
      dispatch({
        type: "BID_AMOUNT_SET_VALUES",
        payload: { price_per_sqft: true },
      });
    }
    setTimeout(() => {
      if (evt.target.checked) {
        noOfLivingUnitRef?.current?.focus();
      }
    }, 1000);
  };
  const handleScrubbingPricingCheck = (evt) => {
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { scrubbing_pricing: evt.target.checked },
    });
  };

  const handleSelect = (items) => {
    const phases = items.map((item) => item.value).join("_");
    let totalSum = 0;
    items?.forEach((item) => {
      totalSum += item.cost;
    });

    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { phase: phases },
    });

    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { totalSumOfPhases: totalSum },
    });

    if (values?.project_type !== "" && phases !== "") {
      dispatch(getBidAmountPricingDetail(values?.project_type, phases));
    }
  };
  const handleNotSureField = (evt) => {
    const { value: newValue } = evt.target;
    if (newValue === "" && values?.phase !== "") {
      dispatch(getBidAmountPricingDetail(newValue, values?.phase));
    }
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { square_foot: newValue, not_sure: newValue },
    });
  };
  const handleSelectState = (evt) => {
    const { value } = evt.target;
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { state: value },
    });

    if (value !== "") {
      localStorage.setItem("state", value);
      dispatch(getStateLaborPricingDetail(value));
    }
  };

  const handleSquareFootChange = (evt) => {
    if (!user) {
      handleSetLoginModal(evt);
    } else if (
      !isSubscriptionActive(profile, price_id, user, free_mode_count)
    ) {
      handleSetPaymentModalShow();
    } else {
      if (costValues.unknown_sqft_size) {
        return;
      }
      const { name, value: newValue } = evt.target;
      dispatch({ type: BID_AMOUNT_SET_VALUES, payload: { [name]: newValue } });
      dispatch(setFreeModeAction());
      dispatch({
        type: USER_SET_FREE_MODE_SUCCESS,
        payload: free_mode_count + 1,
      });
    }
  };
  const handleNumberOfDaysCheck = (evt) => {
    const { name } = evt.target;
    setFormTouched(true);

    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { [name]: evt.target.checked },
    });
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { use_living_unit_pricing: false },
    });
    const noOfDaysExpected = (bidAmount / one_day_work).toFixed(1);
    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { noOfDaysExpected: noOfDaysExpected },
    });

    dispatch({
      type: "BID_AMOUNT_SET_VALUES",
      payload: { price_per_sqft: false },
    });

    if (!evt.target.checked && !values?.use_living_unit_pricing) {
      dispatch({
        type: "BID_AMOUNT_SET_VALUES",
        payload: { price_per_sqft: true },
      });
    }
    setTimeout(() => {
      if (evt.target.checked) {
        estimatedDaysWorkingRef?.current?.focus();
      }
    }, 1000);
  };

  const handlePricePerSqFt = (evt) => {
    const { name } = evt.target;
    setFormTouched(true);
    if (!evt.target.checked && !values?.use_living_unit_pricing) {
      dispatch({
        type: BID_AMOUNT_SET_VALUES,
        payload: { [name]: true },
      });
    }
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { [name]: evt.target.checked },
    });
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { use_living_unit_pricing: false },
    });
    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { use_number_of_days: false },
    });
    setTimeout(() => {
      if (evt.target.checked) {
        buildingSqftRef?.current?.focus();
      }
    }, 1000);
  };

  const handleNumberOfDaysExpected = (evt) => {
    const { value: newValue } = evt.target;
    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { noOfDaysExpected: newValue },
    });
  };

  const handleCalculatorNote = (evt) => {
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: { notes: evt.target.value },
    });
  };

  const handleUnknownSqftSize = (evt) => {
    dispatch({
      type: COST_PROFIT_SET_VALUES,
      payload: { unknown_sqft_size: evt.target.checked },
    });

    if (evt.target.checked) {
      dispatch({
        type: BID_AMOUNT_SET_VALUES,
        payload: { square_foot: 0 },
      });
    }
  };

  const handleShowCalculatorNote = () => {
    setShowCalculatorNote(!showCalculatorNote);
  };

  const selectedName = selectedKey ? "Advanced" : "Simple";
  return (
    <StyledForm className="">
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
        <>
          <p className="text-start fw-bolder">
            Estimate your cleaning price based on building size & other factors
          </p>
          {showCalculatorNote ? (
            <Row className="my-5">
              <Form.Group as={Col} controlId="formGridProject Type">
                <FloatingLabel
                  controlId="notes"
                  label="Enter project details to help you create your estimate"
                  className="mb-3"
                >
                  <CloseIcon
                    width="12"
                    height="12"
                    className="me-3 cursor-pointer"
                    fill="#9EC3E8"
                    style={{ position: "absolute", right: "2%", top: "11%" }}
                    handleClick={handleShowCalculatorNote}
                  />
                  <Form.Control
                    as="textarea"
                    name="notes"
                    className="form-control mt-n3"
                    value={values?.notes}
                    onBlur={handleCalculatorNote}
                    onChange={handleChange}
                    style={{ height: "80px", color: "black" }}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
          ) : (
            <p
              className="text-start text-primary cursor-pointer"
              onClick={handleShowCalculatorNote}
            >
              click here show project details
            </p>
          )}
          <Row className="my-5">
            <Form.Group as={Col} controlId="projectName">
              <StyledFloatingLabel
                // <FormLabel
                id="estimate-name-label"
                controlId="projectName"
                label="Estimate name"
                className="mb-3"
              >
                <Form.Control
                  name="project_name"
                  type="text"
                  value={values?.project_name}
                  onChange={handleChange}
                />
              </StyledFloatingLabel>
            </Form.Group>
          </Row>
          <Row className="my-5">
            <Form.Group as={Col} controlId="formGridProject Type">
              <FloatingLabel
                controlId="squarefootsize"
                label="Building Sq. Ft size"
                className="mb-3"
              >
                <Form.Control
                  name="square_foot"
                  type="number"
                  className="form-control mt-n3"
                  value={values?.square_foot}
                  onBlur={handleSquareFootChange}
                  onChange={handleChange}
                  disabled={costValues.unknown_sqft_size}
                  readOnly={costValues.unknown_sqft_size}
                  ref={buildingSqftRef}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group
              as={Col}
              md={4}
              className="mb-3 checkbox m-0 d-flex"
              controlId="do_not_know_sqft_size"
            >
              <Form.Check
                type="checkbox"
                name="unknown_sqft_size"
                label="I don't know sq.ft size"
                className="mb-4"
                checked={costValues?.unknown_sqft_size}
                onChange={handleUnknownSqftSize}
              />
              <span>
                <ToolTip information="The square footage will be automatically set to 0" />
              </span>
            </Form.Group>

            {/* <Form.Group as={Col}>
              <FloatingLabel
                controlId="notSure"
                label="Not Sure?"
                className="mb-3"
              >
                <Form.Select
                  defaultValue="Choose..."
                  name="not_sure"
                  onChange={handleNotSureField}
                  value={values?.not_sure}
                >
                  <option value="1">Choose...</option>
                  {notSureData.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Form.Group> */}
          </Row>
          <Row className="">
            <Form.Group as={Col} md={6} controlId="state">
              <FloatingLabel controlId="state" label="State" className="mb-3">
                <Form.Select
                  name="state"
                  onChange={handleSelectState}
                  value={values?.state}
                >
                  {stateLabors.map((item) => {
                    return (
                      <option key={item.area_name} value={item.area_name}>
                        {item.area_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            {costValues?.use_number_of_days && (
              <Form.Group as={Col} controlId="noOfDaysExpected" md={6}>
                <FloatingLabel
                  controlId="noOfDaysExpected"
                  label="Estimated days working"
                  className="mb-3"
                >
                  <Form.Control
                    name="no_of_days_expected"
                    type="text"
                    className="form-control mt-n3"
                    value={costValues?.noOfDaysExpected ?? 0}
                    onChange={handleNumberOfDaysExpected}
                    ref={estimatedDaysWorkingRef}
                  />
                </FloatingLabel>
              </Form.Group>
            )}
          </Row>

          <Row className="my-5 mx-3">
            <Form.Group
              as={Col}
              md={4}
              className="mb-3 checkbox m-0 toggle-switch"
              controlId="price_per_sqft"
            >
              <Form.Check
                type="switch"
                name="price_per_sqft"
                label="Price per Sq.ft"
                className="mb-4"
                checked={values?.price_per_sqft}
                onChange={handlePricePerSqFt}
                disabled={
                  !costValues?.use_number_of_days &&
                  !values?.use_living_unit_pricing
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md={4}
              className="mb-3 checkbox m-0 toggle-switch"
              controlId="useLivingUnitPricing"
            >
              <Form.Check
                type="switch"
                name="use_living_unit_pricing"
                label="Price per unit"
                className="mb-1"
                checked={values?.use_living_unit_pricing}
                onChange={handleLivingUnitPricingCheck}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md={4}
              className="mb-3 checkbox m-0 toggle-switch"
              controlId="useNumberoFDays"
            >
              <Form.Check
                type="switch"
                name="use_number_of_days"
                label="Price per day"
                className="mb-4"
                checked={costValues?.use_number_of_days}
                onChange={handleNumberOfDaysCheck}
              />
            </Form.Group>

            {/* {costValues?.use_number_of_days && (
              <Form.Group as={Col} controlId="noOfDaysExpected" md={5}>
                <FloatingLabel
                  controlId="noOfDaysExpected"
                  label="Estimated days working"
                  className="mb-3"
                >
                  <Form.Control
                    name="no_of_days_expected"
                    type="text"
                    className="form-control mt-n3"
                    value={costValues?.noOfDaysExpected ?? 0}
                    onChange={handleNumberOfDaysExpected}
                  />
                </FloatingLabel>
              </Form.Group>
            )} */}
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} className="calculator-tool-tip-parent">
              <span className="calculator-tool-tip">
                <ToolTip
                  show={400}
                  trigger="click"
                  information="The cleaning scopes vary in requirements depending on the type of building, which leads to adjustments in the square foot price. Lean more - <a target='_blank' href='https://www.ganarpro.com/support/understanding-building-usage-types'>Click here<a/>"
                />
              </span>
              <FloatingLabel
                controlId="projectType"
                label={`Building project type`}
                className="mb-3"
              >
                <Form.Select
                  defaultValue="Choose..."
                  name="project_type"
                  onChange={handleChange}
                  value={values?.project_type}
                >
                  <option>Choose...</option>
                  {projectTypePricing.map((item) => {
                    return (
                      <option key={item.id} value={item.project_type}>
                        {item.project_type}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            {hideLivingUnit || values?.use_living_unit_pricing ? (
              <>
                <Form.Group as={Col} controlId="noLivingUnits">
                  <FloatingLabel
                    controlId="noLivingUnits"
                    label="Number of living units"
                    className="mb-3"
                  >
                    <Form.Control
                      name="living_unit"
                      type="number"
                      className="form-control mt-n3"
                      value={values?.living_unit}
                      onChange={handleChange}
                      ref={noOfLivingUnitRef}
                    />
                  </FloatingLabel>
                </Form.Group>
              </>
            ) : (
              ""
            )}
          </Row>
          <Row className="my-5">
            <Col md="6">
              <Form.Group as={Col} controlId="numberOfPhases">
                <FloatingLabel
                  controlId="numberOfPhases"
                  label="Number of phases"
                  className="mb-3"
                >
                  <Select
                    id="numberOfPhase"
                    value={values?.phases}
                    isMulti
                    name="phase"
                    options={phaseData}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelect}
                  />
                  <span className="calculator-tool-tip">
                    <ToolTip
                      information="Your scope requirement determines how many times you are required to clean the 
                      building. Normally Rough clean is performed first. Final clean is the majority of 
                      work. And fluff/ puff is after punch list and before project turnover. Final Clean is 
                      the official scope trade name and final clean is the only phase completed alone. "
                    />
                  </span>
                  <Form.Control
                    name="no_phases"
                    type="text"
                    className="form-control mt-n3"
                    hidden={true}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Accordion
            onSelect={(e) => {
              setSelectedKey(!selectedKey);
            }}
          >
            <Accordion.Item className="bg-white border-0" eventKey="0">
              <StyledAccordionHeader className="fs-1 col-md-3">
                {selectedName}
              </StyledAccordionHeader>
              <Accordion.Body>
                <Row className="my-5">
                  <Col md="4">
                    <Form.Group
                      as={Col}
                      controlId="state"
                      className="calculator-tool-tip-parent"
                    >
                      <span className="calculator-tool-tip">
                        <ToolTip information="For stories above 1, an additional price for exterior window cleaning will be included. However, the base cleaning price already covers 1st-story windows. The calculation involves multiplying the building square footage by a variable applied to each number of stories to arrive at the final result.  Add price to bid amount and display as external window cleaning price." />
                      </span>
                      <FloatingLabel
                        controlId="noStories"
                        label="No of stories"
                        className="mb-3"
                      >
                        <Form.Select
                          name="no_stories"
                          onChange={handleChange}
                          value={values?.no_stories}
                        >
                          {[...Array(50).keys()].map((item, index) => {
                            return (
                              <option
                                key={item + 1}
                                value={parseFloat(index / 100)}
                              >
                                {item + 1}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="noStoriesResult"
                        label="Result"
                        className="mb-3"
                      >
                        <Form.Control
                          name="no_stories"
                          type="number"
                          value={
                            values?.no_stories === 1
                              ? 0
                              : parseInt(
                                  (
                                    values?.no_stories * values?.square_foot
                                  ).toFixed(0)
                                )
                          }
                          readOnly
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group
                      as={Col}
                      className="mb-3 checkbox"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check
                        type="checkbox"
                        name="no_stories_check"
                        label="Add external window cleaning"
                        checked={values?.no_stories_check}
                        onChange={handleNoStoriesCheck}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="formGridStreet">
                      <FloatingLabel
                        controlId="pricePer1bedroom"
                        label="Price per 1 bedroom"
                        className="mb-3"
                      >
                        <Form.Control
                          name="price_per1_bed"
                          onChange={handleChange}
                          value={values?.price_per1_bed}
                          type="number"
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="Number of units"
                        label="Number of units"
                        className="mb-3"
                      >
                        <Form.Control
                          name="no_of_unit1_bed"
                          onChange={handleChange}
                          type="number"
                          value={values?.no_of_unit1_bed}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="pricePer1bedResult"
                        label="Result"
                        className="mb-3"
                      >
                        <Form.Control
                          name="pricePer1bedResult"
                          readOnly
                          value={(
                            values?.price_per1_bed * values?.no_of_unit1_bed
                          ).toLocaleString()}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="formGridStreet">
                      <FloatingLabel
                        controlId="pricePer1bedroom"
                        label="Price per 2 bedrooms"
                        className="mb-3"
                      >
                        <Form.Control
                          name="price_per2_bed"
                          onChange={handleChange}
                          value={values?.price_per2_bed}
                          type="number"
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="noOfUnit2Bed"
                        label="Number of units"
                        className="mb-3"
                      >
                        <Form.Control
                          name="no_of_unit2_bed"
                          type="number"
                          onChange={handleChange}
                          value={values?.no_of_unit2_bed}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="pricePer2bedResult"
                        label="Result"
                        className="mb-3"
                      >
                        <Form.Control
                          name="pricePer2bedResult"
                          onChange={handleChange}
                          readOnly
                          value={(
                            values?.price_per2_bed * values?.no_of_unit2_bed
                          ).toLocaleString()}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="formGridStreet">
                      <FloatingLabel
                        controlId="Price per 3 bedrooms"
                        label="Price per 3 bedrooms"
                        className="mb-3"
                      >
                        <Form.Control
                          name="price_per3_bed"
                          onChange={handleChange}
                          value={values?.price_per3_bed}
                          type="number"
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="noOfUnit3Bed"
                        label="Number of units"
                        className="mb-3"
                      >
                        <Form.Control
                          name="no_of_unit3_bed"
                          type="number"
                          onChange={handleChange}
                          value={values?.no_of_unit3_bed}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="pricePer3bedResult"
                        label="Result"
                        className="mb-3"
                      >
                        <Form.Control
                          name="pricePer3bedResult"
                          onChange={handleChange}
                          readOnly
                          value={(
                            values?.price_per3_bed * values?.no_of_unit3_bed
                          ).toLocaleString()}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col></Col>
                  <Col></Col>
                  <Col>
                    <Form.Group
                      as={Col}
                      className="mb-3 checkbox"
                      controlId="useUnitPricing"
                    >
                      <Form.Check
                        type="checkbox"
                        name="use_unit_pricing"
                        className="d-flex align-self-center"
                        label="price per unit"
                        checked={values?.use_unit_pricing}
                        onChange={handleUseUnitPricingCheck}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="formGridStreet">
                      <FloatingLabel
                        controlId="window_panes"
                        label="# of window panes"
                        className="mb-3"
                      >
                        <Form.Control
                          name="window_panes"
                          onChange={handleChange}
                          value={values?.window_panes}
                          type="number"
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="price_per_window"
                        label="Price to clean each window"
                        className="mb-3"
                      >
                        <Form.Control
                          name="price_per_window"
                          type="number"
                          onChange={handleChange}
                          value={values?.price_per_window}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="price_per_window_result"
                        label="Result"
                        className="mb-3"
                      >
                        <Form.Control
                          name="price_per_window_result"
                          onChange={handleChange}
                          readOnly
                          value={(
                            values?.window_panes * values?.price_per_window
                          ).toLocaleString()}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="formGridStreet">
                      <FloatingLabel
                        controlId="pressure_wash"
                        label="Pressure wash sq. ft"
                        className="mb-3"
                      >
                        <Form.Control
                          name="pressure_wash"
                          onChange={handleChange}
                          value={values?.pressure_wash}
                          type="number"
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="pressure_wash_price"
                        label="Price"
                        className="mb-3"
                      >
                        <Form.Control
                          name="pressure_wash_price"
                          type="number"
                          onChange={handleChange}
                          value={values?.pressure_wash_price}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col md="3">
                    <Form.Group as={Col} controlId="formGridCProjectCity">
                      <FloatingLabel
                        controlId="pressure_wash_result"
                        label="Result"
                        className="mb-3"
                      >
                        <Form.Control
                          name="pressure_wash_result"
                          onChange={handleChange}
                          readOnly
                          value={(
                            values?.pressure_wash * values?.pressure_wash_price
                          ).toLocaleString()}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Col>
                    <Form.Group
                      as={Col}
                      className="mb-3 checkbox d-flex"
                      controlId="scrubbingPricing"
                    >
                      <Form.Check
                        type="checkbox"
                        name="scrubbing_pricing"
                        label="Scrubbing, buffing, polishing floors(Add 15%)"
                        checked={values?.scrubbing_pricing}
                        onChange={handleScrubbingPricingCheck}
                      />
                      <span className="">
                        <ToolTip information="To effectively remove paint, caulk, or any other non-regular dust or dirt from construction areas, the process requires the utilization of specialized chemicals or machinery." />
                      </span>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      as={Col}
                      className="mb-3 checkbox d-flex"
                      controlId="emergencyPricing"
                    >
                      <Form.Check
                        type="checkbox"
                        name="emergency_pricing"
                        label="Emergency pricing(Add 10%)"
                        checked={values?.emergency_pricing}
                        onChange={handleClick}
                      />
                      <span className="">
                        <ToolTip information="Also known as surge pricing or dynamic pricing, refers to a pricing strategy where the cost of a product or service increases during times of high demand or urgent need. It is commonly applied in situations where there is a sudden increase in demand or when resources are limited." />
                      </span>
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      )}
    </StyledForm>
  );
};
export default CalculatorBidAmount;
