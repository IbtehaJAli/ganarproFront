import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import styled from "styled-components";
import Spinner from "../spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;

const StyledArrowContainer = styled.div`
  @media (min-width: 1200px) {
    position: absolute;
    right: 180px;
  }
`;
const CalculatorBidAmountResult = ({
  bidAmount,
  handleIncreaseBidAmount,
  handleDecreaseBidAmount,
  handleBidAmountChange,
  bidAmountHandler,
  isEdit,
}) => {
  const values = useSelector((state) => state.bidAmountValues);
  const costValues = useSelector((state) => state.costProfitValues);
  const {
    percentage,
    loading: stateLaborLoader,
    one_day_work,
    error: stateLaborError,
  } = useSelector((state) => state.stateLaborPricing);
  const {
    phase,
    loading: bidAmountLaborLoader,
    error: bidAmountLaborError,
  } = useSelector((state) => state.bidAmountPricing);
  const { loading } = useSelector((state) => state.cleanUpEstimateDetail);
  let phaseLength = phase.split("_").length;

  let sqtFootPrice = bidAmount / values?.square_foot;
  let rough = 0;
  let final = 0;
  let fluff = 0;
  switch (phase) {
    case "rough":
      rough = bidAmount;
      break;
    case "final":
      final = bidAmount;
      break;
    case "fluff":
      fluff = bidAmount;
      break;
    case "rough_final":
      rough = bidAmount * 0.4;
      final = 0.6 * bidAmount;
      break;
    case "rough_fluff":
      rough = bidAmount * 0.6;
      fluff = bidAmount * 0.4;
      break;
    case "final_fluff":
      final = bidAmount * 0.65;
      fluff = 0.35 * bidAmount;
      break;
    case "rough_final_fluff":
      rough = bidAmount * 0.3;
      final = bidAmount * 0.5;
      fluff = bidAmount * 0.2;
      break;
    default:
      rough = 0;
      final = 0;
      fluff = 0;
  }
  let sign = percentage < 0 ? -1 : 1;
  const calculatePricePerUnit = () => {
    let pricePerUnit = parseFloat(
      (
        Math.abs(percentage) * values.totalSumOfPhases +
        sign * values.totalSumOfPhases
      ).toFixed(0)
    );

    pricePerUnit = pricePerUnit < 0 ? pricePerUnit * -1 : pricePerUnit;
    return pricePerUnit.toLocaleString();
  };

  function localStringToNumber(s) {
    return Number(String(s).replace(/[^0-9.,-]+/g, ""));
  }

  const convertBidAmountToCurrency = (value) => {
    var options = {
      maximumFractionDigits: 2,
      currency: "USD",
      currencyDisplay: "symbol",
    };
    return localStringToNumber(value).toLocaleString(undefined, options);
  };

  let btn = document.getElementById("btn");
  let capture = document.getElementById("capture");

  // btn.addEventListener("click", function () {
  //   html2PDF(capture, {
  //     jsPDF: {
  //       format: "a4",
  //     },
  //     imageType: "image/jpeg",
  //     output: "./pdf/generate.pdf",
  //   });
  // });

  return (
    <Row className="d-flex justify-content-center">
      {bidAmountLaborLoader || stateLaborLoader || loading ? (
        <div className="text-center">
          <StyledSpinner />
        </div>
      ) : stateLaborError || bidAmountLaborError ? (
        <Message variant="danger">Not Found</Message>
      ) : (
        <Col lg={7}>
          <div className="mb-5">
            <h3 className="font-weight-bolder">
              Bid amount
              {/* <span className="font-weight-bold">
                (${convertBidAmountToCurrency(bidAmount)})
              </span> */}
            </h3>
            {isEdit ? (
              <div className="col-lg-12  text-26">
                <InputGroup className="mb-3  text-26" size="lg">
                  <Button
                    variant="outline-secondary"
                    className="text-26"
                    onClick={handleDecreaseBidAmount}
                  >
                    -
                  </Button>
                  <Form.Control
                    className="text-center font-weight-bolder text-20"
                    aria-label="Bid Amount"
                    type="number"
                    // value={convertBidAmountToCurrency(bidAmount)}
                    value={bidAmount}
                    min="1"
                    max="10000"
                    onChange={bidAmountHandler}
                  />
                  {/* {convertBidAmountToCurrency(bidAmount)} */}
                  <Button
                    variant="outline-secondary"
                    className="text-26"
                    onClick={handleIncreaseBidAmount}
                  >
                    +
                  </Button>
                </InputGroup>
              </div>
            ) : (
              <h1>{bidAmount}</h1>
            )}

            {/* <div className="d-flex justify-content-center">
              <h1 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {parseFloat(bidAmount).toFixed(0).toLocaleString()}
              </h1>
              <StyledArrowContainer>
                <FontAwesomeIcon
                  onClick={handleIncreaseBidAmount}
                  icon={faArrowUp}
                  style={{ color: "green" }}
                  size="2xl"
                  className="cursor-pointer"
                  text="increase"
                />
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={{ color: "red" }}
                  size="2xl"
                  className="cursor-pointer ms-3"
                  onClick={handleDecreaseBidAmount}
                />
              </StyledArrowContainer>
            </div> */}

            {/* <p>
              Calculated using the states labor rates and project type sq ft
              rates
            </p> */}
          </div>
          {values?.use_living_unit_pricing ? (
            <div className="my-4">
              <h3 className="font-weight-bolder">Price per Unit</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {calculatePricePerUnit()}
                {/* {2000} */}
              </h3>
            </div>
          ) : costValues?.use_number_of_days ? (
            <div className="my-4">
              <h3 className="font-weight-bolder">Price per Day</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {one_day_work}
              </h3>
            </div>
          ) : sqtFootPrice > 0 ? (
            <div className="my-4">
              <h3 className="font-weight-bolder">Sq. ft Price</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {parseFloat(
                  Math.abs(sqtFootPrice > 0 ? sqtFootPrice : 0).toFixed(2)
                ).toLocaleString()}
              </h3>
            </div>
          ) : (
            ""
          )}
          {rough !== 0 && phaseLength > 1 && (
            <div className="my-4">
              <h3 className="font-weight-bolder">Rough cleaning</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {convertBidAmountToCurrency(
                  parseFloat(rough).toFixed(0).toLocaleString()
                )}
              </h3>
            </div>
          )}
          {final !== 0 && phaseLength >= 1 && (
            <div className="my-4">
              <h3 className="font-weight-bolder">Final Cleaning</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {convertBidAmountToCurrency(
                  parseFloat(final).toFixed(0).toLocaleString()
                )}
              </h3>
            </div>
          )}

          {values?.no_stories_check && (
            <div className="my-4">
              <h3 className="font-weight-bolder">Exterior window cleaning</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {convertBidAmountToCurrency(
                  parseInt(
                    (values?.no_stories * values?.square_foot)
                      .toFixed(0)
                      .toLocaleString()
                  )
                )}
              </h3>
            </div>
          )}

          {fluff !== 0 && phaseLength > 1 && (
            <div className="my-4">
              <h3 className="font-weight-bolder">Fluff Cleaning</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {convertBidAmountToCurrency(
                  parseFloat(fluff).toFixed(0).toLocaleString()
                )}
              </h3>
            </div>
          )}
          {values.pressure_wash > 0 ? (
            <div className="my-4">
              <h3 className="font-weight-bolder">Pressure wash price</h3>
              <h3 className="font-weight-bolder fa-2x">
                <span className="fa-1x small">$</span>
                {convertBidAmountToCurrency(
                  parseFloat(
                    values?.pressure_wash * values?.pressure_wash_price
                  )
                    .toFixed(0)
                    .toLocaleString()
                )}
              </h3>
            </div>
          ) : (
            ""
          )}
        </Col>
      )}
    </Row>
  );
};

export default CalculatorBidAmountResult;
