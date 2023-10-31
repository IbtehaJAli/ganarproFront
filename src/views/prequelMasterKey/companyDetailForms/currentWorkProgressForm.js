import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getWorkDetails,
  updateWorkDetails,
} from "../../../store/actions/company_details/companyDetails.actions";

export const CurrentWorkProgressForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    project1_info: "",
    project1_contact: "",
    project1_completion: "",
    project1_self_work: "",
    project2_info: "",
    project2_contact: "",
    project2_completion: "",
    project2_self_work: "",
    project3_info: "",
    project3_contact: "",
    project3_completion: "",
    project3_self_work: "",
    project4_info: "",
    project4_contact: "",
    project4_completion: "",
    project4_self_work: "",
    project5_info: "",
    project5_completion: "",
    project5_contact: "",
    project5_self_work: "",
    wip1_gc: "",
    wip1_amount: "",
    wip1_date_completion: "",
    wip2_gc: "",
    wip2_amount: "",
    wip2_date_completion: "",
    wip3_gc: "",
    wip3_amount: "",
    wip3_date_completion: "",
    wip4_gc: "",
    wip4_amount: "",
    wip4_date_completion: "",
    wip5_gc: "",
    wip5_amount: "",
    wip5_date_completion: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const work = useSelector((state) => state.currentWorkInfo);
  const { loading, error, work_info } = work;

  const workUpdate = useSelector((state) => state.currentWorkUpdate);
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
    } else if (work_info && Object.keys(work_info).length !== 0) {
      for (let key in work_info) {
        setData((prevData) => ({
          ...prevData,
          [key]: work_info[key] || "",
        }));
      }
    } else if (work_update_error == null) {
      dispatch(getWorkDetails());
    }

    if (work_update_error) {
      setIsLoading(false);
    }
  }, [PreviousData, work_info, dispatch, success, formData, work_update_error]);

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
      // sendData(formData);
      dispatch(updateWorkDetails(formData));
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
          <b>Current Work in Progress</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Project name/location wip 1</Form.Label>
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

        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>GC Contact and phone wip 1</Form.Label>
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
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent complete wip 1</Form.Label>
          <Form.Control
            name="project1_completion"
            value={data.project1_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project1_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent self-performed work: Project 1</Form.Label>
          <Form.Control
            name="project1_self_work"
            value={data.project1_self_work}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project1_self_work: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>General contractor wip 1</Form.Label>
          <Form.Control
            name="wip1_gc"
            value={data.wip1_gc}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip1_gc: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Contract amount wip 1</Form.Label>
          <Form.Control
            name="wip1_amount"
            value={data.wip1_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip1_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Schedule completion date wip 1</Form.Label>
          <Form.Control
            name="wip1_date_completion"
            value={data.wip1_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip1_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Project name/location wip 2</Form.Label>
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

        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>GC Contact and phone wip 2</Form.Label>
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
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent complete wip 2</Form.Label>
          <Form.Control
            name="project2_completion"
            value={data.project2_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project2_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent self-performed work: Project 2</Form.Label>
          <Form.Control
            name="project2_self_work"
            value={data.project2_self_work}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project2_self_work: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>General contractor wip 2</Form.Label>
          <Form.Control
            name="wip2_gc"
            value={data.wip2_gc}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip2_gc: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Contract amount wip 2</Form.Label>
          <Form.Control
            name="wip2_amount"
            value={data.wip2_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip2_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Schedule completion date wip 2</Form.Label>
          <Form.Control
            name="wip2_date_completion"
            value={data.wip2_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip2_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Project name/location wip 3</Form.Label>
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

        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>GC Contact and phone wip 3</Form.Label>
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
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent complete wip 3</Form.Label>
          <Form.Control
            name="project3_completion"
            value={data.project3_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project3_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent self-performed work: Project 3</Form.Label>
          <Form.Control
            name="project3_self_work"
            value={data.project3_self_work}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project3_self_work: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>General contractor wip 3</Form.Label>
          <Form.Control
            name="wip3_gc"
            value={data.wip3_gc}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip3_gc: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Contract amount wip 3</Form.Label>
          <Form.Control
            name="wip3_amount"
            value={data.wip3_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip3_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Schedule completion date wip 3</Form.Label>
          <Form.Control
            name="wip3_date_completion"
            value={data.wip3_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip3_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Project name/location wip 4</Form.Label>
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

        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>GC Contact and phone wip 4</Form.Label>
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
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent complete wip 4</Form.Label>
          <Form.Control
            name="project4_completion"
            value={data.project4_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project4_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent self-performed work: Project 4</Form.Label>
          <Form.Control
            name="project4_self_work"
            value={data.project4_self_work}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project4_self_work: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>General contractor wip 4</Form.Label>
          <Form.Control
            name="wip4_gc"
            value={data.wip4_gc}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip4_gc: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Contract amount wip 4</Form.Label>
          <Form.Control
            name="wip4_amount"
            value={data.wip4_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip4_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Schedule completion date wip 4</Form.Label>
          <Form.Control
            name="wip4_date_completion"
            value={data.wip4_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip4_date_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Project name/location wip 5</Form.Label>
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

        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent complete wip 5</Form.Label>
          <Form.Control
            name="project5_completion"
            value={data.project5_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project5_completion: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>GC Contact and phone wip 5</Form.Label>
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
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Percent self-performed work: Project 5</Form.Label>
          <Form.Control
            name="project5_self_work"
            value={data.project5_self_work}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project5_self_work: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>General contractor wip 5</Form.Label>
          <Form.Control
            name="wip5_gc"
            value={data.wip5_gc}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip5_gc: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Contract amount wip 5</Form.Label>
          <Form.Control
            name="wip5_amount"
            value={data.wip5_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip5_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formWorkProgress">
          <Form.Label>Schedule completion date wip 5</Form.Label>
          <Form.Control
            name="wip5_date_completion"
            value={data.wip5_date_completion}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                wip5_date_completion: e.target.value,
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
export default CurrentWorkProgressForm;
