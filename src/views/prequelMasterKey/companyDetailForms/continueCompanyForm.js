import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Image,
  Container,
  FloatingLabel,
} from "react-bootstrap";
import { BsArrowRight, BsArrowLeft, BsDownload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import StateDropdown from "../../../components/StateDropdown";
import {
  updateCompanyDetails2,
  getCompanyDetails,
  getProjectTypes,
} from "../../../store/actions/company_details/companyDetails.actions";
import CompanyFileUploader from "../../../components/forms/CompanyFileUploader";
import Select from "react-select";

export const ContinueCompanyInfo = ({
  sendData,
  movePrevious,
  PreviousData,
  handleLogin,
}) => {
  const [company_address1, setCompanyAddress1] = useState("");
  const [company_address2, setCompanyAddress2] = useState("");
  const [company_city1, setCompanyCity1] = useState("");
  const [company_city2, setCompanyCity2] = useState("");
  const [company_state1, setCompanyState1] = useState("");
  const [company_state2, setCompanyState2] = useState("");
  const [company_zip1, setCompanyZip1] = useState("");
  const [company_zip2, setCompanyZip2] = useState("");
  const [company_employes_number, setCompanyEmployesNumber] = useState("");
  const [permanent_employes, setPermanentEmployes] = useState("");
  const [business_certified, setBusinessCertified] = useState("");
  const [diversity_markets, setDiversityMarkets] = useState([]);
  const [firm_name, setFirmName] = useState("");
  const [dbe_certification, setDbeCertification] = useState("");
  const [mbe_certification, setMbeCertification] = useState("");
  const [wbe_certification, setWbeCertification] = useState("");
  const [interested_projects, setInterestedProjects] = useState([]);
  const [business_size, setBusinessSize] = useState("");
  const [certificate_insurance, setCertificateInsurance] = useState("");
  const [certificate_insurance_url, setCertificateInsuranceUrl] = useState("");
  const [other_contacts, setOtherContracts] = useState("");
  const [company_contract_type, setCompanyContractType] = useState("");
  const [labor_affiliations, setLaborAffliations] = useState("");
  const [union_market, setUnionMarket] = useState([]);
  const [complaint_with_requirements, setComplaintWithRequirements] =
    useState("");
  const [complaint_with_state, setComplaintWithState] = useState("");
  const [Inhouse, setInhouse] = useState("");
  const [apprentice_program, setApprenticeProgram] = useState([]);
  const [w9, setW9] = useState("");
  const [w9_url, setW9Url] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const continueInfo = useSelector((state) => state.continueInfo);
  const { loading, error, continue_info } = continueInfo;

  const project_typ = useSelector((state) => state.projectTypes);
  const {
    loading: loading_drop_down,
    error: error_project_types,
    project_types,
  } = project_typ;

  const companyContinueInfoUpdate = useSelector(
    (state) => state.continueInfoUpdate
  );
  const { success, error: continueInfoUpdateError } = companyContinueInfoUpdate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (success && isFormDataNotEmpty()) {
      setIsLoading(false);
      sendData(formData);
    } else if (PreviousData && Object.keys(PreviousData).length !== 0) {
      updateData(PreviousData);
      setCertificateInsurance(PreviousData.certificate_insurance);
      setW9(PreviousData.w9);
      if (PreviousData.w9_url) {
        setW9Url(PreviousData.w9_url);
      }
      if (PreviousData.certificate_insurance_url) {
        setCertificateInsuranceUrl(PreviousData.certificate_insurance_url);
      }
      dispatch(getProjectTypes());
    } else if (continue_info && Object.keys(continue_info).length !== 0) {
      updateData(continue_info);
      setCertificateInsuranceUrl(continue_info.certificate_insurance);
      setW9Url(continue_info.w9);
    } else if (continueInfoUpdateError == null) {
      dispatch(getCompanyDetails());
      dispatch(getProjectTypes());
    }

    if (continueInfoUpdateError) {
      // Handle error here, if needed
      console.error("Error updating company details:", continueInfoUpdateError);
      setIsLoading(false);
    }
  }, [
    PreviousData,
    continue_info,
    dispatch,
    success,
    formData,
    continueInfoUpdateError,
  ]);

  const submitHandlerPreviousPage = (e) => {
    movePrevious(true);
  };

  const submitHandlerNextPage = (e) => {
    e.preventDefault();
    if (user) {
      let formData = new FormData();
      formData.append("userId", user?.id);
      formData.append("company_address1", company_address1 || "");
      formData.append("company_address2", company_address2 || "");
      formData.append("company_city1", company_city1 || "");
      formData.append("company_city2", company_city2 || "");
      formData.append("company_state1", company_state1 || "");
      formData.append("company_state2", company_state2 || "");
      formData.append("company_zip1", company_zip1 || "");
      formData.append("company_zip2", company_zip2 || "");
      formData.append("company_employes_number", company_employes_number || "");
      formData.append("permanent_employes", permanent_employes || "");
      formData.append("business_certified", business_certified || "");
      formData.append(
        "diversity_markets",
        diversity_markets.map((item) => item.value).join("_")
      );
      formData.append("firm_name", firm_name || "");
      formData.append("dbe_certification", dbe_certification || "");
      formData.append("mbe_certification", mbe_certification || "");
      formData.append("wbe_certification", wbe_certification || "");
      formData.append(
        "interested_projects",
        interested_projects.map((item) => item.value).join("_")
      );
      formData.append("business_size", business_size || "");
      formData.append("certificate_insurance", certificate_insurance || "");
      formData.append("other_contacts", other_contacts || "");
      formData.append("company_contract_type", company_contract_type || "");
      formData.append("labor_affiliations", labor_affiliations || "");
      formData.append(
        "union_market",
        union_market.map((item) => item.value).join("_")
      );
      formData.append(
        "complaint_with_requirements",
        complaint_with_requirements || ""
      );
      formData.append("complaint_with_state", complaint_with_state || "");
      formData.append("Inhouse", Inhouse || "");
      formData.append(
        "apprentice_program",
        apprentice_program.map((item) => item.value).join("_")
      );
      formData.append("w9", w9 || "");
      formData.append("certificate_insurance_url", certificate_insurance_url);
      formData.append("w9_url", w9_url);
      setIsLoading(true);
      dispatch(updateCompanyDetails2(formData));
      setFormData(formData);
    } else {
      sendData(formData);
    }
  };

  const isFormDataNotEmpty = () => {
    for (const value of formData.values()) {
      if (value) {
        return true;
      }
    }
    return false;
  };

  const updateData = (data) => {
    setCompanyAddress1(data.company_address1 || "");
    setCompanyAddress2(data.company_address2 || "");
    setCompanyCity1(data.company_city1 || "");
    setCompanyCity2(data.company_city2 || "");
    setCompanyState1(data.company_state1 || "");
    setCompanyState2(data.company_state2 || "");
    setCompanyZip1(data.company_zip1 || "");
    setCompanyZip2(data.company_zip2 || "");
    setCompanyEmployesNumber(data.company_employes_number || "");
    setPermanentEmployes(data.permanent_employes || "");
    setBusinessCertified(data.business_certified || "");
    diversity_markets_database(data.diversity_markets || "");
    setFirmName(data.firm_name || "");
    setDbeCertification(data.dbe_certification || "");
    setMbeCertification(data.mbe_certification || "");
    setWbeCertification(data.wbe_certification || "");
    interested_projects_database(data.interested_projects || "");
    setBusinessSize(data.business_size || "");
    setOtherContracts(data.other_contacts || "");
    setCompanyContractType(data.company_contract_type || "");
    setLaborAffliations(data.labor_affiliations || "");
    union_markets_database(data.union_market || "");
    setComplaintWithRequirements(data.complaint_with_requirements || "");
    setComplaintWithState(data.complaint_with_state || "");
    setInhouse(data.Inhouse || "");
    apprentice_program_database(data.apprentice_program || "");
  };

  const diversity_markets_database = (data) => {
    if (data !== null && data !== undefined && data !== "") {
      let selected_values = data
        .split("_")
        .map((item) => ({ value: item, label: item }));
      setDiversityMarkets(selected_values);
    }
  };

  const union_markets_database = (data) => {
    if (data !== null && data !== undefined && data !== "") {
      let selected_values = data
        .split("_")
        .map((item) => ({ value: item, label: item }));
      setUnionMarket(selected_values);
    }
  };

  const apprentice_program_database = (data) => {
    if (data !== null && data !== undefined && data !== "") {
      let selected_values = data
        .split("_")
        .map((item) => ({ value: item, label: item }));
      setApprenticeProgram(selected_values);
    }
  };

  const interested_projects_database = (data) => {
    if (data !== null && data !== undefined && data !== "") {
      let selected_values = data
        .split("_")
        .map((item) => ({ value: item, label: item }));
      setInterestedProjects(selected_values);
    }
  };

  const options = [
    { value: "Atlanta", label: "Atlanta" },
    { value: "Austin", label: "Austin" },
    { value: "Charlotte NC", label: "Charlotte NC" },
    { value: "Chicago", label: "Chicago" },
    { value: "Cleveland", label: "Cleveland" },
    { value: "Columbia SC", label: "Columbia SC" },
    { value: "Columbus GA", label: "Columbus GA" },
    { value: "Dallas-Fort Worth", label: "Dallas-Fort Worth" },
    { value: "DMV", label: "DMV" },
    { value: "Gary, IN", label: "Gary, IN" },
    { value: "Greensboro NC", label: "Greensboro NC" },
    { value: "Hampton Roads VA", label: "Hampton Roads VA" },
    { value: "Houston", label: "Houston" },
    { value: "Idaho Falls", label: "Idaho Falls" },
    { value: "Indianapolis", label: "Indianapolis" },
    { value: "Kansas City MO", label: "Kansas City MO" },
    { value: "Madison WI", label: "Madison WI" },
    { value: "Memphis", label: "Memphis" },
    { value: "Milwaukee", label: "Milwaukee" },
    { value: "Minneapolis–Saint Paul", label: "Minneapolis–Saint Paul" },
    { value: "NY City", label: "NY City" },
    { value: "Orlando", label: "Orlando" },
    { value: "PA-NJ-DE", label: "PA-NJ-DE" },
    { value: "Phoenix", label: "Phoenix" },
    { value: "Pittsburgh", label: "Pittsburgh" },
    { value: "Portland OR", label: "Portland OR" },
    { value: "Roanoke", label: "Roanoke" },
    { value: "San Antonio", label: "San Antonio" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "San Juan", label: "San Juan" },
    { value: "Scranton-Wilkes Barre", label: "Scranton-Wilkes Barre" },
    { value: "Seattle", label: "Seattle" },
    { value: "Sioux Falls", label: "Sioux Falls" },
    { value: "Southaven MS", label: "Southaven MS" },
    { value: "Springfield MA", label: "Springfield MA" },
    { value: "St. Louis", label: "St. Louis" },
    { value: "Tampa", label: "Tampa" },
    { value: "Trenton", label: "Trenton" },
    { value: "Other", label: "Other" },
    { value: "N/A", label: "N/A" },
  ];

  const unionMarketsOptions = [
    { value: "New York City, New York", label: "New York City, New York" },
    { value: "Chicago, Illinois", label: "Chicago, Illinois" },
    { value: "Boston, Massachusetts", label: "Boston, Massachusetts" },
    { value: "San Francisco, California", label: "San Francisco, California" },
    {
      value: "Philadelphia, Pennsylvania",
      label: "Philadelphia, Pennsylvania",
    },
    { value: "Washington, D.C", label: "Washington, D.C" },
    { value: "Seattle, Washington", label: "Seattle, Washington" },
    { value: "Los Angeles, California", label: "Los Angeles, California" },
    { value: "Detroit, Michigan", label: "Detroit, Michigan" },
    { value: "Minneapolis, Minnesota", label: "Minneapolis, Minnesota" },
    { value: "Other", label: "Other" },
    { value: "N/A", label: "N/A" },
  ];

  const apprenticOptions = [
    {
      value: "California Apprenticeship Program",
      label: "California Apprenticeship Program",
    },
    {
      value: "New York State Department of Labor Apprenticeship Training",
      label: "New York State Department of Labor Apprenticeship Training",
    },
    {
      value: "Texas Workforce Commission Apprenticeship Training",
      label: "Texas Workforce Commission Apprenticeship Training",
    },
    {
      value: "Illinois Apprenticeship Programs",
      label: "Illinois Apprenticeship Programs",
    },
    {
      value: "Pennsylvania Apprenticeship Program",
      label: "Pennsylvania Apprenticeship Program",
    },
    {
      value: "Ohio Apprenticeship Program",
      label: "Ohio Apprenticeship Program",
    },
    {
      value: "Washington State Apprenticeship and Training Council",
      label: "Washington State Apprenticeship and Training Council",
    },
    {
      value: "Florida Apprenticeship Program",
      label: "Florida Apprenticeship Program",
    },
    {
      value: "Michigan Apprenticeship Program",
      label: "Michigan Apprenticeship Program",
    },
    {
      value: "Virginia Apprenticeship Program",
      label: "Virginia Apprenticeship Program",
    },
  ];

  const projectTypesOptions =
    !Array.isArray(project_types) || project_types.length === 0
      ? [{ value: "", label: "Loading ...." }]
      : project_types.map((option) => ({ value: option, label: option }));

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
          <b>Company Info Continued</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyAddress">
          <Form.Label>Other Address 2</Form.Label>
          <Form.Control
            name="company_address1"
            value={company_address1}
            onChange={(e) => setCompanyAddress1(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyCity">
          <Form.Label>Other City 2</Form.Label>
          <Form.Control
            name="company_city1"
            value={company_city1}
            onChange={(e) => setCompanyCity1(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyState">
          <Form.Label>Other State 2</Form.Label>
          <Form.Control
            name="company_state1"
            value={company_state1}
            onChange={(e) => setCompanyState1(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyZip">
          <Form.Label>Other Zip 2</Form.Label>
          <Form.Control
            name="company_zip1"
            value={company_zip1}
            onChange={(e) => setCompanyZip1(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyAddress">
          <Form.Label>Other Address 3</Form.Label>
          <Form.Control
            name="company_address2"
            value={company_address2}
            onChange={(e) => setCompanyAddress2(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyCity">
          <Form.Label>Other City 3</Form.Label>
          <Form.Control
            name="company_city2"
            value={company_city2}
            onChange={(e) => setCompanyCity2(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyState">
          <Form.Label>Other State 3</Form.Label>
          <Form.Control
            name="company_state2"
            value={company_state2}
            onChange={(e) => setCompanyState2(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyZip">
          <Form.Label>Other Zip 3</Form.Label>
          <Form.Control
            name="company_zip2"
            value={company_zip2}
            onChange={(e) => setCompanyZip2(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyOfficeEmployees">
          <Form.Label>Number of Office Employees</Form.Label>
          <Form.Control
            name="company_employes_number"
            value={company_employes_number}
            onChange={(e) => setCompanyEmployesNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formCompanyEmployees">
          <Form.Label>Permanent Employees</Form.Label>
          <Form.Control
            name="permanent_employes"
            value={permanent_employes}
            onChange={(e) => setPermanentEmployes(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyBusinessCertified">
          <Form.Label>
            Is your business certified?
          </Form.Label>
          <Form.Select name="company_certificated"
            value={business_certified} style={{height:'58%'}}
            onChange={(e) => setBusinessCertified(e.target.value)}>
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formCompanyDiversityMarkets">
          <Form.Label>Diversity Markets</Form.Label>
          <Select
            isMulti
            name="phase"
            options={options}
            value={diversity_markets}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setDiversityMarkets(e)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyCertifiedFirm">
          <Form.Label>Name of Certified Firm and Cert.</Form.Label>
          <Form.Control
            name="certifiedFirm"
            value={firm_name}
            onChange={(e) => setFirmName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyCertificationDBE">
          <Form.Label>DBE Certification</Form.Label>
          <Form.Control
            name="certification_dbe"
            value={dbe_certification}
            onChange={(e) => setDbeCertification(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyCertificationMBE">
          <Form.Label>MBE Certification</Form.Label>
          <Form.Control
            name="certification_mbe"
            value={mbe_certification}
            onChange={(e) => setMbeCertification(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyCertificationWBE">
          <Form.Label>WBE Certification</Form.Label>
          <Form.Control
            name="certification_wbe"
            value={wbe_certification}
            onChange={(e) => setWbeCertification(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyProjectsType">
          <Form.Label>Types of Projects interested in</Form.Label>
          <Select
            isMulti
            name="phase"
            options={projectTypesOptions}
            value={interested_projects}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setInterestedProjects(e)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanySize">
          <Form.Label>Size of business</Form.Label>
          <Form.Select
            name="business_size"
            value={business_size}
            onChange={(e) => setBusinessSize(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Microentreprises">
              Microentreprises: 1 to 9 employees{" "}
            </option>
            <option value="Smallenterprises">
              Small enterprises: 10 to 49 employees{" "}
            </option>
            <option value="Medium-sizedenterprises">
              Medium-sized enterprises: 50 to 249 employees{" "}
            </option>
            <option value="Largeenterprises">
              Large enterprises: 250 employees or more{" "}
            </option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyCertificationIsurance">
          <Form.Label>Certificate of Insurance</Form.Label>
          <CompanyFileUploader
            name="certificate_insurance"
            set_file={certificate_insurance}
            file_url={certificate_insurance_url}
            onFileSelectSuccess={(file) => setCertificateInsurance(file)}
            onFileSelectError={({ error }) => alert(error)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyContacts">
          <Form.Label>Other Contacts</Form.Label>
          <Form.Control
            name="other_contacts"
            value={other_contacts}
            onChange={(e) => setOtherContracts(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyArea">
          <Form.Label>Type of Contractor</Form.Label>
          <Form.Select
            value={company_contract_type}
            name="company_contract_type"
            onChange={(e) => setCompanyContractType(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Subcontractor">Subcontractor</option>
            <option value="Supplier/ manufacturer">
              Supplier/ manufacturer
            </option>
            <option value="UnSure">Unsure</option>
            <option value="General Contractor">General Contractor</option>
          </Form.Select>
        </Form.Group>
        <Form.Group
          as={Col}
          controlId="formCompanyLabour"
          style={{ alignSelf: "center" }}
        >
          <Form.Label>Laborers Union Affiliation</Form.Label>
          <Form.Select
            name="labor_affiliations"
            value={labor_affiliations}
            onChange={(e) => setLaborAffliations(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Union affiliated">Union affiliated</option>
            <option value="Not union affiliated">Not union affiliated</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyUnionMarket" xs={6}>
          <Form.Label>Union Markets</Form.Label>
          <Select
            isMulti
            name="phase"
            options={unionMarketsOptions}
            value={union_market}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setUnionMarket(e)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyComaplaint">
          <Form.Label>Compliant with (EEO) Requirements</Form.Label>
          <Form.Select
            name="complaint_with_requirements"
            value={complaint_with_requirements}
            onChange={(e) => setComplaintWithRequirements(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formComplaintState">
          <Form.Label>Compliant with State and Fed immigration</Form.Label>
          <Form.Select
            name="complaint_with_state"
            value={complaint_with_state}
            onChange={(e) => setComplaintWithState(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyInhouse" xs={6}>
          <Form.Label>In house fabrication Capacity</Form.Label>
          <Form.Select
            name="Inhouse"
            value={Inhouse}
            onChange={(e) => setInhouse(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyProgram">
          <Form.Label>Which State/Federal Apprentice Program</Form.Label>
          <Select
            isMulti
            name="phase"
            menuPortalTarget={document.body}
            options={apprenticOptions}
            value={apprentice_program}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setApprenticeProgram(e)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCompanyW9">
          <Form.Label>W9</Form.Label>
          <CompanyFileUploader
            name="w9"
            set_file={w9}
            file_url={w9_url}
            onFileSelectSuccess={(file) => setW9(file)}
            onFileSelectError={({ error }) => alert(error)}
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
      {continueInfoUpdateError ? (
        <Message variant="danger">
          {Object.keys(continueInfoUpdateError).map((error) => {
            return (
              <p>
                {error}: {continueInfoUpdateError[error].toString()}
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
export default ContinueCompanyInfo;
