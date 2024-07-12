import React from "react";
import AuthHeader from "./AuthHeader";
import Appointment from "../assets/images/appointment.png";
import { useHistory } from "react-router-dom";
import { setAppointmentType } from "../actions/covidActions";
import { useDispatch, useSelector } from "react-redux";
import BackArrow from "../assets/images/back-arrow.png";

const BookAppointment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
                    history.goBack();
                  }}
                >
                  <i
                    class="fas fa-chevron-circle-left arrow_icon d-show"
                    aria-hidden="true"
                  ></i>
                  <img src={BackArrow} alt="back" class="d-mobile" /> Home
                </a>
              </div>
              <h1 class="d-flex">
                <span class="office-icons yellow-sqr">
                  <img src={Appointment} alt="" />
                </span>
                Book Appointments
              </h1>
            </div>
            <div class="col-lg-12 col-xl-8 col-md-12">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                  <div className="main">
                    <div className="section-header">
                      <h2>Select Type</h2>
                      <p>What type of appointment would you like to make?</p>
                    </div>
                    <button
                      className="covid-19-button"
                      onClick={(e) => {
                        dispatch(setAppointmentType("covid"));
                        history.push("/covid");
                      }}
                    >
                      Book your COVID-19 Test Here
                    </button>
                    <button
                      className="covid-19-button"
                      onClick={(e) => {
                        dispatch(setAppointmentType("flu"));
                        history.push("/covid");
                      }}
                    >
                      Book your Flu Shot Here
                    </button>
                    <button
                      className="covid-19-button"
                      onClick={(e) => {
                        dispatch(setAppointmentType("immunization"));
                        history.push("/covid");
                      }}
                    >
                      Book your Grade 7 Immunizations Here
                    </button>
                    <button
                      className="covid-19-button"
                      onClick={(e) => {
                        dispatch(setAppointmentType("vaccination"));
                        history.push("/covid");
                      }}
                    >
                      Book your Vaccinations Here
                    </button>
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

export default BookAppointment;
