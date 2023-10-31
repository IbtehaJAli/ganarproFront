import React, { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";

import { StyledDocument } from "./ProposalPreviewFrom.styled";
import { useDispatch, useSelector } from "react-redux";
import ProposalPreviewFormHeader from "./ProposalPreviewFormHeader";
import ProposalPreviewFormFooter from "./ProposalPreviewFormFooter";
import ProposalProjectType from "./ProposalProjectType";
import { getUserDetail } from "../../store/actions/users/users.actions";

const ProposalPreviewForm = ({ template }) => {
  const { projectTypeDetail } = useSelector((state) => state.projectTypeDetail);
  const {
    project_name,
    project_street,
    project_city,
    project_state,
    project_zip,
    bid_amount,
    project_contact_1_name,
    project_contact_1_phone,
    project_contact_1_email,
    project_contact_2_name,
    project_contact_2_email,
    project_contact_2_phone,
    customer_company_name,
    customer_street,
    customer_state,
    customer_city,
    customer_zip,
  } = useSelector((state) => state.proposalValues);
  const userDetails = useSelector((state) => state.userDetails);
  const { user: authUser } = useSelector((state) => state.auth);

  const { user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      dispatch(getUserDetail());
    }
  }, [authUser, dispatch]);
  return (
    <StyledDocument>
      <section className="bg-white p-5">
        <ProposalPreviewFormHeader />
        <Row>
          <Table bordered className="my-4">
            <thead className="fs-3">
              <tr>
                <th className="text-start">Project Name</th>
                <th className="text-center">{project_name?.toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="fs-4">
                <td className="text-start">Project Address</td>
                <td className="text-center">
                  {project_street.toUpperCase()}
                  <br />
                  {project_city && `${project_city}, `}
                  {project_state} {project_zip}
                </td>
              </tr>
            </tbody>
          </Table>
          <Table bordered className="my-4">
            <thead className="fs-4">
              <tr>
                <th>Submitted By</th>
                <td>{user?.proposal_point_contact_name}</td>
                <td>Date: {new Date().toUTCString().slice(0, 16)}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Contact</td>
                <td>{user?.proposal_point_contact_phone}</td>
                <td>{user?.proposal_point_contact_email}</td>
              </tr>
            </tbody>
          </Table>
          <Table bordered className="my-4">
            <tbody className="fs-4">
              <tr>
                <th>Customer/Address</th>
                <td>{customer_company_name}</td>
                <td>
                  {customer_street} <br />
                  {customer_city && `${customer_city},`} {customer_state}{" "}
                  {customer_zip}
                </td>
              </tr>
            </tbody>
          </Table>
          {project_contact_1_name !== "" ||
          project_contact_1_name !== "" ||
          project_contact_1_name !== "" ? (
            <Table bordered className="my-4">
              <thead className="fs-4">
                <tr>
                  <th className="text-start">Project Team Name</th>
                  <th className="text-center">Phone Number</th>
                  <th className="text-center">Email</th>
                </tr>
              </thead>
              <tbody>
                {project_contact_1_name && (
                  <tr className="fs-5">
                    <td className="text-start">{project_contact_1_name}</td>
                    <td className="text-start">{project_contact_1_phone}</td>
                    <td className="text-center">{project_contact_1_email}</td>
                  </tr>
                )}
                {project_contact_2_name && (
                  <tr className="fs-5">
                    <td className="text-start">{project_contact_2_name}</td>
                    <td className="text-start">{project_contact_2_phone}</td>
                    <td className="text-center">{project_contact_2_email}</td>
                  </tr>
                )}
                {user?.job_site_contact_name && (
                  <tr className="fs-5">
                    <td className="text-start">
                      {user?.job_site_contact_name}
                    </td>
                    <td className="text-start">
                      {user?.job_site_contact_phone}
                    </td>
                    <td className="text-center">
                      {user?.job_site_contact_email}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          ) : (
            ""
          )}
        </Row>
        <ProposalPreviewFormFooter page="1" />
      </section>
      <ProposalProjectType template={projectTypeDetail?.template} />
    </StyledDocument>
  );
};

export default ProposalPreviewForm;
