import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getFinanceDetails,
  updateFinanceDetails,
} from "../../../store/actions/company_details/companyDetails.actions";
import CompanyFileUploader from "../../../components/forms/CompanyFileUploader";

export const FinanceForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    duns_number: "",
    dun_bradstreet_rating: "",
    credit_used_against: "",
    line_credit: "",
    current_year_revenue: "",
    interested_in_job_size: "",
    date_financials: "",
    primary_bank_name: "",
    bank_reference_name: "",
    banker_phone: "",
    naics: "",
    equipments_owned_value: "",
    bond_rate: "",
    accountant_firm_name: "",
    accountant_phone: "",
    financials_last_year: "",
    financials_last_year_url: "",
    current_year_volume: "",
    largest_contract_2023: "",
    largest_contract_2022: "",
    largest_contract_2021: "",
    largest_contract_2020: "",
    largest_contract_2019: "",
    revenue_2023: "",
    revenue_2022: "",
    revenue_2021: "",
    revenue_2020: "",
    revenue_2019: "",
    company1: "",
    creditor1_contact: "",
    creditor1_phone: "",
    creditor1_balance: "",
    company2: "",
    creditor2_contact: "",
    creditor2_phone: "",
    creditor2_balance: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const finance = useSelector((state) => state.financeInfo);
  const { loading, error, finance_info } = finance;

  const finance_update = useSelector((state) => state.financeUpdate);
  const { success, error: finance_update_error } = finance_update;

  const dispatch = useDispatch();

  useEffect(() => {
    for (let key in PreviousData) {
      setData((prevData) => ({
        ...prevData,
        [key]: PreviousData[key],
      }));
    }

    if (success && isFormDataNotEmpty()) {
      setIsLoading(false);
      sendData(formData);
    } else if (PreviousData && Object.keys(PreviousData).length !== 0) {
      for (let key in PreviousData) {
        setData((prevData) => ({
          ...prevData,
          [key]: PreviousData[key] || "",
        }));
      }
    } else if (finance_info && Object.keys(finance_info).length !== 0) {
      for (let key in finance_info) {
        if (key !== "financials_last_year") {
          setData((prevData) => ({
            ...prevData,
            [key]: finance_info[key] || "",
          }));
        }
      }
      setData((prevData) => ({
        ...prevData,
        financials_last_year_url: finance_info["financials_last_year"],
      }));
    } else if (finance_update_error == null) {
      dispatch(getFinanceDetails());
    }

    if (finance_update_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    finance_info,
    dispatch,
    success,
    formData,
    finance_update_error,
  ]);

  const isFormDataNotEmpty = () => {
    for (const value of formData.values()) {
      if (value) {
        return true;
      }
    }
    return false;
  };

  const submitHandlerNextPage = (e) => {
    e.preventDefault();
    if (user) {
      let formData = new FormData();
      formData.append("userId", id);
      for (const key in data) {
        formData.append(key, data[key]);
      }
      setIsLoading(true);
      setFormData(formData);
      dispatch(updateFinanceDetails(formData));
    } else {
      sendData(formData);
    }
  };

  const submitHandlerPreviousPage = (e) => {
    movePrevious(true);
  };

  return (
    <Container>
      {loading ? (
        <h4 className="mb-1 mt-2">
          Loading Data <Spinner animation="border" size="md" />{" "}
        </h4>
      ) : (
        <h4></h4>
      )}
      <Row className="mt-4">
        <h4>
          <b>Finance</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Duns number</Form.Label>
          <Form.Control
            name="duns_number"
            value={data.duns_number}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                duns_number: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Duns and Bradstreet Rating</Form.Label>
          <Form.Control
            name="dun_bradstreet_rating"
            value={data.dun_bradstreet_rating}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                dun_bradstreet_rating: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Line of Credit Limit</Form.Label>
          <Form.Control
            name="line_credit"
            value={data.line_credit}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                line_credit: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Utilized Credit Amount</Form.Label>
          <Form.Control
            name="credit_used_against"
            value={data.credit_used_against}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                credit_used_against: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>NAICS</Form.Label>
          <Form.Control
            name="naics"
            value={data.naics}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                naics: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Average job size interested in</Form.Label>
          <Form.Control
            name="interested_in_job_size"
            value={data.interested_in_job_size}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                interested_in_job_size: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Primary Bank / Financial insitution name</Form.Label>
          <Form.Control
            name="primary_bank_name"
            value={data.primary_bank_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                primary_bank_name: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Bank reference name</Form.Label>
          <Form.Control
            name="bank_reference_name"
            value={data.bank_reference_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                bank_reference_name: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance" xs={6}>
          <Form.Label>Banker's phone #</Form.Label>
          <Form.Control
            name="banker_phone"
            value={data.banker_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                banker_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Approximate value of equipment owned</Form.Label>
          <Form.Control
            name="equipments_owned_value"
            value={data.equipments_owned_value}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                equipments_owned_value: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Payment & performance bond rate</Form.Label>
          <Form.Control
            name="bond_rate"
            value={data.bond_rate}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                bond_rate: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Accountant firm name</Form.Label>
          <Form.Control
            name="accountant_firm_name"
            value={data.accountant_firm_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                accountant_firm_name: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Accountant phone</Form.Label>
          <Form.Control
            name="accountant_phone"
            value={data.accountant_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                accountant_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Date financials prepared</Form.Label>
          <Form.Control
            name="date_financials"
            value={data.date_financials}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                date_financials: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Audited / Reviewed financials last year</Form.Label>
          <CompanyFileUploader
            name="financials_last_year"
            set_file={data.financials_last_year}
            file_url={data.financials_last_year_url}
            onFileSelectSuccess={(file) => {
              setData((prevData) => ({
                ...prevData,
                financials_last_year: file,
              }));
            }}
            onFileSelectError={({ error }) => alert(error)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Expected volume for this year</Form.Label>
          <Form.Control
            name="current_year_volume"
            value={data.current_year_volume}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                current_year_volume: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Current year revenue</Form.Label>
          <Form.Control
            name="current_year_revenue"
            value={data.current_year_revenue}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                current_year_revenue: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2023 largest contract</Form.Label>
          <Form.Control
            name="largest_contract_2023"
            value={data.largest_contract_2023}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_2023: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2023 revenue</Form.Label>
          <Form.Control
            name="revenue_2023"
            value={data.revenue_2023}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                revenue_2023: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2022 largest contract</Form.Label>
          <Form.Control
            name="largest_contract_2022"
            value={data.largest_contract_2022}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_2022: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2022 revenue</Form.Label>
          <Form.Control
            name="revenue_2022"
            value={data.revenue_2022}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                revenue_2022: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2021 largest contract</Form.Label>
          <Form.Control
            name="largest_contract_2021"
            value={data.largest_contract_2021}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_2021: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2021 revenue</Form.Label>
          <Form.Control
            name="revenue_2021"
            value={data.revenue_2021}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                revenue_2021: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2020 largest contract</Form.Label>
          <Form.Control
            name="largest_contract_2020"
            value={data.largest_contract_2020}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_2020: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2020 revenue</Form.Label>
          <Form.Control
            name="revenue_2020"
            value={data.revenue_2020}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                revenue_2020: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>2019 largest contract</Form.Label>
          <Form.Control
            name="largest_contract_2019"
            value={data.largest_contract_2019}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_2019: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance" xs={6}>
          <Form.Label>2019 revenue</Form.Label>
          <Form.Control
            name="revenue_2019"
            value={data.revenue_2019}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                revenue_2019: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      {/*  */}
      <Row style={{ marginTop: "40px" }}>
        <Col>
          <p>
            <b> Credit Reference </b>
          </p>
        </Col>
      </Row>
      <Row className="mt-2">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>#1 - Company</Form.Label>
          <Form.Control
            name="company1"
            value={data.company1}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                company1: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Creditor Contact</Form.Label>
          <Form.Control
            name="creditor1_contact"
            value={data.creditor1_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                creditor1_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Creditor's Phone #</Form.Label>
          <Form.Control
            name="creditor1_phone"
            value={data.creditor1_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                creditor1_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Creditor #1 Balance due</Form.Label>
          <Form.Control
            name="creditor1_balance"
            value={data.creditor1_balance}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                creditor1_balance: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row style={{ marginTop: "40px" }}>
        <Col>
          <p>
            <b> Credit Reference </b>
          </p>
        </Col>
      </Row>
      <Row className="mt-2">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>#2 - Company</Form.Label>
          <Form.Control
            name="company2"
            value={data.company2}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                company2: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Creditor 2 Contact</Form.Label>
          <Form.Control
            name="creditor2_contact"
            value={data.creditor2_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                creditor2_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Creditor 2 Phone #</Form.Label>
          <Form.Control
            name="creditor2_phone"
            value={data.creditor2_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                creditor2_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Creditor #2 Balance due</Form.Label>
          <Form.Control
            name="creditor2_balance"
            value={data.creditor2_balance}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                creditor2_balance: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Col className="mt-4 p-3" style={{ textAlign: "start" }}>
          <Button
            variant="outline-primary"
            className=""
            type="button"
            onClick={submitHandlerPreviousPage}
            disabled={isLoading}
          >
            <h4 className="p-2 mb-1">
              <BsArrowLeft style={{ fontSize: "1.5rem" }} /> Back
            </h4>
          </Button>
        </Col>
        <Col className="mt-4 p-3" style={{ textAlign: "end" }}>
          <Button
            variant="primary"
            className=""
            type="button"
            onClick={submitHandlerNextPage}
            disabled={isLoading}
          >
            {isLoading ? (
              <h4 className="p-2 mb-1">
                Loading <Spinner animation="border" size="sm" />{" "}
              </h4>
            ) : (
              <h4 className="p-2 mb-1">
                Next <BsArrowRight style={{ fontSize: "1.5rem" }} />{" "}
              </h4>
            )}
          </Button>
        </Col>
      </Row>
      {finance_update_error ? (
        <Message variant="danger">
          {Object.keys(finance_update_error).map((error) => {
            return (
              <p>
                {error}: {finance_update_error[error].toString()}
              </p>
            );
          })}
        </Message>
      ) : (
        ""
      )}
    </Container>
  );
};
export default FinanceForm;
