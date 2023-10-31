import React, { useEffect } from "react";
import { Button, Col, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { Link, useParams } from "react-router-dom";
import {
  deleteCleanUpEstimate,
  getUserCleanUpEstimates,
} from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";
import LoginModal from "../LoginModal";

const getDefaultProjectType = (name) => {
  if (["Athletic", "Airport"].includes(name)) {
    return "Any Type General Cleaning";
  }
  return name;
};
const RecentEstimates = ({ setModalShow, modalShow }) => {
  let params = useParams();
  const { id: editId } = params;
  const estimateList = useSelector((state) => state.cleanUpEstimateList);
  const { user } = useSelector((state) => state.auth);
  const { loading, estimates } = estimateList;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserCleanUpEstimates());
    }
  }, [user, dispatch]);

  // const handleSetModal = (e) => {
  //   e.preventDefault();
  //   setModalShow(true);
  // };
  const handleSetModal = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    let response = window.confirm("Are you Sure you want to delete Proposal?");
    if (response) {
      dispatch(deleteCleanUpEstimate(id, editId));
    }
  };

  const recentEstimates = () => {
    return estimates?.map((estimate, index) => {
      return (
        <ListGroup.Item
          key={estimate.id}
          as="li"
          className="d-flex align-items-start  "
        >
          <div className="text-start w-100 ps-2">
            <div className="fw-bold d-flex justify-content-between align-items-center">
              <div>
                {index + 1}. {""}
                <Link
                  className="me-5 d-inline-block text-decoration-none"
                  to={`/cleanup_calculator/edit/${estimate.id}`}
                >
                  {estimate.project_name}_$
                  {Number(estimate?.bid_amount)}_{estimate.state}
                </Link>
              </div>
              <div className="d-flex flex-column">
                {/*<Link*/}
                {/*  className="me-5 d-inline-block text-decoration-none align-self-center"*/}
                {/*  to={`/edit/${estimate.id}`}*/}
                {/*>*/}
                <Form.Group
                  as={Col}
                  className="checkbox align-self-center"
                  controlId="useLivingUnitPricing"
                >
                  <Form.Check
                    type="checkbox"
                    name="use_unit_pricing"
                    label="Accepted"

                    // checked={values?.use_unit_pricing}
                    // onClick={handleLivingUnitPricingCheck}
                  />
                </Form.Group>
                <Button
                  style={{ color: "#fff" }}
                  className="d-inline-block btn-block btn-danger  me-5 my-3 "
                  onClick={(e) => handleDelete(e, estimate.id)}
                >
                  Delete
                </Button>

                <Link
                  className="text-decoration-none"
                  to={`/my_proposal/?bidAmount=${
                    estimate.bid_amount
                  }&project_type=${getDefaultProjectType(
                    estimate.project_type
                  )}&project_name=${estimate.project_name}&state=${
                    estimate.state
                  }`}
                >
                  <Button
                    style={{ color: "#fff" }}
                    className="d-inline-block btn-block btn-primary p-3  me-5 my-3 "
                  >
                    Create Proposal
                  </Button>
                </Link>
              </div>
            </div>
            <div className="text-start">
              <span className="fw-bolder">created date:</span>{" "}
              {new Date(estimate.modified).toLocaleString("en-US")}
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
              {estimates?.length ? (
                recentEstimates()
              ) : (
                <h4>Nothing to show here, create a new estimate!</h4>
              )}
            </>
          ) : (
            <div>
              <Button variant="primary" type="submit" onClick={handleSetModal}>
                Login{" "}
              </Button>
              <h4>to see Recently Saved Estimates</h4>
            </div>
          )}
        </ListGroup>
      )}
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default RecentEstimates;
