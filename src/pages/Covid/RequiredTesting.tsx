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
} from "../../actions/covidActions";

const RequiredTesting: React.FC = () => {
  const dispatch = useDispatch();
  const symptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.symptoms
  );
  const selectedSymptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedSymptoms
  );
  const requiredTesting = useSelector(
    (state: RootStateOrAny) => state.mainReducer.requiredTesting
  );
  const requiredTestingDescription = useSelector(
    (state: RootStateOrAny) => state.mainReducer.requiredTestingDescription
  );

  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            <h2>Are you here for required testing?</h2>
          </div>
          <div className={s.symptoms__content}>
            <React.Fragment>
              <input
                id="yes"
                type="radio"
                name="required_testing"
                value="yes"
                defaultChecked={requiredTesting ? true : false}
              />
              <label
                htmlFor="yes"
                onClick={() => dispatch(setRequiredTesting(true))}
              >
                Yes
              </label>
              {requiredTesting && (
                <input
                  type="text"
                  onChange={(e) => {
                    dispatch(setRequiredTestingDescription(e.target.value));
                  }}
                  className="form-control"
                  defaultValue={requiredTestingDescription}
                  placeholder="Who requires you to get testing? (e.g Work, School, Nursing Homes...)"
                />
              )}
              <input
                id="no"
                type="radio"
                name="required_testing"
                value="no"
                defaultChecked={requiredTesting === false ? true : false}
              />
              <label
                htmlFor="no"
                onClick={() => {
                  dispatch(setRequiredTesting(false));
                  dispatch(setRequiredTestingDescription(""));
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
        nextLink={routes.SCHOOL_TESTING.path}
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={
          requiredTesting == false
            ? true
            : requiredTesting == true && requiredTestingDescription.length > 0
            ? true
            : false
        }
      />
    </>
  );
};

export default RequiredTesting;
