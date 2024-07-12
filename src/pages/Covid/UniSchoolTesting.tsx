import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import routes from "../../routes/routes";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import s from "../../assets/styles/PagesStyles.module.scss";
import {
  setGreenShieldNumber,
  setStudentCardNumber,
} from "../../actions/covidActions";
import { Link } from "react-router-dom";

const UniSchoolTesting: React.FC = () => {
  const dispatch = useDispatch();

  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );

  const studentCardNumber = useSelector(
    (state: RootStateOrAny) => state.mainReducer.studentCardNumber
  );
  const greenShieldNumber = useSelector(
    (state: RootStateOrAny) => state.mainReducer.greenShieldNumber
  );

  const nextLink = (selectedClinic: any) => {
    if (selectedClinic.immunization_clinic) {
      return routes.IMMUNIZATION_PAGE.path;
    } else if (selectedClinic.requires_student_number) {
      return routes.IN_CONTACT_PAGE.path;
    } else {
      return routes.SYMPTOMATIC_TESTING.path;
    }
  };

  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>Please enter your student number and green shield number.</h2>
          </div>
          <div className={s.symptoms__content}>
            <React.Fragment>
              <label className="questionnaire-label" htmlFor="student-card">
                Student Number
              </label>
              <input
                type="text"
                id="student-card"
                onChange={(e) => {
                  dispatch(setStudentCardNumber(e.target.value));
                }}
                placeholder="Student Number"
                className="form-control"
                defaultValue={studentCardNumber}
              />
              <label
                className="questionnaire-label"
                htmlFor="greenshield-number"
              >
                Green Shield Number
              </label>
              <input
                type="text"
                id="greenshield-number"
                onChange={(e) => {
                  dispatch(setGreenShieldNumber(e.target.value));
                }}
                placeholder="Green Shield Number"
                className="form-control"
                defaultValue={greenShieldNumber}
              />
            </React.Fragment>
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={nextLink(selectedClinic)}
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={!studentCardNumber ? false : true}
      />
    </>
  );
};

export default UniSchoolTesting;
