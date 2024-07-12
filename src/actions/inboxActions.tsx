import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { Action } from "redux";
import fileDownload from 'js-file-download'

export function openNewMessagePopup(openMessage: boolean) {
  return {
    type: "OPEN_NEW_MESSAGE_POPUP",
    openMessage,
  };
}

function requestGetPatientOffices() {
  return {
    type: "REQUEST_GET_PATIENT_OFFICES",
    isFetchingGetPatientOffices: true,
  };
}

function receiveGetPatientOffices(patientOffices: Array<any>) {
  return {
    type: "RECEIVE_GET_PATIENT_OFFICES",
    isFetchingGetPatientOffices: false,
    patientOffices,
  };
}

function errorGetPatientOffices() {
  return {
    type: "ERROR_GET_PATIENT_OFFICES",
    isFetchingGetPatientOffices: false,
  };
}

export function getPatientOffices(patientPk: number) {
  const token = localStorage.getItem("id_token");
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.REACT_APP_DEV_API}/patient-offices/${patientPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch: Dispatch<Action>) => {
    dispatch(requestGetPatientOffices());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetPatientOffices(data));
      })
      .catch((err) => {
        dispatch(errorGetPatientOffices());
      });
  };
}

function requestCreateMessageThread() {
  return {
    type: "REQUEST_CREATE_MESSAGE_THREAD",
    isCreatingMessageThread: true,
  };
}

function receiveCreateMessageThread() {
  return {
    type: "RECEIVE_CREATE_MESSAGE_THREAD",
    isCreatingMessageThread: false,
    hasCreatedMessageThread: true,
  };
}

function errorCreateMessageThread() {
  return {
    type: "ERROR_CREATE_MESSAGE_THREAD",
    isCreatingMessageThread: false,
    hasCreatedMessageThread: false,
  };
}

export function resetCreateMessageThread() {
  return {
    type: "RESET_CREATE_MESSAGE_THREAD",
    isCreatingMessageThread: false,
    hasCreatedMessageThread: false,
  };
}

export function createMessageThread(data: any, patientPk: number) {
  const token = localStorage.getItem("id_token");
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/messaging/patient-create-thread/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...data,
      patient: patientPk,
    },
  };

  return (dispatch: Dispatch<Action>) => {
    dispatch(requestCreateMessageThread());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveCreateMessageThread());
      })
      .catch((err) => {
        dispatch(errorCreateMessageThread());
      });
  };
}

function requestGetAllOfficeThreads() {
  return {
    type: "REQUEST_GET_ALL_OFFICE_THREADS",
    isRequestingGetAllOfficeThreads: true,
  };
}

function receiveGetAllOfficeThreads(officeThreads: any) {
  return {
    type: "RECEIVE_GET_ALL_OFFICE_THREADS",
    isRequestingGetAllOfficeThreads: false,
    officeThreads,
  };
}

function errorGetAllOfficeThreads() {
  return {
    type: "ERROR_GET_ALL_OFFICE_THREADS",
    isRequestingGetAllOfficeThreads: false,
  };
}

export function getAllOfficeThreads(patientPk: number) {
  const token = localStorage.getItem("id_token");
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.REACT_APP_DEV_API}/messaging/list_threads/${patientPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch: Dispatch<Action>) => {
    dispatch(requestGetAllOfficeThreads());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetAllOfficeThreads(data));
      })
      .catch((err) => {
        dispatch(errorGetAllOfficeThreads());
      });
  };
}

export function selectOfficeThread(selectedThread: number | null) {
  return {
    type: "SELECT_OFFICE_THREAD",
    selectedThread,
  };
}

function requestGetOfficeMessageThread() {
  return {
    type: "REQUEST_GET_OFFICE_MESSAGE_THREAD",
    isRequestingGetOfficeMessageThread: true,
  };
}

function receiveGetOfficeMessageThread(officeThread: any) {
  return {
    type: "RECEIVE_GET_OFFICE_MESSAGE_THREAD",
    isRequestingGetOfficeMessageThread: false,
    officeThread,
  };
}

function errorGetOfficeMessageThread() {
  return {
    type: "ERROR_GET_OFFICE_MESSAGE_THREAD",
    isRequestingGetOfficeMessageThread: true,
  };
}

export function getOfficeMessageThread(threadPk: number) {
  // Receive our authentication token that we get from logging in
  const token = localStorage.getItem("id_token");

  // Define our web request configuration

  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.REACT_APP_DEV_API}/messaging/message_thread/${threadPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch: Dispatch<Action>) => {
    dispatch(requestGetOfficeMessageThread());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetOfficeMessageThread(data));
      })
      .catch((err) => {
        dispatch(errorGetOfficeMessageThread());
      });
  };
}

export function addMessageToThread(message: any, officeThread: any) {
  return {
    type: "ADD_MESSAGE_TO_THREAD",
    message,
    officeThread,
  };
}

export function downloadFileAttachment(message: number) {
  const token = localStorage.getItem("id_token");

  // Define our web request configuration

  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.REACT_APP_DEV_API}/messaging/download-file-attachment/${message}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {

        fetch(data.url)
          .then(res => res.blob())
          .then(blob => {
            fileDownload(blob, data.file_name)
          })
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", data.file_name); //or any other extension
        // document.body.appendChild(link);
        // link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
