import { Col, Row } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import styled from "styled-components";
import Spinner from "../spinner/Spinner";
import ToolTip from "../tooltip/ToolTip";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;
const CalculatorCostProfitResult = ({ bidAmount }) => {
  const values = useSelector((state) => state.costProfitValues);
  const { loading: bidAmountLaborLoader, error: bidAmountLaborError } =
    useSelector((state) => state.bidAmountPricing);

  const {
    one_day_work,
    loading: stateLaborLoader,
    error: stateLaborError,
  } = useSelector((state) => state.stateLaborPricing);

  const noOfDaysExpected = (bidAmount / one_day_work).toFixed(1);

  const accurateDaysOnSite = values?.accurate_days_on_site;

  const numberOfDaysToUse = values.use_accurate_days_on_site
    ? accurateDaysOnSite
    : noOfDaysExpected;

  const projectLaborCost =
    values?.laborers_on_site *
    values?.hours_crew_works_daily *
    numberOfDaysToUse *
    values?.hourly_labor_rate;

  const supplyCost = (5 / 100) * parseFloat(bidAmount);

  const noOfDaysExpectedCal = values.use_number_of_days
    ? Number(values.noOfDaysExpected)
    : Number(noOfDaysExpected);

  const noOfDaysExpectedCalToUse = values.use_accurate_days_on_site
    ? accurateDaysOnSite
    : noOfDaysExpectedCal;

  const mobilizationCost =
    10 * Number(values?.laborers_on_site) * noOfDaysExpectedCalToUse;

  const jobOverHeadAmount = values?.job_costs_over_head * bidAmount;
  // const projectProfitAmount =
  //   Number(bidAmount) - (Number(projectLaborCost) + Number(jobOverHeadAmount));
  // const projectProfitAmount =
  //   parseFloat(projectLaborCost) +
  //   parseFloat(supplyCost) +
  //   parseFloat(mobilizationCost);

  const totalCost =
    parseFloat(projectLaborCost) +
    parseFloat(supplyCost) +
    parseFloat(mobilizationCost) +
    parseFloat(jobOverHeadAmount);

  const projectProfitAmount = parseFloat(bidAmount) - parseFloat(totalCost);

  const profitPerDay = projectProfitAmount / noOfDaysExpected || 0;

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

  return (
    <Row className="d-flex justify-content-center">
      {bidAmountLaborLoader || stateLaborLoader ? (
        <div className="text-center">
          <StyledSpinner />
        </div>
      ) : stateLaborError || bidAmountLaborError ? (
        <Message variant="danger">
          {stateLaborError + "\n" + bidAmountLaborError}
        </Message>
      ) : (
        <Col lg={7}>
          <div className="mb-5">
            <h3 className="font-weight-bolder">Project profit amount</h3>
            <h3>
              {" "}
              $
              {convertBidAmountToCurrency(
                projectProfitAmount.toFixed(0).toLocaleString()
              )}
            </h3>
            <p>
              Calculated using Bid amount minus payroll, supplies, mobilization,
              and overhead costs
            </p>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">
              labor cost/payroll{" "}
              <span className="">
                <ToolTip
                  information="Number of laborers x hours worked per day x hourly labor rate x number of days worked on the site."
                />
              </span>
            </h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                projectLaborCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">
              Supplies cost
              <span className="">
                <ToolTip information="Ganarpro designates 5% of the bid amount for supplies, encompassing materials, tools, cleaning agents, and equipment needed for the project. With a bid amount of $1,000, we set aside $50 for supplies expenditure." />
              </span>
            </h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                supplyCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">
              Mobilization cost
              <span className="">
                <ToolTip information="The costs associated with daily travel to the job site are taken into consideration. This covers expenses for fuel as well as the time spent at the beginning and end of each workday. A designated sum of $10 per laborer per day is factored in. For instance, if there are 4 laborers working for 4 days, the mobilization cost would be $40 per day, amounting to a total of $160." />
              </span>
            </h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                mobilizationCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <div className="my-4">
            <h3 className="font-weight-bolder">
              Overhead cost
              <span className="">
                <ToolTip information="The project's overhead cost allocation is determined by multiplying the overhead percentage by the bid amount." />
              </span>
            </h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                jobOverHeadAmount.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <hr className="hr border-top border-3 border-dark" />
          <div className="my-4">
            <h3 className="font-weight-bolder">
              Total Cost
              <span className="">
                <ToolTip information="The total project cost is the sum of labor expenses/payroll, supplies cost, mobilization cost, and overhead cost." />
              </span>
            </h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                totalCost.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
          <hr className="hr border-top border-3 border-dark" />
          <div className="my-4">
            <h3 className="font-weight-bolder">
              Profit per day worked
              <span className="">
                <ToolTip information="The amount of profit earned per day during the duration of a project. It is calculated by dividing the project’s total profit by the number of days worked on the site. This metric serves as an important indicator of the opportunity cost, indicating how much money can be earned per day based on the job estimate.To calculate the Profit per day, the Project Profit Amount, representing the overall profit generated from the project, is divided by the number of days the project is expected to be active on the site." />
              </span>
            </h3>
            <h3>
              $
              {convertBidAmountToCurrency(
                profitPerDay.toFixed(0).toLocaleString()
              )}
            </h3>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default CalculatorCostProfitResult;
