import React, { useState, useEffect } from "react";
import Map from "../../components/Map/Map";
import SoonestAppointments from "../../components/SoonestAppointments/SoonestAppointments";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import DateSelector from "../../components/DateSelector/DateSelector";
import Footer from "../../components/Footer/Footer";
import routes from "../../routes/routes";
import {
  getSymptomsList,
  getNextThreeDays,
  setNextThreeDays,
} from "../../actions/covidActions";
import moment from "moment";
import momentBusinessDays from "moment-business-days";

const DisclaimerPage: React.FC = () => {
  const [displayedComponent, setDisplayedComponent] = useState<string>(
    "soonest"
  );

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const dispatch = useDispatch();

  const selectedClinic = useSelector(
    (state: RootStateOrAny) => state.mainReducer.selectedClinic
  );

  const date = useSelector((state: RootStateOrAny) => state.mainReducer.date);
  const time = useSelector((state: RootStateOrAny) => state.mainReducer.time);

  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  useEffect(() => {}, []);

  const nextLink = (selectedClinic: any) => {
    if (selectedClinic.immunization_clinic) {
      return routes.SCHOOL_TESTING.path;
    } else if (selectedClinic.requires_student_number) {
      return routes.UNI_SCHOOL_TESTING.path;
    } else if (selectedClinic.vaccination_clinic) {
      return !primaryProfile.ohip_num
        ? routes.EXTRA_INFORMATION.path
        : routes.QUESTIONNAIRE_COMPLETE.path;
    } else {
      return selectedClinic.questions_enabled
        ? routes.IN_CONTACT_PAGE.path
        : routes.QUESTIONNAIRE_COMPLETE.path;
    }
  };

  return (
    <>
      <section className="main-bg-sectoin less-space middle-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-5 leftbar-common">
              <div className="cancel-wrapper updated-arrow"></div>
              <div className="o-location">
                <div className="locationmap">
                  <Map chosenClinic={selectedClinic} size="sm" />
                </div>
                <h5>{selectedClinic.address}.</h5>
                <h2>{selectedClinic.name}</h2>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-7">
              <div className="disclaimer">
                <h1>Disclaimer:</h1>
                <p>{selectedClinic.disclaimer}</p>
                <div className="accept-disclaimer">
                  <input
                    id="check1"
                    className="checkbox-custom"
                    name="check1"
                    type="checkbox"
                    onChange={(e) => setAcceptTerms(!acceptTerms)}
                  />
                  <label htmlFor="check1" className="checkbox-custom-label">
                    <span>I accept that I have read the above disclaimer</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer
        nextLink={nextLink(selectedClinic)}
        prevLinkTitle="Select Clinic"
        nextLinkTitle="Next Step"
        isAuthorized={false}
        progressLevel={45}
        hideNextStep={acceptTerms}
      />
    </>
  );
};

export default DisclaimerPage;
