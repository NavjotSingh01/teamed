import axios from "axios";

export function selectAppointmentPk(appointmentPk) {
  return {
    type: "SELECT_APPOINTMENT_PK",
    appointmentPk,
  };
}

export function resetAppointmentPk() {
  return {
    type: "RESET_APPOINTMENT_PK",
  };
}

function setWaitingList(number) {
  return {
    type: "SET_WAITING_LIST",
    number,
  };
}

function setWaitingPosition(number) {
  return {
    type: "SET_WAITING_POSITION",
    number,
  };
}

function requestGetSymptoms() {
  return {
    type: "REQUEST_GET_SYMPTOMS",
    isFetchingSymptoms: true,
  };
}

function receiveGetSymptoms(symptoms) {
  return {
    type: "RECEIVE_GET_SYMPTOMS",
    isFetchingSymptoms: false,
    symptoms: symptoms,
  };
}

function requestOffice() {
  return {
    type: "REQUEST_OFFICE",
    isFetchingOffice: true,
    officeHasLoaded: false,
    office: {},
  };
}

function receiveOffice(office) {
  return {
    type: "RECEIVE_OFFICE",
    isFetchingOffice: false,
    officeHasLoaded: true,
    office,
  };
}

function requestCreateTriage() {
  return {
    type: "REQUEST_CREATE_TRIAGE",
    isCreatingTriage: true,
  };
}

function receiveCreateTriage() {
  return {
    type: "RECEIVE_CREATE_TRIAGE",
    isCreatingTriage: false,
    hasCreatedTriage: true,
  };
}

function requestGetTriageQuestions() {
  return {
    type: "REQUEST_GET_TRIAGE_QUESTIONS",
    fetchingTriageQuestions: true,
  };
}

function receiveGetTriageQuestions(triageQuestions) {
  return {
    type: "RECEIVE_GET_TRIAGE_QUESTIONS",
    fetchingTriageQuestions: false,
    triageQuestions,
  };
}

export function getWaitingPosition(number) {
  return (dispatch) => {
    dispatch(setWaitingPosition(number));
  };
}

export function getWaitingList(number) {
  return (dispatch) => {
    dispatch(setWaitingList(number));
  };
}

export function getSymptoms() {
  const token = localStorage.getItem("id_token");

  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/symptoms/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestGetSymptoms());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetSymptoms(data));
      })
      .catch((err) => console.log(err));
  };
}

export function getCurrentOffice(slug) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/office/${slug}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(requestOffice());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveOffice(data));
      })
      .catch((err) => {
        console.log(err);
        // dispatch
      });
  };
}

export function createTriage(details, symptomId, patientPK, officePK) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/appointments/triage/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      patient_notes: details,
      symptoms: symptomId,
      patient: patientPK,
      office: officePK,
    },
  };

  return (dispatch) => {
    dispatch(requestCreateTriage());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveCreateTriage());
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

export function resetTriage() {
  return {
    type: "RESET_TRIAGE",
  };
}

export function getTriageQuestions(symptom) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/triage-questions/${symptom}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestGetTriageQuestions());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetTriageQuestions(data));
      })
      .catch((err) => console.log(err));
  };
}

function requestGetPatientAppointments() {
  return {
    type: "REQUEST_GET_PATIENT_APPOINTMENTS",
    isFetchingAppointments: true,
  };
}

function receiveGetPatientAppointments(appointments) {
  return {
    type: "RECEIVE_GET_PATIENT_APPOINTMENTS",
    isFetchingAppointments: false,
    appointments,
  };
}

function errorGetPatientAppointments() {
  return {
    type: "ERROR_GET_PATIENT_APPOINTMENTS",
    isFetchingAppointments: false,
  };
}

export function getPatientAppointments(userPk) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/patient-appointments/${userPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestGetPatientAppointments());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetPatientAppointments(data));
      })
      .catch((err) => {
        dispatch(errorGetPatientAppointments(err));
      });
  };
}

export function getPatientDeletedAppointments(userPk) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/patient-deleted-appointments/${userPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestGetPatientDeletedAppointments());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetPatientDeletedAppointments(data));
      })
      .catch((err) => {
        dispatch(errorGetPatientDeletedAppointments(err));
      });
  };
}

function requestGetPatientDeletedAppointments() {
  return {
    type: "REQUEST_GET_PATIENT_DELETED_APPOINTMENTS",
    isFetchingAppointments: true,
  };
}

function receiveGetPatientDeletedAppointments(deletedAppointments) {
  return {
    type: "RECEIVE_GET_PATIENT_DELETED_APPOINTMENTS",
    isFetchingAppointments: false,
    deletedAppointments,
  };
}

function errorGetPatientDeletedAppointments() {
  return {
    type: "ERROR_GET_PATIENT_DELETED_APPOINTMENTS",
    isFetchingAppointments: false,
  };
}

export function selectDeletedAppointment(deletedAppointment) {
  return {
    type: "SELECT_DELETED_APPOINTMENT",
    selectedDeletedAppointment: deletedAppointment,
  };
}

function requestDeleteAppointment() {
  return {
    type: "REQUEST_DELETE_APPOINTMENT",
    isDeletingAppointment: true,
  };
}

function receiveDeleteAppointment() {
  return {
    type: "RECEIVE_DELETE_APPOINTMENT",
    isDeletingAppointment: false,
    hasDeletedAppointment: true,
  };
}

function errorDeleteAppointment() {
  return {
    type: "ERROR_DELETE_APPOINTMENT",
    isDeletingAppointment: false,
    hasDeletedAppointment: false,
  };
}

function resetDeleteAppointment() {
  return {
    type: "RESET_DELETE_APPOINTMENT",
    isDeletingAppointment: false,
    hasDeletedAppointment: false,
  };
}

export function deleteAppointment(pk) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "DELETE",
    url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_delete/${pk}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      sendEmail: true,
    },
  };

  return (dispatch) => {
    dispatch(requestDeleteAppointment());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveDeleteAppointment());
      });
  };
}

export function selectAppointment(appointment) {
  return {
    type: "SELECT_APPOINTMENT",
    selectedAppointment: appointment,
  };
}

// This function enables true if we want to go back to "My Offices" rather than Check-In
export function myOfficesToggle(myOffices) {
  return {
    type: "MY_OFFICES_TOGGLE",
    myOffices,
  };
}
