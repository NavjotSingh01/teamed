import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import routes from "../../routes/routes";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import s from "../../assets/styles/PagesStyles.module.scss";
import {
  setGreenShieldNumber,
  setStudentCardNumber,
  setInfoLabel,
  setInfoValue,
} from "../../actions/covidActions";
import { Link } from "react-router-dom";

const ExtraInformation: React.FC = () => {
  const dispatch = useDispatch();

  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );

  const infoValue = useSelector(
    (state: RootStateOrAny) => state.mainReducer.infoValue
  );

  const infoLabel = useSelector(
    (state: RootStateOrAny) => state.mainReducer.infoLabel
  );
  const greenShieldNumber = useSelector(
    (state: RootStateOrAny) => state.mainReducer.greenShieldNumber
  );

  const nextLink = (selectedClinic: any) => {
    if (selectedClinic.immunization_clinic) {
      return routes.IMMUNIZATION_PAGE.path;
    } else if (selectedClinic.requires_student_number) {
      return routes.IN_CONTACT_PAGE.path;
    } else if (selectedClinic.vaccination_clinic) {
      return routes.QUESTIONNAIRE_COMPLETE.path;
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
              <label className="questionnaire-label" htmlFor="info-label">
                Choose Identifier
              </label>
              <select
                name="info-label"
                id="info-label"
                className="form-control"
                defaultValue={infoLabel}
                onChange={(e) => dispatch(setInfoLabel(e.target.value))}
              >
                <option value="">Please select option.</option>
                <option value="Birth Certificate">Birth Certificate.</option>
                <option value="Employee ID">Employee ID.</option>
                <option value="First Nation">First Nation.</option>
                <option value="Passport">Passport.</option>
                <option value="MRN">MRN.</option>
                <option value="Out of Province Health Card #">
                  Out of Province Health Card #.
                </option>
                <option value="Driver's License">Driver's License.</option>
              </select>
              <label className="questionnaire-label" htmlFor="info-value">
                Identifier #
              </label>
              <input
                type="text"
                id="info-value"
                onChange={(e) => {
                  dispatch(setInfoValue(e.target.value));
                }}
                placeholder="Enter ID here"
                className="form-control"
                defaultValue={infoValue}
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
        hideNextStep={!infoLabel || !infoValue ? false : true}
      />
    </>
  );
};

export default ExtraInformation;
