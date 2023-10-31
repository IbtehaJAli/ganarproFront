import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Form, Row, Table, Button } from "react-bootstrap";
import Spinner from "../../../components/spinner/Spinner";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGcQualifyCompanies,
  getRegions,
} from "../../../store/actions/gc_qualify/gcQualify.actions";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import LoginModal from "../../../components/LoginModal";
import SubscriptionModal from "../../../components/subscriptionModal";
import { setFreeModeAction } from "../../../store/actions/users/users.actions";
import { USER_SET_FREE_MODE_SUCCESS } from "../../../store/constants/userConstants";
import NotesContainer from "../../../components/planify/NotesContainer";
import {
  isSubscriptionActive,
  userSubscribedPlans,
} from "../../../utils/helpers/helper";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import UploadFileContainer from "../../../components/planify/UploadFileContainer";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;
// Then, use it in a component.
const GcQualify = () => {
  const [modalShow, setModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { user: profile } = useSelector((state) => state.userDetails);
  const { regions } = useSelector((state) => state.regionList);
  const { companies, loading: companyLoader } = useSelector(
    (state) => state.gcQualifyCompanyList
  );
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectRegion = (value) => {
    setSelectedRegions([...value]);
    localStorage.setItem("gQualifySelectedRegions", JSON.stringify(value));
    let region = value.map((item) => item.name).join(";");

    dispatch(getAllGcQualifyCompanies({ pre_qual: true, region }));
  };

  useEffect(() => {
    dispatch(getRegions());
    const fetchRegionsFromStorage = () => {
      return JSON.parse(localStorage.getItem("gQualifySelectedRegions"));
    };
    if (fetchRegionsFromStorage()) {
      let value = fetchRegionsFromStorage();
      setSelectedRegions(value);
      let region = value.map((item) => item.name).join(";");

      dispatch(getAllGcQualifyCompanies({ pre_qual: true, region }));
    } else {
      dispatch(getAllGcQualifyCompanies({ pre_qual: true }));
    }
  }, [dispatch]);

  // Create table headers consisting of 4 columns.
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Company",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "prequalification_application",
      title: "Application",
      cell: (row) => (
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => processAction(e, row)}
        >
          {row.prequalification_application ? (
            <FontAwesomeIcon icon={faFile} size="2xl" />
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
          view="gcqualify"
          widthLg="true"
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
      prop: "upload",
      title: "Upload",
      cell: (row) => (
        <UploadFileContainer
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
  ];
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

      window.open(row.prequalification_application, "_blank");
    }
  };

  const handleRedirection = () => {
    navigate("/plan_room");
  };


  return (
    <div className="bg-white ms-lg-3">
      <Container className="me-auto ">
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        <Row className="justify-content-md-center">
          <Col md={8} className="pt-5 mt-5">
            <div className=" p-5 rounded-lg m-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h1 className="display-3">Prequalify with general contractors</h1>
                  <p className="h4">
                    Select a region to show companies with applications available
                    for you to fill in and submit
                  </p>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  style={{ fontSize: "15px", alignSelf: "center" }}
                  onClick={handleRedirection}>
                  PlanRoom
                </Button>
              </div>

              <hr className="my-4 fw-bolder" />
              <p className="h4">
                Download pre qualification applications or visit the company
                website to qualify your company to be a preferred vendor on the
                bid list.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={4} className="">
            <p className="text-start fw-bolder">
              General contractors with subcontractor applications in :{" "}
              {companies.length}
            </p>
            <MultiSelectDropdown
              customHandler={handleSelectRegion}
              selectedRegions={selectedRegions}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={10} className="text-start">
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
                    rowsPerPage: 50,
                    options: [5, 10, 15, 20, 50],
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
                <Table>
                  <TableHeader />
                  <TableBody />
                </Table>
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

export default GcQualify;
