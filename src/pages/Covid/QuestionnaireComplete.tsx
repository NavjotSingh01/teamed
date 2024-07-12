import React, { useRef, useState, useEffect } from "react";
import UserIcon from "../../assets/images/user-icon.jpg";
import fullCheckIcon from "../../assets/images/full-check-icon.svg";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  clinicSelect,
  previousChosenClinic,
  resetAllCovid,
  resetQuestionnaire,
  saveQuestionnaireInstance,
} from "../../actions/covidActions";
import { Link, useHistory } from "react-router-dom";

const QuestionnaireComplete: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );
  const userProfiles = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );
  const contact = useSelector(
    (state: RootStateOrAny) => state.mainReducer.contact
  );

  const contactDescription = useSelector(
    (state: RootStateOrAny) => state.mainReducer.description
  );

  const requiredTesting = useSelector(
    (state: RootStateOrAny) => state.mainReducer.requiredTesting
  );

  const requiredTestingDescription = useSelector(
    (state: RootStateOrAny) => state.mainReducer.requiredTestingDescription
  );

  const schoolTesting = useSelector(
    (state: RootStateOrAny) => state.mainReducer.schoolTesting
  );

  const schoolTestingDescription = useSelector(
    (state: RootStateOrAny) => state.mainReducer.schoolTestingDescription
  );

  const school = useSelector(
    (state: RootStateOrAny) => state.mainReducer.school
  );

  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );

  const symptomatic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.symptomatic
  );
  const infoLabel = useSelector(
    (state: RootStateOrAny) => state.mainReducer.infoLabel
  );
  const infoValue = useSelector(
    (state: RootStateOrAny) => state.mainReducer.infoValue
  );

  const selectedSymptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedSymptoms
  );

  const selectedConditions = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedConditions
  );
  const displayAssessment = useSelector(
    (state: RootStateOrAny) => state.mainReducer.displayAssessment
  );
  const previousChosenClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.previousChosenClinic
  );

  const feelingNumber = useSelector(
    (state: RootStateOrAny) => state.mainReducer.feelingNumber
  );

  const start = useSelector((state: RootStateOrAny) => state.mainReducer.start);
  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );

  const appointmentType = useSelector(
    (state: RootStateOrAny) => state.mainReducer.appointmentType
  );

  const selectedImmunizations = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedImmunizations
  );
  const greenShieldNumber = useSelector(
    (state: RootStateOrAny) => state.mainReducer.greenShieldNumber
  );
  const studentCardNumber = useSelector(
    (state: RootStateOrAny) => state.mainReducer.studentCardNumber
  );
  const grade = useSelector((state: RootStateOrAny) => state.mainReducer.grade);
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
    if (
      questionnaireResponses.filter(
        (o: any) => o.patientPk === primaryProfile.pk
      ).length == 0
    ) {
      dispatch(
        saveQuestionnaireInstance({
          patientPk: primaryProfile.pk,
          appointment: {
            contact,
            contactDescription,
            requiredTesting,
            requiredTestingDescription,
            schoolTesting,
            schoolTestingDescription,
            school,
            symptomatic,
            selectedConditions,
            selectedSymptoms,
            feelingNumber,
            start,
            selectedImmunizations,
            grade,
            greenShieldNumber,
            studentCardNumber,
            infoLabel,
            infoValue,
          },
        })
      );
      dispatch(resetQuestionnaire());
    }
  }, [
    contact,
    contactDescription,
    dispatch,
    feelingNumber,
    primaryProfile.pk,
    questionnaireResponses,
    requiredTesting,
    requiredTestingDescription,
    school,
    schoolTesting,
    schoolTestingDescription,
    selectedConditions,
    selectedSymptoms,
    start,
    symptomatic,
  ]);

  // useEffect(() => {
  //   if (previousChosenClinic) {
  //     console.log("tester");
  //     dispatch(clinicSelect(previousChosenClinic));
  //   }
  // }, [dispatch, previousChosenClinic, selectedClinic]);

  return (
    <>
      <section className="main-bg-sectoin desktop-page less-space c-questionary-main">
        <div className="container completed-questionnaire">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-5">
              <div className="cancel-wrapper updated-arrow  new-arrow">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(resetAllCovid());
                  }}
                >
                  <i
                    className="fas fa-chevron-circle-left mar-10"
                    aria-hidden="true"
                  ></i>{" "}
                  APPOINTMENTS
                </a>
              </div>
              <h1 style={{ color: "#343642" }}>
                <div className="office-icons icons-small2">
                  <img src={fullCheckIcon} alt="" />
                </div>

                {selectedClinic.questions_enabled
                  ? "Questionnaire Complete for:"
                  : `
                    How would you like to proceed?`}
              </h1>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-7">
              <div className="questionnaire-list">
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
                          {item[0].is_primary && <span>Admin</span>}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="questionnaire-buttons">
                <div className="add-calendar-cancel-appt">
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="primary-btn bluefade"
                        title="Schedule a Test"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/covid/add-dependant");
                        }}
                      >
                        Add Another Dependent
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="primary-btn"
                        title="Schedule an Assessment"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/covid/options");
                        }}
                      >
                        Schedule Appointment
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="questionary-right">
                <h2>
                  {primaryProfile.first_name}, how would you like to proceed
                  with booking your appointment?{" "}
                </h2>
                <div className="question-compl-main">
                  <h3>Select an option below:</h3>
                  <div className="question-compl">
                    <div className="ques-left">
                      <h3>Add Dependents to Booking</h3>
                      <p>
                        Add family member(s) to your booking if more than just
                        yourself need to get{" "}
                        {appointmentType === "flu"
                          ? "a Flu Shot"
                          : appointmentType === "covid"
                          ? "a COVID-19 Test"
                          : "An Immunization"}
                        .
                      </p>
                    </div>
                    <a
                      href="#schedule"
                      className="primary-btn"
                      title="Schedule a Test"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/covid/add-dependant");
                      }}
                    >
                      Add Dependents
                    </a>
                  </div>
                  <div className="question-compl">
                    <div className="ques-left">
                      <h3>
                        Book{" "}
                        {appointmentType === "flu"
                          ? "a Flu Shot"
                          : appointmentType === "covid"
                          ? "a COVID-19 Test"
                          : "an Immunization"}
                      </h3>
                      <p>Select a Date and Time</p>
                    </div>
                    <a
                      href="#schedule"
                      className="primary-btn"
                      title="Schedule an Assessment"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/covid/options");
                      }}
                    >
                      Schedule{" "}
                      {appointmentType === "flu" || "immunization"
                        ? "an Appointment"
                        : "a Test"}
                    </a>
                  </div>
                  {selectedClinic.assessment_center_link && (
                    <div className="question-compl">
                      <div className="ques-left">
                        <h3>Book an assessment</h3>
                        <p>Select a Date and Time</p>
                      </div>
                      <a
                        href="#schedule"
                        className="primary-btn"
                        title="Schedule an Assessment"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            clinicSelect(
                              selectedClinic.assessment_center_link_office
                            )
                          );

                          history.push("/covid/options");
                        }}
                      >
                        Schedule an Assessment
                      </a>
                    </div>
                  )}
                </div>
              </div>
           */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuestionnaireComplete;
