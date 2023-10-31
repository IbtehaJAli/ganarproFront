import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import styled from "styled-components";
import ProposalForm from "../../components/ProposalForm";
import RecentProposal from "../../components/RecentProposal";
import ProposalPreviewForm from "../../components/ProposalPreviewForm";
import LoginModal from "../../components/LoginModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadProposal,
  getProposalDetail,
} from "../../store/actions/proposals/proposals.actions";
import ProposalPreviewModal from "../../components/ProposalPreviewModal";
import useIsMobile from "../../utils/helpers/use-is-mobile";
import SubscriptionModal from "../../components/subscriptionModal";

const StyledSectionTwo = styled.div`
  background-color: rgb(246 248 250);
`;
const StyledRow = styled(Row)`
  padding-top: 4rem;
`;

const StyledPreviewText = styled.h3`
  color: #000;
  font-weight: 700;
`;

const StyledTabs = styled(Tabs)`
  background-color: #fff;
  h2 {
    color: #000;
  }
  button {
    font-size: 16px !important;
    font-weight: 700 !important;
  }
`;

const DocumentGenerator = () => {
  const isMobile = useIsMobile();
  let params = useParams();
  const { search } = window.location;
  const show_tab = new URLSearchParams(search).get("show_tab");
  const { id } = params;
  const [modalShow, setModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [proposalPreviewModal, setProposalPreviewModal] = useState(false);
  const [showTab, setShowTab] = useState("home");
  const { user } = useSelector((state) => state.auth);
  const { user: profile, loading } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();
  const proposalList = useSelector((state) => state.proposalList);
  const { proposals } = proposalList;
  const { proposal } = useSelector((state) => state.proposalDetail);
  // const { projectTypes } = useSelector((state) => state.projectTypeList);
  const values = useSelector((state) => state.proposalValues);
  const { loading: downloader } = useSelector(
    (state) => state.proposalDownload
  );

  let proposalId;
  let proposalObject;
  if (proposals.length > 0) {
    if (id) {
      proposalId = proposal?.id;
      proposalObject = proposal;
    } else {
      proposalId = proposals[0]?.id;
      proposalObject = proposals[0];
    }
  }
  const showFormTab = (e) => {
    if (e === "home") {
      setShowTab("home");
    } else if (e === "recent") {
      setShowTab("recent");
    } else if (id !== undefined) {
      setShowTab("home");
    }
  };
  const handleDownload = (e, id, proposal) => {
    let newValues = values;
    if (user) {
      newValues = {
        ...values,
        ...profile,
        current_date: new Date().toUTCString().slice(0, 16),
      };
    }
    dispatch(downloadProposal(0, newValues));
  };

  useEffect(() => {
    if (id && user) {
      dispatch(getProposalDetail(id));
      // setShowTab("home");
    }
    if (show_tab) {
      setShowTab("recent");
    }
  }, [dispatch, id, show_tab, user]);
  return (
    <div className="bg-white ">
      <Container>
        <StyledRow>
          <Col xs={12} md={12} xl={5} className="my-proposal-col">
            <StyledTabs
              activeKey={showTab}
              onSelect={showFormTab}
              transition={true}
              id="noanim-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey="home"
                title="Create New Proposal"
                className="text-uppercase"
              >
                <ProposalForm
                  setModalShow={setModalShow}
                  setPaymentModalShow={setPaymentModalShow}
                  setShowTab={setShowTab}
                />
              </Tab>
              <Tab eventKey="recent" title="Saved Proposals">
                <RecentProposal
                  setModalShow={setModalShow}
                  showFormTab={showFormTab}
                />
              </Tab>
            </StyledTabs>
          </Col>
          <StyledSectionTwo className="col-xs-6 col-md-12  col-xl-7 py-5 px-5">
            <StyledPreviewText className="text-start">
              Preview Section
            </StyledPreviewText>

            <div>
              {!isMobile && <ProposalPreviewForm />}
              <div className="text-center mb-5 m-4">
                {isMobile ? (
                  <Button
                    onClick={() => setProposalPreviewModal(true)}
                    className="me-5 "
                    disabled={downloader}
                  >
                    <h4>Preview</h4>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setProposalPreviewModal(true)}
                    className="me-5 "
                  >
                    <h4> Preview</h4>
                  </Button>
                )}
                {user &&
                  proposals.length > 0 &&
                  (isMobile ? (
                    <Button
                      className="btn-success"
                      style={{ color: "#fff" }}
                      onClick={(e) =>
                        handleDownload(e, proposalId, proposalObject)
                      }
                      disabled={downloader}
                    >
                      <h4>
                        Download{" "}
                        {downloader && (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span className="visually-hidden">Loading...</span>{" "}
                      </h4>
                    </Button>
                  ) : (
                    <Button
                      className="btn-success"
                      style={{ color: "#fff" }}
                      onClick={(e) =>
                        handleDownload(e, proposalId, proposalObject)
                      }
                      disabled={downloader}
                    >
                      <h4>
                        Download{" "}
                        {downloader && (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span className="visually-hidden">Loading...</span>{" "}
                      </h4>
                    </Button>
                  ))}
              </div>
            </div>
          </StyledSectionTwo>
        </StyledRow>
      </Container>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      <SubscriptionModal
        show={paymentModalShow}
        onHide={() => setPaymentModalShow(false)}
      />
      <ProposalPreviewModal
        show={proposalPreviewModal}
        onHide={setProposalPreviewModal}
      />
    </div>
  );
};

export default DocumentGenerator;
