import React from "react";
import renderHTML from "react-render-html";
import ProposalPreviewFormHeader from "./ProposalPreviewFormHeader";
import ProposalPreviewFormFooter from "./ProposalPreviewFormFooter";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProposalProjectType = ({ template }) => {
  const { bid_amount } = useSelector((state) => state.proposalValues);
  let bidAmount = bid_amount?.replace(/,/g, "");

  return (
    <section className="bg-white mt-5 p-5">
      <ProposalPreviewFormHeader />
      <div className="row">
        {template && <div className="col-md-12">{renderHTML(template)}</div>}
      </div>
      <Row>
        <h6 className="fw-bolder">PRICING PER MENTIONED SCOPE:</h6>
        <p className="border p-2 fw-bolder fs-4">
          {bidAmount === "" ? "" : `$${parseInt(bidAmount).toLocaleString()}`}
        </p>
      </Row>

      <ProposalPreviewFormFooter page="2" />
    </section>
  );
};

export default ProposalProjectType;
