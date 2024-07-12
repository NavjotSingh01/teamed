import React, { useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import DesktopLogo from "../assets/images/logo.png";
import MobileLogo from "../assets/images/mobile-logo.svg";
import Mentor from "../assets/images/mentor.png";
import User from "../assets/images/user.png";
import YellowCircle from "../assets/images/circle-yellow.png";
import doctoravatar from "../assets/images/doctor6.jpg";
import { userLogout } from "../actions/authActions";
import Avatar from "react-avatar";
import UserIcon from "../assets/images/user-icon.jpg";

function AuthHeader() {
  const [headerStatus, setHeaderStatus] = useState("closed");
  const [logOut, setLogout] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  return (
    <div>
      <div className="menu_wrapper desktop-wrapper">
        <div className="circle-img-wrppaer d-none d-lg-block">
          <img
            src={YellowCircle}
            className="circle-yellow"
            alt="circle-yellow"
          />
        </div>
        <div className="container">
          <nav id="site-topnav" className="navbar navbar-default">
            <a className="navbar-brand d-only" href="#">
              <img src={DesktopLogo} alt="logo" />
            </a>
            <a href="#" title="logo" className="m-only">
              <img src={MobileLogo} alt="logo" />
            </a>
            <div className="navbar-header d-flex">
              <figure>
                {primaryProfile.profile_pic ? (
                  <img src={primaryProfile.profile_pic} alt="user-img" />
                ) : (
                  <img src={UserIcon} alt="user-img" />
                )}
              </figure>
              <button
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                className="navbar-toggler navbar-toggler-right collapsed"
                onClick={(e) => {
                  setHeaderStatus(headerStatus == "closed" ? "open" : "closed");
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div
              className="navbar-collapse collapse"
              id="navbarSupportedContent"
              style={{ display: headerStatus == "closed" ? "none" : "block" }}
            >
              <ul className="nav navbar-nav nav-menu user-detail-popup">
                <li>
                  <a href="#">
                    {primaryProfile.profile_pic ? (
                      <img src={primaryProfile.profile_pic} alt="user-img" />
                    ) : (
                      <img src={UserIcon} alt="user-img" />
                    )}
                  </a>
                  <h2>
                    {primaryProfile.first_name}
                    <br />
                    {primaryProfile.last_name}
                  </h2>
                </li>
                <li>
                  <Link to="/dashboard/edit-profile">Edit Profile </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-offices">My Offices </Link>
                </li>
                <li>
                  <Link to="/patient-select">Switch Profiles </Link>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("id_token");
                      dispatch(userLogout());
                      setLogout(true);
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {logOut ? <Redirect to={`/`} /> : ""}
    </div>
  );
}

export default AuthHeader;
