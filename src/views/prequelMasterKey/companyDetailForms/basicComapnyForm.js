import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Image,
  Container,
  Dropdown,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { BsArrowRight } from "react-icons/bs";
import Message from "../../../components/Message";
import {
  updateCompanyDetails,
  getBasicCompanyDetails,
} from "../../../store/actions/company_details/companyDetails.actions";
import MultiStateDropdown from "../../../components/MultiStateDropdown";

export const BasicCompanyInfo = ({ sendData, PreviousData, handleLogin }) => {
  const [company_name, setCompanyName] = useState("");
  const [office_address, setOfficeAddress] = useState("");
  const [office_city, setOfficeCity] = useState("");
  const [office_state, setOfficeState] = useState("");
  const [office_zip, setOfficeZip] = useState("");
  const [company_phone, setCompanyPhone] = useState("");
  const [company_fax, setCompanyFax] = useState("");
  const [company_website, setCompanyWebsite] = useState("");
  const [working_area, setWorkingArea] = useState([]);
  const [company_specialty, setCompanySpecialty] = useState("");
  const [company_person, setCompanyPerson] = useState("");
  const [company_email, setCompanyEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);

  const companyBasicInfo = useSelector((state) => state.basicInfo);
  const { loading, error, basic_info } = companyBasicInfo;

  const companyBasicInfoUpdate = useSelector((state) => state.basicInfoUpdate);
  const { success, error: basicInfoUpdateError } = companyBasicInfoUpdate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (success && isFormDataNotEmpty()) {
      setIsLoading(false);
      sendData(formData);
    } else if (PreviousData && Object.keys(PreviousData).length !== 0) {
      setCompanyName(PreviousData.company_name || "");
      setCompanyEmail(PreviousData.company_email || "");
      working_area_database(PreviousData.working_area || "");
      setOfficeAddress(PreviousData.office_address || "");
      setOfficeCity(PreviousData.office_city || "");
      setOfficeState(PreviousData.office_state || "");
      setOfficeZip(PreviousData.office_zip || "");
      setCompanyFax(PreviousData.company_fax || "");
      setCompanyWebsite(PreviousData.company_website || "");
      setCompanySpecialty(PreviousData.company_specialty || "");
      setCompanyPerson(PreviousData.company_person || "");
      setCompanyEmail(PreviousData.company_email || "");
      setCompanyPhone(PreviousData.company_phone || "");
    } else if (basic_info && Object.keys(basic_info).length !== 0) {
      setCompanyName(basic_info.company_name || "");
      setCompanyEmail(basic_info.company_email || "");
      working_area_database(basic_info.working_area || "");
      setOfficeAddress(basic_info.office_address || "");
      setOfficeCity(basic_info.office_city || "");
      setOfficeState(basic_info.office_state || "");
      setOfficeZip(basic_info.office_zip || "");
      setCompanyFax(basic_info.company_fax || "");
      setCompanyWebsite(basic_info.company_website || "");
      setCompanySpecialty(basic_info.company_specialty || "");
      setCompanyPerson(basic_info.company_person || "");
      setCompanyEmail(basic_info.company_email || "");
      setCompanyPhone(basic_info.company_phone || "");
    } else if (basicInfoUpdateError == null) {
      dispatch(getBasicCompanyDetails());
    }
    if (basicInfoUpdateError) {
      // Handle error here, if needed
      console.error("Error updating company details:", basicInfoUpdateError);
      setIsLoading(false);
    }
  }, [
    PreviousData,
    basic_info,
    dispatch,
    success,
    formData,
    basicInfoUpdateError,
  ]);

  const isFormDataNotEmpty = () => {
    for (const value of formData.values()) {
      if (value) {
        return true;
      }
    }
    return false;
  };

  const working_area_database = (data) => {
    if (data !== null && data !== undefined && data !== "") {
      let selected_values = data
        .split("_")
        .map((item) => ({ value: item, label: item }));
      setWorkingArea(selected_values);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (user) {
      formData.append("userId", user?.id);
      formData.append("company_name", company_name || "");
      formData.append("office_address", office_address || "");
      formData.append("office_city", office_city || "");
      formData.append("office_state", office_state || "");
      formData.append("office_zip", office_zip || "");
      formData.append("company_phone", company_phone || "");
      formData.append("company_fax", company_fax || "");
      formData.append("company_website", company_website || "");
      formData.append(
        "working_area",
        working_area.map((item) => item.value).join("_") || ""
      );
      formData.append("company_specialty", company_specialty || "");
      formData.append("company_person", company_person || "");
      formData.append("company_email", company_email || "");

      dispatch(updateCompanyDetails(formData));
      setIsLoading(true);

      setFormData(formData);
      // sendData(formData)}
    } else {
      sendData(formData);
    }
  };

  return (
    <Container>
      {loading ? (
        <h4 className="p-2 mb-1">
          Loading Data <Spinner animation="border" size="sm" />{" "}
        </h4>
      ) : (
        <h4></h4>
      )}
      <Row className="mt-4">
        <h4>
          <b>Basic Company Info</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyName">
          <Form.Label>Company Name </Form.Label>
          <Form.Control
            name="company_name"
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyPhone">
          <Form.Label>Office Phone </Form.Label>
          <Form.Control
            name="company_phone"
            value={company_phone}
            onChange={(e) => setCompanyPhone(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formOfficeAddress">
          <Form.Label>Office Address</Form.Label>
          <Form.Control
            name="office_address"
            value={office_address}
            onChange={(e) => setOfficeAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formOfficeCity">
          <Form.Label>Office City</Form.Label>
          <Form.Control
            name="office_city"
            value={office_city}
            onChange={(e) => setOfficeCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyFax">
          <Form.Label>Fax</Form.Label>
          <Form.Control
            name="company_fax"
            value={company_fax}
            onChange={(e) => setCompanyFax(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formOfficeState">
          <Form.Label>Office State</Form.Label>
          <Form.Control
            name="office_state"
            value={office_state}
            onChange={(e) => setOfficeState(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formOfficeZip">
          <Form.Label>Office Zip</Form.Label>
          <Form.Control
            name="office_zip"
            value={office_zip}
            onChange={(e) => setOfficeZip(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyWebsite">
          <Form.Label>Website </Form.Label>
          <Form.Control
            name="company_website"
            value={company_website}
            placeholder="https://example.com"
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanySpecialty">
          <Form.Label>Trade-Scope-Work Speciality</Form.Label>
          <Form.Control
            name="company_specialty"
            value={company_specialty}
            onChange={(e) => setCompanySpecialty(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyPerson">
          <Form.Label>Main Invitation to Bid Person </Form.Label>
          <Form.Control
            name="company_person"
            value={company_person}
            onChange={(e) => setCompanyPerson(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyContractType">
          <Form.Label>Working region/Service area Jurisdiction</Form.Label>
          <MultiStateDropdown
            name="working_area"
            handleChange={(e) => setWorkingArea(e)}
            selected={working_area}
          />
        </Form.Group>
        <Form.Group
          as={Col}
          controlId="formCompanyEmail"
          style={{ alignSelf: "center" }}
        >
          <Form.Label>Estimating Email</Form.Label>
          <Form.Control
            name="company_email"
            value={company_email}
            onChange={(e) => setCompanyEmail(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Col className="mt-4 p-3" style={{ textAlign: "end" }}>
          <Button
            variant="primary"
            className=""
            type="button"
            onClick={submitHandler}
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
      {basicInfoUpdateError ? (
        <Message variant="danger">
          {Object.keys(basicInfoUpdateError).map((error) => {
            return (
              <p>
                {error}: {basicInfoUpdateError[error].toString()}
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
export default BasicCompanyInfo;
