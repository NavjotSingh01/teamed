import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import OptionsPage from "../pages/OptionsPage";
import ProfilePage from "../pages/ProfilePage";
import SymptomsListPage from "../pages/SymptomsListPage";
import SymptomsTimelinePage from "../pages/SymptomsTimelinePage";
import ReviewPage from "../pages/ConfirmationPage";
import InContactPage from "../pages/InContactPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import Immunizations from "../pages/Immunizations";
import ExtraInformation from "../pages/Covid/ExtraInformation";

export default {
  SEARCH_PAGE: {
    path: "/covid-search/covid-search",
    component: SearchPage,
  },
  EXTRA_INFORMATION: {
    path: "/covid/extra-information",
    component: ExtraInformation,
  },
  OPTIONS_PAGE: {
    path: "/covid/options",
    component: OptionsPage,
  },
  BOOKING_HOME: {
    path: "/covid",
    component: OptionsPage,
  },
  DISCLAIMER_PAGE: {
    path: "/covid/disclaimer",
    component: OptionsPage,
  },
  IN_CONTACT_DESCRIPTION: {
    path: "/covid/in-contact-description",
    component: OptionsPage,
  },
  REQUIRED_TESTING: {
    path: "/covid/required-testing",
    component: OptionsPage,
  },
  SCHOOL_TESTING: {
    path: "/covid/school-testing",
    component: OptionsPage,
  },
  SYMPTOMATIC_TESTING: {
    path: "/covid/symptomatic",
    component: OptionsPage,
  },
  UNI_SCHOOL_TESTING: {
    path: "/covid/school-number",
    component: OptionsPage,
  },
  MEDICAL_CONDITIONS: {
    path: "/covid/medical-conditions",
    component: OptionsPage,
  },
  NUMBER_FEELING: {
    path: "/covid/number-feeling",
    component: OptionsPage,
  },
  QUESTIONNAIRE_COMPLETE: {
    path: "/covid/questionnaire-complete",
    component: OptionsPage,
  },
  ADD_DEPENDANT: {
    path: "/covid/add-dependant",
    component: OptionsPage,
  },
  PROFILE_PAGE: {
    path: "/covid/profile",
    component: ProfilePage,
  },
  SYMPTOMS_LIST_PAGE: {
    path: "/covid/symptoms-list",
    component: SymptomsListPage,
  },
  SYMPTOMS_TIMELINE_PAGE: {
    path: "/covid/symptoms-timeline",
    component: SymptomsTimelinePage,
  },
  IN_CONTACT_PAGE: {
    path: "/covid/in-contact",
    component: InContactPage,
  },
  REVIEW_PAGE: {
    path: "/covid/review",
    component: ReviewPage,
  },
  CONFIRMATION_PAGE: {
    path: "/covid/confirmation",
    component: ConfirmationPage,
  },
  IMMUNIZATION_PAGE: {
    path: "/covid/immunization",
    component: Immunizations,
  },
};
