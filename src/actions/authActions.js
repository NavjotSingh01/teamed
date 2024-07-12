import axios from "axios";
import { date } from "yup";

// LOG IN USERS

export const requestLogin = (creds) => {
  return {
    type: "LOGIN_USER",
    isFetching: true,
    isAuthenticating: false,
    creds,
  };
};

export function selectPrimaryProfile(primaryProfile) {
  return {
    type: "SELECT_PRIMARY_PROFILE",
    primaryProfile,
  };
}

function receiveLogin(email) {
  return {
    type: "LOGIN_SUCCESS",
    isFetching: false,
    isAuthenticated: true,
    email: email,
  };
}

function receiveLoginError(error) {
  return {
    type: "LOGIN_FAILURE",
    isFetching: false,
    isAuthenticated: false,
    error_message: error,
  };
}

function requestResetPassword() {
  return {
    type: "REQUEST_RESET_PASSWORD",
    isResettingPassword: true,
    confirmationMessage: "",
  };
}

function receiveResetPassword() {
  return {
    type: "RECEIVE_RESET_PASSWORD",
    isResettingPassword: false,
    confirmationMessage:
      "Password reset has been sent. Check your email for instructions.",
  };
}

export function errorResetPassword(message) {
  return {
    type: "RECEIVE_RESET_PASSWORD",
    isResettingPassword: false,
    confirmationMessage: message,
  };
}

function requestResetPasswordConfirm() {
  return {
    type: "REQUEST_RESET_PASSWORD_CONFIRM",
    isResettingPassword: true,
    confirmationMessage: "",
  };
}

function receiveResetPasswordConfirm() {
  return {
    type: "RECEIVE_RESET_PASSWORD_CONFIRM",
    isResettingPassword: false,
    confirmationMessage:
      "Your password was reset. Please login to start using Corigan.",
  };
}

function requestUpdatePatientOHIP() {
  return {
    type: "REQUEST_UPDATE_PATIENT_OHIP",
    isUpdatingPatient: true,
    updatePatientMessage: "",
  };
}

function receiveUpdatePatientOHIP() {
  return {
    type: "RECEIVE_UPDATE_PATIENT_OHIP",
    isUpdatingPatient: false,
    updatePatientMessage: "We have successfully updated your information.",
  };
}

function errorUpdatePatientOHIP(errorMessage) {
  return {
    type: "ERROR_UPDATE_PATIENT_OHIP",
    isUpdatingPatient: false,
    updatePatientMessage: `Error updating your info: ${errorMessage}`,
  };
}

export function userLogout() {
  return {
    type: "USER_LOGOUT",
  };
}

function requestLogout() {
  return {
    type: "LOGOUT_REQUEST",
    isFetching: true,
    isAuthenticated: true,
  };
}

function receiveLogout() {
  return {
    type: "LOGOUT_SUCCESS",
    isFetching: false,
    isAuthenticated: false,
    profile: {},
  };
}

function requestSignup(creds) {
  return {
    type: "SIGNUP_REQUEST",
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveSignup() {
  return {
    type: "SIGNUP_RECEIVE",
    isFetching: false,
    isAuthenticated: false,
    hasSignedUp: true,
  };
}

export function receiveSignupError(error) {
  return {
    type: "SIGNUP_ERROR",
    isFetching: false,
    isAuthenticated: false,
    signUpErrorMessage: error,
  };
}

function requestPatientProfile() {
  return {
    type: "PATIENT_PROFILE_REQUEST",
    isFetching: true,
    isAuthorized: true,
  };
}
function receivePatientProfile(data) {
  return {
    type: "PATIENT_PROFILE_RECEIVE",
    isFetching: false,
    isAuthorized: true,
    profile: data,
  };
}

function requestOfficeRequests() {
  return {
    type: "REQUEST_OFFICE_REQUESTS",
  };
}

function receiveOfficeRequests(officeRequests) {
  return {
    type: "RECEIVE_OFFICE_REQUESTS",
    officeRequests,
  };
}

// SIGN UP USERS

export function resetPassword(email) {
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/api/password_reset/`,
    data: {
      email: email,
    },
  };

  return (dispatch) => {
    dispatch(requestResetPassword());
    return axios(config)
      .then((res) => {
        dispatch(receiveResetPassword());
      })
      .catch((err) => {
        if (err.response.email) {
          dispatch(errorResetPassword(err.response.email[0]));
        } else {
          dispatch(errorResetPassword("Could not reset email."));
        }
      });
  };
}

export function resetPasswordConfirm(password, token) {
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/api/password_reset/confirm/`,
    data: {
      password: password,
      token: token,
    },
  };

  return (dispatch) => {
    dispatch(requestResetPasswordConfirm());
    return axios(config)
      .then((res) => {
        dispatch(receiveResetPasswordConfirm());
      })
      .catch((err) => {
        if (err.response.email) {
          dispatch(errorResetPassword(err.response.email[0]));
        } else {
          dispatch(errorResetPassword("Could not reset email."));
        }
      });
  };
}

export function setTermsAndConditions(action) {
  return {
    type: "SET_TERMS_AND_CONDITIONS",
    termsAndCondition: action,
  };
}

export function loginUser(creds) {
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/login/`,
    data: {
      email: `${creds.email}`,
      password: `${creds.password}`,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        if (data.terms) {
          dispatch(setTermsAndConditions(true));
          dispatch(
            receiveLoginError(
              "We have changed our terms and services. Please review before continuing"
            )
          );
        } else {
          if (!data.success) {
            dispatch(receiveLoginError("something wrong happened. Try again"));
          } else {
            localStorage.setItem("id_token", data.token);
            dispatch(getUserProfile());
            dispatch(receiveLogin(data.email));
          }
        }
      })
      .catch((err) => {
        if (err.response.data) {
          dispatch(receiveLoginError(err.response.data.non_field_errors[0]));
        }
      });
  };
}
export function loginUserAndAcceptTerms(creds) {
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/login-and-accept/`,
    data: {
      email: `${creds.email}`,
      password: `${creds.password}`,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        if (data.terms) {
          dispatch(setTermsAndConditions(true));
          dispatch(
            receiveLoginError(
              "We have changed our terms and services. Please review before continuing"
            )
          );
        } else {
          if (!data.success) {
            dispatch(receiveLoginError("something wrong happened. Try again"));
          } else {
            localStorage.setItem("id_token", data.token);
            dispatch(getUserProfile());
            dispatch(receiveLogin(data.email));
          }
        }
      })
      .catch((err) => {
        dispatch(receiveLoginError(err.response.data.non_field_errors[0]));
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("id_token");
    dispatch(receiveLogout());
  };
}

export function signUpUser(userInfo) {
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/signup/`,
    data: {
      email: userInfo.email,
      password: userInfo.password,
      is_patient: true,
      patient_info: {
        preferred_name: userInfo.preferred_name,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        gender: userInfo.gender,
        date_of_birth: userInfo.date_of_birth,
        phone: userInfo.phone,
        ohip_num: userInfo.ohip_num,
        ohip_vc: userInfo.ohip_vc,
        address: userInfo.address,
        city: userInfo.city,
        doctor: userInfo.doctor,
        postal_code: userInfo.postal_code,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (dispatch) => {
    dispatch(requestSignup(userInfo));
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        if (!data.success) {
          dispatch(receiveSignupError("Sign Up failed"));
          return Promise.reject();
        } else {
          console.log(data);
          dispatch(receiveSignup());
          dispatch(readTermsAndConditions(data.pk));
        }
      })
      .catch((err) => {
        if (err.response.data.email) {
          dispatch(receiveSignupError(`Email: ${err.response.data.email}`));
        } else if (err.response.data.office) {
          dispatch(receiveSignupError("Must select an office to join."));
        } else if (err.response.data.password) {
          dispatch(
            receiveSignupError("Password is invalid. Please enter new one.")
          );
        } else if (err.response.data.patient_info.date_of_birth) {
          dispatch(
            receiveSignupError(
              "Invalid Date of Birth. Please make sure it is formatted like: 'YYYY-MM-DD."
            )
          );
        } else if (err.response.data.patient_info.phone) {
          dispatch(receiveSignupError("Invalid Phone entry"));
        } else {
          dispatch(
            receiveSignupError(
              `An error occurred when trying to sign up: ${err.response}`
            )
          );
        }
      });
  };
}

export function readTermsAndConditions(userPk) {
  let config = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/accepted_terms/`,
    data: {
      user: userPk,
      terms_and_condition: 1.0,
    },
  };

  return (dispatch) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => console.log(data));
  };
}

export function getUserProfile() {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/current_patient/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestPatientProfile());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receivePatientProfile(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(userLogout());
      });
  };
}

export function getOfficeRequests(patientPk) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/patient_office_requests/${patientPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestOfficeRequests());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        dispatch(receiveOfficeRequests(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updatePatientOHIPAddress(
  ohip_num,
  ohip_vc,
  address,
  patient_pk
) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "patch",
    url: `${process.env.REACT_APP_DEV_API}/update_patient/${patient_pk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ohip_num,
      ohip_vc,
      address,
    },
  };
  return (dispatch) => {
    dispatch(requestUpdatePatientOHIP());
    return axios(config)
      .then((res) => {
        dispatch(receiveUpdatePatientOHIP());
        dispatch(getUserProfile());
      })
      .catch((err) => {
        dispatch(errorUpdatePatientOHIP(err.response));
      });
  };
}

function requestCreateDependant() {
  return {
    type: "REQUEST_CREATE_DEPENDANT",
    isCreatingDependant: true,
    hasCreatedDependant: false,
  };
}

function receiveCreateDependant() {
  return {
    type: "RECEIVE_CREATE_DEPENDANT",
    isCreatingDependant: false,
    hasCreatedDependant: true,
  };
}

function errorCreateDependant() {
  return {
    type: "ERROR_CREATE_DEPENDANT",
    isCreatingDependant: false,
    hasCreatedDependant: false,
  };
}

export function resetCreateDependant() {
  return {
    type: "RESET_CREATE_DEPENDANT",
    isCreatingDependant: false,
    hasCreatedDependant: false,
  };
}

export function createDependant(data, userPk) {
  const token = localStorage.getItem("id_token");
  console.log(userPk);
  let config = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/create-dependant/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      preferred_name: data.preferred_name,
      date_of_birth: data.date_of_birth,
      phone: null,
      address: data.address,
      gender: data.gender,
      city: data.city,
      postal_code: data.postal_code,
      ohip_num: data.ohip_num,
      ohip_vc: data.ohip_vc,
      doctor: data.doctor,
      is_primary: false,
      user: userPk,
    },
  };

  return (dispatch) => {
    dispatch(requestCreateDependant());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveCreateDependant());
      })
      .catch((err) => {
        dispatch(errorCreateDependant());
      });
  };
}

function requestUpdateProfile() {
  return {
    type: "REQUEST_UPDATE_PROFILE",
    isUpdatingProfile: true,
    errorUpdatingProfile: false,
  };
}

function receiveUpdateProfile() {
  return {
    type: "RECEIVE_UPDATE_PROFILE",
    isUpdatingProfile: false,
    hasUpdatedProfile: true,
  };
}
function errorUpdateProfile() {
  return {
    type: "ERROR_UPDATE_PROFILE",
    isUpdatingProfile: false,
    errorUpdatingProfile: true,
  };
}

export function resetUpdateProfile() {
  return {
    type: "RESET_UPDATE_PROFILE",
    hasUpdatedProfile: false,
    errorUpdatingProfile: false,
  };
}

export function updateProfile(data, patientPk) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "PATCH",
    url: `${process.env.REACT_APP_DEV_API}/update-patient-profile/${patientPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  return (dispatch) => {
    dispatch(requestUpdateProfile());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveUpdateProfile());
      })
      .catch((err) => {
        dispatch(errorUpdateProfile());
        console.log(err);
      });
  };
}

export function changeUserPassword(password) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "PATCH",
    url: `${process.env.REACT_APP_DEV_API}/update-password/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      password,
    },
  };
}
