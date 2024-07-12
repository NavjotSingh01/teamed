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
  setGrade,
} from "../../actions/covidActions";
import { Link } from "react-router-dom";
const AttendingSchool: React.FC = () => {
  const dispatch = useDispatch();
  const symptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.symptoms
  );
  const selectedSymptoms = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedSymptoms
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

  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );

  const grade = useSelector((state: RootStateOrAny) => state.mainReducer.grade);

  const nextLink = (selectedClinic: any) => {
    if (selectedClinic.immunization_clinic) {
      return routes.IMMUNIZATION_PAGE.path;
    } else {
      return routes.SYMPTOMATIC_TESTING.path;
    }
  };

  return (
    <>
      <div className="container">
        <div className={s.symptoms}>
          <div className={s.symptoms__content}>
            {selectedClinic.immunization_clinic && selectedClinic.grade_8 ? (
              <h2>
                Is {primaryProfile.first_name} {primaryProfile.last_name}{" "}
                currently attending Grade 7 or Grade 8?
              </h2>
            ) : selectedClinic.immunization_clinic ? (
              <h2>
                Is {primaryProfile.first_name} {primaryProfile.last_name}{" "}
                currently attending Grade 7?
              </h2>
            ) : (
              <h2>
                Is {primaryProfile.first_name} {primaryProfile.last_name}{" "}
                physically attending school or daycare?
              </h2>
            )}
          </div>
          <div className={s.symptoms__content}>
            <React.Fragment>
              <input
                id="yes"
                type="radio"
                name="required_testing"
                value="yes"
                defaultChecked={schoolTesting ? true : false}
              />
              <label
                htmlFor="yes"
                onClick={() => dispatch(setSchoolTesting(true))}
              >
                Yes
              </label>
              {schoolTesting && (
                <div style={{ marginBottom: "10px", marginLeft: "15px" }}>
                  <input
                    type="text"
                    onChange={(e) => {
                      dispatch(setSchoolTestingDescription(e.target.value));
                    }}
                    placeholder="What city are you in?"
                    className="form-control"
                    defaultValue={schoolTestingDescription}
                    style={{ marginBottom: "10px" }}
                  />
                  {selectedClinic.grade_8 && (
                    <div style={{ marginBottom: "10px" }}>
                      <p style={{ marginBottom: "10px" }}>
                        Please select the grade {primaryProfile.first_name}{" "}
                        {primaryProfile.last_name} is attending.
                      </p>
                      <input
                        id="grade7"
                        type="radio"
                        name="grade"
                        value="grade7"
                        defaultChecked={grade === "grade 7" ? true : false}
                      />
                      <label
                        htmlFor="grade7"
                        onClick={() => dispatch(setGrade("grade 7"))}
                      >
                        Grade 7
                      </label>
                      <input
                        id="grade8"
                        type="radio"
                        name="grade"
                        value="grade8"
                        defaultChecked={grade === "grade 8" ? true : false}
                      />
                      <label
                        htmlFor="grade8"
                        onClick={() => dispatch(setGrade("grade 8"))}
                      >
                        Grade 8
                      </label>
                    </div>
                  )}
                  <input
                    type="text"
                    onChange={(e) => {
                      dispatch(setSchoolTestingSchool(e.target.value));
                    }}
                    placeholder="What school do you attend?"
                    className="form-control"
                    defaultValue={school}
                  />
                </div>
              )}
              <input
                id="no"
                type="radio"
                name="required_testing"
                value="no"
                defaultChecked={schoolTesting == false ? true : false}
              />
              <label
                htmlFor="no"
                onClick={() => {
                  dispatch(setSchoolTesting(false));
                  dispatch(setSchoolTestingDescription(""));
                }}
                defaultChecked={schoolTesting}
              >
                No
              </label>
            </React.Fragment>
            {selectedClinic.only_students && schoolTesting == false && (
              <p>
                This clinic is requiring only students that are physically
                attending school be tested. If you meant to register a
                dependent,{" "}
                <Link to={"/covid/add-dependant/"}>
                  click here to register another dependent instead.
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer
        isAuthorized={false}
        prevLinkTitle="Go Back"
        nextLink={nextLink(selectedClinic)}
        nextLinkTitle="Next"
        progressLevel={75}
        hideNextStep={
          schoolTesting == false && !selectedClinic.only_students
            ? true
            : schoolTesting == true &&
              schoolTestingDescription.length > 0 &&
              school.length > 0
            ? true
            : false
        }
      />
    </>
  );
};

export default AttendingSchool;
