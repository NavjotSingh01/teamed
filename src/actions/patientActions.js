import axios from "axios";
import { getUserProfile } from "./authActions";

// Dispatch methods
function requestOffices() {
  return {
    type: "REQUEST_OFFICES",
    isFetching: true,
    receivedOffices: false,
    offices: [],
    hasCreatedRequest: false,
  };
}

function receiveOffices(offices) {
  return {
    type: "RECEIVE_OFFICES",
    isFetching: false,
    receivedOffices: true,
    offices: offices,
  };
}

function submitOfficeRequest() {
  return {
    type: "REQUEST_OFFICE_SUBMIT",
    isSubmitting: true,
  };
}

function submitOfficeReceive(profile) {
  return {
    type: "RECEIVE_OFFICE_SUBMIT",
    isSubmitting: false,
    profile: profile,
  };
}

function requestCreateOfficeRequest() {
  return {
    type: "REQUEST_CREATE_OFFICE_REQUEST",
    isCreatingRequest: true,
    hasCreatedRequest: false,
    createOfficeErrorMessage: "",
  };
}

function receiveCreateOfficeRequest() {
  return {
    type: "RECEIVE_CREATE_OFFICE_REQUEST",
    isCreatingRequest: false,
    hasCreatedRequest: true,
  };
}

function errorCreateOfficeRequest(err) {
  return {
    type: "ERROR_CREATE_OFFICE_REQUEST",
    isCreatingRequest: false,
    createOfficeErrorMessage: err,
  };
}

// Actions before dispatch
export function getDoctors() {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/offices/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestOffices());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveOffices(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function submitDoctor(patient, office) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "patch",
    url: `${process.env.REACT_APP_DEV_API}/update_user/${patient}/`,
    data: {
      user: {
        has_selected_office: true,
        office: office,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(submitOfficeRequest());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(submitOfficeReceive(data));
      })
      .then(() => {
        dispatch(getUserProfile());
      })
      .catch((err) => console.log(err));
  };
}

export function createOfficeRequest(patient_pk, office_pk) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/create_patient_office_request/`,
    data: {
      patient: patient_pk,
      office: office_pk,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestCreateOfficeRequest());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveCreateOfficeRequest());
      })
      .catch((err) => {
        dispatch(errorCreateOfficeRequest(err.response.message));
      });
  };
}
