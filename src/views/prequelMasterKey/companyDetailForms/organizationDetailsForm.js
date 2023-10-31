import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Image,
  Container,
} from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import StateDropdown from "../../../components/StateDropdown";
import MultiStateDropdown from "../../../components/MultiStateDropdown";
import {
  getOrgDetails,
  updateOrgDetails,
} from "../../../store/actions/company_details/companyDetails.actions";

export const OrganizationDetailForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    identification_number: "",
    date_started: "",
    business_years: "",
    parent_company: "",
    state_founded: "",
    organization_name: "",
    years_under_name: "",
    subsidiaries_number: "",
    manager_name: "",
    manager_email: "",
    entity_formation: "",
    legal_entity: "",
    legal_date: "",
    registered_state: [],
    license_type: "",
    employee_orientation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const companyOrgDetails = useSelector((state) => state.orgDetailsInfo);
  const { loading, error, org_details } = companyOrgDetails;

  const companyOrgDetailsUpdate = useSelector(
    (state) => state.orgDetailsUpdate
  );
  const { success, error: org_details_error } = companyOrgDetailsUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success && isFormDataNotEmpty()) {
      setIsLoading(false);
      sendData(formData);
    } else if (PreviousData && Object.keys(PreviousData).length !== 0) {
      for (let key in PreviousData) {
        let value = PreviousData[key];
        if (
          key === "registered_state" &&
          value !== null &&
          value !== undefined &&
          value !== ""
        )
          value = PreviousData[key]
            .split("_")
            .map((item) => ({ value: item, label: item }));

        setData((prevData) => ({
          ...prevData,
          [key]: value || "",
        }));
      }
    } else if (org_details && Object.keys(org_details).length !== 0) {
      for (let key in org_details) {
        let value = org_details[key];
        if (
          key === "registered_state" &&
          value !== null &&
          value !== undefined &&
          value !== ""
        )
          value = org_details[key]
            .split("_")
            .map((item) => ({ value: item, label: item }));

        setData((prevData) => ({
          ...prevData,
          [key]: value || "",
        }));
      }
    } else if (org_details_error == null) {
      dispatch(getOrgDetails());
    }

    if (org_details_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    org_details,
    dispatch,
    success,
    formData,
    org_details_error,
  ]);

  const submitHandlerNextPage = (e) => {
    e.preventDefault();
    if (user) {
      let formData = new FormData();
      formData.append("userId", id);
      for (const key in data) {
        let value =
          key === "registered_state" &&
          data[key] !== null &&
          data[key] !== undefined &&
          data[key] !== ""
            ? data[key].map((item) => item.value).join("_")
            : data[key] == null
            ? ""
            : data[key];
        formData.append(key, value);
      }
      // sendData(formData);
      setFormData(formData);
      setIsLoading(true);
      dispatch(updateOrgDetails(formData));
    } else {
      sendData(formData);
    }
  };

  const submitHandlerPreviousPage = (e) => {
    movePrevious(true);
  };

  const isFormDataNotEmpty = () => {
    for (const value of formData.values()) {
      if (value) {
        return true;
      }
    }
    return false;
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
          <b>Organization Details</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formIdentificationNumber">
          <Form.Label>Fedral identification number-FEIN</Form.Label>
          <Form.Control
            name="identification_number"
            value={data.identification_number}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                identification_number: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formDateStarted">
          <Form.Label>Date started/ founded business</Form.Label>
          <Form.Control
            name="date_started"
            value={data.date_started}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                date_started: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formBuisnessYears">
          <Form.Label>Number of years in buisness total</Form.Label>
          <Form.Control
            name="business_years"
            type="number"
            value={data.business_years}
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                setData((prevData) => ({
                  ...prevData,
                  business_years: e.target.value,
                }));
              }
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formParentComapny">
          <Form.Label>Parent Company/ owner-principal</Form.Label>
          <Form.Control
            name="parent_company"
            value={data.parent_company}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                parent_company: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formStatefounded">
          <Form.Label>State founded</Form.Label>
          <Form.Control
            name="state_founded"
            value={data.state_founded}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                state_founded: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formOrganizationName">
          <Form.Label>Former name of organization</Form.Label>
          <Form.Control
            name="organization_name"
            value={data.organization_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                organization_name: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formYearsInCurrent">
          <Form.Label>Years in business under current name</Form.Label>
          <Form.Control
            name="years_under_name"
            value={data.years_under_name}
            type="number"
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                setData((prevData) => ({
                  ...prevData,
                  years_under_name: e.target.value,
                }));
              }
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSubsidiaries">
          <Form.Label>Number of subsidiaries or affiliates</Form.Label>
          <Form.Control
            name="subsidiaries_number"
            value={data.subsidiaries_number}
            type="number"
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                setData((prevData) => ({
                  ...prevData,
                  subsidiaries_number: e.target.value,
                }));
              }
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formManagerName">
          <Form.Label>Managing member contact name principal</Form.Label>
          <Form.Control
            name="manager_name"
            value={data.manager_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                manager_name: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formManagerEmail">
          <Form.Label>Managing member principal Email</Form.Label>
          <Form.Control
            name="manager_email"
            type="email"
            value={data.manager_email}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                manager_email: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formEntityFormation">
          <Form.Label>State of entity formation</Form.Label>
          <StateDropdown
            name="entity_formation"
            handleChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                entity_formation: e.target.value,
              }));
            }}
            selected={data.entity_formation}
            hideLabel={true}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLegalEntity">
          <Form.Label>Legal entity form/ Business type</Form.Label>
          <Form.Select
            name="legal_entity"
            value={data.legal_entity}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                legal_entity: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Limited Liability Partnership (LLP)">
              Limited Liability Partnership (LLP)
            </option>
            <option value="Limited Liability Company (LLC)">
              Limited Liability Company (LLC)
            </option>
            <option value="Corporation">Corporation</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formLegalDate">
          <Form.Label>Legal incorporation date</Form.Label>
          <Form.Control
            name="legal_date"
            value={data.legal_date}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                legal_date: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formRegisteredState">
          <Form.Label>Authorized/Registered Secretary of State</Form.Label>
          <MultiStateDropdown
            name="registered_state"
            handleChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                registered_state: e,
              }));
            }}
            selected={data.registered_state}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formLicenseType">
          <Form.Label>Professional License Type</Form.Label>
          <Form.Select
            name="license_type"
            value={data.license_type}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                license_type: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="N/A to my trade">N/A to my trade</option>
            <option value="General construction">General construction</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Fire protection">Fire protection</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Other trade license">Other trade license</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formEmployeeOrientation">
          <Form.Label>New Employee Orientation</Form.Label>
          <Form.Select
            name="employee_orientation"
            value={data.employee_orientation}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                employee_orientation: e.target.value,
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
      {org_details_error ? (
        <Message variant="danger">
          {Object.keys(org_details_error).map((error) => {
            return (
              <p>
                {error}: {org_details_error[error].toString()}
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
export default OrganizationDetailForm;
