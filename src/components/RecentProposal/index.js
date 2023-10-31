import React, { useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProposal,
  downloadProposal,
  getUserProposals,
} from "../../store/actions/proposals/proposals.actions";
import Spinner from "../spinner/Spinner";
import { Link, useParams } from "react-router-dom";

const RecentProposal = ({ setModalShow, showFormTab }) => {
  let params = useParams();
  const { id: editId } = params;
  const proposalList = useSelector((state) => state.proposalList);
  const { user } = useSelector((state) => state.auth);
  const { loading, proposals } = proposalList;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserProposals());
    }
  }, [user, dispatch]);

  const handleSetModal = (e) => {
    e.preventDefault();
    setModalShow(true);
  };
  const handleDownload = (e, id, proposal) => {
    e.preventDefault();

    dispatch(downloadProposal(id, proposal));
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    let response = window.confirm("Are you Sure you want to delete Proposal?");
    if (response) {
      dispatch(deleteProposal(id, editId));
    }
  };

  const recentProposal = () => {
    return proposals.map((proposal, index) => {
      return (
        <ListGroup.Item
          key={proposal.id}
          as="li"
          className="d-flex align-items-start  "
        >
          <div className="text-start w-100 ps-2">
            <div className="fw-bold d-flex justify-content-between align-items-center">
              <div>
                {index + 1}. {""}
                <Link
                  className="me-5 d-inline-block text-decoration-none"
                  to={`/my_proposal/edit/${proposal.id}`}
                  onClick={() => showFormTab("home")}
                >
                  {proposal.project_name}_$
                  {Number(proposal.bid_amount)}_Proposal{" "}
                </Link>
              </div>
              <div className="d-flex flex-column">
                <Link
                  className="me-5 d-inline-block text-decoration-none"
                  to={`/my_proposal/edit/${proposal.id}`}
                  onClick={() => showFormTab("home")}
                >
                  Edit
                </Link>
                <Button
                  style={{ color: "#fff" }}
                  className="d-inline-block btn-block btn-danger me-3 my-3"
                  onClick={(e) => handleDelete(e, proposal.id)}
                >
                  Delete
                </Button>

                <Button
                  className="d-inline-block btn-block "
                  onClick={(e) => handleDownload(e, proposal.id, proposal)}
                >
                  Download
                </Button>
              </div>
            </div>
            <div className="text-start">
              <span className="fw-bolder">create date:</span>{" "}
              {new Date(proposal.modified).toUTCString().slice(0, 16)}
            </div>
          </div>
        </ListGroup.Item>
      );
    });
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ListGroup as="ul">
          {user ? (
            <>
              {proposals.length ? (
                recentProposal()
              ) : (
                <h4>Nothing to show here, create a new proposal!</h4>
              )}
            </>
          ) : (
            <div>
              <Button variant="primary" type="submit" onClick={handleSetModal}>
                Login{" "}
              </Button>
              <h4>to see Recent Proposals</h4>
            </div>
          )}
        </ListGroup>
      )}
    </>
  );
};

export default RecentProposal;
