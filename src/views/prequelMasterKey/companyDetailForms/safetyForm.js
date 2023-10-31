import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Message from "../../../components/Message";
import {
  getSafetyDetails,
  updateSafetyDetails,
} from "../../../store/actions/company_details/companyDetails.actions";
import CompanyFileUploader from "../../../components/forms/CompanyFileUploader";
import Select from "react-select";

export const SafetyForm = ({
  sendData,
  PreviousData,
  movePrevious,
  handleLogin,
}) => {
  const [data, setData] = useState({
    incident_rate_2023: "",
    incident_rate_2022: "",
    incident_rate_2021: "",
    incident_rate_2020: "",
    osha_citations: "",
    fatalities: "",
    written_safety_health: "",
    safety_program: [],
    job_safety: "",
    hazard_communication_program: "",
    accident_investigation_program: "",
    field_safety_inspectors: "",
    osha_logs: "",
    osha_logs_url: "",
    safety_manual: "",
    safety_manual_url: "",
    safety_contact: "",
    warranty_contact: "",
    incidents_in_2023: "",
    incidents_in_2022: "",
    incidents_in_2021: "",
    incidents_in_2020: "",
    most_hours_worked_employee: "",
    employee_hours_in_2023: "",
    employee_hours_in_2022: "",
    employee_hours_in_2021: "",
    employee_hours_in_2020: "",
    project_safety_plans: "",
    abuse_policy: [],
    return_to_work_program: "",
  });

  const safetyProgramOptions = [
    {
      value: "Injury and Illness Prevention Programs (IIPP)",
      label: "Injury and Illness Prevention Programs (IIPP)",
    },
    { value: "Toolbox Talks", label: "Toolbox Talks" },
    {
      value: "Hazard Identification and Risk Assessment",
      label: "Hazard Identification and Risk Assessment",
    },
    { value: "Fall Protection Programs", label: "Fall Protection Programs" },
    {
      value: "Personal Protective Equipment (PPE) Programs",
      label: "Personal Protective Equipment (PPE) Programs",
    },
    {
      value: "Crane and Rigging Safety Programs",
      label: "Crane and Rigging Safety Programs",
    },
    {
      value: "Excavation and Trenching Safety Programs",
      label: "Excavation and Trenching Safety Programs",
    },
    {
      value: "Electrical Safety Programs",
      label: "Electrical Safety Programs",
    },
    {
      value: "Lockout/Tagout (LOTO) Programs",
      label: "Lockout/Tagout (LOTO) Programs",
    },
    {
      value: "Confined Space Entry Programs",
      label: "Confined Space Entry Programs",
    },
    {
      value: "Heat Stress Prevention Programs",
      label: "Heat Stress Prevention Programs",
    },
    {
      value: "Silica Exposure Control Programs",
      label: "Silica Exposure Control Programs",
    },
    {
      value: "Traffic Control and Work Zone Safety Programs",
      label: "Traffic Control and Work Zone Safety Programs",
    },
    {
      value: "Substance Abuse Prevention Programs",
      label: "Substance Abuse Prevention Programs",
    },
    {
      value: "Site-Specific Safety Plans",
      label: "Site-Specific Safety Plans",
    },
    {
      value: "Safety Training and Education",
      label: "Safety Training and Education",
    },
  ];

  const abusePolicyOptions = [
    { value: "Pre hire", label: "Pre hire" },
    { value: "Cause", label: "Cause" },
    { value: "Post accident", label: "Post accident" },
    { value: "Random", label: "Random" },
    { value: "Periodic", label: "Periodic" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const safety = useSelector((state) => state.safetyInfo);
  const { loading, error, safety_info } = safety;

  const safety_update = useSelector((state) => state.safetyUpdate);
  const { success, error: safety_update_error } = safety_update;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success && isFormDataNotEmpty()) {
      setIsLoading(false);
      sendData(formData);
    } else if (PreviousData && Object.keys(PreviousData).length !== 0) {
      for (let key in PreviousData) {
        let value = PreviousData[key];
        if (key === "safety_program" || key === "abuse_policy")
          if (value !== null && value !== undefined && value !== "")
            value = PreviousData[key]
              .split("_")
              .map((item) => ({ value: item, label: item }));

        setData((prevData) => ({
          ...prevData,
          [key]: value || "",
        }));
      }
    } else if (safety_info && Object.keys(safety_info).length !== 0) {
      for (let key in safety_info) {
        if (key != "osha_logs" && key != "safety_manual") {
          let value = safety_info[key];
          if (key === "safety_program" || key === "abuse_policy")
            if (value !== null && value !== undefined && value !== "")
              value = safety_info[key]
                .split("_")
                .map((item) => ({ value: item, label: item }));

          setData((prevData) => ({
            ...prevData,
            [key]: value || "",
          }));
        }
      }
      setData((prevData) => ({
        ...prevData,
        osha_logs_url: safety_info["osha_logs"],
      }));
      setData((prevData) => ({
        ...prevData,
        safety_manual_url: safety_info["safety_manual"],
      }));
    } else if (safety_update_error == null) {
      dispatch(getSafetyDetails());
    }

    if (safety_update_error) {
      setIsLoading(false);
    }
  }, [
    PreviousData,
    safety_info,
    dispatch,
    success,
    formData,
    safety_update_error,
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
        let value = data[key];
        if (key === "safety_program" || key === "abuse_policy")
          if (value !== null && value !== undefined && value !== "")
            value = data[key].map((item) => item.value).join("_");

        formData.append(key, data[key] == null ? "" : value);
      }
      setIsLoading(true);
      setFormData(formData);
      dispatch(updateSafetyDetails(formData));
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
          <b>Safety</b>
        </h4>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2023 Recordable Incident Rate (RIR)</Form.Label>
          <Form.Control
            name="incident_rate_2023"
            value={data.incident_rate_2023}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incident_rate_2023: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2022 Recordable Incident Rate (RIR)</Form.Label>
          <Form.Control
            name="incident_rate_2022"
            value={data.incident_rate_2022}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incident_rate_2022: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2021 Recordable Incident Rate (RIR)</Form.Label>
          <Form.Control
            name="incident_rate_2021"
            value={data.incident_rate_2021}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incident_rate_2021: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2020 Recordable Incident Rate (RIR)</Form.Label>
          <Form.Control
            name="incident_rate_2020"
            value={data.incident_rate_2020}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incident_rate_2020: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>OSHA citations</Form.Label>
          <Form.Control
            name="osha_citations"
            type="number"
            value={data.osha_citations}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                setData((prevData) => ({
                  ...prevData,
                  osha_citations: e.target.value,
                }));
              }
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Number of fatalities</Form.Label>
          <Form.Control
            name="fatalities"
            type="number"
            value={data.fatalities}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*[.]?[0-9]*$/.test(value)) {
                setData((prevData) => ({
                  ...prevData,
                  fatalities: e.target.value,
                }));
              }
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Written safety and health program</Form.Label>
          <Form.Select
            name="written_safety_health"
            value={data.written_safety_health}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                written_safety_health: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Safety Program</Form.Label>
          <Select
            isMulti
            name="phase"
            options={safetyProgramOptions}
            value={data.safety_program}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                safety_program: e,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Job Safety Analysis for work tasks</Form.Label>
          <Form.Select
            name="job_safety"
            value={data.job_safety}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                job_safety: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Hazzard Communication Program</Form.Label>
          <Form.Select
            name="hazard_communication_program"
            value={data.hazard_communication_program}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                hazard_communication_program: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Accident investigation program</Form.Label>
          <Form.Select
            name="accident_investigation_program"
            value={data.accident_investigation_program}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                accident_investigation_program: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Field safety inspectors</Form.Label>
          <Form.Select
            name="field_safety_inspectors"
            value={data.field_safety_inspectors}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                field_safety_inspectors: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>OSHA 300 logs previous 3 years</Form.Label>
          <CompanyFileUploader
            name="osha_logs"
            set_file={data.osha_logs}
            file_url={data.osha_logs_url}
            onFileSelectSuccess={(file) => {
              setData((prevData) => ({
                ...prevData,
                osha_logs: file,
              }));
            }}
            onFileSelectError={({ error }) => alert(error)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Safety Manual</Form.Label>
          <CompanyFileUploader
            name="safety_manual"
            set_file={data.safety_manual}
            file_url={data.safety_manual_url}
            onFileSelectSuccess={(file) => {
              setData((prevData) => ({
                ...prevData,
                safety_manual: file,
              }));
            }}
            onFileSelectError={({ error }) => alert(error)}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Safety contact</Form.Label>
          <Form.Control
            name="safety_contact"
            value={data.safety_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                safety_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Warranty contact</Form.Label>
          <Form.Control
            name="warranty_contact"
            value={data.warranty_contact}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                warranty_contact: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2023 Number of lost time incidents/ Injuries</Form.Label>
          <Form.Control
            name="incidents_in_2023"
            value={data.incidents_in_2023}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incidents_in_2023: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2022 Number of lost time incidents/ Injuries</Form.Label>
          <Form.Control
            name="incidents_in_2022"
            value={data.incidents_in_2022}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incidents_in_2022: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2021 Number of lost time incidents/ Injuries</Form.Label>
          <Form.Control
            name="incidents_in_2021"
            value={data.incidents_in_2021}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incidents_in_2021: e.target.value,
              }));
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2020 Number of lost time incidents/ Injuries</Form.Label>
          <Form.Control
            name="incidents_in_2020"
            value={data.incidents_in_2020}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                incidents_in_2020: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Employee hrs worked-most complete year</Form.Label>
          <Form.Control
            name="most_hours_worked_employee"
            value={data.most_hours_worked_employee}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                most_hours_worked_employee: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2023 Employee hours worked</Form.Label>
          <Form.Control
            name="employee_hours_in_2023"
            value={data.employee_hours_in_2023}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                employee_hours_in_2023: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2022 Employee hours worked</Form.Label>
          <Form.Control
            name="employee_hours_in_2022"
            value={data.employee_hours_in_2022}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                employee_hours_in_2022: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2021 Employee hours worked</Form.Label>
          <Form.Control
            name="employee_hours_in_2021"
            value={data.employee_hours_in_2021}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                employee_hours_in_2021: e.target.value,
              }));
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>2020 Employee hours worked</Form.Label>
          <Form.Control
            name="employee_hours_in_2020"
            value={data.employee_hours_in_2020}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                employee_hours_in_2020: e.target.value,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Do we use project specific safety plans</Form.Label>
          <Form.Select
            name="project_safety_plans"
            value={data.project_safety_plans}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                project_safety_plans: e.target.value,
              }));
            }}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mt-5">
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Substance abuse policy</Form.Label>
          <Select
            isMulti
            name="phase"
            options={abusePolicyOptions}
            value={data.abuse_policy}
            menuPortalTarget={document.body}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                abuse_policy: e,
              }));
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formSafety">
          <Form.Label>Return to work / light duty program</Form.Label>
          <Form.Select
            name="return_to_work_program"
            value={data.return_to_work_program}
            onChange={(e) => {
              setData((prevData) => ({
                ...prevData,
                return_to_work_program: e.target.value,
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
      {safety_update_error ? (
        <Message variant="danger">
          {Object.keys(safety_update_error).map((error) => {
            return (
              <p>
                {error}: {safety_update_error[error].toString()}
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
export default SafetyForm;
