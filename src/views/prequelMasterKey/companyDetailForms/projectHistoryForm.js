import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getHistoryDetails,
  updateHistoryDetails,
} from "../../../store/actions/company_details/companyDetails.actions";

export const ProjectHistoryForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    project_size: "",
    backlog: "",
    largest_contract_project: "",
    largest_contract_amount: "",
    largest_contract_completion_date: "",
    jobs_awarded: "",
    work_under_contract: "",
    work_under_forces: "",
    project_damages: "",
    largest_contract_general: "",
    largest_contract_contact: "",
    failed_to_complete: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const history = useSelector((state) => state.historyInfo);
  const { loading, error, history_info } = history;

  const historyUpdate = useSelector((state) => state.historyUpdate);
  const { success, error: history_update_error } = historyUpdate;

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
    } else if (history_info && Object.keys(history_info).length !== 0) {
      for (let key in history_info) {
        setData((prevData) => ({
          ...prevData,
          [key]: history_info[key] || "",
        }));
      }
    } else if (history_update_error == null) {
      dispatch(getHistoryDetails());
    }

    if (history_update_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    history_info,
    dispatch,
    success,
    formData,
    history_update_error,
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
        formData.append(key, data[key] == null ? "" : data[key]);
      }
      setFormData(formData);
      setIsLoading(true);
      dispatch(updateHistoryDetails(formData));
      sendData(formData);
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
          <b>Project History</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Average project size performed</Form.Label>
          <Form.Control
            name="project_size"
            value={data.project_size}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project_size: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Backlog (Value remaining to be billed)</Form.Label>
          <Form.Control
            name="backlog"
            value={data.backlog}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                backlog: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Largest contract amount</Form.Label>
          <Form.Control
            name="largest_contract_amount"
            value={data.largest_contract_amount}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_amount: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Largest contract Project name/ location</Form.Label>
          <Form.Control
            name="largest_contract_project"
            value={data.largest_contract_project}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_project: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Largest contract General contractor</Form.Label>
          <Form.Control
            name="largest_contract_general"
            value={data.largest_contract_general}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_general: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Largest contract GC Contact and phone</Form.Label>
          <Form.Control
            name="largest_contract_contact"
            value={data.largest_contract_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Largest contract completion date</Form.Label>
          <Form.Control
            name="largest_contract_completion_date"
            value={data.largest_contract_completion_date}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                largest_contract_completion_date: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Expected # awarded jobs this year</Form.Label>
          <Form.Control
            name="jobs_awarded"
            value={data.jobs_awarded}
            type="number"
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                setData((prevData) => ({
                  ...prevData,
                  jobs_awarded: e.target.value,
                }));
              }
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Value of Work now under contract</Form.Label>
          <Form.Control
            name="work_under_contract"
            value={data.work_under_contract}
            type="number"
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                setData((prevData) => ({
                  ...prevData,
                  work_under_contract: e.target.value,
                }));
              }
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Percent of work performed by own forces</Form.Label>
          <Form.Control
            name="work_under_forces"
            value={data.work_under_forces}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                work_under_forces: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Assessed Liquidated Damages on a project? </Form.Label>
          <Form.Select
            name="project_damages"
            value={data.project_damages}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project_damages: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formProjectHistory">
          <Form.Label>Failed to complete a contract?</Form.Label>
          <Form.Select
            name="failed_to_complete"
            value={data.failed_to_complete}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                failed_to_complete: e.target.value,
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
      {history_update_error ? (
        <Message variant="danger">
          {Object.keys(history_update_error).map((error) => {
            return (
              <p>
                {error}: {history_update_error[error].toString()}
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
export default ProjectHistoryForm;
