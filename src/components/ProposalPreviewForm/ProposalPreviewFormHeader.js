import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProposalPreviewFormHeader = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  // State.getStateByCodeAndCountry();

  return (
    <>
      {/*<Row>*/}
      {/*  <Col className="text-center">*/}
      {/*    {user?.file_url ? (*/}
      {/*      <Image*/}
      {/*        src={user?.file_url}*/}
      {/*        style={{ width: "`50px", height: "50px" }}*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      <Link to="/profile" target="_blank">*/}
      {/*        <p>Upload logo on the profile page</p>*/}
      {/*      </Link>*/}
      {/*    )}*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <Row className="d-flex justify-content-between py-4">
        <Col md="4">
          <p className="text-start fw-bolder fs-4">
            Project Proposal <br />
            for CONSTRUCTION CLEANUP
          </p>
        </Col>
        <Col md="6">
          <div>
            {user?.company_name ? (
              <h3 className="fw-bolder text-start">{user.company_name}</h3>
            ) : (
              <Link to="/profile">
                <p>
                  Click to fill <span className="fw-bolder">Company Name</span>{" "}
                  information on profile page
                </p>
              </Link>
            )}
            <p className="m-0">{user?.company_street}</p>
            <p>
              {user?.company_city}, {user?.company_state} {user?.company_zip}
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProposalPreviewFormHeader;
