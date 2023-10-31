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
import {
  updateCompanySocial,
  getCompanySocial,
} from "../../../store/actions/company_details/companyDetails.actions";

export const SocialForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [facebook_page, setFacebookPage] = useState("");
  const [linkdin_page, setLinkedinPage] = useState("");
  const [instagram_page, setInstagramPage] = useState("");
  const [twitter_page, setTwitterPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const comanySocialInfo = useSelector((state) => state.socialInfo);
  const { loading, error, social_info } = comanySocialInfo;

  const comanySocialInfoUpdate = useSelector((state) => state.socialInfoUpdate);
  const { success, error: socialInfoUpdateError } = comanySocialInfoUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success && isFormDataNotEmpty()) {
      setIsLoading(false);
      sendData(formData);
    } else if (PreviousData && Object.keys(PreviousData).length !== 0) {
      updateData(PreviousData);
    } else if (social_info && Object.keys(social_info).length !== 0) {
      updateData(social_info);
    } else if (socialInfoUpdateError == null) {
      dispatch(getCompanySocial());
    }

    if (socialInfoUpdateError) {
      // Handle error here, if needed
      setIsLoading(false);
    }
  }, [
    PreviousData,
    social_info,
    dispatch,
    success,
    formData,
    socialInfoUpdateError,
  ]);

  const submitHandlerNextPage = (e) => {
    e.preventDefault();
    if (user) {
      let formData = new FormData();
      formData.append("userId", id);
      formData.append("facebook_page", facebook_page || "");
      formData.append("linkedin_page", linkdin_page || "");
      formData.append("instagram_page", instagram_page || "");
      formData.append("twitter_page", twitter_page || "");
      setFormData(formData);
      setIsLoading(true);
      dispatch(updateCompanySocial(formData));
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

  const updateData = (data) => {
    setFacebookPage(data.facebook_page || '');
    setLinkedinPage(data.linkedin_page || '');
    setTwitterPage(data.twitter_page || '');
    setInstagramPage(data.instagram_page || '');
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
          <b>Socials</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyName">
          <Form.Label>Facebook Page</Form.Label>
          <Form.Control
            name="facebook_page"
            value={facebook_page}
            onChange={(e) => setFacebookPage(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formCompanyOffice">
          <Form.Label>Linkedin page</Form.Label>
          <Form.Control
            name="linkdin_page"
            value={linkdin_page}
            onChange={(e) => setLinkedinPage(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formCompanyName">
          <Form.Label>Instagram Page</Form.Label>
          <Form.Control
            name="instagram_page"
            value={instagram_page}
            onChange={(e) => setInstagramPage(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formCompanyOffice">
          <Form.Label>Twitter Page</Form.Label>
          <Form.Control
            name="twitter_page"
            value={twitter_page}
            onChange={(e) => setTwitterPage(e.target.value)}
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
      {socialInfoUpdateError ? (
        <Message variant="danger">
          {Object.keys(socialInfoUpdateError).map((error) => {
            return (
              <p>
                {error}: {socialInfoUpdateError[error].toString()}
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
export default SocialForm;
