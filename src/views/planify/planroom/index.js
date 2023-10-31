import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import Spinner from "../../../components/spinner/Spinner";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegions,
  getAllGcQualifyCompanies,
  getRegions,
} from "../../../store/actions/gc_qualify/gcQualify.actions";
import {
  faArrowDown,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginModal from "../../../components/LoginModal";
import PaymentModal from "../../../components/PaymentModal";
import SubscriptionModal from "../../../components/subscriptionModal";
import { setFreeModeAction } from "../../../store/actions/users/users.actions";
import { TOTAL_FREE_MODE_COUNT } from "../../../utils/constants/api";
import { USER_SET_FREE_MODE_SUCCESS } from "../../../store/constants/userConstants";
import {
  isSubscriptionActive,
  userSubscribedPlans,
} from "../../../utils/helpers/helper";
import AsyncSelect from "react-select/async";
import DatePickerContainer from "../../../components/planify/DatePickerContainer";
import NotesContainer from "../../../components/planify/NotesContainer";
import ReportProblemContainer from "../../../components/planify/ReportProblemContainer";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;

const StyledTable = styled(Table)`
  // th.thead-th {
  //   width: 80px;
  // }
  // tr.thead-tr:nth-child(1) {
  //   width: 20px;
  // }
`;
// Then, use it in a component.
const PlanRoom = () => {
  const [modalShow, setModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { user: profile } = useSelector((state) => state.userDetails);
  const { companies, loading: companyLoader } = useSelector(
    (state) => state.gcQualifyCompanyList
  );
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetLoginModal = () => {
    setModalShow(true);
  };
  const handleSetPaymentModal = () => {
    setPaymentModalShow(true);
  };
  const handleSetFreeMode = () => {
    dispatch(setFreeModeAction());
    dispatch({
      type: USER_SET_FREE_MODE_SUCCESS,
      payload: free_mode_count + 1,
    });
  };
  const price_id = process.env.REACT_APP_PREQUAL_APP;

  const processAction = (e, row) => {
    e.preventDefault();
    if (!user) {
      handleSetLoginModal();
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      handleSetPaymentModal();
    } else {
      handleSetFreeMode();

      window.open(row.planroom_link, "_blank");
    }
  };

  const handleChange = (value) => {
    setSelectedRegions([...value]);
    localStorage.setItem("planRoomSelectedRegions", JSON.stringify(value));
    let region = value.map((item) => item.name).join(";");

    dispatch(getAllGcQualifyCompanies({ plan_room: true, region }));
  };
  // Create table headers consisting of 4 columns.
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Account Name",
      isFilterable: true,
      isSortable: true,
      width: "2px",
      maxWidth: "50px",
    },
    {
      prop: "planroom_link",
      title: "Plan room link",

      cell: (row) => (
        <a
          href={"#"}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => processAction(e, row)}
        >
          {row.planroom_link ? (
            <FontAwesomeIcon icon={faFolder} size="2xl" />
          ) : (
            ""
          )}
        </a>
      ),
    },
    {
      prop: "notes",
      title: "Notes",
      cell: (row) => (
        <NotesContainer
          row={row}
          key={row.id}
          view="planroom"
          handleSetLoginModal={handleSetLoginModal}
          handleSetPaymentModal={handleSetPaymentModal}
          handleSetFreeMode={handleSetFreeMode}
          price_id={price_id}
          user={user}
          free_mode_count={free_mode_count}
        />
      ),
    },
    // {
    //   prop: "opportunity_source_stage_type",
    //   title: "Planroom Stage Type",
    // },
    {
      prop: "date_visited",
      title: "Date Visited",
      cell: (row) => (
        <DatePickerContainer
          row={row}
          key={row.id}
          handleSetLoginModal={handleSetLoginModal}
          handleSetPaymentModal={handleSetPaymentModal}
          handleSetFreeMode={handleSetFreeMode}
          price_id={price_id}
          user={user}
          free_mode_count={free_mode_count}
        />
      ),
    },

    {
      prop: "report_problem",
      title: "Report a problem",
      cell: (row) => (
        <ReportProblemContainer
          key={row.id}
          row={row}
          handleSetLoginModal={handleSetLoginModal}
          handleSetPaymentModal={handleSetPaymentModal}
          handleSetFreeMode={handleSetFreeMode}
          price_id={price_id}
          user={user}
          free_mode_count={free_mode_count}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getRegions());

    const fetchRegionsFromStorage = () => {
      return JSON.parse(localStorage.getItem("planRoomSelectedRegions"));
    };
    if (fetchRegionsFromStorage()) {
      let value = fetchRegionsFromStorage();
      setSelectedRegions(value);
      let region = value.map((item) => item.name).join(";");

      dispatch(getAllGcQualifyCompanies({ plan_room: true, region }));
    } else {
      dispatch(getAllGcQualifyCompanies({ plan_room: true }));
    }
  }, [dispatch]);

  const handleRedirection = () => {
    navigate("/pre_qualify");
  };

  return (
    <div className="bg-white ms-lg-3">
      <Container className="me-auto ">
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        <Row className="justify-content-md-center">
          <Col md={8} className="">
            <div className=" p-2 rounded-lg m-3">
              <div className="d-flex justify-content-between">
                <h1 className="display-3"> Dynamic Plan Rooms</h1>
                <Button
                  type="button"
                  variant="primary"
                  style={{ fontSize: "15px", alignSelf: "center" }}
                  onClick={handleRedirection}>
                  PreQualify
                </Button>
              </div>
              <hr className="my-4 fw-bolder" />
              <p className="h4">
                Construction plans, drawings, and related documents are stored
                and made available for review by project stakeholders.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={4} className="my-md-5 text-start">
            <p className="text-start fw-bolder">
              Market Working Region: {companies.length}
            </p>
            <MultiSelectDropdown
              customHandler={handleChange}
              selectedRegions={selectedRegions}
            />
            {/*<Select options={regions} />*/}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={12} className="text-start">
            {companyLoader ? (
              <div className="text-center">
                <StyledSpinner />
              </div>
            ) : (
              <DatatableWrapper
                body={companies}
                headers={STORY_HEADERS}
                paginationOptionsProps={{
                  initialState: {
                    rowsPerPage: 1000,
                    options: [1000],
                  },
                }}
              >
                <Row className="mb-4 p-2">
                  <Col
                    xs={12}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Filter />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                  >
                    <PaginationOptions />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Pagination />
                  </Col>
                </Row>
                <StyledTable>
                  <TableHeader />
                  <TableBody />
                </StyledTable>
              </DatatableWrapper>
            )}
          </Col>
        </Row>
      </Container>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      <SubscriptionModal
        show={paymentModalShow}
        onHide={() => setPaymentModalShow(false)}
      />
    </div>
  );
};

export default PlanRoom;
