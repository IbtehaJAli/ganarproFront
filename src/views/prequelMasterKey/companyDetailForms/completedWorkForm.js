import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getPastWorkDetails,
  updatePastWorkDetails,
} from "../../../store/actions/company_details/companyDetails.actions";

export const CompletedWorkForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    project1_info: "",
    project1_contact: "",
    project1_percent_completed: "",
    project2_info: "",
    project2_contact: "",
    project2_percent_completed: "",
    project3_info: "",
    project3_contact: "",
    project3_percent_completed: "",
    project4_info: "",
    project4_contact: "",
    project4_percent_completed: "",
    project5_info: "",
    project5_contact: "",
    project5_percent_completed: "",
    gc1_info: "",
    gc1_amount: "",
    gc1_date_completion: "",
    gc2_info: "",
    gc2_amount: "",
    gc2_date_completion: "",
    gc3_info: "",
    gc3_amount: "",
    gc3_date_completion: "",
    gc4_info: "",
    gc4_amount: "",
    gc4_date_completion: "",
    gc5_info: "",
    gc5_amount: "",
    gc5_date_completion: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const work = useSelector((state) => state.workInfo);
  const { loading, error, past_work_info } = work;

  const workUpdate = useSelector((state) => state.workUpdate);
  const { success, error: work_update_error } = workUpdate;

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
    } else if (past_work_info && Object.keys(past_work_info).length !== 0) {
      for (let key in past_work_info) {
        setData((prevData) => ({
          ...prevData,
          [key]: past_work_info[key] || "",
        }));
      }
    } else if (work_update_error == null) {
      dispatch(getPastWorkDetails());
    }

    if (work_update_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    past_work_info,
    dispatch,
    success,
    formData,
    work_update_error,
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
      dispatch(updatePastWorkDetails(formData));
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
          <b>Completed in Last 5 Years</b>
        </h4>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Project name/ Locatioon 1</Form.Label>
          <Form.Control
            name="project1_info"
            value={data.project1_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project1_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>GC Contact and phone 1</Form.Label>
          <Form.Control
            name="project1_contact"
            value={data.project1_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project1_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Percent complete 1</Form.Label>
          <Form.Control
            name="project1_percent_completed"
            value={data.project1_percent_completed}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project1_percent_completed: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>General contractor 1</Form.Label>
          <Form.Control
            name="gc1_info"
            value={data.gc1_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc1_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Contract amount 1</Form.Label>
          <Form.Control
            name="gc1_amount"
            value={data.gc1_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc1_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Schedule completion date 1</Form.Label>
          <Form.Control
            name="gc1_date_completion"
            value={data.gc1_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc1_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Project name/ Locatioon 2</Form.Label>
          <Form.Control
            name="project2_info"
            value={data.project2_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project2_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>GC Contact and phone 2</Form.Label>
          <Form.Control
            name="project2_contact"
            value={data.project2_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project2_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Percent complete 2</Form.Label>
          <Form.Control
            name="project2_percent_completed"
            value={data.project2_percent_completed}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project2_percent_completed: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>General contractor 2</Form.Label>
          <Form.Control
            name="gc2_info"
            value={data.gc2_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc2_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Contract amount 2</Form.Label>
          <Form.Control
            name="gc2_amount"
            value={data.gc2_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc2_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Schedule completion date 2</Form.Label>
          <Form.Control
            name="gc2_date_completion"
            value={data.gc2_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc2_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Project name/ Locatioon 3</Form.Label>
          <Form.Control
            name="project3_info"
            value={data.project3_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project3_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>GC Contact and phone 3</Form.Label>
          <Form.Control
            name="project3_contact"
            value={data.project3_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project3_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Percent complete 3</Form.Label>
          <Form.Control
            name="project3_percent_completed"
            value={data.project3_percent_completed}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project3_percent_completed: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>General contractor 3</Form.Label>
          <Form.Control
            name="gc3_info"
            value={data.gc3_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc3_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Contract amount 3</Form.Label>
          <Form.Control
            name="gc3_amount"
            value={data.gc3_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc3_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Schedule completion date 3</Form.Label>
          <Form.Control
            name="gc3_date_completion"
            value={data.gc3_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc3_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Project name/ Locatioon 4</Form.Label>
          <Form.Control
            name="project4_info"
            value={data.project4_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project4_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>GC Contact and phone 4</Form.Label>
          <Form.Control
            name="project4_contact"
            value={data.project4_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project4_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Percent complete 4</Form.Label>
          <Form.Control
            name="project4_percent_completed"
            value={data.project4_percent_completed}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project4_percent_completed: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>General contractor 4</Form.Label>
          <Form.Control
            name="gc4_info"
            value={data.gc4_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc4_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Contract amount 4</Form.Label>
          <Form.Control
            name="gc4_amount"
            value={data.gc4_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc4_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Schedule completion date 4</Form.Label>
          <Form.Control
            name="gc4_date_completion"
            value={data.gc4_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc4_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Project name/ Locatioon 5</Form.Label>
          <Form.Control
            name="project5_info"
            value={data.project5_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project5_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>GC Contact and phone 5</Form.Label>
          <Form.Control
            name="project5_contact"
            value={data.project5_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project5_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Percent complete 5</Form.Label>
          <Form.Control
            name="project5_percent_completed"
            value={data.project5_percent_completed}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project5_percent_completed: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>General contractor 5</Form.Label>
          <Form.Control
            name="gc5_info"
            value={data.gc5_info}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc5_info: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Contract amount 5</Form.Label>
          <Form.Control
            name="gc5_amount"
            value={data.gc5_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc5_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkCompleted">
          <Form.Label>Schedule completion date 5</Form.Label>
          <Form.Control
            name="gc5_date_completion"
            value={data.gc5_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                gc5_date_completion: e.target.value,
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
      {work_update_error ? (
        <Message variant="danger">
          {Object.keys(work_update_error).map((error) => {
            return (
              <p>
                {error}: {work_update_error[error].toString()}
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
export default CompletedWorkForm;
