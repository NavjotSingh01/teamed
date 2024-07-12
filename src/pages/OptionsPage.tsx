import React, { useState, useEffect } from "react";
import Map from "../components/Map/Map";
import UserIcon from "../assets/images/user-icon.jpg";
import SoonestAppointments from "../components/SoonestAppointments/SoonestAppointments";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import DateSelector from "../components/DateSelector/DateSelector";
import Footer from "../components/Footer/Footer";
import routes from "../routes/routes";
import {
  getSymptomsList,
  getNextThreeDays,
  setNextThreeDays,
  receiveCheckIfStillAvailable,
  getPriorityDays,
  checkIfAlreadyBooked,
  resetCheckIfStillAvailable,
} from "../actions/covidActions";
import { useHistory } from "react-router-dom";
import moment from "moment";
import momentBusinessDays from "moment-business-days";
import { BounceLoader } from "react-spinners";

const SoonestPage: React.FC = () => {
  const [displayedComponent, setDisplayedComponent] = useState<string>(
    "dateSelector"
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );

  const date = useSelector((state: RootStateOrAny) => state.mainReducer.date);
  const time = useSelector((state: RootStateOrAny) => state.mainReducer.time);
  const userProfiles = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );
  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );
  const appointmentType = useSelector(
    (state: RootStateOrAny) => state.mainReducer.appointmentType
  );

  const isFetchingPriorityDays = useSelector(
    (state: RootStateOrAny) => state.mainReducer.isFetchingPriorityDays
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
    dispatch(receiveCheckIfStillAvailable());
    if (appointmentType === "flu" || appointmentType === "immunization") {
      dispatch(getPriorityDays(selectedClinic.pk));
    }
  }, [appointmentType, dispatch, selectedClinic.pk]);

  useEffect(() => {
    if (date) {
      questionnaireResponses.forEach((questionnaire: any) => {
        dispatch(
          checkIfAlreadyBooked(
            moment(date).format("YYYY-MM-DD"),
            selectedClinic.pk,
            questionnaire.patientPk
          )
        );
      });
    }
  }, [date, dispatch, questionnaireResponses, selectedClinic.pk]);

  useEffect(() => {
    if (date && time) {
      dispatch(resetCheckIfStillAvailable());
    }
  }, [date, dispatch, time]);

  return (
    <>
      <div className="options">
        <div className="container">
          <div className="options__content">
            <div className="options__clinicInfo">
              <div className="cancel-wrapper updated-arrow new-arrow">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  <i
                    className="fas fa-chevron-circle-left  mar-10"
                    aria-hidden="true"
                  ></i>{" "}
                  Questionnaire Summary
                </a>
              </div>
              <div className="options__map_wrap">
                <div className="options__map">
                  <Map chosenClinic={selectedClinic} size="sm" />
                </div>
                <div>
                  <h5 className={"selectedborder"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 46.412 46.412"
                      width="30"
                      height="30"
                    >
                      <path
                        d="M39.652 16.446C39.652 7.363 32.289 0 23.206 0 14.124 0 6.761 7.363 6.761 16.446c0 1.775.285 3.484.806 5.086 0 0 1.384 6.212 15.536 24.742 8.103-10.611 12.018-17.178 13.885-20.857a16.377 16.377 0 002.664-8.971zM23.024 27.044c-5.752 0-10.416-4.663-10.416-10.416 0-5.752 4.664-10.415 10.416-10.415S33.44 10.876 33.44 16.628c-.001 5.753-4.664 10.416-10.416 10.416zM23.206 46.412l-.105-.139-.106.139h.211z"
                        fill="#38417c"
                      ></path>
                    </svg>
                    {selectedClinic.name}
                  </h5>
                </div>
              </div>
              <div className="appointments-for-list">
                <h4>Appointment for:</h4>
                {QuestionnaireList &&
                  QuestionnaireList.map((item: any) => {
                    return (
                      <div className="visited-list d-flex align-items-center">
                        <div className="profile">
                          <img
                            src={
                              item[0].profile_pic
                                ? item[0].profile_pic
                                : UserIcon
                            }
                            alt="img"
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-between details">
                          <h2>{item[0].first_name}</h2>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {!isFetchingPriorityDays ? (
              <div className="options__appointmentInfo">
                <div className="options__nav">
                  {appointmentType !== "flu" ||
                  appointmentType !== "immunization" ? (
                    <button
                      type="button"
                      className={
                        displayedComponent === "soonest" ? "active" : ""
                      }
                      onClick={() => setDisplayedComponent("soonest")}
                    >
                      Soonest
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="disabled"
                      onClick={() => setDisplayedComponent("soonest")}
                    >
                      Soonest
                    </button>
                  )}
                  <button
                    type="button"
                    className={
                      displayedComponent === "dateSelector" ? "active" : ""
                    }
                    onClick={() => setDisplayedComponent("dateSelector")}
                  >
                    Choose a date
                  </button>
                </div>
                {displayedComponent === "soonest" && <SoonestAppointments />}
                {displayedComponent === "dateSelector" && <DateSelector />}
              </div>
            ) : (
              <BounceLoader />
            )}
          </div>
        </div>
      </div>
      <Footer
        nextLink={routes.SYMPTOMS_LIST_PAGE.path}
        prevLinkTitle="Clinic"
        nextLinkTitle="Screening Questions"
        isAuthorized={false}
        progressLevel={45}
        hideNextStep={!date || !time ? false : true}
        isSubmitting={true}
      />
    </>
  );
};

export default SoonestPage;
