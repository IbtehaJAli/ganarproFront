import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ProjectBoard.css";
import Tabs from "../../components/tabs/Tabs";
import { tabsData } from "./data/tabsData";
import Description from "./components/Description";
import DecisionMakers from "./components/DecisionMakers";
import ImportantDates from "./components/ImportantDates";
import Company from "./components/Company";
import {
  archiveProject,
  favouriteProject,
  fetchSingleProject,
  getEmailTemplate,
  unArchiveProject,
  unFavouriteProject,
} from "../../store/actions/projects/projects.action";
import Spinner from "../../components/spinner/Spinner";
import ArrowBack from "../../assets/icons/ArrowBack";
import FileIcon from "../../assets/icons/FileIcon";
import SelectInput from "../../components/input/SelectInput";
import SingleMap from "../../components/map/SingleMap";
import imageMarker from "../../assets/img/marker_new2.png";
import ProjectProgress from "../../components/projectProgress/ProjectProgress";
import FullModal from "../../components/modal/FullModal";
import ProjectProgressBar from "../../components/projectProgress/ProjectProgressBar";
import SimilarProject from "./components/SimilarProject";
import { classNames } from "../../components/helpers/helpers";
import { saveCallLog } from "../../utils/requests/callLogs";
import { isSubscriptionActive, toastSuccess } from "../../utils/helpers/helper";
import {
  getHotScopesAPI,
  saveProjectStatusAPI,
} from "../../utils/requests/projects";
import SubscriptionModal from "../../components/subscriptionModal";
import {
  getUserDetail,
  setFreeModeAction,
} from "../../store/actions/users/users.actions";
import { USER_SET_FREE_MODE_SUCCESS } from "../../store/constants/userConstants";
import { TOTAL_FREE_MODE_COUNT } from "../../utils/constants/api";
import LoginModal from "../../components/LoginModal";

import { getContactRolesAPI } from "../../utils/requests/callLogs";
import FavouriteIcon from "../../assets/icons/FavouriteIcon";
import FavouriteStrokeIcon from "../../assets/icons/FavouriteStrokeIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFile, faHeart } from "@fortawesome/free-solid-svg-icons";
import Comments from "./components/Comments";

const sortItems = [
  {
    id: 1,
    key: "last_modified_date",
    value: "updated",
  },
  {
    id: 2,
    key: "created_date",
    value: "newest",
  },
  {
    id: 3,
    key: "bid_due_date",
    value: "Bid due date",
  },
  {
    id: 4,
    key: "sf_size",
    value: "Square Feet",
  },
  {
    id: 5,
    key: "project_completion",
    value: "Near completion",
  },
  {
    id: 6,
    key: "plan_drawings",
    value: "Plans Drawings",
  },
  {
    id: 7,
    key: "public_works",
    value: "Public works",
  },
];

const __projectStatus = [
  {
    id: 1,
    key: "ND",
    value: "Not decided yet",
  },
  {
    id: 2,
    key: "PC",
    value: "Pursuing contract",
  },
  {
    id: 3,
    key: "FU",
    value: "Flag as unavailable",
  },
];
export const ProjectBoard = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const [selectedSortItem, setSelectedSortItem] = useState();
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(false);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState(
    __projectStatus[0]
  );
  const [hotScopes, setHotScopes] = useState([]);
  const [selectedHotScope, setSelectedHotScope] = useState();
  const [tradeEstimate, setTradeEstimate] = useState(0.0);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const { user } = useSelector((state) => state.auth);
  const { user: profile } = useSelector((state) => state.userDetails);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const price_id = process.env.REACT_APP_PROJECT_APP;
  const [contactCount, setContactCount] = useState(0);
  const [contactRoles, setContactRoles] = useState([]);

  const { projectSlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, singleProject } = useSelector((state) => state.projects);

  useCallback(() => {
    handleSetActiveTab();
  }, []);

  const handleSetActiveTab = (tabName) => {
    setActiveTab(tabName);
  };
  const handleSetFreeMode = () => {
    dispatch(setFreeModeAction());
    dispatch({
      type: USER_SET_FREE_MODE_SUCCESS,
      payload: free_mode_count + 1,
    });
  };

  const getContactRoles = () => {
    if (singleProject) {
      getContactRolesAPI(singleProject?.id)
        .then((response) => {
          setContactRoles(response);
          setContactCount(response?.length);
        })
        .catch(() => {});
    }
    return;
  };

  useEffect(() => {
    getContactRoles();
    return function cleanup() {
      // setContactRoles([]);
      setContactCount(0);
    };
  }, [singleProject]);

  useEffect(() => {
    getContactRoles();
    return function cleanup() {
      // setContactRoles([]);
      setContactCount(0);
    };
  }, [singleProject]);
  useEffect(() => {
    if (!user) {
      setLoginModalShow(true);
    } else {
      if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
        setPaymentModalShow(true);
      } else {
        // dispatch(getUserDetail());
        dispatch(setFreeModeAction());
        dispatch({
          type: USER_SET_FREE_MODE_SUCCESS,
          payload: free_mode_count + 1,
        });
      }
    }

    dispatch(fetchSingleProject(projectSlug));
    getHotScopes();
  }, [dispatch, projectSlug]);

  const handleSelectedStage = (stage) => {
    setSelectedStage(stage);
    setShowProgressModal(true);
  };

  const handleCallLogs = (type, contactId, closeModal) => {
    const data = {
      activity: type,
      contact_role_id: contactId,
    };
    saveCallLog(singleProject?.id, data)
      .then(() => {
        closeModal(false);
        toastSuccess("Call recorded successfully");
      })
      .catch(() => {});

    return;
  };

  const handleProjectStatus = (status) => {
    const data = {
      status: status,
      project_id: singleProject?.id,
    };
    saveProjectStatusAPI(data)
      .then((response) => {
        toastSuccess("Project status updated");
      })
      .catch(() => {});

    return;
  };

  const selectedTemplateHandler = (templateId, contact) => {
    const { company_id, name } = contact;
    const query = `?project_id=${singleProject?.id}&company_id=${company_id}&contact_name=${name}`;
    dispatch(getEmailTemplate(templateId, query));
  };

  // const handleSelectedProjectStatus = (statusId) => {
  //   const item = __projectStatus.find((status) => status.id === statusId);
  //
  //   if (item.key === "FU") {
  //     handleArchive();
  //   }
  //   handleProjectStatus(item.key);
  //   setSelectedProjectStatus(item);
  // };

  const getHotScopes = () => {
    getHotScopesAPI()
      .then((response) => {
        setHotScopes(response);
      })
      .catch(() => {});

    return;
  };

  const handleSelectedScope = (scope) => {
    setSelectedHotScope(scope);
    if (singleProject?.sf_size === "None" || !singleProject?.sf_size) {
      setTradeEstimate(0.0);
      return;
    }
    const estimate =
      parseFloat(singleProject?.sf_size) * parseFloat(scope.amount);
    setTradeEstimate(estimate.toFixed(2));
  };

  const createMap = () => {
    return (
      <SingleMap
        id="singleMap"
        options={{
          center: {
            lat: parseFloat(singleProject?.latitude),
            lng: parseFloat(singleProject?.longitude),
          },
          zoom: 8,
          mapTypeControl: false,
          // draggable: false
        }}
        onMapLoad={(map) => {
          if (singleProject) {
            new window.google.maps.Marker({
              position: {
                lat: parseFloat(singleProject?.latitude),
                lng: parseFloat(singleProject?.longitude),
              },
              map: map,
              title: singleProject?.name || "N/A",
              icon: imageMarker,
            });
          }
        }}
        project={singleProject}
      />
    );
  };

  const handleFavourite = (e, type, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      setLoginModalShow(true);
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      setPaymentModalShow(true);
    } else {
      dispatch(getUserDetail());
      if (type === "favourite") {
        dispatch(favouriteProject(id));
        return;
      }
      dispatch(unFavouriteProject(id));
    }
  };

  const handleArchive = (e, type, id) => {
    dispatch(getUserDetail());
    if (type === "hide") {
      dispatch(archiveProject(id));
      return;
    }
    dispatch(unArchiveProject(id));
  };

  const checkFav = (id) => {
    const isFavourite = profile?.project_favorites?.find(
      (project) => project?.id === id
    );
    return !!isFavourite;
  };

  const checkHidden = () => {
    const isHidden = profile?.project_archives?.find((project) => {
      return project?.id === singleProject?.id;
    });

    return !!isHidden;
  };

  if (loading) {
    return (
      <div className="vh-100 justify-content-center align-items-center d-flex">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <section className="mt-5 project-stage-section">
        <ProjectProgressBar
          {...singleProject}
          setShowProgressModal={handleSelectedStage}
        />
        <FullModal
          title="New message to Aaron Johnson"
          show={showProgressModal}
          onCloseModal={() => setShowProgressModal(false)}
        >
          <ProjectProgress {...singleProject} progressClicked={selectedStage} />
        </FullModal>
      </section>
      <div className="border-top mx-3 mt-5"></div>
      <div className="row project-board-row">
        <div className="col-xs-12 col-sm-8 px-md-4 mb-md-5">
          <section className="mt-4 mx-3">
            <div className="row d-flex">
              <div className="d-flex col-xs-12 col-md-9 justify-content-center justify-content-md-start mt-3">
                <Link
                  to=""
                  className="text-primary text-decoration-none align-self-center me-4"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBack
                    fill="#276FB4"
                    git
                    width="19"
                    height="16"
                    className="me-3"
                  />
                  <div className="d-none d-md-block">
                    Back to Project <br />
                    Search
                  </div>
                </Link>
                <div className="d-sm-flex text-md-start d-md-grid col-xs-12 col-md-9 justify-content-sm-center justify-content-md-start mt-4 mb-3">
                  <h4 className="fw-bold heading-3">{singleProject?.name}</h4>
                  <h6 className="body-text">
                    by{" "}
                    <span className="text-primary">
                      {singleProject?.account_name}
                    </span>
                  </h6>
                </div>
              </div>
              <div className="d-flex text-center col-2 justify-content-center justify-content-md-end mt-3 align-items-center">
                <div className="me-md-4">
                  {checkFav(singleProject?.id) ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="cursor-pointer"
                      size="xl"
                      style={{ color: "#0d6efd" }}
                      onClick={(e) =>
                        handleFavourite(e, "unfavourite", singleProject?.id)
                      }
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="cursor-pointer"
                      size="xl"
                      style={{
                        color: "#fff",
                        stroke: "#0d6efd",
                        strokeWidth: 50,
                      }}
                      onClick={(e) =>
                        handleFavourite(e, "favourite", singleProject?.id)
                      }
                    />
                  )}
                </div>
                <div>
                  {checkHidden() ? (
                    <Link
                      to="#"
                      className="m-0 fw-bolder text-decoration-none"
                      onClick={(e) =>
                        handleArchive(e, "unhide", singleProject?.id)
                      }
                    >
                      <FontAwesomeIcon
                        icon={faBan}
                        className="cursor-pointer"
                        size="xl"
                      />
                      Hidden
                    </Link>
                  ) : (
                    <Link
                      to="#"
                      className="m-0 fw-bolder text-decoration-none"
                      onClick={(e) =>
                        handleArchive(e, "hide", singleProject?.id)
                      }
                    >
                      <FontAwesomeIcon
                        className="cursor-pointer "
                        icon={faBan}
                        size="xl"
                      />{" "}
                      <span className="fa-1x">Hide</span>
                    </Link>
                  )}
                </div>
              </div>
              {/*<div className="d-flex text-center col-2 justify-content-center justify-content-md-end mt-3 align-items-center">*/}
              {/*  */}
              {/*  /!* <div className="me-2 prev-text">*/}
              {/*    Prev{" "}*/}
              {/*    <button className="border rounded-2 px-2 bg-transparent">*/}
              {/*      <ArrowLeft width="14" height="14" fill="#333333" />*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*  <div className="next-text">*/}
              {/*    <button className="border rounded-2 px-2 me-2 bg-primary">*/}
              {/*      <ArrowRight width="14" height="14" fill="#ffffff" />*/}
              {/*    </button>*/}
              {/*    Next*/}
              {/*  </div> *!/*/}
              {/*</div>*/}
            </div>
          </section>

          <section className="mt-3 mb-5">
            <div className="box-shadow-gray mx-2 px-5 py-5 mb-md-5 bg-white">
              <div className="d-flex justify-content-between overflow-scroll mb-5">
                {tabsData.map((tab, index) => (
                  <Tabs
                    key={index + 1}
                    setActiveTab={handleSetActiveTab}
                    name={tab}
                    title={tab}
                    activeTab={activeTab}
                    contactCount={contactCount}
                  />
                ))}
              </div>
              <div className="tab-content">
                {activeTab === tabsData[0] ? (
                  <div className="tab-content">
                    <Description {...singleProject} />
                  </div>
                ) : (
                  ""
                )}
                {activeTab === tabsData[1] ? (
                  <div className="tab-content">
                    <DecisionMakers
                      contacts={singleProject?.contact_roles}
                      callLogHandler={handleCallLogs}
                      emailTemplates={singleProject?.email_templates}
                      projectId={singleProject?.id}
                      handleSelectedTemplate={selectedTemplateHandler}
                      setContactCount={setContactCount}
                      contactRoles={contactRoles}
                      getContactRoles={getContactRoles}
                      projectName={singleProject?.name}
                    />
                  </div>
                ) : (
                  ""
                )}
                {activeTab === tabsData[2] ? (
                  <div className="tab-content">
                    <ImportantDates {...singleProject} />
                  </div>
                ) : (
                  ""
                )}
                {activeTab === tabsData[3] ? (
                  <div className="tab-content">
                    <Company {...singleProject} />
                  </div>
                ) : (
                  ""
                )}
                {/*{activeTab === tabsData[4] ? (*/}
                {/*  <div className="tab-content">*/}
                {/*    <Activities projectId={singleProject?.id} />*/}
                {/*  </div>*/}x
                {/*) : (*/}
                {/*  ""*/}
                {/*)}*/}
                {/* {activeTab === tabsData[4] ? (
                  <div className="tab-content">
                    <Comments projectId={singleProject?.id} />
                  </div>
                ) : (
                  ""
                )} */}
              </div>

              <div className="d-flex border-top mt-5 flex-column-reverse flex-md-row">
                {/*<div className="mt-3 mt-md-0 flex-grow-1 d-flex">*/}
                {/*  <div className="board-action d-flex justify-content-between px-2 align-self-center">*/}
                {/*    <span className="me-3 svg-archive cursor-pointer">*/}
                {/*      <NotificationIcon*/}
                {/*        width="24"*/}
                {/*        height="24"*/}
                {/*        fill="currentColor"*/}
                {/*        className="cursor-pointer svg-archive"*/}
                {/*        handleClick={() => handleFavourite("unfavourite")}*/}
                {/*      />*/}
                {/*    </span>*/}
                {/*    <span>*/}
                {/*      <DislikeIcon*/}
                {/*        width="24"*/}
                {/*        height="24"*/}
                {/*        handleClick={handleArchive}*/}
                {/*        className="ms-4 cursor-pointer svg-archive"*/}
                {/*        fill="currentColor"*/}
                {/*      />*/}
                {/*    </span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="mt-4 mb-4 d-md-flex flex-md-row-reverse py-3">*/}
                {/*  /!*<Button*!/*/}
                {/*  /!*  customClassName="btn btn-primary btn-small ms-3"*!/*/}
                {/*  /!*  onClick={() => {}}*!/*/}
                {/*  /!*>*!/*/}
                {/*  /!*  Check Availability*!/*/}
                {/*  /!*</Button>*!/*/}
                {/*  /!*<div className="ms-lg-4 project-status-drop-down">*!/*/}
                {/*  /!*  <SelectInput*!/*/}
                {/*  /!*    placeHolder="Check Availability"*!/*/}
                {/*  /!*    selectedItem={selectedProjectStatus.value}*!/*/}
                {/*  /!*  >*!/*/}
                {/*  /!*    {__projectStatus.map((item) => (*!/*/}
                {/*  /!*      <div*!/*/}
                {/*  /!*        key={item.id}*!/*/}
                {/*  /!*        onClick={() => handleSelectedProjectStatus(item.id)}*!/*/}
                {/*  /!*        className={classNames(*!/*/}
                {/*  /!*          "cursor-pointer select-input-item py-2 ps-4",*!/*/}
                {/*  /!*          item.key === "FU" ? "text-danger" : "",*!/*/}
                {/*  /!*          item.key === "ND" ? "text-black" : "",*!/*/}
                {/*  /!*          item.key === "PC" ? "text-success" : ""*!/*/}
                {/*  /!*        )}*!/*/}
                {/*  /!*      >*!/*/}
                {/*  /!*        {item.value}*!/*/}
                {/*  /!*      </div>*!/*/}
                {/*  /!*    ))}*!/*/}
                {/*  /!*  </SelectInput>*!/*/}
                {/*  /!*</div>*!/*/}
                {/*</div>*/}
              </div>
            </div>
          </section>

          {/*<section>*/}
          {/*  <div className="bg-white px-5 py-5 mx-2">*/}
          {/*    <div className="d-md-flex mt-4 justify-content-center">*/}
          {/*      <p className="mt-4 me-md-4 border-bottom border-primary ic-trade">*/}
          {/*        IC TradeEstimate*/}
          {/*      </p>*/}
          {/*      <div className="d-flex align-items-center">*/}
          {/*        <div className="col-8">*/}
          {/*          <div className="hotScope">*/}
          {/*            <SelectInput*/}
          {/*              placeHolder="Select Your Trade"*/}
          {/*              selectedItem={selectedHotScope?.name}*/}
          {/*            >*/}
          {/*              <div className="hotScope-container">*/}
          {/*                {hotScopes.map((scope, index) => (*/}
          {/*                  <div*/}
          {/*                    key={index + 1}*/}
          {/*                    onClick={() => handleSelectedScope(scope)}*/}
          {/*                    className="cursor-pointer select-input-item py-2 ps-4"*/}
          {/*                  >*/}
          {/*                    {scope.name}*/}
          {/*                  </div>*/}
          {/*                ))}*/}
          {/*              </div>*/}
          {/*            </SelectInput>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="ms-1 col-4">*/}
          {/*          <div className="price-input rounded-3 px-3 py-2 text-start">*/}
          {/*            $ {Intl.NumberFormat('en-US').format(tradeEstimate)}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</section>*/}

          <section className="mt-4">
            <div>
              <div className="box-shadow-gray py-2 px-2 mx-2 bg-white">
                <div>{singleProject ? createMap() : ""}</div>
              </div>
            </div>
          </section>
        </div>
        <section className="mt-5 mb-5 col-xs-12 col-sm-4">
          <div className="box-shadow-gray mx-2 px-4 py-3 bg-white">
            <div>
              <div className="d-flex align-items-center justify-content-between my-5">
                <h4 className="m-0 lead-text black-100">Similar Projects</h4>
                <div className="d-flex align-items-center"></div>
              </div>
            </div>
            {singleProject?.similar_projects.length ? (
              singleProject?.similar_projects.map((project, index) => (
                <SimilarProject key={index + 1} {...project} />
              ))
            ) : (
              <div className="no-records">
                <FileIcon
                  width="30%"
                  height="30%"
                  className="text-center"
                  fill="#70B2F0"
                />
                <p className="mt-4 text-13">No project</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
        closeButton={false}
      />
      <SubscriptionModal
        backdrop="static"
        size="lg"
        show={paymentModalShow}
        dialogClassName="modal-100w"
        closeButton={false}
      />
    </div>
  );
};
