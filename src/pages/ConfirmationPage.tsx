import React, { useState, useEffect } from "react";
import Map from "../components/Map/Map";

import s from "../assets/styles/PagesStyles.module.scss";
import fullCheckIcon from "../assets/images/full-check-icon.svg";
import appointmentIcon from "../assets/images/appointments-icon.svg";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { resetAllCovid } from "../actions/covidActions";
import { CancelAppointment } from "../components/appointments/CancelAppointment";
import { selectAppointmentPk } from "../actions/patientOfficeActions";
const ConfirmationPage: React.FC = () => {
  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );
  const dispatch = useDispatch();
  let date = useSelector((state: RootStateOrAny) => state.mainReducer.date);
  date = moment(date).format("YYYY-MM-DD");

  const userProfiles = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );
  const time = useSelector((state: RootStateOrAny) => state.mainReducer.time);
  const future = moment(time, "hh:mm A").add(30, "minutes").format("hh:mm A");
  const mainReducer = useSelector((state: RootStateOrAny) => state.mainReducer);
  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );
  const appointmentPk = useSelector(
    (state: RootStateOrAny) => state.mainReducer.appointmentPk
  );

  const [modalIsOpen, setIsOpen] = useState<any>(false);
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  const Questionnaire = () => {
    const list = questionnaireResponses.map((item: any, index: any) => {
      const listInner = userProfiles.filter((user: any, index: any) => {
        return item.patientPk == user.pk;
      });
      return listInner;
    });
    return list;
  };
  const QuestionnaireList = Questionnaire();
  useEffect(() => {
    console.log(questionnaireResponses);
  }, []);
  useEffect(() => {
    return () => {
      dispatch(resetAllCovid());
    };
  }, []);
  return (
    <section className="main-bg-sectoin desktop-page less-space appointment left app-confirmed-main">
      <div className="container app-confirmed">
        <div className="row">
          <div className="col-md-12 col-lg-4 col-xl-5">
            <div className="cancel-wrapper updated-arrow  new-arrow">
              <Link to="/patient-select">
                <i
                  className="fas fa-chevron-circle-left mar-10"
                  aria-hidden="true"
                />{" "}
                APPOINTMENTS
              </Link>
            </div>
            <h1 className="d-flex">
              <i>Appointment Confirmed!</i>
            </h1>
          </div>
          <div className="col-md-12 col-lg-8 col-xl-7">
            <div className="app-con-right review-con-right">
              <div className="appcon-head">
                <span className="covid-testing">{selectedClinic.name}</span>
                <h2 style={{ maxWidth: "100%" }}>
                  {" "}
                  {moment(mainReducer.date).format("MMMM DD")} @{" "}
                  {moment(mainReducer.time, "HH:mm:ss").format("LT")}
                </h2>
              </div>
              <div className="location-type-2">
                <p>
                  <span className="font-euculid">Location:</span>{" "}
                  {selectedClinic.name}: {selectedClinic.address},{" "}
                  {selectedClinic.city}.
                </p>
                <p>
                  <span className="font-euculid">Type:</span>{" "}
                </p>
              </div>
              <div className=" mb-23">
                <p style={{ fontSize: 18 }} className="font-euculid">
                  Participant(s):
                </p>
              </div>
              <div className="appointments-for-list appointments-diff-style">
                {QuestionnaireList &&
                  QuestionnaireList.map((item: any) => {
                    return (
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-between details w100">
                          <h2>
                            {item[0].first_name}{" "}
                            {item[0].pk == primaryProfile.pk ? "(Me)" : ""}
                          </h2>
                          <a className="view-triage" href="#">
                            View Triage
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="appoint-confirm-des">
                <p>{selectedClinic.disclaimer}</p>
              </div>
              <div className="add-calendar-cancel-appt">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(selectAppointmentPk(appointmentPk));
                        setIsOpen(true);
                      }}
                      className="primary-btn redbtn"
                    >
                      Cancel Appointment
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://calendar.google.com/calendar/r/eventedit?text=Covid Appointment at ${
                        selectedClinic.name
                      }&dates=${moment(
                        `${date} ${time}`,
                        "YYYY-MM-DD hh:mm A"
                      ).format("YYYYMMDDTHHmmss")}/${moment(
                        `${date} ${future}`,
                        "YYYY-MM-DD hh:mm A"
                      ).format(
                        "YYYYMMDDTHHmmss"
                      )}&details=Schedule through Corigan&location=${
                        selectedClinic.address
                      }`}
                      target="_blank"
                      title="Book Appointment"
                      className="primary-btn"
                    >
                      Add to Calendar
                    </a>
                  </li>
                </ul>
              </div>
              {modalIsOpen && (
                <CancelAppointment
                  setIsOpen={setIsOpen}
                  // appointment={appointment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationPage;
