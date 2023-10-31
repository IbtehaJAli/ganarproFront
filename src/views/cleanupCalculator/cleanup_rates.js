import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Form,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaSyncAlt, FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Spinner from "../../components/spinner/Spinner";
import Message from "../../components/Message";
import PricingSlider from "../../components/pricing_slider/pricing_slider";
import {
  getCalculationInfo,
  resetCalculationInfo,
} from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";
import { CALCULATION_INFO_REQUEST } from "../../store/constants/mortgageConstant";
import "../cleanupCalculator/cleanup_rates.css";
import { isSubscriptionActive } from "../../utils/helpers/helper";
import LoginModal from "../../components/LoginModal";
import SubscriptionModal from "../../components/subscriptionModal";
import { setFreeModeAction } from "../../store/actions/users/users.actions";
import { USER_SET_FREE_MODE_SUCCESS } from "../../store/constants/userConstants";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;

const CleanupRates = () => {
  const [state, setState] = useState("");
  const [sqft, setSqft] = useState(1);
  const [hourlyPrice, setHourlyPrice] = useState(0);
  const [projectType, setProjectType] = useState("Any Type General Cleaning");
  const [pricePerSqft, setPricePerSqft] = useState(0);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [appartment, setAppartment] = useState(350);
  const [window, setWindow] = useState(5);
  const [loading_saved, setLoadingSaved] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const [restore_values, setRestoreValues] = useState(false);
  const [reset_sqft, setResetSqft] = useState(false);
  const isInitialMountDropdown = useRef(true);
  const isInitialMountInputs = useRef(true);
  const isInitialMountData = useRef(true);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);

  const { user } = useSelector((state) => state.auth);

  const calculation_info = useSelector((state) => state.calculationInfo);
  let { loading, pricing_data, state_data, error } = calculation_info;

  const saved = useSelector((state) => state.calculationSaved);
  const { saved_data } = saved;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const price_id = process.env.REACT_APP_CALC_APP;
  useEffect(() => {
    if (!restore_values) {
      dispatch(getCalculationInfo());
    } else {
      setRestoreValues(false);
      setResetSqft(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isInitialMountData.current) {
      isInitialMountData.current = false;
    } else {
      setLoadingSaved(true);
      // resetValues();
      const savedDataString = localStorage.getItem("rates_info");
      if (savedDataString && !restore_values) {
        const savedData = JSON.parse(savedDataString);
        // Use savedData to set the initial state
        setState(savedData.state);
        setProjectType(savedData.projectType);
        setHourlyPrice(savedData.hourlyPrice);
        setPricePerSqft(savedData.pricePerSqft);
        setPricePerDay(savedData.pricePerDay);
        setAppartment(savedData.appartment);
        setWindow(savedData.window);
        setSqft(savedData.sqft);
      } else {
        setState("National Average");
        let percentage = 0;
        for (let i = 0; i < state_data.length; i++) {
          if (state_data[i].area_name === "National Average") {
            setHourlyPrice(state_data[i].price_customer);
            setPricePerDay(state_data[i].one_day_work);
            percentage = parseFloat(state_data[i].percentage) || 0;
            setAppartment(Math.floor(350 + 350 * percentage));
            setWindow(Math.floor(5 + 5 * percentage));
          }
        }
        setProjectType("Any Type General Cleaning");
        for (let i = 0; i < pricing_data.length; i++) {
          if (pricing_data[i].project_type === "Any Type General Cleaning") {
            setPricePerSqft(pricing_data[i].final);
          }
        }
      }
      setLoadingSaved(false);
    }
  }, [pricing_data, state_data]);

  useEffect(() => {
    if (isInitialMountDropdown.current) {
      isInitialMountDropdown.current = false;
    } else {
      dropdownChange();
    }
  }, [state, projectType]);

  const dropdownChange = () => {
    let percentage = 0;
    for (let i = 0; i < state_data.length; i++) {
      if (state_data[i].area_name === state) {
        setHourlyPrice(state_data[i].price_customer);
        setPricePerDay(Math.floor(parseFloat(state_data[i].one_day_work)));
        percentage = parseFloat(state_data[i].percentage) || 0;
        setAppartment(
          state_data[i].appartment || Math.floor(350 + 350 * percentage)
        );
        setWindow(state_data[i].window || Math.floor(5 + 5 * percentage));
        break;
      }
    }
    for (let i = 0; i < pricing_data.length; i++) {
      if (pricing_data[i].project_type === projectType) {
        let final = parseFloat(pricing_data[i].final);
        setPricePerSqft(
          parseFloat(pricing_data[i].pricePerSqft) ||
            (final + final * percentage).toFixed(2)
        );
        break;
      } else {
        setPricePerSqft(0.0);
      }
    }
  };
  useEffect(() => {
    if (isInitialMountInputs.current) {
      isInitialMountInputs.current = false;
    } else {
      let rate_info = {
        state: state,
        projectType: projectType,
        hourlyPrice: hourlyPrice,
        pricePerSqft: pricePerSqft,
        pricePerDay: pricePerDay,
        appartment: appartment,
        window: window,
        sqft: sqft,
      };
      if (!loading_saved) {
        for (let i = 0; i < state_data.length; i++) {
          if (state_data[i].area_name === state) {
            state_data[i].price_customer = hourlyPrice;
            state_data[i].one_day_work = pricePerDay;
            state_data[i].appartment = appartment;
            state_data[i].window = window;
            break;
          }
        }
        for (let i = 0; i < pricing_data.length; i++) {
          if (pricing_data[i].project_type === projectType) {
            pricing_data[i].pricePerSqft = pricePerSqft;
            break;
          }
        }
        localStorage.setItem("rates_info", JSON.stringify(rate_info));
        localStorage.setItem("state_data", JSON.stringify(state_data));
        localStorage.setItem("pricing_data", JSON.stringify(pricing_data));
      }
    }
  }, [
    hourlyPrice,
    pricePerSqft,
    pricePerDay,
    appartment,
    window,
    state,
    projectType,
    sqft,
  ]);

  const handleRedirection = () => {
    navigate("/cleanup_calculator");
  };

  const resetValues = () => {
    localStorage.removeItem("state_data");
    localStorage.removeItem("pricing_data");
    setRestoreValues(true);
    setResetSqft(true);
    dispatch(getCalculationInfo());
  };

  const handleDeleteDiv = (event) => {
    event.target.parentElement.parentElement.style.display = "none";
  };

  const updateSqftWithDebounce = (newSqft) => {
    const now = Date.now();
    if (now - lastUpdateTime >= 100) {
      // Check if at least 100 milisecond has passed
      setLastUpdateTime(now);
      setSqft(newSqft);
    }
  };
  const handleSelectState = (e) => {
    if (!user) {
      setLoginModalShow(true);
      return;
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
      return;
    } else {
      dispatch(setFreeModeAction());
      dispatch({
        type: USER_SET_FREE_MODE_SUCCESS,
        payload: free_mode_count + 1,
      });
    }
    setState(e.target.value);
  };
  const handleProjectType = (e) => {
    if (!user) {
      setLoginModalShow(true);
      return;
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
      return;
    } else {
      dispatch(setFreeModeAction());
      dispatch({
        type: USER_SET_FREE_MODE_SUCCESS,
        payload: free_mode_count + 1,
      });
    }
    setProjectType(e.target.value);
  };

  const hourly_price_tooltip =
    "The Hourly rate to customers involves taking the labor cost and then applying a markup factor ranging from 2 to 2.4. For example, if the average labor cost is $20, the resulting hourly rate would fall within the range of $40 to $48, which accounts for the applied markup";
  const price_per_sqft_tooltip =
    "Final Clean Price per Square Foot refers to the total cost of a cleaning service calculated on a per-square-foot basis. When determining this price, the cleaning provider takes into account the size of the area that needs cleaning, such as a room, building, or outdoor space. The cost is calculated by dividing the total price of the cleaning service by the total square footage.";
  const price_per_day_tooltip =
    "To determine the daily cost, Ganarpro has computed the hourly rate for laborers, multiplied by a complete team of four individuals working an 8-hour shift. This daily rate encompasses all cleaning aspects of the job scope.";
  const appartment_tooltip =
    "Units can mean the number of doors, beds, or keys depending on the type of construction or building being discussed." +
    "\n1. Number of doors: The number of separate entry points or doors in a building. This is more common in multi-family residential buildings or apartment complexes where each dwelling or apartment has its own entrance." +
    "\n2. Number of beds: Hospitals, healthcare facilities, or certain types of residential buildings like dormitories, 'units' may represent the number of beds or sleeping spaces available." +
    "\n3. Number of keys: In the hospitality industry, especially hotels or motels, 'units' can refer to the number of rooms or accommodations available for guests, typically indicated by the number of room keys issued.";
  const window_tooltip =
    "Exterior window panes, also known as window glazing, refer to the glass panels that are installed on the outer surface of a window frame. The cost to clean exterior windows can vary widely depending on factors such as the size and number of windows, the height of the building, the location, the level of difficulty, and the specific cleaning service you choose.";

  return (
    <Container
      className="d-flex flex-column justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      {loading ? (
        <div className="text-center">
          <StyledSpinner />
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Card>
            <Card.Body>
              <Card.Title>
                <div className="d-flex justify-content-between">
                  <h1>Construction cleaning rates</h1>
                  <div className="d-flex">
                    <Button
                      type="button"
                      variant="primary"
                      style={{ fontSize: "15px", marginRight: "15px" }}
                      onClick={handleRedirection}
                    >
                      Calculator
                    </Button>
                  </div>
                </div>
                <p className="text-start">United States</p>
              </Card.Title>
              <hr />
              <br />
              <Row>
                <h3 className="text-start">Rates</h3>
                <h4 className="text-start d-flex justify-content-between">
                  Average Rates
                  <Button
                    type="button"
                    variant="transparent"
                    onClick={resetValues}
                    style={{ fontSize: "18px", marginTop: "-20px" }}
                  >
                    <FaSyncAlt />
                  </Button>
                </h4>
              </Row>
              <br />
              <Row style={{ margin: "0 8px 0 8px" }}>
                <h5 className="date-style">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h5>
              </Row>
              <br />
              <Row style={{ margin: "0 15px 0 20px" }}>
                <Form.Group as={Col} controlid="formRates" lg={3} md={6} xs={6}>
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    name="state"
                    value={state}
                    style={{ borderRadius: "10px" }}
                    onChange={handleSelectState}
                  >
                    {loading && state_data.length === 0 ? (
                      <option value="">N/A</option>
                    ) : (
                      state_data.map((option, i) => (
                        <option key={i} value={option.area_name}>
                          {option.area_name}
                        </option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlid="formRates" lg={3} md={6} xs={6}>
                  <Form.Label>Hourly Price to customer</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      name="hourly_price"
                      value={hourlyPrice}
                      style={{ width: "80%", borderRadius: "10px" }}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                          setHourlyPrice(e.target.value);
                        } else {
                          setHourlyPrice(0);
                        }
                      }}
                    />
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip className="tooltip">
                          {hourly_price_tooltip}
                        </Tooltip>
                      }
                    >
                      <span className="info-span">
                        <FaInfoCircle />
                      </span>
                    </OverlayTrigger>
                  </div>
                </Form.Group>
                <Form.Group as={Col} controlid="formRates" lg={3} md={6} xs={6}>
                  <Form.Label>Project Type</Form.Label>
                  <Form.Select
                    name="project_type"
                    value={projectType}
                    style={{ borderRadius: "10px" }}
                    onChange={handleProjectType}
                  >
                    {loading || pricing_data.length === 0 ? (
                      <option value="">N/A</option>
                    ) : (
                      pricing_data.map((option, index) => (
                        <option key={index} value={option.project_type}>
                          {option.project_type}
                        </option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlid="formRates" lg={3} md={6} xs={6}>
                  <Form.Label>Final clean price per sq. Ft</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      name="price_per_sqft"
                      type="number"
                      style={{ width: "80%", borderRadius: "10px" }}
                      step={0.01}
                      value={pricePerSqft}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                          setPricePerSqft(e.target.value);
                        } else {
                          setPricePerSqft(0);
                        }
                      }}
                    />
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip className="tooltip">
                          {price_per_sqft_tooltip}
                        </Tooltip>
                      }
                    >
                      <span className="info-span">
                        <FaInfoCircle />
                      </span>
                    </OverlayTrigger>
                  </div>
                </Form.Group>
              </Row>
              <Row className="bottom-margins">
                <ul
                  style={{
                    textAlign: "start",
                    fontSize: "25px",
                    marginLeft: "20px",
                  }}
                >
                  <li
                    className="rates_info"
                    style={{ marginRight: "6px", color: "red" }}
                  >
                    <div className="d-flex">
                      <span className="three-custom-text">Price per 1 day</span>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip className="tooltip">
                            {price_per_day_tooltip}
                          </Tooltip>
                        }
                      >
                        <span className="info-span-bottom">
                          <FaInfoCircle />
                        </span>
                      </OverlayTrigger>
                      <span className="border_line"></span>
                      <div className="currency-symbol">$</div>
                      <Form.Control
                        className="three-custom-inputs"
                        type="number"
                        name="price_per_day"
                        value={pricePerDay}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            /^[0-9]*[.]?[0-9]*$/.test(value)
                          ) {
                            setPricePerDay(e.target.value);
                          } else {
                            setPricePerDay(0);
                          }
                        }}
                      />
                      <span
                        className="delete"
                        onClick={(e) => handleDeleteDiv(e)}
                      >
                        x
                      </span>
                    </div>
                  </li>
                  <li
                    className="rates_info"
                    style={{ marginRight: "6px", color: "yellow" }}
                  >
                    <div className="d-flex">
                      <span className="three-custom-text">
                        Apt, Hotel, Living Units
                      </span>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip className="tooltip">
                            <p>{appartment_tooltip}</p>
                          </Tooltip>
                        }
                      >
                        <span className="info-span-bottom">
                          <FaInfoCircle />
                        </span>
                      </OverlayTrigger>
                      <span className="border_line"></span>
                      <div className="currency-symbol">$</div>
                      <Form.Control
                        className="three-custom-inputs"
                        type="number"
                        name="appartment"
                        value={appartment}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value == "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                            setAppartment(e.target.value);
                          } else {
                            setAppartment(350);
                          }
                        }}
                      />
                      <span
                        className="delete"
                        onClick={(e) => handleDeleteDiv(e)}
                      >
                        x
                      </span>
                    </div>
                  </li>
                  <li
                    className="rates_info"
                    style={{ marginRight: "6px", color: "blue" }}
                  >
                    <div className="d-flex">
                      <span className="three-custom-text">
                        Exterior window panes
                      </span>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip className="tooltip">
                            {window_tooltip}
                          </Tooltip>
                        }
                      >
                        <span className="info-span-bottom">
                          <FaInfoCircle />
                        </span>
                      </OverlayTrigger>
                      <span className="border_line"></span>
                      <div className="currency-symbol">$</div>
                      <Form.Control
                        className="three-custom-inputs"
                        type="number"
                        name="window"
                        value={window}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            /^[0-9]*[.]?[0-9]*$/.test(value)
                          ) {
                            setWindow(e.target.value);
                          } else {
                            setWindow(5);
                          }
                        }}
                      />
                      <span
                        className="delete"
                        onClick={(e) => handleDeleteDiv(e)}
                      >
                        x
                      </span>
                    </div>
                  </li>
                </ul>
              </Row>
              <PricingSlider
                price={pricePerSqft}
                send_sqft={updateSqftWithDebounce}
                sqft_saved={sqft}
                reset_sqft={reset_sqft}
              />
            </Card.Body>
          </Card>
        </>
      )}
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
      <SubscriptionModal
        show={paymentModalShow}
        onHide={() => setPaymentModalShow(false)}
        closeButton={false}
        backdrop="static"
      />
    </Container>
  );
};

export default CleanupRates;
