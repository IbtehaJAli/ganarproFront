import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import Spinner from "../../components/spinner/Spinner";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import LoginModal from "../../components/LoginModal";
import SubscriptionModal from "../../components/subscriptionModal";
import { setFreeModeAction } from "../../store/actions/users/users.actions";
import { USER_SET_FREE_MODE_SUCCESS } from "../../store/constants/userConstants";
import { isSubscriptionActive } from "../../utils/helpers/helper";
import { getProjectType } from "../../store/actions/proposals/proposals.actions";

const StyledSpinner = styled(Spinner)`
  color: red;
  border: 1px red;
  .lds-dual-ring {
    text-align: center;
    color: red;
  }
`;
// Then, use it in a component.
const ProposalTemplate = () => {
  const [modalShow, setModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { projectTypes, loading } = useSelector(
    (state) => state.projectTypeList
  );

  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectType());
  }, [dispatch]);

  // Create table headers consisting of 4 columns.
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Scope of work name",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "template_a",
      title: "Template A",
      cell: (row) => {
        let url = null;
        if (row.template_a) {
          let urlArray = row.template_a.split("/upload/");
          url = urlArray[0] + "/upload/fl_attachment/" + urlArray[1];
        }
        return (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => processAction(e, url)}
          >
            {url ? <FontAwesomeIcon icon={faFile} size="2xl" /> : ""}
          </a>
        );
      },
    },
    {
      prop: "template_b",
      title: "Template B",
      cell: (row) => {
        let url = null;
        if (row.template_b) {
          let urlArray = row.template_b.split("/upload/");
          url = urlArray[0] + "/upload/fl_attachment/" + urlArray[1];
        }

        return (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => processAction(e, url)}
          >
            {url ? <FontAwesomeIcon icon={faFile} size="2xl" /> : ""}
          </a>
        );
      },
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
  const price_id = process.env.REACT_APP_PROPOSAL_APP;

  const processAction = (e, template) => {
    e.preventDefault();
    if (!user) {
      handleSetLoginModal();
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      handleSetPaymentModal();
    } else {
      handleSetFreeMode();

      window.open(template, "");
    }
  };
  return (
    <div className="bg-white ms-lg-3">
      <Container className="me-auto ">
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        <Row className="justify-content-md-center">
          <Col md={8} className="py-5 my-5">
            <div className=" p-5 rounded-lg m-3">
              <h1 className="display-3">Cleaning proposal templates</h1>

              <hr className="my-4" />
              <p className="h4 fw-bolder">Download proposal templates</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={4} className="">
            <p className="text-start fw-bolder h4">
              Proposal Templates : {projectTypes.length}
            </p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8} className="text-start">
            {loading ? (
              <div className="text-center">
                <StyledSpinner />
              </div>
            ) : (
              <DatatableWrapper
                body={projectTypes}
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
                    className="d-flex flex-col justify-content-end align-items-end text-start"
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

export default ProposalTemplate;
