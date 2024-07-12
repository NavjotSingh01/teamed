import React, { useEffect } from "react";
import AuthHeader from "./AuthHeader";
import { useSelector, useDispatch } from "react-redux";
import PlusIcon from "../assets/images/plus-icon.svg";
import { Link, useHistory } from "react-router-dom";
import Appointment from "../assets/images/appointment.png";
import UserIcon from "../assets/images/user-icon.jpg";
import Avatar from "react-avatar";
import { getOfficeRequests } from "../actions/authActions";

import {
  getCurrentOffice,
  myOfficesToggle,
} from "../actions/patientOfficeActions";

export const MyOffices = (props) => {
  const primaryProfile = useSelector(
    (state) => state.authenticateUser.primaryProfile
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const officeRequests = useSelector(
    (state) => state.authenticateUser.officeRequests
  );

  useEffect(() => {
    dispatch(getOfficeRequests(primaryProfile.pk));
  }, []);

  return (
    <div>
      <AuthHeader />
      <section class="main-bg-sectoin desktop-page less-space appointment">
        <div class="container inbox-page-main">
          <div class="row">
            <div class="col-lg-12 col-xl-4 col-md-12">
              <div class="cancel-wrapper">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  <i
                    class="fas fa-chevron-circle-left arrow_icon d-show"
                    aria-hidden="true"
                  ></i>
                  <img
                    src="images/back-arrow.png"
                    alt="back"
                    class="d-mobile"
                  />{" "}
                  Home
                </a>
              </div>
              <h1 class="d-flex">
                {/* <span class="office-icons yellow-sqr"></span> */}
                Office Management
              </h1>
            </div>
            <div class="col-lg-12 col-xl-8 col-md-12">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                  <div class="main">
                    <div class="app-wrapper mb-4 ">
                      <h2>Choose your office</h2>
                      {primaryProfile.office
                        .filter((o) => o)
                        .map((o) => (
                          <div
                            class="visited-list d-flex align-items-center"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <div class="profile">
                              {/* <img src="images/Profile4.jpg" alt="img" /> */}
                              <Avatar size={64} name={o.name} round={true} />
                            </div>
                            <div class="d-flex align-items-center justify-content-between details">
                              <div>
                                <h2>{o.name}</h2>
                                {/* <p>Family Doctor</p> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      {officeRequests &&
                        officeRequests.map((o) => (
                          <div
                            class="visited-list d-flex align-items-center"
                            style={{ opacity: 0.4 }}
                          >
                            <div class="profile">
                              {/* <img src="images/Profile4.jpg" alt="img" /> */}
                              <Avatar
                                size={64}
                                name={o.office.name}
                                round={true}
                              />
                            </div>
                            <div class="d-flex align-items-center justify-content-between details">
                              <div>
                                <h2>{o.office.name}</h2>
                                <p>
                                  This office hasn't approved or denied your
                                  request at this moment.
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      <Link to="/dashboard/add-office">
                        <div
                          class="visited-list d-flex align-items-center some-one-else"
                          onClick={(e) => {
                            dispatch(myOfficesToggle(true));
                          }}
                        >
                          <div class="profile">
                            <img src={UserIcon} alt="img" />
                          </div>
                          <div class="d-flex align-items-center justify-content-between details add-new-off-head">
                            <div>
                              <h2>Add New Office</h2>
                            </div>
                            <span>
                              <img src={PlusIcon} alt="plus" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
