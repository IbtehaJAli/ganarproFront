import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Nav,
  OverlayTrigger,
} from "react-bootstrap";
import styled from "styled-components";
import CalculatorBidAmount from "../../components/calculator/CalculatorBidAmount";
import CalculatorCostProfit from "../../components/calculator/CalculatorCostProfit";
import CalculatorBidAmountResult from "../../components/calculator/CalculatorBidAmountResult";
import CalculatorCostProfitResult from "../../components/calculator/CalculatorCostProfitResult";
import { useDispatch, useSelector } from "react-redux";
import RecentEstimates from "../../components/RecentEstimates";
import dayjs from "dayjs";
import {
  fetchEstimateFromStorage,
  fetchStateFromStorage,
  getCleanUpEstimatesDetail,
  saveCleanUpEstimate,
  updateCleanUpEstimate,
} from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";
import { useParams } from "react-router-dom";
import LoginModal from "../../components/LoginModal";
import { useNavigate } from "react-router";
import { BID_AMOUNT_RESET_VALUES } from "../../store/constants/mortgageConstant";
import SubscriptionModal from "../../components/subscriptionModal";
import { TOTAL_FREE_MODE_COUNT } from "../../utils/constants/api";
import { USER_SET_FREE_MODE_SUCCESS } from "../../store/constants/userConstants";
import { toastError, userSubscribedPlans } from "../../utils/helpers/helper";
import Scrollspy from "react-scrollspy";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CalculatorBidAmountResultDownload from "../../components/calculator/CalculatorBidAmountResultDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDownload,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../../components/tooltip/ToolTip";
import Tooltip from "react-bootstrap/Tooltip";

const StyledSectionTwo = styled.div`
  background-color: rgb(246 248 250);
  height: fit-content;
  top: 0;
  right: 0;
  position: sticky;
  @media (min-width: 1200px) {
    // position: fixed;
    // right: 48px;
  }
`;
const StyledRow = styled(Row)`
  padding-top: 4rem;
  position: relative;
`;

const StyledPreviewText = styled.h1`
  color: #000;
  font-weight: 700;
  font-size: 1.8rem;
`;

const StyledPreviewTextH6 = styled.h6`
  color: #000;
  font-weight: 700;
  font-size: 1rem;
`;

const StyledTabs = styled(Tabs)`
  background-color: #fff;
  h2 {
    color: #000;
  }
  button {
    font-size: 16px !important;
    font-weight: 700 !important;
  }
  .nav-item button#noanim-tab-example-tab-new {
    color: #fff;
    background-color: #276fb4;
  }
`;

const CleanupCalculator = () => {
  const [activeTab, setActiveTab] = useState("bidAmount");
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [estimateTabName, setEstimateTabName] = useState("New Estimate");
  const [formTouched, setFormTouched] = useState(false);
  const { search } = window.location;
  const show_tab = new URLSearchParams(search).get("show_tab");
  const { user } = useSelector((state) => state.auth);
  const { user: profile } = useSelector((state) => state.userDetails);
  const navigate = useNavigate();
  let params = useParams();
  const { id } = params;
  const showFormTab = (e) => {
    if (e === "new") {
      setEstimateTabName("New Estimate");
      dispatch({ type: BID_AMOUNT_RESET_VALUES });
      navigate("/cleanup_calculator");
      setActiveTab("bidAmount");
      return;
    }

    setActiveTab(e);
  };
  const [arrowAmount, setArrowAmount] = useState(0);
  const [bidAmountState, setBidAmountState] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [topPosition, setTopPosition] = useState("20%");
  const values = useSelector((state) => state.bidAmountValues);
  const costValues = useSelector((state) => state.costProfitValues);
  const { loading } = useSelector((state) => state.cleanUpEstimateCreate);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const { estimate, loading: estimateLoader } = useSelector(
    (state) => state.cleanUpEstimateDetail
  );
  const { loading: estimateListLoader } = useSelector(
    (state) => state.cleanUpEstimateList
  );
  const [isEdit, setIsEdit] = useState(false);
  const [download, setDownload] = useState(false);

  const {
    percentage,
    one_day_work,
    loading: stateLaborLoader,
  } = useSelector((state) => state.stateLaborPricing);
  const { amount, loading: bidAmountLaborLoader } = useSelector(
    (state) => state.bidAmountPricing
  );
  const [projectNameErrorMessage, setProjectNameErrorMessage] = useState(false);

  const [bidAmountManualChange, setBidAmountManualChange] = useState(0);
  const dispatch = useDispatch();

  const manualBidAmount = (value = 0) => {
    if (parseFloat(value) > 0) {
      setBidAmountState(value);
      setArrowAmount(value);
      return;
    }
  };

  useEffect(() => {
    const nav = document.querySelector("ul.nav.nav-tabs");
    const header = document.querySelector("header.justify-content-between");
    const mainRow = document.querySelector("#mainRow");
    const pageTitle = document.querySelector("#pageTitleCal");

    // const paddingTop = getComputedStyle(mainRow).paddingTop.replace(/\D/g, "");
    // const navPaddingBottom = getComputedStyle(nav).paddingBottom.replace(
    //   /\D/g,
    //   ""
    // );
    // const headerPaddingBottom = getComputedStyle(header).paddingBottom.replace(
    //   /\D/g,
    //   ""
    // );
    // const paddingBottom = getComputedStyle(pageTitle).paddingBottom.replace(
    //   /\D/g,
    //   ""
    // );

    const height =
      parseInt(nav.offsetHeight) +
      parseInt(header.offsetHeight) +
      // parseInt(paddingTop) +
      // parseInt(20) +
      parseInt(pageTitle.offsetHeight);
    // parseInt(paddingBottom) +
    // parseInt(navPaddingBottom) +
    // parseInt(headerPaddingBottom);

    setTopPosition(`${height}px`);
  }, [costValues]);

  const calculateBidAmount = () => {
    let sqtFootPrice = amount;

    let sign = percentage < 0 ? -1 : 1;

    if (values?.state !== "") {
      sqtFootPrice = Math.abs(percentage) * amount + sign * amount;
    }

    const pricePer1bedResult = values?.price_per1_bed * values?.no_of_unit1_bed;
    const pricePer2bedResult = values?.price_per2_bed * values?.no_of_unit2_bed;
    const pricePer3bedResult = values?.price_per3_bed * values?.no_of_unit3_bed;

    const totalPricePerRoom =
      pricePer1bedResult + pricePer2bedResult + pricePer3bedResult;

    let bidAmount = bidAmountState;
    if (id && !formTouched) {
      bidAmount = estimate?.bid_amount || 0;
    } else if (values?.use_unit_pricing) {
      bidAmount = totalPricePerRoom;
    } else if (values?.use_living_unit_pricing) {
      bidAmount =
        Number(values?.living_unit) * (Math.abs(percentage) * 350 + sign * 350);
    } else if (costValues?.use_number_of_days) {
      bidAmount = Number(costValues?.noOfDaysExpected) * one_day_work;
    } else {
      bidAmount = Math.abs(
        Math.abs(sqtFootPrice).toFixed(2) * values?.square_foot
      );
    }

    // bidAmount += arrowAmount;
    // if (id) {
    //   bidAmount = estimate?.bid_amount || 0 + bidAmount;
    // }

    if (values?.emergency_pricing) {
      bidAmount = 0.1 * bidAmount + bidAmount;
    }
    if (values?.scrubbing_pricing) {
      bidAmount = 0.15 * bidAmount + bidAmount;
    }
    if (values?.no_stories_check) {
      bidAmount = values?.no_stories * values?.square_foot + bidAmount;
    }
    if (values?.window_panes > 0) {
      bidAmount +=
        Number(values?.window_panes) * Number(values?.price_per_window);
    }

    // bidAmount += arrowAmount;

    bidAmount = bidAmount < 0 ? bidAmount * -1 : bidAmount;
    setBidAmountState(Math.round(bidAmount));
  };

  const bidAmountHandler = (event) => {
    if (Number(event.target.value) > 900000000) {
      return;
    }
    manualBidAmount(Math.round(event.target.value));
    setBidAmountManualChange(Math.round(event.target.value));
  };

  useEffect(() => {
    calculateBidAmount();
    setEstimateTabName(values.project_name || "New Estimate");
  }, [values, costValues, amount]);

  // let bidAmount;
  // if (values?.use_unit_pricing) {
  //   bidAmount = totalPricePerRoom;
  // } else if (values?.use_living_unit_pricing) {
  //   bidAmount =
  //     Number(values?.living_unit) * (Math.abs(percentage) * 300 + sign * 300);
  // } else if (costValues?.use_number_of_days) {
  //   bidAmount = Number(costValues?.noOfDaysExpected) * one_day_work;
  // } else {
  //   bidAmount = Math.abs(
  //     Math.abs(sqtFootPrice).toFixed(2) * values?.square_foot
  //   );
  // }

  // if (values?.emergency_pricing) {
  //   bidAmount = 0.1 * bidAmount + bidAmount;
  // }
  // if (values?.scrubbing_pricing) {
  //   bidAmount = 0.15 * bidAmount + bidAmount;
  // }
  // if (values?.no_stories_check) {
  //   bidAmount = values?.no_stories * values?.square_foot + bidAmount;
  // }
  // if (values?.window_panes > 0) {
  //   bidAmount +=
  //     Number(values?.window_panes) * Number(values?.price_per_window);
  // }

  const handleIncreaseBidAmount = () => {
    const newAmount = parseFloat(bidAmountState) + 100;
    setArrowAmount(Math.round(newAmount));
    setBidAmountState(Math.round(newAmount));
  };
  const handleDecreaseBidAmount = () => {
    const newAmount = parseFloat(bidAmountState) - 100;
    setArrowAmount(Math.round(newAmount));
    setBidAmountState(Math.round(newAmount));
  };

  // bidAmount += arrowAmount;

  const handleSetLoginModal = (e) => {
    e.preventDefault();
    localStorage.setItem("estimate", JSON.stringify(values));
    setModalShow(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (values.project_name === "") {
      toastError("Project name is required");
      setProjectNameErrorMessage(true);
      return;
    }
    dispatch(
      saveCleanUpEstimate({
        ...costValues,
        ...values,
        no_stories: Number(values.no_stories),
        bid_amount: bidAmountState.toFixed(0),
        notes: values?.notes,
      })
    );
    dispatch({
      type: USER_SET_FREE_MODE_SUCCESS,
      payload: free_mode_count + 1,
    });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    let newValues = values;
    if (user) {
      newValues = {
        ...costValues,
        ...values,
        no_stories: Number(values.no_stories),
        bid_amount: bidAmountState.toFixed(0),
      };
    }

    dispatch(updateCleanUpEstimate(id, newValues));
  };

  const handleSetPaymentModalShow = () => {
    setPaymentModalShow(true);
  };

  const price_id = process.env.REACT_APP_CALC_APP;

  let notSubActive =
    user &&
    free_mode_count >= TOTAL_FREE_MODE_COUNT &&
    !userSubscribedPlans(profile, price_id);
  let handleButton = submitHandler;
  let buttonText = "Save Estimate";

  if (user && notSubActive && estimate && id) {
    handleButton = handleSetPaymentModalShow;
    buttonText = "Update Estimate";
  } else if (user && notSubActive) {
    handleButton = handleSetPaymentModalShow;
  } else if (!user) {
    handleButton = handleSetLoginModal;
  } else if (user && estimate && id) {
    handleButton = updateHandler;
    buttonText = "Update Estimate";
  }
  const estimateItem = JSON.parse(localStorage.getItem("estimate"));
  useEffect(() => {
    if (id && user) {
      dispatch(getCleanUpEstimatesDetail(id));
      setActiveTab("bidAmount");
    }
    if (show_tab) {
      setActiveTab("recent");
    }
    setEstimateTabName(() => values?.project_name || "New Estimate");

    if (estimateItem?.project_name !== "" && user) {
      dispatch(fetchEstimateFromStorage());
    }
    dispatch(fetchStateFromStorage());
  }, [dispatch, estimateItem?.project_name, id, show_tab, user]);

  const printDocument = () => {
    const input = document.getElementById("capture");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // const pdf = new jsPDF();
      const imgWidth = 208; // this is 210mm (A4 size) at 72dpi
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // pdf.save("download.pdf");
      //
      // pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(
        `${values.project_name ? values.project_name : "Estimate name"}.pdf`
      );
    });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const bidAmountTooltip = <Tooltip id="tooltip">Edit</Tooltip>;
  const viewTooltip = <Tooltip id="tooltip">View</Tooltip>;
  const downloadTooltip = <Tooltip id="tooltip">Download as PDF</Tooltip>;
  return (
    <div className="bg-white ms-lg-3">
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <StyledRow id="mainRow">
          {values?.project_name === "" && projectNameErrorMessage && (
            <Alert variant="danger">
              <Alert.Heading>Required Fields!</Alert.Heading>
              Estimate Name is required!
            </Alert>
          )}
          <h1 className="text-start mb-4" id="pageTitleCal">
            Calculator
          </h1>
          {activeTab === "recent" ? (
            ""
          ) : (
            <Container>
              <div
                className="scroll-cal"
                id="scroll-tab"
                style={{
                  top: "126px",
                }}
              >
                <Scrollspy
                  items={["new", "bidAmount", "costProfit", "recent"]}
                  currentClassName="scroll-section is-current"
                  data-spy="scroll"
                  offset={3}
                >
                  <Nav variant="tabs" defaultActiveKey="#">
                    <Nav.Item>
                      <Nav.Link className="nav-link" href="#bidAmount">
                        Bid Amount
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="nav-link" href="#costProfit">
                        Cost & Profit
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Scrollspy>
              </div>
            </Container>
          )}
          <StyledTabs
            // defaultActiveKey={`${showTab}`}
            activeKey={activeTab}
            onSelect={showFormTab}
            transition={true}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="new" title="+"></Tab>
            <Tab
              style={{
                overflowY: "scroll",
                height: "80vh",
                overflowX: "hidden",
              }}
              eventKey="bidAmount"
              title={estimateTabName || "New Estimate"}
            >
              <StyledRow id="bidAmount">
                <Col
                  xs={12}
                  md={12}
                  xl={6}
                  // className="min-vh-100 mx-lg-5 ps-lg-5"
                  className="mx-lg-5 ps-lg-5"
                >
                  <h3 className="text-start mb-4 calculator-title">
                    Bid Amount
                  </h3>
                  <section className="scroll-section is-current">
                    <CalculatorBidAmount
                      handleSetLoginModal={handleSetLoginModal}
                      handleSetPaymentModalShow={handleSetPaymentModalShow}
                      bidAmount={bidAmountState}
                      handleBidAmountChange={calculateBidAmount}
                      setFormTouched={setFormTouched}
                    />
                  </section>
                </Col>

                <StyledSectionTwo className="col-xs-6 col-md-12  col-xl-5 py-5 px-5">
                  <div className="mb-0" id="capture">
                    <Row className="space-between">
                      <Col>
                        <StyledPreviewText className="text-start m-3">
                          {values?.project_name
                            ? values?.project_name
                            : "Result"}
                        </StyledPreviewText>
                      </Col>

                      <Col>
                        {activeTab === "costProfit" ? (
                          <StyledPreviewText className="text-end">
                            Forecast prediction
                          </StyledPreviewText>
                        ) : (
                          <>
                            <StyledPreviewText className="text-end m-3">
                              {profile?.company_name}
                            </StyledPreviewText>
                            <StyledPreviewTextH6 className="text-end m-3">
                              {profile?.proposal_point_contact_phone}
                            </StyledPreviewTextH6>
                          </>
                        )}
                      </Col>
                    </Row>
                    <Row className="space-between mb-5">
                      <CalculatorBidAmountResult
                        bidAmount={bidAmountState}
                        handleIncreaseBidAmount={handleIncreaseBidAmount}
                        handleDecreaseBidAmount={handleDecreaseBidAmount}
                        handleBidAmountChange={manualBidAmount}
                        arrowAmount={arrowAmount}
                        bidAmountHandler={bidAmountHandler}
                        isEdit={isEdit}
                      />
                    </Row>
                    <p className="text-start mb-0 mx-5">
                      {values.modified
                        ? dayjs(values.modified).format("MMMM D, YYYY")
                        : dayjs().format("MMMM D, YYYY")}
                    </p>
                  </div>

                  <Row className="justify-content-end">
                    {!isEdit ? (
                      <Col className="col-1" onClick={handleEdit}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          // onClick={() => setIsEdit(true)}
                          size="2xl"
                          className="cursor-pointer"
                        />

                        {/*<Tooltip id="tooltip"></Tooltip>*/}
                      </Col>
                    ) : (
                      <Col className="col-1" onClick={() => setIsEdit(false)}>
                        <FontAwesomeIcon
                          icon={faEye}
                          className="cursor-pointer"
                          size="2xl"
                        />
                      </Col>
                    )}

                    {!isEdit && (
                      <Col className="col-1" onClick={printDocument}>
                        <FontAwesomeIcon
                          icon={faDownload}
                          className="cursor-pointer"
                          size="2xl"
                        />
                      </Col>
                    )}
                  </Row>
                </StyledSectionTwo>
              </StyledRow>
              <hr />
              <StyledRow id="costProfit">
                <Col
                  xs={12}
                  md={12}
                  xl={6}
                  // className="min-vh-100 mx-lg-5 ps-lg-5"
                  className="mx-lg-5 ps-lg-5"
                >
                  <h3 className="text-start mb-4 calculator-title">
                    Cost & Profit
                  </h3>
                  <section className="scroll-section">
                    <CalculatorCostProfit bidAmount={bidAmountState} />
                  </section>
                </Col>
                <StyledSectionTwo className="col-xs-6 col-md-12  col-xl-5 py-5 px-5">
                  <Row className="space-between mb-5">
                    <Col>
                      <StyledPreviewText className="text-start">
                        {values?.project_name ? values?.project_name : "Result"}
                      </StyledPreviewText>
                    </Col>
                    <Col>
                      <StyledPreviewText className="text-end">
                        Forecast prediction
                      </StyledPreviewText>
                    </Col>
                  </Row>
                  <Row className="space-between mb-5">
                    {bidAmountLaborLoader ||
                    stateLaborLoader ||
                    estimateLoader ? (
                      ""
                    ) : (
                      <CalculatorCostProfitResult bidAmount={bidAmountState} />
                    )}
                  </Row>
                  <h4 className="text-start">
                    {values.modified
                      ? dayjs(values.modified).format("MMMM D, YYYY")
                      : dayjs().format("MMMM D, YYYY")}
                  </h4>
                </StyledSectionTwo>
              </StyledRow>
            </Tab>

            {/* <Tab eventKey="costProfit" title="Cost & Profit"></Tab> */}
            <Tab eventKey="recent" title="Saved Estimates">
              <RecentEstimates
                setModalShow={setModalShow}
                modalShow={modalShow}
              />
            </Tab>
          </StyledTabs>
          <Container className="">
            <StyledRow>
              {/* <Scrollspy
                items={["new", "bidAmount", "costProfit", "recent"]}
                currentClassName="is-current"
                data-spy="scroll"
                offset={3}
              >
                <Nav variant="tabs" defaultActiveKey="#">
                  <Nav.Item>
                    <Nav.Link className="nav-link" href="#bidAmount">
                      Bid Amount
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="nav-link" href="#costProfit">
                      Cost & Profit
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Scrollspy> */}
            </StyledRow>
          </Container>
          {activeTab !== "recent" && !estimateListLoader && !estimateLoader && (
            <Row className="mb-3">
              <Col className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleButton}
                  disabled={loading}
                >
                  <h4 className="p-2">
                    {" "}
                    {loading ? "Processing..." : buttonText}
                  </h4>
                </Button>
              </Col>
            </Row>
          )}
        </StyledRow>
      </Container>
    </div>
  );
};

export default CleanupCalculator;
