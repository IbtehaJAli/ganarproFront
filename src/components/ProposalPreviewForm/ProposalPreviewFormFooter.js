import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProposalPreviewFormFooter = () => {
  const { project_name, bid_amount } = useSelector(
    (state) => state.proposalValues
  );
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  let bidAmount = bid_amount?.replace(/,/g, "");
  return (
    <>
      <Row className="d-flex justify-content-between py-4">
        <div className="col-md-10">
          <span className="fw-bolder">{user?.company_name?.toUpperCase()}</span>{" "}
          - Final clean proposal for{" "}
          <span className="fw-bolder">{project_name?.toUpperCase()} </span>
          {bidAmount === "" ? "" : `$${parseInt(bidAmount).toLocaleString()}`}
        </div>
      </Row>
      {user?.file_url && (
        <Row>
          <Col className="text-end">
            <Image
              src={user?.file_url}
              style={{ width: "`50px", height: "50px" }}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProposalPreviewFormFooter;
