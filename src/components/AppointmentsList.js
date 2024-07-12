import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import Appointment from "../assets/images/appointment.png";
import Accordion from "./Accordion";
import BackArrow from "../assets/images/back-arrow.png";
import {
  getPatientAppointments,
  selectAppointment,
  selectDeletedAppointment,
  getPatientDeletedAppointments,
} from "../actions/patientOfficeActions";
import { BounceLoader } from "react-spinners";
import moment from "moment";

const AppointmentsList = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const primaryProfile = useSelector(
    (state) => state.authenticateUser.primaryProfile
  );
  const hasDeletedAppointment = useSelector(
    (state) => state.patientOfficeInteractions.hasDeletedAppointment
  );

  useEffect(() => {
    dispatch(getPatientAppointments(primaryProfile.pk));
  }, [hasDeletedAppointment]);

  const appointments = useSelector(
    (state) => state.patientOfficeInteractions.appointments
  );

  useEffect(() => {
    dispatch(getPatientDeletedAppointments(primaryProfile.pk));
  }, [hasDeletedAppointment]);

  const deletedAppointments = useSelector(
    (state) => state.patientOfficeInteractions.deletedAppointments
  );

  const isFetchingAppointments = useSelector(
    (state) => state.patientOfficeInteractions.isFetchingAppointments
  );

  const isFetchingDeletedAppointments = useSelector(
    (state) => state.patientOfficeInteractions.isFetchingDeletedAppointments
  );

  return (
    <div>
      <AuthHeader />
      <section class="main-bg-sectoin desktop-page less-space appointment">
        <div class="container  appointments-list-page">
          <div class="row">
            <div class="col-lg-12 col-xl-4 col-md-12">
              <div class="cancel-wrapper">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/office");
                  }}
                >
                  <i
                    class="fas fa-chevron-circle-left arrow_icon d-show"
                    aria-hidden="true"
                  ></i>
                  <img src={BackArrow} alt="back" class="d-mobile" /> Home
                </a>
              </div>
              <h1 class="d-flex" style={{ marginBottom: "30px" }}>
                <span class="office-icons yellow-sqr">
                  <img src={Appointment} alt="" />
                </span>
                Appointments
              </h1>
              <div className="appointment-btn-wrap">
                <Link to="/bookappointment" className="appointment-btn">
                  Book Appointment
                </Link>
              </div>
            </div>
            <div class="col-lg-12 col-xl-8 col-md-12">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                  <div className="main">
                    <div className="accordion-container">
                      <Accordion title={"Upcoming"}>
                        {appointments.length === 0 && isFetchingAppointments ? (
                          <BounceLoader />
                        ) : appointments.length > 0 ? (
                          appointments
                            .filter((a) => a.office.pk !== 107)
                            .map((appointment) => (
                              <div
                                className="appointments-list"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(selectAppointment(appointment));
                                  history.push(
                                    `/office/appointment/${appointment.pk}`
                                  );
                                }}
                              >
                                <div className="left-content">
                                  <span className="date">
                                    {moment(appointment.event_date).format(
                                      "MMMM DD"
                                    )}{" "}
                                    |{" "}
                                    {moment(
                                      appointment.event_time,
                                      "HH:mm:ss"
                                    ).format("LT")}{" "}
                                  </span>
                                  <span className="name">
                                    {appointment.office.name}
                                  </span>
                                </div>
                                {/* <div className="right-content">
                            <a href="#" className="accordion-btn">
                              covid test
                            </a>
                          </div> */}
                              </div>
                            ))
                        ) : (
                          <p>No scheduled appointments</p>
                        )}
                      </Accordion>
                      <Accordion title={"Past"}>
                        {deletedAppointments.length === 0 &&
                        isFetchingDeletedAppointments ? (
                          <BounceLoader />
                        ) : deletedAppointments.length > 0 ? (
                          deletedAppointments.map((deletedAppointment) => (
                            <div className="appointments-list">
                              <div className="left-content">
                                <span className="date">
                                  {moment(deletedAppointment.event_date).format(
                                    "MMMM DD"
                                  )}{" "}
                                  |{" "}
                                  {moment(
                                    deletedAppointment.event_time,
                                    "HH:mm:ss"
                                  ).format("LT")}{" "}
                                </span>
                                <span className="name">
                                  {deletedAppointment.office.name}
                                </span>
                              </div>
                              {/* <div className="right-content">
                            <a href="#" className="accordion-btn">
                              covid test
                            </a>
                          </div> */}
                            </div>
                          ))
                        ) : (
                          <p>No cancelled appointments</p>
                        )}
                      </Accordion>
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

export default AppointmentsList;
