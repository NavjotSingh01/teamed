import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import SearchPage from "../pages/SearchPage";
import OptionsPage from "../pages/OptionsPage";
import ProfilePage from "../pages/ProfilePage";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import SymptomsListPage from "../pages/SymptomsListPage";
import SymptomsTimelinePage from "../pages/SymptomsTimelinePage";
import InContactPage from "../pages/InContactPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import ReviewPage from "../pages/ReviewPage";
import BookingHome from "../pages/Covid/BookingHome";
import DisclaimerPage from "../pages/Covid/Disclaimer";
import RequiredTesting from "../pages/Covid/RequiredTesting";
import AttendingSchool from "../pages/Covid/AttendingSchool";
import SymptomaticTesting from "../pages/Covid/SymptomaticTesting";
import MedicalConditions from "../pages/Covid/MedicalConditions";
import UniSchoolTesting from "../pages/Covid/UniSchoolTesting";
import NumberSelect from "../pages/Covid/NumberSelect";
import QuestionnaireComplete from "../pages/Covid/QuestionnaireComplete";
import AddDependant from "../pages/Covid/AddDependant";
import { useHistory } from "react-router-dom";
import RefreshRoute from "./redirectroute.route";
import ExtraInformation from "../pages/Covid/ExtraInformation";
const Router: React.FC = () => {
  const primaryProfile = useSelector(
    (state: RootStateOrAny) => state.authenticateUser.primaryProfile
  );

  return (
    <Switch>
      <RefreshRoute
        exact
        path={routes.BOOKING_HOME.path}
        component={BookingHome}
        primaryProfile={primaryProfile}
      />

      <RefreshRoute
        exact
        path={routes.OPTIONS_PAGE.path}
        primaryProfile={primaryProfile}
        component={OptionsPage}
      />

      <RefreshRoute
        exact
        path={routes.PROFILE_PAGE.path}
        primaryProfile={primaryProfile}
      />

      <RefreshRoute
        exact
        path={routes.SYMPTOMS_LIST_PAGE.path}
        primaryProfile={primaryProfile}
        component={SymptomsListPage}
      />

      <RefreshRoute
        exact
        path={routes.SYMPTOMS_TIMELINE_PAGE.path}
        primaryProfile={primaryProfile}
        component={SymptomsTimelinePage}
      />

      <RefreshRoute
        exact
        path={routes.IN_CONTACT_PAGE.path}
        primaryProfile={primaryProfile}
        component={InContactPage}
      />
      <RefreshRoute
        exact
        path={routes.REVIEW_PAGE.path}
        primaryProfile={primaryProfile}
        component={ReviewPage}
      />

      <RefreshRoute
        exact
        path={routes.CONFIRMATION_PAGE.path}
        primaryProfile={primaryProfile}
        component={ConfirmationPage}
      />
      <RefreshRoute
        exact
        path={routes.EXTRA_INFORMATION.path}
        primaryProfile={primaryProfile}
        component={ExtraInformation}
      />

      <RefreshRoute
        exact
        path={routes.DISCLAIMER_PAGE.path}
        primaryProfile={primaryProfile}
        component={DisclaimerPage}
      />

      <RefreshRoute
        exact
        path={routes.REQUIRED_TESTING.path}
        primaryProfile={primaryProfile}
        component={RequiredTesting}
      />

      <RefreshRoute
        exact
        path={routes.SCHOOL_TESTING.path}
        primaryProfile={primaryProfile}
        component={AttendingSchool}
      />

      <RefreshRoute
        exact
        path={routes.SYMPTOMATIC_TESTING.path}
        primaryProfile={primaryProfile}
        component={SymptomaticTesting}
      />

      <RefreshRoute
        exact
        path={routes.MEDICAL_CONDITIONS.path}
        primaryProfile={primaryProfile}
        component={MedicalConditions}
      />

      <RefreshRoute
        exact
        path={routes.NUMBER_FEELING.path}
        primaryProfile={primaryProfile}
        component={NumberSelect}
      />

      <RefreshRoute
        exact
        path={routes.QUESTIONNAIRE_COMPLETE.path}
        primaryProfile={primaryProfile}
        component={QuestionnaireComplete}
      />

      <RefreshRoute
        exact
        path={routes.ADD_DEPENDANT.path}
        primaryProfile={primaryProfile}
        component={AddDependant}
      />
      <RefreshRoute
        exact
        path={routes.ADD_DEPENDANT.path}
        primaryProfile={primaryProfile}
        component={AddDependant}
      />
      <RefreshRoute
        exact
        path={routes.IMMUNIZATION_PAGE.path}
        primaryProfile={primaryProfile}
        component={routes.IMMUNIZATION_PAGE.component}
      />
      <RefreshRoute
        exact
        path={routes.UNI_SCHOOL_TESTING.path}
        primaryProfile={primaryProfile}
        component={UniSchoolTesting}
      />

      {/* <Redirect to={routes.HOME_PAGE.path} /> */}
    </Switch>
  );
};

export default Router;
