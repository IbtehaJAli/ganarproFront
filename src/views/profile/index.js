import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Image,
  OverlayTrigger,
} from "react-bootstrap";
import {
  StyledAccordionHeader,
  StyledForm,
} from "../../components/ProposalForm/proposalForm.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetail,
  updateUserProfile,
} from "../../store/actions/users/users.actions";
import Spinner from "../../components/spinner/Spinner";
import Message from "../../components/Message";
import styled from "styled-components";
import { USER_UPDATE_RESET } from "../../store/constants/userConstants";
import { useNavigate } from "react-router";
import { State } from "country-state-city";
import ProfileFileUploader from "../../components/forms/ProfileFileUploader";
import { formatPhoneNumber } from "../../utils/helpers/helper";
import IntlTelInput from "react-intl-tel-input";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { check } from "prettier";
import badgeCheck from "../../assets/icons/badge-check.svg";
import DomainVerificationModal from "../../components/DomainVerificationModal";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-bootstrap/Tooltip";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;
const Profile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { id } = user;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user: profileUser } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: errorUpdate } = userUpdateProfile;

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_state, setCompanyState] = useState("");
  const [company_street, setCompanyStreet] = useState("");
  const [company_city, setCompanyCity] = useState("");
  const [company_zip, setCompanyZip] = useState("");
  const [proposal_point_contact_name, setProposalContactName] = useState("");
  const [proposal_point_contact_phone, setProposalPhone] = useState("");
  const [proposal_point_contact_email, setProposalContactEmail] = useState("");
  const [job_site_contact_name, setJobSiteContactName] = useState("");
  const [job_site_contact_phone, setJobSiteContactPhone] = useState("");
  const [job_site_contact_email, setJobSiteContactEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [file_url, setSelectedFileURL] = useState("");
  const [outbound_email, setOutBoundEmail] = useState("");
  const dispatch = useDispatch();
  const [verificationModalShow, setVerificationModalShow] = useState(false);

  // const [percentage, setPercentage] = useState(0);

  let state = State.getStatesOfCountry("US");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (!profileUser?.email || success) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetail());
      } else {
        setFirstName(profileUser?.first_name);
        setLastName(profileUser?.last_name);
        setEmail(profileUser?.email);
        setOutBoundEmail(profileUser?.outbound_email);
        setPhone(profileUser?.phone);
        setCompanyName(profileUser?.company_name);
        setCompanyStreet(profileUser?.company_street);
        setCompanyCity(profileUser?.company_city);
        setCompanyState(profileUser?.company_state);
        setCompanyZip(profileUser?.company_zip);
        setProposalContactName(profileUser?.proposal_point_contact_name);
        setProposalPhone(profileUser?.proposal_point_contact_phone);
        setProposalContactEmail(profileUser?.proposal_point_contact_email);
        setJobSiteContactName(profileUser?.job_site_contact_name);
        setJobSiteContactPhone(profileUser?.job_site_contact_phone);
        setJobSiteContactEmail(profileUser?.job_site_contact_email);
        setSelectedFileURL(profileUser?.file_url);
      }
    }
  }, [
    dispatch,
    id,
    profileUser?.first_name,
    profileUser?.last_name,
    profileUser?.email,
    profileUser?.outbound_email,
    profileUser?.phone,
    profileUser?.company_name,
    profileUser?.company_street,
    profileUser?.company_city,
    profileUser?.company_zip,
    profileUser?.file_url,
    profileUser?.proposal_point_contact_name,
    profileUser?.proposal_point_contact_phone,
    profileUser?.proposal_point_contact_email,
    profileUser?.job_site_contact_name,
    profileUser?.job_site_contact_phone,
    profileUser?.job_site_contact_email,
    profileUser,
    success,
    user,
    navigate,
  ]);
  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("outbound_email", outbound_email);
    formData.append("phone", phone);
    formData.append("company_name", company_name || "");
    formData.append("company_state", company_state || "");
    formData.append("company_street", company_street || "");
    formData.append("company_zip", company_zip || "");
    formData.append(
      "proposal_point_contact_name",
      proposal_point_contact_name || ""
    );
    formData.append(
      "proposal_point_contact_phone",
      proposal_point_contact_phone || ""
    );
    formData.append(
      "proposal_point_contact_email",
      proposal_point_contact_email || ""
    );
    formData.append("job_site_contact_name", job_site_contact_name || "");
    formData.append("job_site_contact_phone", job_site_contact_phone || "");
    formData.append("job_site_contact_email", job_site_contact_email || "");
    formData.append("company_city", company_city || "");
    formData.append("image", selectedFile);
    dispatch(updateUserProfile(formData));
  };
  const viewTooltip = <Tooltip id="tooltip">your email is verified</Tooltip>;

  return (
    <StyledForm
      className="my-5 justify-content-center col-md-7 mx-auto"
      encType="multipart/form-data"
    >
      {loading ? (
        <div className="text-center">
          <StyledSpinner />
        </div>
      ) : error ? (
        <Message variant="danger text-center">{error}</Message>
      ) : (
        <>
          {errorUpdate && (
            <Message variant="danger">
              {Object.keys(errorUpdate).map((error) => {
                return (
                  <p>
                    {" "}
                    {error}: {errorUpdate[error].toString()}
                  </p>
                );
              })}
            </Message>
          )}
          <Row className="mb-4">
            <Col>
              <Link
                to="/"
                variant="primary"
                className="btn btn-primary text-decoration-none"
                type="submit"
              >
                <h4 className="p-2">Back</h4>
              </Link>
            </Col>
          </Row>
          <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
            <Accordion.Item className="bg-white" eventKey="0">
              <StyledAccordionHeader>
                Account owner Information
              </StyledAccordionHeader>
              <Accordion.Body className="mb-5">
                <Row className="my-4">
                  <Form.Group as={Col} controlId="formGridCustomerCompanyName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="first_name"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCustomerCompanyName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="last_name"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-4">
                  <Form.Group as={Col} controlId="formGridCustomerCompanyName">
                    <Form.Label>Phone</Form.Label>
                    <IntlTelInput
                      containerClassName="intl-tel-input d-block"
                      inputClassName="form-control"
                      allowDropdown={false}
                      countries={["us"]}
                      preferredCountries={["us"]}
                      type="tel"
                      autoComplete="tel"
                      onPhoneNumberChange={(isValid, phone, country) => {
                        setPhone(formatPhoneNumber(phone));
                      }}
                      value={phone || ""}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCustomerCompanyName">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      disabled
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-4 jus">
                  <Form.Group
                    className="col-md-6"
                    controlId="formGridCustomerCompanyName"
                  >
                    <Form.Label>Outbound Email</Form.Label>
                    <Form.Control
                      type="outbound_email"
                      name="outbound_email"
                      value={outbound_email}
                      onChange={(e) => setOutBoundEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Col className="col-12 col-md-6 align-self-end">
                    <Row className="flex-row">
                      {profileUser?.is_domain_verify ? (
                        <Col md={1} className="align-self-end col-2">
                          <OverlayTrigger
                            placement="bottom"
                            overlay={viewTooltip}
                            defaultShow
                          >
                            <Image src={badgeCheck} width={30} height={30} />
                          </OverlayTrigger>
                        </Col>
                      ) : (
                        <>
                          <Col
                            md={3}
                            className="align-self-end col-3 p-0"
                            style={{ width: "80px" }}
                          >
                            <Button
                              onClick={() => setVerificationModalShow(true)}
                            >
                              Verify email
                            </Button>
                          </Col>
                          <Col md={3} className="align-self-end col-3">
                            <a
                              href="https://www.ganarpro.com/support/verify-your-domain-to-enable-ganapro-email-functionality/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button className="btn btn-primary">
                                Learn more
                              </Button>
                            </a>
                          </Col>
                        </>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="bg-white" eventKey="1">
              <StyledAccordionHeader>
                Used in Proposal Generator and Cleanup Calculator
              </StyledAccordionHeader>
              <Accordion.Body>
                <Row className="mt-5">
                  <Form.Group as={Col} controlId="formCompanyName">
                    <Form.Label>
                      {" "}
                      Proposal Company Name{" "}
                      <span className="text-danger fw-bolder">*</span>
                    </Form.Label>
                    <Form.Control
                      name="company_name"
                      value={company_name}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formCompanyStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      name="company_street"
                      value={company_street}
                      onChange={(e) => setCompanyStreet(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-4">
                  <Form.Group as={Col} controlId="formCompanyCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="company_city"
                      value={company_city}
                      onChange={(e) => setCompanyCity(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      value={company_state}
                      onChange={(e) => setCompanyState(e.target.value)}
                      defaultValue="Choose..."
                    >
                      <option>Choose...</option>
                      {state.map((item) => {
                        return (
                          <option key={item.isoCode} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formCompanyZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      name="company_zip"
                      value={company_zip}
                      onChange={(e) => setCompanyZip(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-5 mb-4">
                  <Form.Group as={Col} controlId="formComapnyContactName">
                    <Form.Label>Proposal Point of Contact</Form.Label>
                    <Form.Control
                      name="company_contact_name"
                      value={proposal_point_contact_name}
                      onChange={(e) => setProposalContactName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formCompanyContactPhone">
                    <Form.Label>Phone No</Form.Label>
                    <IntlTelInput
                      containerClassName="intl-tel-input d-block"
                      inputClassName="form-control"
                      allowDropdown={false}
                      countries={["us"]}
                      preferredCountries={["us"]}
                      type="tel"
                      autoComplete="tel"
                      onPhoneNumberChange={(isValid, phone, country) => {
                        setProposalPhone(formatPhoneNumber(phone));
                      }}
                      value={proposal_point_contact_phone || ""}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formCompanyContactEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="company_contact_email"
                      value={proposal_point_contact_email}
                      onChange={(e) => setProposalContactEmail(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="formComapnyContactName">
                    <Form.Label>On the Job Site Contact Name</Form.Label>
                    <Form.Control
                      name="job_site_contact_name"
                      value={job_site_contact_name}
                      onChange={(e) => setJobSiteContactName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formCompanyContactPhone">
                    <Form.Label>Phone No</Form.Label>
                    <IntlTelInput
                      containerClassName="intl-tel-input d-block"
                      inputClassName="form-control"
                      allowDropdown={false}
                      countries={["us"]}
                      preferredCountries={["us"]}
                      type="tel"
                      autoComplete="tel"
                      onPhoneNumberChange={(isValid, phone, country) => {
                        setJobSiteContactPhone(formatPhoneNumber(phone));
                      }}
                      value={job_site_contact_phone || ""}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formCompanyContactEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="job_site_contact_email"
                      value={job_site_contact_email}
                      onChange={(e) => setJobSiteContactEmail(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-5">
                  <Form.Label> Company Logo </Form.Label>
                  <Form.Group
                    as={Col}
                    controlId="CompanyLogo"
                    className="d-flex align-items-center"
                  >
                    <Image
                      alt="No Image"
                      roundedCircle
                      src={file_url}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <ProfileFileUploader
                      onFileSelectSuccess={(file) => setSelectedFile(file)}
                      onFileSelectError={({ error }) => alert(error)}
                    />
                  </Form.Group>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Row>
              <Col className="text-center mt-4 p-4">
                <Button
                  variant="primary"
                  className=""
                  type="submit"
                  onClick={submitHandler}
                >
                  <h4 className="p-2">Update</h4>
                </Button>
              </Col>
            </Row>
          </Accordion>
        </>
      )}
      <DomainVerificationModal
        show={verificationModalShow}
        onHide={() => setVerificationModalShow(false)}
      />
    </StyledForm>
  );
};
export default Profile;
