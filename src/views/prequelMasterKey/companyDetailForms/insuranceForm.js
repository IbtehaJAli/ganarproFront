import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getInsuranceDetails,
  updateInsuranceDetails,
} from "../../../store/actions/company_details/companyDetails.actions";
import CompanyFileUploader from "../../../components/forms/CompanyFileUploader";

export const InsuranceForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    agent_name: "",
    agent_contact: "",
    agent_phone: "",
    agent_email: "",
    agent_website: "",
    insurance_expiry: "",
    workers: "",
    emr_carrier: "",
    emr_letter: "",
    emr_letter_url: "",
    bonding_company_letter: "",
    bonding_company_letter_url: "",
    liability_coverage: "",
    general_aggregate: "",
    excess_limit: "",
    auto_insurance_limit: "",
    compensation_limit: "",
    modification_rate: "",
    bond_capacity: "",
    surety_bonding_company: "",
    cgl_policy: "",
    current_work_bonded: "",
    surety_rating: "",
    performance_bond: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const insurance = useSelector((state) => state.insuranceInfo);
  const { loading, error, insurance_info } = insurance;

  const insurance_update = useSelector((state) => state.insuranceUpdate);
  const { success, error: insurance_update_error } = insurance_update;

  const dispatch = useDispatch();

  useEffect(() => {
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
    } else if (insurance_info && Object.keys(insurance_info).length !== 0) {
      for (let key in insurance_info) {
        if (key != "emr_letter" && key != "bonding_company_letter") {
          setData((prevData) => ({
            ...prevData,
            [key]: insurance_info[key] || "",
          }));
        }
      }
      setData((prevData) => ({
        ...prevData,
        emr_letter_url: insurance_info["emr_letter"] || '',
      }));
      setData((prevData) => ({
        ...prevData,
        bonding_company_letter_url: insurance_info["bonding_company_letter"] || '',
      }));

    } else if (insurance_update_error == null) {
      dispatch(getInsuranceDetails());
    }

    if (insurance_update_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    insurance_info,
    dispatch,
    success,
    formData,
    insurance_update_error,
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
      dispatch(updateInsuranceDetails(formData));
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
          <b>Insurance</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Insurance agent company name</Form.Label>
          <Form.Control
            name="agent_name"
            value={data.agent_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                agent_name: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Insurance agent contact</Form.Label>
          <Form.Control
            name="agent_contact"
            value={data.agent_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                agent_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Insurance agent phone</Form.Label>
          <Form.Control
            name="agent_phone"
            value={data.agent_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                agent_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Insurance agent email address</Form.Label>
          <Form.Control
            name="agent_email"
            type="email"
            value={data.agent_email}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                agent_email: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Insurance agent website</Form.Label>
          <Form.Control
            name="agent_website"
            value={data.agent_website}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                agent_website: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Insurance exp. date</Form.Label>
          <Form.Control
            type="date"
            name="insurance_expiry"
            value={data.insurance_expiry}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                insurance_expiry: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Workers Compensation EMR carrier</Form.Label>
          <Form.Control
            name="emr_carrier"
            value={data.emr_carrier}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                emr_carrier: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>EMR Letter</Form.Label>
          <CompanyFileUploader
            name="emr_letter"
            set_file={data.emr_letter}
            file_url={data.emr_letter_url}
            onFileSelectSuccess={(file) => {
              setData((prevData) => ({
                ...prevData,
                "emr_letter": file,
              }));
            }}
            onFileSelectError={({ error }) => alert(error)}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Letter from bonding company</Form.Label>
          <CompanyFileUploader
            name="bonding_company_letter"
            set_file={data.bonding_company_letter}
            file_url={data.bonding_company_letter_url}
            onFileSelectSuccess={(file) => {
              setData((prevData) => ({
                ...prevData,
                "bonding_company_letter": file,
              }));
            }}
            onFileSelectError={({ error }) => alert(error)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>General liability coverage</Form.Label>
          <Form.Control
            name="liability_coverage"
            value={data.liability_coverage}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                liability_coverage: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>General Aggregate</Form.Label>
          <Form.Control
            name="general_aggregate"
            value={data.general_aggregate}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                general_aggregate: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Excess Limit</Form.Label>
          <Form.Control
            name="excess_limit"
            value={data.excess_limit}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                excess_limit: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Auto insurance</Form.Label>
          <Form.Control
            name="auto_insurance_limit"
            value={data.auto_insurance_limit}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                auto_insurance_limit: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Workers compensation limit</Form.Label>
          <Form.Control
            name="compensation_limit"
            value={data.compensation_limit}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                compensation_limit: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Experience modification rate (EMR)</Form.Label>
          <Form.Control
            name="modification_rate"
            value={data.modification_rate}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                modification_rate: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Bond Capacity</Form.Label>
          <Form.Control
            name="bond_capacity"
            value={data.bond_capacity}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                bond_capacity: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Surety-Bonding agent company</Form.Label>
          <Form.Control
            name="surety_bonding_company"
            value={data.surety_bonding_company}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                surety_bonding_company: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Exclusion from Standard CGL Policy</Form.Label>
          <Form.Select
            name="cgl_policy"
            value={data.cgl_policy}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                cgl_policy: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Value of work currently bonded</Form.Label>
          <Form.Control
            name="current_work_bonded"
            value={data.current_work_bonded}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                current_work_bonded: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formInsurance">
          <Form.Label>Surety Rating</Form.Label>
          <Form.Control
            name="surety_rating"
            value={data.surety_rating}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                surety_rating: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formInsurance" xs={6}>
          <Form.Label>Able to produce a performance bond</Form.Label>
          <Form.Select
            name="performance_bond"
            value={data.performance_bond}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                performance_bond: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
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
      {insurance_update_error ? (
        <Message variant="danger">
          {Object.keys(insurance_update_error).map((error) => {
            return (
              <p>
                {error}: {insurance_update_error[error].toString()}
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
export default InsuranceForm;
