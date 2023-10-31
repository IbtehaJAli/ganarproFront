import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getLegalDetails,
  updateLegalDetails,
} from "../../../store/actions/company_details/companyDetails.actions";

export const LegalForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    involved_in_litigation: "",
    involved_in_bankruptcy: "",
    criminal_investigation: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const legal = useSelector((state) => state.legalInfo);
  const { loading, error, legal_info } = legal;

  const legal_update = useSelector((state) => state.legalUpdate);
  const { success, error: legal_update_error } = legal_update;

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
    } else if (legal_info && Object.keys(legal_info).length !== 0) {
      for (let key in legal_info) {
        setData((prevData) => ({
          ...prevData,
          [key]: legal_info[key] || "",
        }));
      }
    } else if (legal_update_error == null) {
      dispatch(getLegalDetails());
    }

    if (legal_update_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    legal_info,
    dispatch,
    success,
    formData,
    legal_update_error,
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
      dispatch(updateLegalDetails(formData));
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
          <b>Legal</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formLegal">
          <Form.Label>Been involved in litigation</Form.Label>
          <Form.Select
            name="involved_in_litigation"
            value={data.involved_in_litigation}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                involved_in_litigation: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formLegal">
          <Form.Label>Ever involved in bankruptcy</Form.Label>
          <Form.Select
            name="involved_in_bankruptcy"
            value={data.involved_in_bankruptcy}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                involved_in_bankruptcy: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formLegal">
          <Form.Label>Subject of a criminal investigation</Form.Label>
          <Form.Select
            name="criminal_investigation"
            value={data.criminal_investigation}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                criminal_investigation: e.target.value,
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
      {legal_update_error ? (
        <Message variant="danger">
          {Object.keys(legal_update_error).map((error) => {
            return (
              <p>
                {error}: {legal_update_error[error].toString()}
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
export default LegalForm;
