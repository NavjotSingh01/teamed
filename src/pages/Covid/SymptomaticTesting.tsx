import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import routes from "../../routes/routes";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import s from "../../assets/styles/PagesStyles.module.scss";
import {
  getSymptomsList,
  selectSymptom,
  removeSymptom,
  setRequiredTesting,
  setRequiredTestingDescription,
  setSchoolTesting,
  setSchoolTestingDescription,
  setSchoolTestingSchool,
  setSymptomatic,
} from "../../actions/covidActions";

const SymptomaticTesting: React.FC = () => {
  const dispatch = useDispatch();
  const symptomatic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.symptomatic
  );

  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>Are you symptomatic?</h2>
          </div>
          <div className={s.symptoms__content}>
            <React.Fragment>
              <input
                id="yes"
                type="radio"
                name="required_testing"
                value="yes"
                defaultChecked={symptomatic ? true : false}
              />
              <label
                htmlFor="yes"
                onClick={() => dispatch(setSymptomatic(true))}
              >
                Yes
              </label>

              <input
                id="no"
                type="radio"
                name="required_testing"
                defaultChecked={symptomatic == false ? true : false}
              />
              <label
                htmlFor="no"
                onClick={() => {
                  dispatch(setSymptomatic(false));
                }}
              >
                No
              </label>
            </React.Fragment>
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={
          symptomatic === true
            ? routes.SYMPTOMS_LIST_PAGE.path
            : routes.QUESTIONNAIRE_COMPLETE.path
        }
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={symptomatic === null ? false : true}
      />
    </>
  );
};

export default SymptomaticTesting;
