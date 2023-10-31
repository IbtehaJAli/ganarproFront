import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getSupplierDetails,
  updateSupplierDetails,
} from "../../../store/actions/company_details/companyDetails.actions";

export const SupplierForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    supplier1_name: "",
    supplier1_website: "",
    supplier2_name: "",
    supplier2_website: "",
    supplier3_name: "",
    supplier3_website: "",
    supplier1_phone: "",
    supplier1_industry: "",
    supplier2_phone: "",
    supplier2_industry: "",
    supplier3_phone: "",
    supplier3_industry: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const supplier = useSelector((state) => state.supplierInfo);
  const { loading, error, supplier_info } = supplier;

  const supplier_update = useSelector((state) => state.supplierUpdate);
  const { success, error: supplier_update_error } = supplier_update;

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
    } else if (supplier_info && Object.keys(supplier_info).length !== 0) {
      for (let key in supplier_info) {
        setData((prevData) => ({
          ...prevData,
          [key]: supplier_info[key] || "",
        }));
      }
    } else if (supplier_update_error == null) {
      dispatch(getSupplierDetails());
    }

    if (supplier_update_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    supplier_info,
    dispatch,
    success,
    formData,
    supplier_update_error,
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
      dispatch(updateSupplierDetails(formData));
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
          <b>Supplier</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #1 name</Form.Label>
          <Form.Control
            name="supplier1_name"
            value={data.supplier1_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier1_name: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #1 website</Form.Label>
          <Form.Control
            name="supplier1_website"
            value={data.supplier1_website}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier1_website: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #1 phone</Form.Label>
          <Form.Control
            name="supplier1_phone"
            value={data.supplier1_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier1_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #1 industry</Form.Label>
          <Form.Control
            name="supplier1_industry"
            value={data.supplier1_industry}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier1_industry: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #2 name</Form.Label>
          <Form.Control
            name="supplier2_name"
            value={data.supplier2_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier2_name: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #2 website</Form.Label>
          <Form.Control
            name="supplier2_website"
            value={data.supplier2_website}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier2_website: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #2 phone</Form.Label>
          <Form.Control
            name="supplier2_phone"
            value={data.supplier2_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier2_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #2 industry</Form.Label>
          <Form.Control
            name="supplier2_industry"
            value={data.supplier2_industry}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier2_industry: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #3 name</Form.Label>
          <Form.Control
            name="supplier3_name"
            value={data.supplier3_name}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier3_name: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #3 website</Form.Label>
          <Form.Control
            name="supplier3_website"
            value={data.supplier3_website}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier3_website: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #3 phone</Form.Label>
          <Form.Control
            name="supplier3_phone"
            value={data.supplier3_phone}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier3_phone: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formFinance">
          <Form.Label>Supplier #3 industry</Form.Label>
          <Form.Control
            name="supplier3_industry"
            value={data.supplier3_industry}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                supplier3_industry: e.target.value,
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
      {supplier_update_error ? (
        <Message variant="danger">
          {Object.keys(supplier_update_error).map((error) => {
            return (
              <p>
                {error}: {supplier_update_error[error].toString()}
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
export default SupplierForm;
