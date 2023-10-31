import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getShippingDetails,
  updateShippingDetails,
} from "../../../store/actions/company_details/companyDetails.actions";

export const ShippingForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    fedex: "",
    ups: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const shipping = useSelector((state) => state.shippingInfo);
  const { loading, error, shipping_info } = shipping;

  const shipping_update = useSelector((state) => state.shippingUpdate);
  const { success, error: shipping_update_error } = shipping_update;

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
    } else if (shipping_info && Object.keys(shipping_info).length !== 0) {
      for (let key in shipping_info) {
        setData((prevData) => ({
          ...prevData,
          [key]: shipping_info[key] || "",
        }));
      }
    } else if (shipping_update_error == null) {
      dispatch(getShippingDetails());
    }

    if (shipping_update_error) {
      setIsLoading(false);
    }
  }, [PreviousData, shipping_info, success, formData, shipping_update_error]);

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
    if (!user) {
      handleLogin();
    } else {
      let formData = new FormData();
      formData.append("userId", id);
      for (const key in data) {
        formData.append(key, data[key]);
      }
      setIsLoading(true);
      setFormData(formData);
      dispatch(updateShippingDetails(formData));
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
          <b>Shipping / Receivings</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formShipping">
          <Form.Label>Fedex Account number</Form.Label>
          <Form.Control
            name="fedex"
            value={data.fedex}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                fedex: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formShipping">
          <Form.Label>UPS Account Number</Form.Label>
          <Form.Control
            name="ups"
            value={data.ups}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                ups: e.target.value,
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
              <h4 className="p-2 mb-1">Save </h4>
            )}
          </Button>
        </Col>
      </Row>
      {shipping_update_error ? (
        <Message variant="danger">
          {Object.keys(shipping_update_error).map((error) => {
            return (
              <p>
                {error}: {shipping_update_error[error].toString()}
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
export default ShippingForm;
