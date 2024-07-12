import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthHeader from "./AuthHeader";
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import Flower from "../assets/images/flower.png";
import LeavesMobile from "../assets/images/leaves-mobile.svg";
import { getDoctors, createOfficeRequest } from "../actions/patientActions";
import Avatar from "react-avatar";

import {
  getCurrentOffice,
  myOfficesToggle,
} from "../actions/patientOfficeActions";
function AddOffice() {
  const [doctor, selectDoctor] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getDoctors());
  }, []);
  const profile = useSelector((state) => state.authenticateUser.primaryProfile);
  const offices = useSelector((state) => state.patientInteractions.offices);
  const hasCreatedRequest = useSelector(
    (state) => state.patientInteractions.hasCreatedRequest
  );
  const myOffices = useSelector(
    (state) => state.patientOfficeInteractions.myOffices
  );
  const receivedOffices = useSelector(
    (state) => state.patientInteractions.receivedOffices
  );
  const createOfficeErrorMessage = useSelector(
    (state) => state.patientInteractions.createOfficeErrorMessage
  );
  const userOffices = null;

  useEffect(() => {
    return () => dispatch(myOfficesToggle(true));
  }, []);

  return (
    <div>
      <AuthHeader />
      <section class="main-bg-sectoin desktop-page less-space">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-xl-12">
              <div class="inner-desktop-content office-home-main">
                <div class="triage-app-left doctor-list-left">
                  <div class="cancel-wrapper">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        history.goBack();
                      }}
                    >
                      <i
                        class="fas fa-chevron-circle-left arrow_icon"
                        aria-hidden="true"
                      ></i>{" "}
                      Offices
                    </a>
                  </div>
                  <h1 class="d-none d-lg-block">Add new office</h1>
                  <h1 class="d-block d-lg-none">
                    Your Offices <br />
                  </h1>
                  <h3 class="d-none d-lg-block">Select an Office to Join.</h3>
                </div>
                <div class="content-wrapper list-desktop-right">
                  <div class="row">
                    <div class="col-xl-10 col-md-12 list-dotors-right">
                      {/* <a
                        href="#"
                        class="primary-btn"
                        title="Enter Doctor’s Code"
                      >
                        Enter Doctor’s Code
                      </a> */}
                      <div
                        class="accordion"
                        id="accordionEx"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        {receivedOffices
                          ? offices.map((office) => (
                              <div
                                class={`card ${
                                  doctor === office.pk ? "open-accordion" : ""
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (doctor === office.pk) {
                                    selectDoctor(null);
                                  } else {
                                    selectDoctor(office.pk);
                                  }
                                }}
                              >
                                <div
                                  class="card-header"
                                  role="tab"
                                  id="headingOne1"
                                >
                                  <a
                                    data-toggle="collapse"
                                    data-parent="#accordionEx"
                                    href="#collapseOne1"
                                    aria-expanded="true"
                                    aria-controls="collapseOne1"
                                  >
                                    <div class="card-wrapper">
                                      <div class="box-img">
                                        {/* <img
                                          src={LinkedInPic}
                                          alt="Profile image"
                                        /> */}
                                        <Avatar
                                          name={office.name}
                                          size="100%"
                                          round={true}
                                        />
                                        <span class="dots"></span>
                                      </div>
                                      <div class="box-profile">
                                        <h2>{office.name}</h2>
                                        <small>Patients Only</small>
                                      </div>
                                    </div>
                                  </a>
                                </div>

                                <div
                                  id="collapseOne1"
                                  class={`collapse ${
                                    doctor === office.pk ? "show" : ""
                                  }`}
                                  role="tabpanel"
                                  aria-labelledby="headingOne1"
                                  data-parent="#accordionEx"
                                >
                                  <div class="card-body">
                                    <ul>
                                      <li>
                                        <small>Virtual Office Hours</small>
                                        <h2>
                                          {office.opened_at} -{" "}
                                          {office.closed_at}
                                        </h2>
                                      </li>
                                      <li>
                                        <small>Availability</small>
                                        {office.availability === "private" ? (
                                          <h2>Open to patients only</h2>
                                        ) : (
                                          <h2>Open to all.</h2>
                                        )}
                                      </li>
                                    </ul>
                                    {!hasCreatedRequest ? (
                                      userOffices ? (
                                        !userOffices.includes(office.pk) ? (
                                          <button
                                            type="button"
                                            class="primary-btn"
                                            data-toggle="modal"
                                            data-target="#requestModal"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              dispatch(
                                                createOfficeRequest(
                                                  profile.pk,
                                                  office.pk
                                                )
                                              );
                                            }}
                                          >
                                            Request to Join
                                          </button>
                                        ) : (
                                          ""
                                        )
                                      ) : (
                                        <button
                                          type="button"
                                          class="primary-btn"
                                          data-toggle="modal"
                                          data-target="#requestModal"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(
                                              createOfficeRequest(
                                                profile.pk,
                                                office.pk
                                              )
                                            );
                                          }}
                                        >
                                          Request to Join
                                        </button>
                                      )
                                    ) : (
                                      <button
                                        type="button"
                                        class="primary-btn"
                                        data-toggle="modal"
                                      >
                                        Requested.
                                      </button>
                                    )}
                                    <p style={{ color: "red" }}>
                                      {createOfficeErrorMessage
                                        ? createOfficeErrorMessage
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          : "LOADING OFFICES"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="requestModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Office Request
                </h5>
              </div>
              <div class="modal-body">
                This office only accepts existing patients. You will have to
                wait for the office to confirm you are a patient.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn secondary-btn"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" class="btn primary-btn">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="img-wrppaer">
          <img src={Flower} class="flower-img" alt="flower" />
        </div>
        <div class="mobile-leaves">
          <img src={LeavesMobile} alt="" />
        </div>
      </section>
      {hasCreatedRequest && !myOffices ? (
        <Redirect to={`/dashboard/office-select`} />
      ) : hasCreatedRequest && myOffices ? (
        <Redirect to={`/dashboard/my-offices`} />
      ) : (
        ""
      )}
    </div>
  );
}

export default AddOffice;
