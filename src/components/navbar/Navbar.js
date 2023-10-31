import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { NavbarContext } from "../../App";
import logo from "../../assets/img/ganarpro-logo-1.png";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import ProfileBox from "./components/ProfileBox";
import SearchIcon from "../../assets/icons/SearchIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { logout } from "../../store/actions/authentication.action";
import { Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserProfileIcon from "../../assets/icons/UserProfileIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import useIsMobile from "../../utils/helpers/use-is-mobile";
import SidebarV3 from "./components/SidebarV3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getUserDetail,
  getManageUserBilling,
} from "../../store/actions/users/users.actions";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const StyledHeader = styled.header`
  box-shadow: inset 0 -1px rgb(236 238 241);
  z-index: 1;
`;

const Navbar = () => {
  const isMobile = useIsMobile();
  const [showMobileNavbar, setMobileNabvar] = useState(false);
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { user: profile, loading } = useSelector((state) => state.userDetails);
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);
  const { loading: billingLoader, disabled } = useSelector(
    (state) => state.manageUserBilling
  );

  const onLogoutHandler = () => {
    dispatch(logout());
  };

  const handleCloseNavigationMenu = () => {
    setMobileNabvar(false);
  };

  const handleShowProfileBox = () => {
    setShowProfileBox(!showProfileBox);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const toggleSideBarHandler = () => {
    setToggleSideBar((sidebar) => !sidebar);
  };

  const closeSidebarHandler = () => {
    setToggleSideBar(false);
  };
  const handleManageBilling = (e) => {
    e.preventDefault();
    dispatch(getManageUserBilling(profile?.customer));
  };

  let initials;
  if (user) {
    initials = `${user?.first_name[0]}${user?.last_name[0]}`;
  }
  let myAccount = `Hi ${user?.first_name}`;
  useEffect(() => {
    if (user) {
      dispatch(getUserDetail());
    }
  }, [dispatch, user]);

  return (
    <div id="nb">
      <div className="">
        {/* <SidebarV2
          toggleSideBar={toggleSideBar}
          toggleSideBarHandler={toggleSideBarHandler}
        /> */}

        <StyledHeader className="d-flex z-1 bg-white w-100 px-lg-5 justify-content-between py-2 py-md-2 text-13 align-items-lg-center">
          <div className="d-flex">
            {/* <span className="sidebar-open-v2" onClick={toggleSideBarHandler}>
              &#9776;
            </span> */}
            <SidebarV3
              show={toggleSideBar}
              toggleSideBarHandler={toggleSideBarHandler}
              closeSidebarHandler={closeSidebarHandler}
              scroll={true}
              backdrop={true}
            />
            <div className="d-none d-lg-flex ms-2 ms-md-5 align-items-lg-center ">
              <div className="ms-2">
                <Link to="/" className="text-decoration-none">
                  <img src={logo} style={{ maxWidth: 200 }} alt="logo" />
                </Link>
              </div>
            </div>
          </div>
          <div className=" d-flex ms-5 align-items-center">
            {isMobile && (
              <>
                <div className="me-5">
                  <Link to="/" className="text-decoration-none">
                    <img src={logo} style={{ width: "15em" }} alt="logo" />
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="w-sm-25 w-md-50 d-flex  align-items-center">
            <div className="me-5 d-none d-md-block">
              <Link className="text-decoration-none" to="/pricing">
                <span className="fw-bolder">Pricing</span>
              </Link>
            </div>
            {user && profile?.subscriptions?.length === 0 && !loading ? (
              <div className="pt-2 mx-2 mx-md-4 d-none d-sm-none d-md-block">
                <div
                  className=" text-primary body-text border-1 p-2 "
                  style={{ border: "1px solid green" }}
                >
                  <p className="fw-bolder blue-100 p-0 m-0">Free trial</p>
                  <p className="p-0 m-0">{free_mode_count}/10 actions taken</p>
                </div>
              </div>
            ) : (
              ""
            )}

            {user && user?.subscriptions?.length > 0 && (
              <div className="me-5 d-none d-md-block">
                <Button
                  variant="primary"
                  onClick={handleManageBilling}
                  disabled={disabled}
                >
                  Billing
                  {billingLoader && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  <span className="visually-hidden">Loading...</span>
                </Button>
              </div>
            )}
            {/*<div className="mx-3 mx-md-6">*/}
            {/*  /!* <img src={question} alt="question" /> *!/*/}
            {/*  <HelpIcon width="24" height="24" fill="#AAAAAA" />*/}
            {/*</div>*/}

            {user ? (
              <NavDropdown
                title={myAccount}
                id="basic-nav-dropdown"
                className="me-2 me-md-0"
              >
                <NavDropdown.Item href="#action/3.1">
                  {" "}
                  <Link
                    to="profile"
                    className="px-4 py-3 d-flex justify-content-start text-decoration-none active"
                  >
                    <UserProfileIcon fill="#888888" height="24" width="24" />
                    <div className="ms-3">User profile</div>
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.2">
                  <Link
                    to="#"
                    className="px-4 py-3 d-flex justify-content-start text-decoration-none active"
                    onClick={onLogoutHandler}
                  >
                    <LogoutIcon height="25" width="24" fill="#888888" />
                    <div className="ms-3">Log Out</div>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="pt-2 mx-2 mx-md-4 d-none d-sm-none d-md-block">
                <div className="d-md-flex d-none text-primary body-text">
                  <Link
                    to="/login"
                    className="px-4 py-3 d-flex justify-content-start text-decoration-none active"
                  >
                    {" "}
                    Login
                  </Link>
                </div>
              </div>
            )}
            <div className="py-2">
              <ProfileBox
                isAuthenticated={!!user}
                logoutHandler={onLogoutHandler}
                title={
                  <div
                    className="profile-icon text-uppercase rounded-circle bg-primary text-white fs-6 px-2 py-2"
                    onClick={handleShowProfileBox}
                  >
                    {initials}
                  </div>
                }
              />
            </div>
          </div>

          <div
            className={classNames(
              showMobileNavbar ? "open-menu" : "close-menu"
            )}
          >
            <div className="wrapper__menu__header align-items-center">
              <div className="wrapper__menu__header__img">
                {/* <img src={logo} style={{ width: 36 }} alt="logo" /> */}
                <span className="white">CONSTRUCTION CLEAN PARTNERS</span>
              </div>
              <div
                className="wrapper__menu__header__close"
                onClick={handleCloseNavigationMenu}
              >
                <CloseIcon
                  fill="white"
                  className="menu_close"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                />
              </div>
            </div>
            <div className="wrapper__menu__input">
              <div className="mx-4 position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search in Sales Cloud"
                />

                <SearchIcon
                  fill="#BBBBBB"
                  width="20"
                  height="20"
                  className="icon"
                />
              </div>
            </div>

            <SidebarV3
              show={toggleSideBar}
              toggleSideBarHandler={toggleSideBarHandler}
              closeSidebarHandler={closeSidebarHandler}
              scroll={true}
              backdrop={true}
            />
          </div>
        </StyledHeader>
      </div>
    </div>
  );
};

export default Navbar;
