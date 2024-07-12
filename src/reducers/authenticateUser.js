import axios from "axios";
// localStorage.removeItem("id_token");
localStorage.removeItem("chat_token");

if (localStorage.getItem("id_token")) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/api-token-verify/`,
    data: {
      token,
    },
  };

  axios(config)
    .then((res) => {
      return;
    })
    .catch((err) => {
      localStorage.removeItem("id_token");
    });
}

const initialState = {
  isFetching: false,
  isInitialFetching: true,
  isAuthenticated: localStorage.getItem("id_token") ? true : false,
  profile: {},
  profileReceived: false,
  signUpErrorMessage: "",
  errorMessage: "",
  isResettingPassword: false,
  confirmationMessage: "",
  isUpdatingPatient: false,
  updatePatientMessage: "",
  officeRequests: [],
  primaryProfile: null,
  isCreatingDependant: false,
  hasCreatedDependant: false,
  termsAndCondition: false,
  isUpdatingProfile: false,
  hasUpdatedProfile: false,
};

const authenticateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TERMS_AND_CONDITIONS":
      return Object.assign({}, state, {
        termsAndCondition: action.termsAndCondition,
      });
    case "LOGIN_USER":
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds.username,
      });
    case "REQUEST_CREATE_DEPENDANT":
      return Object.assign({}, state, {
        isCreatingDependant: true,
        hasCreatedDependant: false,
      });
    case "RECEIVE_CREATE_DEPENDANT":
      return Object.assign({}, state, {
        isCreatingDependant: false,
        hasCreatedDependant: true,
      });
    case "ERROR_CREATE_DEPENDANT":
      return Object.assign({}, state, {
        isCreatingDependant: false,
        hasCreatedDependant: false,
      });
    case "RESET_CREATE_DEPENDANT":
      return Object.assign({}, state, {
        isCreatingDependant: false,
        hasCreatedDependant: false,
      });
    case "SELECT_PRIMARY_PROFILE":
      return Object.assign({}, state, {
        primaryProfile: action.primaryProfile,
      });
    case "LOGIN_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        email: action.email,
      });
    case "REQUEST_RESET_PASSWORD":
      return Object.assign({}, state, {
        isResettingPassword: true,
        confirmationMessage: "",
      });
    case "RECEIVE_RESET_PASSWORD":
      return Object.assign({}, state, {
        isResettingPassword: false,
        confirmationMessage: action.confirmationMessage,
      });
    case "REQUEST_RESET_PASSWORD_CONFIRM":
      return Object.assign({}, state, {
        isResettingPassword: true,
        confirmationMessage: "",
      });
    case "RECEIVE_RESET_PASSWORD_CONFIRM":
      return Object.assign({}, state, {
        isResettingPassword: false,
        confirmationMessage: action.confirmationMessage,
      });
    case "ERROR_RESET_PASSWORD":
      return Object.assign({}, state, {
        isResettingPassword: false,
        confirmationMessage: action.confirmationMessage,
      });
    case "LOGOUT_REQUEST":
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
      });
    case "LOGOUT_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        profileReceived: false,
      });
    case "USER_LOGOUT":
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        profileReceived: false,
      });
    case "LOGIN_FAILURE":
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error_message,
      });
    case "REQUEST_UPDATE_PATIENT_OHIP":
      return Object.assign({}, state, {
        isUpdatingPatient: true,
        updatePatientMessage: "",
      });
    case "RECEIVE_UPDATE_PATIENT_OHIP":
      return Object.assign({}, state, {
        isUpdatingPatient: false,
        updatePatientMessage: action.updatePatientMessage,
      });
    case "ERROR_UPDATE_PATIENT_OHIP":
      return Object.assign({}, state, {
        isUpdatingPatient: false,
        updatePatientMessage: action.updatePatientMessage,
      });
    case "SIGNUP_REQUEST":
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds.email,
      });
    case "SIGNUP_ERROR":
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        signUpErrorMessage: action.signUpErrorMessage,
      });
    case "SIGNUP_RECEIVE":
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        hasSignedUp: true,
      });
    case "REQUEST_OFFICE_REQUESTS":
      return Object.assign({}, state, {});
    case "RECEIVE_OFFICE_REQUESTS":
      return Object.assign({}, state, {
        officeRequests: action.officeRequests,
      });
    case "PATIENT_PROFILE_REQUEST":
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
      });
    case "PATIENT_PROFILE_RECEIVE":
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        isInitialFetching: false,
        profile: action.profile,
        profileReceived: true,
      });
    case "REQUEST_UPDATE_PROFILE":
      return Object.assign({}, state, {
        isUpdatingProfile: true,
        errorUpdatingProfile: false,
      });
    case "RECEIVE_UPDATE_PROFILE":
      return Object.assign({}, state, {
        isUpdatingProfile: false,
        hasUpdatedProfile: true,
      });
    case "ERROR_UPDATE_PROFILE":
      return Object.assign({}, state, {
        isUpdatingProfile: false,
        errorUpdatingProfile: true,
      });
    case "RESET_UPDATE_PROFILE":
      return Object.assign({}, state, {
        hasUpdatedProfile: false,
        errorUpdatingProfile: false,
      });
    default:
      return state;
  }
};

export default authenticateUserReducer;
