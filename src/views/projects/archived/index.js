import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../store/selectors/users/user.selector";
import { isSubscriptionActive } from "../../../utils/helpers/helper";
import {
  archiveProject,
  unArchiveProject,
  unFavouriteProject,
} from "../../../store/actions/projects/projects.action";
import { getUserDetail } from "../../../store/actions/users/users.actions";
import { Nav } from "react-bootstrap";
import Spinner from "../../../components/spinner/Spinner";
import ProjectDataCard from "../../projectBoardList/components/ProjectDataCard";
import LoginModal from "../../../components/LoginModal";
import SubscriptionModal from "../../../components/subscriptionModal";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
const StyledSection = styled.section`
  background-color: rgb(249, 249, 251);
  min-height: 751px;
`;

const ProjectArchive = () => {
  const { projects, count, favouriteProjects, phases, sizes, buildingTypes } =
    useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const { user: userProfile, loading } = useSelector(
    (state) => state.userDetails
  );
  const authenticatedUser = useSelector(authUser());
  const price_id = process.env.REACT_APP_PROJECT_APP;
  const dispatch = useDispatch();

  const handleProjectDetailCLick = (e, link) => {
    e.preventDefault();
    if (!user) {
      setLoginModalShow(true);
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
    } else {
      window.open(link, "_self");
    }
  };

  const handleArchive = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    let archivesId = userProfile?.project_archives.map((project) => project.id);
    dispatch(unArchiveProject(archivesId.join(",")));
    dispatch(getUserDetail());
  };

  const handleFavourite = (e, type, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      setLoginModalShow(true);
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
    } else {
      dispatch(unFavouriteProject(id));
      dispatch(getUserDetail());
    }
  };

  const checkFav = ({ id }) => {
    const isFavourite = userProfile?.project_favorites?.find(
      (project_id) => project_id === id
    );
    if (isFavourite) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  return (
    <div>
      <div>
        <div className="container p-0">
          <div className="row">
            <div className="col-md-12 my-4">
              <Nav
                variant="underline"
                defaultActiveKey="/home"
                className="mx-5"
              >
                <Nav.Item>
                  <Nav.Link as={Link} to="/myganarpro/favorites">
                    Saved Projects
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/myganarpro/hiddenProjects">
                    Hidden Projects
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/myganarpro/recentlyViewed">
                    Recently Viewed
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
      <StyledSection>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-6 text-start">
              <h1 className="fw-bolder fa-3xl">
                Hidden Projects(
                {userProfile?.project_archives &&
                  userProfile?.project_archives?.length}
                )
              </h1>
            </div>
            <div className="col-md-6 text-end">
              <div>
                <Link
                  to="#"
                  className="m-0 fw-bolder text-decoration-none"
                  onClick={(e) => handleArchive(e, "unhide", "id")}
                >
                  <FontAwesomeIcon
                    icon={faBan}
                    className="cursor-pointer"
                    size="xl"
                  />
                  Unhide all projects
                </Link>
              </div>
              <div></div>
            </div>
          </div>
          <div className="row ">
            {loading ? (
              <div className="m-auto large-screen-pag">
                <Spinner />
              </div>
            ) : (
              userProfile?.project_archives?.map((project) => (
                <div className="col-md-3 mb-5" key={project.id}>
                  <ProjectDataCard
                    key={project.id}
                    handleProjectDetailCLick={handleProjectDetailCLick}
                    handleArchive={handleArchive}
                    handleFavourite={handleFavourite}
                    {...project}
                    isHidden={true}
                    isFavourite={true}
                    authenticatedUser={authenticatedUser}
                    setLoginModalShow={setLoginModalShow}
                    setPaymentModalShow={setPaymentModalShow}
                  />
                </div>
              ))
            )}
          </div>

          <LoginModal
            show={loginModalShow}
            onHide={() => setLoginModalShow(false)}
          />
          <SubscriptionModal
            show={paymentModalShow}
            onHide={() => setPaymentModalShow(false)}
          />
        </div>
      </StyledSection>
    </div>
  );
};

export default ProjectArchive;
