import React, { useEffect, useState } from "react";
import AuthHeader from "../AuthHeader";
import AppointmentImage from "../../assets/images/appointment.png";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  deleteAppointment,
  getPatientAppointments,
  selectAppointmentPk,
} from "../../actions/patientOfficeActions";
import { BounceLoader } from "react-spinners";
import moment from "moment";
import Modal from "react-modal";
import { CancelAppointment } from "./CancelAppointment";
import { Link } from "react-router-dom";
import Office from "../../containers/Office";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
};

export const Appointment: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  const appointments = useSelector(
    (state: RootStateOrAny) => state.patientOfficeInteractions.appointments
  );
  const isFetchingAppointments = useSelector(
    (state: RootStateOrAny) =>
      state.patientOfficeInteractions.isFetchingAppointments
  );
  const hasDeletedAppointment = useSelector(
    (state: RootStateOrAny) =>
      state.patientOfficeInteractions.hasDeletedAppointment
  );
  const selectedAppointment = useSelector(
    (state: RootStateOrAny) =>
      state.patientOfficeInteractions.selectedAppointment
  );
  useEffect(() => {
    dispatch(getPatientAppointments(primaryProfile.pk));
  }, [dispatch, hasDeletedAppointment, primaryProfile.pk, props.office.slug]);

  const [modalIsOpen, setIsOpen] = useState<any>(false);
  return (
    <React.Fragment>
      <AuthHeader />

      <section className="main-bg-sectoin desktop-page less-space appointment left app-confirmed-main">
        <div className="container app-confirmed">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-5">
              <div className="cancel-wrapper updated-arrow">
                <Link to={`/office/appointments-list`}>
                  <i
                    className="fas fa-chevron-circle-left"
                    aria-hidden="true"
                  ></i>{" "}
                  APPOINTMENTS
                </Link>
              </div>
              <h1 className="d-flex">
                <i>Your Appointments</i>
              </h1>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-7">
              <div className="app-con-right">
                <div className="appcon-head">
                  <span className="covid-testing">
                    {selectedAppointment.office.name}
                  </span>
                  <h2>
                    {moment(selectedAppointment.event_date).format("MMMM DD")} @{" "}
                    {moment(selectedAppointment.event_time, "HH:mm:ss").format(
                      "LT"
                    )}
                  </h2>
                </div>

                <div className="location-type">
                  <p>
                    Location: {selectedAppointment.office.name}:{" "}
                    {selectedAppointment.office.address},{" "}
                    {selectedAppointment.office.city}.
                  </p>
                </div>
                {props.office.assessment_center && (
                  <div className="virtual-wait-room">
                    <Link
                      to={`/office/${selectedAppointment.office.slug}/checkin/`}
                      title="Virtual Waiting Room"
                      className="virtual-room primary-btn"
                    >
                      Virtual Waiting Room
                    </Link>
                    <p>
                      Please make sure you are entering your appointment at the
                      right time. <br />
                      <a
                        href="https://getcorigan.ca/setting-up-your-computer-for-a-video-call/"
                        title=""
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        View tutorial to help get you set up for a Virtual
                        Appointment.
                      </a>
                    </p>
                  </div>
                )}
                <div className="add-calendar-cancel-appt">
                  <ul>
                    <li>
                      <a
                        href={`https://calendar.google.com/calendar/r/eventedit?text=Covid Appointment at ${
                          selectedAppointment.office.name
                        }&dates=${moment(
                          `${selectedAppointment.event_date} ${selectedAppointment.event_time}`,
                          "YYYY-MM-DD hh:mm A"
                        ).format("YYYYMMDDTHHmmss")}/${moment(
                          `${selectedAppointment.event_date} ${moment(
                            selectedAppointment.event_time,
                            "hh:mm A"
                          )
                            .add(30, "minutes")
                            .format("hh:mm A")}`,
                          "YYYY-MM-DD hh:mm A"
                        ).format(
                          "YYYYMMDDTHHmmss"
                        )}&details=Schedule through Corigan&location=${
                          selectedAppointment.office.address
                        }`}
                        target="_blank"
                        title="Add to Calendar"
                        className="primary-btn"
                      >
                        Add to Calendar
                      </a>
                    </li>
                    <li>
                      <a
                        href="#test"
                        title="Cancel Appointment"
                        className="primary-btn redbtn"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(selectAppointmentPk(selectedAppointment.pk));
                          setIsOpen(true);
                        }}
                      >
                        Cancel Appointment
                      </a>
                    </li>
                  </ul>
                </div>
                {modalIsOpen && (
                  <CancelAppointment
                    setIsOpen={setIsOpen}
                    appointment={selectedAppointment}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
