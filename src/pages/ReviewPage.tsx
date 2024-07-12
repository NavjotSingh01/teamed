import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { BounceLoader } from "react-spinners";
import {
  submitQuestionnaire,
  validateDatetimeAndSubmit,
} from "../actions/covidActions";
const ReviewPage: React.FC = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const date = useSelector((state: RootStateOrAny) => state.mainReducer.date);
  const time = useSelector((state: RootStateOrAny) => state.mainReducer.time);
  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );
  const hasSubmittedData = useSelector(
    (state: RootStateOrAny) => state.mainReducer.hasSubmittedData
  );
  const appointmentType = useSelector(
    (state: RootStateOrAny) => state.mainReducer.appointmentType
  );
  const mainReducer = useSelector((state: RootStateOrAny) => state.mainReducer);
  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );

  const userProfiles = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const isAvailable = useSelector(
    (state: RootStateOrAny) => state.mainReducer.isAvailable
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
  return (
    <section className="review-page main-bg-sectoin desktop-page less-space appointment left app-confirmed-main">
      <div className="container app-confirmed">
        <div className="row">
          <div className="col-md-12 col-lg-4 col-xl-5">
            <div className="cancel-wrapper updated-arrow new-arrow">
              <Link to="/covid/questionnaire-complete">
                <i
                  className="fas fa-chevron-circle-left mar-10"
                  aria-hidden="true"
                />{" "}
                Schedule appointment
              </Link>
            </div>
            <h1 className="d-flex">
              <i>
                Please Review
                <br style={{ display: "block" }} />
                Before Confirming 
              </i>
            </h1>
            <p>Your appointment is not booked yet!</p>
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
                        <div className="d-flex align-items-center justify-content-between details">
                          <h2>
                            {item[0].first_name}{" "}
                            {item[0].pk == primaryProfile.pk ? "(Me)" : ""}
                          </h2>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="add-calendar-cancel-appt">
                {isAvailable == false && (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    We are having larger than expected bookings. The spot you
                    chose was just booked. Please choose another date/time.
                  </p>
                )}
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();

                        history.push("/covid/options");
                      }}
                      className="primary-btn whitebtn"
                    >
                      Change Date/Time
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setLoader(true);
                        dispatch(
                          validateDatetimeAndSubmit(
                            {
                              date,
                              time,
                              appointmentType,
                            },
                            selectedClinic.pk,
                            questionnaireResponses
                          )
                        );
                      }}
                      title="Book Appointment"
                      className="primary-btn"
                    >
                      Book Appointment
                    </a>
                  </li>
                </ul>
              </div>
              {loader && <BounceLoader />}
              {hasSubmittedData && <Redirect to="/covid/confirmation" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;
