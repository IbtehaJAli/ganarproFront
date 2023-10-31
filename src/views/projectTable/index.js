import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Form, Row, Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsTables } from "../../store/actions/projects/projects.action";
import {
  DatatableWrapper,
  PaginationOptions,
  Pagination,
  TableHeader,
  TableBody,
} from "react-bs-datatable";
import { isSubscriptionActive } from "../../utils/helpers/helper";
import Spinner from "../../components/spinner/Spinner";
import styled from "styled-components";
import { PhaseFilters } from "../../components/tableFilterDropdown/PhaseFilter";
import MultiStateDropdown from "../../components/MultiStateDropdown";
import MultiStateSelection from "../../components/MultiStateSelection";
import { toastError } from "../../utils/helpers/helper";
import { getStateLaborPricingList } from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";
import "./index.css";
import SubscriptionModal from "../../components/subscriptionModal";
import LoginModal from "../../components/LoginModal";

export const ProjectTable = () => {
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const { user: profile } = useSelector((state) => state.userDetails);
  let { projects, loading, count, error } = useSelector(
    (state) => state.projects
  );
  const { stateLabors } = useSelector((state) => state.stateLaborPricingList);

  const [phaseFilter, setPhaseFilter] = useState("active");
  const [selectedState, setSelectedState] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [sortState, setSortState] = useState({
    prop: "last_modified_date",
    order: "desc",
  });

  const price_id = process.env.REACT_APP_PROJECT_APP;
  // Create table headers consisting of 4 columns.
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Project Name",
      isSortable: true,
    },
    {
      prop: "city",
      title: "City",
      isSortable: true,
    },
    {
      prop: "state",
      title: "State",
      isSortable: true,
    },
    {
      prop: "sf_size",
      title: "Square Foot Size",
      isSortable: true,
      cell: (row) => (
          row.sf_size == 0 ? (
            ""
          ) : (
            row.sf_size
          )
      ),
    },
    {
      prop: "sf_size_str",
      title: "Project Size",
      isSortable: true,
    },
    {
      prop: "project_type",
      title: "Project Type",
      isSortable: true,
    },
    {
      prop: "account_name",
      title: "Company Name",
      isSortable: true,
    },
    {
      prop: "stage_name",
      title: "Phase",
      isSortable: true,
      cell: (row) => (
        row.status == 'A' ? (
          "Active"
        ) : (
          "Historical"
        )
    ),
    },
  ];

  useEffect(() => {
    if(localStorage.getItem("locations")){
      let states = localStorage.getItem("locations").split(",");
      setSelectedState(states.map(state =>  ({ label: state, value: state})));
      dispatch(fetchProjectsTables(`page_size=${rowsPerPage}&location=${states.join(",")}`));
    } else {
      dispatch(fetchProjectsTables(`page_size=${rowsPerPage}`));
    }
  }, []);

  useEffect(() => {
    if (stateLabors.length === 0) {
      dispatch(getStateLaborPricingList());
    }
  }, [stateLabors.length]);

  useEffect(() => {
    if (!user) {
      setLoginModalShow(true);
    } else if (!isSubscriptionActive(profile, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
    }
    if (projects !== null) {
      setMaxPage(Math.ceil(count / rowsPerPage));
    }
  }, [projects, count]);

  useEffect(() => {
    if (stateLabors.length === 0) {
      dispatch(getStateLaborPricingList());
    }
  }, [stateLabors.length]);

  const handleStateChange = (e) => {
    if (e.length <= 5) {
      setSelectedState(e);
      let states = e.map((state) => state.value).join(",");
      dispatch(
        fetchProjectsTables(
          `location=${states}&phase=${phaseFilter}&page_size=${rowsPerPage}&sort=${
            sortState["order"] == "asc"
              ? sortState["prop"]
              : "-" + sortState["prop"]
          }`
        )
      );
      localStorage.setItem("locations", states);
    } else {
      toastError("You can filter only 5 States");
    }
  };

  const handlePhaseChange = (e) => {
    setPhaseFilter(e);
    let states = selectedState.map((state) => state.value).join(",");
    dispatch(
      fetchProjectsTables(
        `location=${states}&phase=${e}&page_size=${rowsPerPage}&sort=${
          sortState["order"] == "asc"
            ? sortState["prop"]
            : "-" + sortState["prop"]
        }`
      )
    );
  };

  const handleRowRedirect = (e) => {
    navigate(`/project_board/${e.url_slug}`);
  };

  const onSortChange = useCallback((nextSort) => {
    setSortState(nextSort);
    console.log(nextSort);
    let states = selectedState.map((state) => state.value).join(",");
    dispatch(
      fetchProjectsTables(
        `location=${states}&phase=${phaseFilter}&page=${currentPage}&page_size=${rowsPerPage}&sort=${
          nextSort["order"] == "asc" ? nextSort["prop"] : "-" + nextSort["prop"]
        }`
      )
    );
  }, [selectedState, phaseFilter, rowsPerPage, sortState]);

  const onRowsPerPageChange = useCallback((rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    let states = selectedState.map((state) => state.value).join(",");
    setCurrentPage(1);
    dispatch(
      fetchProjectsTables(
        `location=${states}&phase=${phaseFilter}&page_size=${rowsPerPage}&sort=${
          sortState["order"] == "asc"
            ? sortState["prop"]
            : "-" + sortState["prop"]
        }`
      )
    );
  }, [selectedState, phaseFilter, sortState]);

  const onPaginationChange = useCallback((nextPage) => {
    setCurrentPage(nextPage);
    let states = selectedState.map((state) => state.value).join(",");
    dispatch(
      fetchProjectsTables(
        `location=${states}&phase=${phaseFilter}&page=${nextPage}&page_size=${rowsPerPage}&sort=${
          sortState["order"] == "asc"
            ? sortState["prop"]
            : "-" + sortState["prop"]
        }`
      )
    );
  }, [selectedState, phaseFilter, rowsPerPage, sortState]);

  return (
    <>
      <Container fluid style={{ paddingInline: "40px" }}>
        <br></br>
        <Row className="justify-content-md-center">
          <Col sm={9}>
            <h1 className="heading-name pb-2">Project Research</h1>
            <p className="subheading">
              Construction project data displayed into a useable format that can
              be analyzed, queried and researched.
            </p>
          </Col>
          <Col sm={9} className="text-start">
            { loading ? (
              <div className="spinner-overlay">
                <div className="spinner-container">
                  <Spinner />
                </div>
              </div>
            ) : user == null ? (
              <>
                <h3 className="pt-4 text-danger">Login to view the projects!</h3>
              </>
            ) : projects == null ? (
              <>
                <h3 className="pt-4 text-danger">Unable to get the projects!</h3>
              </>
            ) : error != null && error.messages != null? (
              <>
                <div className="d-flex justify-content-center align-items-center">
                  {error.messages.map((messageObj, index) => (
                    <div key={index}>
                      <p className="pt-4 text-center text-danger"><b>{messageObj.message}</b></p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <DatatableWrapper
                  highlightOnHover
                  body={projects}
                  headers={STORY_HEADERS}
                  paginationOptionsProps={{
                    initialState: {
                      rowsPerPage: rowsPerPage,
                      options: [20, 50, 100, 200, 500, 1000],
                    },
                  }}
                >
                  <Row className="mb-4 p-2">
                    <Col
                      xs={6}
                      sm={6}
                      lg={3}
                      className="d-flex flex-col justify-content-lg-end align-items-center justify-content-sm-start mb-2 mb-sm-0"
                    >
                      <Form.Group style={{ width: "95%" }}>
                        <Form.Label className="text-start fw-bolder">
                          State
                        </Form.Label>
                        <MultiStateSelection
                          stateLabors={stateLabors}
                          handleChange={handleStateChange}
                          selected={selectedState}
                        />
                      </Form.Group>
                      {/*<Select options={regions} />*/}
                    </Col>
                    <Col
                      xs={6}
                      sm={6}
                      lg={2}
                      className="d-flex flex-col justify-content-end align-items-end"
                    >
                      <PhaseFilters
                        value={phaseFilter}
                        onChange={handlePhaseChange}
                      />
                    </Col>
                    <Col
                      xs={6}
                      lg={2}
                      className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                    >
                      <PaginationOptions
                        controlledProps={{
                          rowsPerPage,
                          onRowsPerPageChange,
                        }}
                        style={{ width: "100%" }}
                      ></PaginationOptions>
                    </Col>
                    <Col
                      xs={6}
                      lg={5}
                      className="d-flex flex-col justify-content-end align-items-end"
                    >
                      <Pagination
                        controlledProps={{
                          currentPage,
                          maxPage,
                          onPaginationChange,
                        }}
                      />
                    </Col>
                  </Row>
                  <Table className="research-table">
                    <TableHeader
                      controlledProps={{
                        sortState,
                        onSortChange,
                      }}
                    ></TableHeader>
                    <TableBody onRowClick={handleRowRedirect} />
                  </Table>
                </DatatableWrapper>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
        closeButton={false}
      />
      <SubscriptionModal
        backdrop="static"
        size="lg"
        show={paymentModalShow}
        dialogClassName="modal-100w"
        closeButton={false}
      />
    </>
  );
};
