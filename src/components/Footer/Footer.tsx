import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";

import cn from "classnames";
import Progress from "../Progress/Progress";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import s from "./Footer.module.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  createAppointment,
  submitQuestionnaire,
  checkIfStillAvailable,
  finalCheckIfStillAvailable,
  validateDatetimeAndSubmit,
} from "../../actions/covidActions";
// import { submitRequest } from "../../actions/covidActions";
import { BounceLoader } from "react-spinners";

type PropsType = {
  nextLink: string;
  prevLinkTitle?: string | undefined;
  nextLinkTitle: string;
  isAuthorized: boolean;
  progressLevel: number;
  isSubmitting?: boolean;
  hideNextStep?: any;
};

const Footer = ({
  nextLink,
  nextLinkTitle,
  prevLinkTitle,
  isAuthorized,
  progressLevel,
  isSubmitting,
  hideNextStep,
}: PropsType): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profileData = useSelector(
    (state: RootStateOrAny) => state.mainReducer.profileData
  );
  const date = useSelector((state: RootStateOrAny) => state.mainReducer.date);
  const time = useSelector((state: RootStateOrAny) => state.mainReducer.time);
  const start = useSelector((state: RootStateOrAny) => state.mainReducer.start);
  const contact = useSelector(
    (state: RootStateOrAny) => state.mainReducer.contact
  );
  const description = useSelector(
    (state: RootStateOrAny) => state.mainReducer.description
  );
  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );
  const selectedSymptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedSymptoms
  );
  const isSubmittingAllData = useSelector(
    (state: RootStateOrAny) => state.mainReducer.isSubmittingAllData
  );

  const hasSubmittedData = useSelector(
    (state: RootStateOrAny) => state.mainReducer.hasSubmittedData
  );
  const appointmentType = useSelector(
    (state: RootStateOrAny) => state.mainReducer.appointmentType
  );
  const profile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.profile
  );
  const isAvailable = useSelector(
    (state: RootStateOrAny) => state.mainReducer.isAvailable
  );

  // useEffect(() => {
  //   if (date && time) {
  //     const getAppointmentIntervals = setInterval(() => {
  //       dispatch(checkIfStillAvailable(date, time, selectedClinic.pk));
  //     }, 5000);

  //     return () => clearInterval(getAppointmentIntervals);
  //   }
  // }, [date, dispatch, selectedClinic.pk, time]);

  const questionnaireResponses = useSelector(
    (state: RootStateOrAny) => state.mainReducer.questionnaireResponses
  );
  return (
    <footer className={s.footer}>
      {isAvailable == false && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          We are having larger than expected bookings. The spot you chose was
          just booked. Please choose another date/time.
        </p>
      )}
      <Progress
        isAuthorized={false}
        mobile
        progressLevel={progressLevel}
        className={s.footer__progress_mobile}
      />
      <div className="container">
        <div className={s.footer__linksWrap}>
          {prevLinkTitle && (
            <button
              className={"hideLink " + s.footer__prevPageLink}
              type="button"
              onClick={() => history.goBack()}
            >
              <ArrowIcon
                direction="left"
                fill="#38417c"
                className={s.footer__prevPageIcon}
              />
              {prevLinkTitle}
            </button>
          )}

          {!isSubmitting ? (
            hideNextStep || hideNextStep == null ? (
              <Link
                to={nextLink}
                className={"hideLink " + s.footer__nextPageLink}
              >
                {nextLinkTitle}
                <ArrowIcon
                  direction="right"
                  fill="#ffffff"
                  className={s.footer__nextPageIcon}
                />
              </Link>
            ) : (
              ""
            )
          ) : isAvailable === false ? (
            <div>
              <Link to={`/covid/options`}>
                <button
                  className={"primary-btn"}
                  style={{ opacity: 0.3, cursor: "not-allowed" }}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Continue
                  <ArrowIcon
                    direction="right"
                    fill="#ffffff"
                    className={s.footer__nextPageIcon}
                  />
                </button>
              </Link>
            </div>
          ) : !isSubmittingAllData ? (
            hideNextStep ? (
              <React.Fragment>
                <button
                  className={"continuebtn primary-btn"}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/covid/review");
                  }}
                >
                  Continue
                  <ArrowIcon
                    direction="right"
                    fill="#ffffff"
                    className={s.footer__nextPageIcon}
                  />
                </button>
                <button
                  className={"n-continuebtn " + s.footer__nextPageLink}
                  onClick={(e) => {
                    e.preventDefault();
                    // dispatch(
                    //   createAppointment(
                    //     {
                    //       date,
                    //       time,
                    //       start,
                    //       contact,
                    //       description,
                    //     },
                    //     profile.user.pk,
                    //     selectedClinic.pk,
                    //     selectedSymptoms
                    //   )
                    // );

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
                >
                  Submit Request Now
                  <ArrowIcon
                    direction="right"
                    fill="#ffffff"
                    className={s.footer__nextPageIcon}
                  />
                </button>
              </React.Fragment>
            ) : (
              ""
            )
          ) : (
            <BounceLoader />
          )}
        </div>
        {/* <Progress
          progressLevel={progressLevel}
          isAuthorized={isAuthorized}
          className={s.footer__progress_desktop}
        /> */}

        {hasSubmittedData && <Redirect to="/covid/confirmation" />}
      </div>
    </footer>
  );
};

export default Footer;
