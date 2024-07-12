import { Dispatch } from "react";

import axios, { AxiosRequestConfig } from "axios";
import config from "../config";
import moment, { Moment } from "moment";
import { profile } from "console";
import { Action } from "redux";

const mbxClient = require("@mapbox/mapbox-sdk");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const baseClient = mbxClient({ accessToken: config.MAPBOX_TOKEN });
const geocodingClient = mbxGeocoding(baseClient);

interface AppointmentDetails {
  contact: boolean;
  contactDescription: string;
  requiredTesting: boolean;
  requiredTestingDescription: string | null;
  schoolTesting: boolean;
  schoolTestingDescription: string | null;
  school: string | null;
  symptomatic: boolean;
  selectedSymptoms: Array<number>;
  selectedConditions: Array<number>;
  feelingNumber: string | number | null;
  start: string | null;
  selectedImmunizations: Array<number>;
  grade: string | null;
  greenShieldNumber: string | null;
  studentCardNumber: string | null;
  infoLabel: string | null;
  infoValue: string | null;
}

interface Appointment {
  patientPk: number;
  appointment: AppointmentDetails;
}

export function displayAssessment() {
  return {
    type: "DISPLAY_ASSESSMENT",
  };
}

export function resetQuestionnaire() {
  return {
    type: "RESET_QUESTIONNAIRE",
  };
}

export function saveQuestionnaireInstance(appointmentInstance: Appointment) {
  return {
    type: "SAVE_QUESTIONNAIRE_INSTANCE",
    appointmentInstance,
  };
}

export function setFeelingNumber(feelingNumber: string) {
  return {
    type: "SET_FEELING_NUMBER",
    feelingNumber,
  };
}

export function setSymptomatic(symptomatic: boolean) {
  return {
    type: "SET_SYMPTOMATIC",
    symptomatic,
  };
}

export function setRequiredTesting(requiredTesting: boolean) {
  return {
    type: "SET_REQUIRED_TESTING",
    requiredTesting,
  };
}

export function setRequiredTestingDescription(description: string) {
  return {
    type: "SET_REQUIRED_TESTING_DESCRIPTION",
    requiredTestingDescription: description,
  };
}

export function setSchoolTesting(schoolTesting: boolean) {
  return {
    type: "SET_SCHOOL_TESTING",
    schoolTesting,
  };
}

export function setSchoolTestingDescription(description: string) {
  return {
    type: "SET_SCHOOL_TESTING_DESCRIPTION",
    schoolTestingDescription: description,
  };
}

export function setGrade(grade: string) {
  return {
    type: "SET_GRADE",
    grade,
  };
}

export function setSchoolTestingSchool(school: string) {
  return {
    type: "SET_SCHOOL_TESTING_SCHOOL",
    school,
  };
}

export function setStudentCardNumber(studentCardNumber: string) {
  return {
    type: "SET_STUDENT_CARD_NUMBER",
    studentCardNumber,
  };
}

export function setGreenShieldNumber(greenShieldNumber: string) {
  return {
    type: "SET_GREEN_SHIELD_NUMBER",
    greenShieldNumber,
  };
}

export function setInfoLabel(infoLabel: string) {
  return {
    type: "SET_INFO_LABEL",
    infoLabel,
  };
}

export function setInfoValue(infoValue: string) {
  return {
    type: "SET_INFO_VALUE",
    infoValue,
  };
}

export function resetDateAndTime() {
  return {
    type: "RESET_DATE_AND_TIME",
    date: null,
    time: null,
  };
}

function requestCheckIfStillAvailable() {
  return {
    type: "REQUEST_CHECK_IF_STILL_AVAILABLE",
    checkingAvailability: true,
  };
}
export function receiveCheckIfStillAvailable() {
  return {
    type: "RECEIVE_CHECK_IF_STILL_AVAILABLE",
    checkingAvailability: false,
    isAvailable: true,
  };
}
function errorCheckIfStillAvailable() {
  return {
    type: "ERROR_CHECK_IF_STILL_AVAILABLE",
    checkingAvailability: false,
    isAvailable: false,
  };
}

export function resetCheckIfStillAvailable() {
  return {
    type: "RESET_CHECK_IF_STILL_AVAILABLE",
    isAvailable: true,
  };
}

function errorSubmittingData(err: any) {
  return {
    type: "ERROR_SUBMITTING_DATA",
    submittingAllDataError: err,
    isSubmittingAllData: false,
  };
}

function requestGetCoordinates() {
  return {
    type: "REQUEST_GET_COORDINATES",
    isFetchingCoordinates: true,
  };
}

export function setNextThreeDays(threeDays: Array<any>) {
  return {
    type: "SET_NEXT_THREE_DAYS",
    threeDays,
  };
}

export function receiveFirstTimes(firstTimes: Array<string>) {
  return {
    type: "RECEIVE_FIRST_TIMES",
    firstTimes,
  };
}

export function receiveSecondTimes(secondTimes: Array<string>) {
  return {
    type: "RECEIVE_SECOND_TIMES",
    secondTimes,
  };
}

export function receiveThirdTimes(thirdTimes: Array<string>) {
  return {
    type: "RECEIVE_THIRD_TIMES",
    thirdTimes,
  };
}

export function setProfileData(profileData: object) {
  return {
    type: "SET_PROFILE_DATA",
    profileData,
    profileComplete: true,
  };
}

function receiveIsNewUser(newUser: boolean) {
  return {
    type: "RECEIVE_IS_NEW_USER",
    newUser,
  };
}

function receiveTimes(times: Array<string>) {
  return {
    type: "RECEIVE_TIMES",
    times,
  };
}

export function receiveGetCoordinates(
  coordinates: Array<number>,
  placeName: string
) {
  return {
    type: "RECEIVE_GET_COORDINATES",
    isFetchingCoordinates: false,
    coordinates,
    placeName,
  };
}

function errorGetCoordinates(err: any) {
  return {
    type: "ERROR_GET_COORDINATES",
    getCoordinatesError: err,
  };
}

function requestSearchLocation() {
  return {
    type: "REQUEST_SEARCH_LOCATION",
    isSearchingLocations: true,
  };
}

function receiveSearchLocation(locations: any) {
  return {
    type: "RECEIVE_SEARCH_LOCATION",
    isSearchingLocations: false,
    locations,
  };
}

function errorSearchLocation(searchError: any) {
  return {
    type: "ERROR_SEARCH_LOCATION",
    isSearchingLocations: false,
    searchError,
  };
}

function requestGetClinics() {
  return {
    type: "REQUEST_GET_CLINICS",
    isFetchingClinics: true,
  };
}

function receiveGetClinics(clinics: Array<any>) {
  return {
    type: "RECEIVE_GET_CLINICS",
    isFetchingClinics: false,
    clinics,
  };
}

function requestSymptomsList() {
  return {
    type: "REQUEST_SYMPTOMS_LIST",
    isFetchingSymptoms: true,
  };
}

function receiveSymptomsList(symptoms: any) {
  return {
    type: "RECEIVE_SYMPTOMS_LIST",
    isFetchingSymptoms: false,
    symptoms,
  };
}
function errorSymptomsList() {
  return {
    type: "ERROR_SYMPTOMS_LIST",
    isFetchingSymptoms: false,
  };
}

export function setAppointmentTime(time: any) {
  return {
    type: "SET_APPOINTMENT_TIME",
    time,
  };
}

export function getCurrentCoordinates() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(requestGetCoordinates());

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        axios({
          method: "get",
          url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${pos.coords.longitude},${pos.coords.latitude}.json?access_token=pk.eyJ1IjoibGV3aXNtZW5lbGF3cyIsImEiOiJjam1ydW5wangwam9tM2twMmEzZXVpb3ZnIn0.EPCfQNyf5-ibEL-28h7apA`,
        })
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            dispatch(
              receiveGetCoordinates(
                [pos.coords.latitude, pos.coords.longitude],
                data.features[0].place_name
              )
            );
          })
          .catch((err) => {
            dispatch(errorGetCoordinates(err.response));
          });
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function searchLocation(searchQuery: string) {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestSearchLocation());
    geocodingClient
      .forwardGeocode({
        query: `${searchQuery} Canada`,
        limit: 5,
      })
      .send()
      .then((response: any) => {
        console.log(response.body);
        dispatch(receiveSearchLocation(response.body.features));
        dispatch(
          receiveGetCoordinates(
            response.body.features[0].center,
            response.body.features[0].place_name
          )
        );
      })
      .catch((err: any) => {
        dispatch(errorSearchLocation(err.response));
      });
  };
}

export function getClinics(coordinates: Array<number>) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/get_closest_office/${coordinates[1]}/${coordinates[0]}/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestGetClinics());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetClinics(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getFluClinics(coordinates: Array<number>) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/get_closest_flu_office/${coordinates[1]}/${coordinates[0]}/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestGetClinics());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetClinics(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getImmunizationClinics(coordinates: Array<number>) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/get_closest_immunization_office/${coordinates[1]}/${coordinates[0]}/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestGetClinics());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetClinics(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getVaccinationClinics(coordinates: Array<number>) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/get_closest_vaccination_office/${coordinates[1]}/${coordinates[0]}/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestGetClinics());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetClinics(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function requestGetClinic() {
  return {
    type: "REQUEST_GET_CLINIC",
    isFetchingClinic: true,
  };
}

function receiveGetClinic(clinic: any) {
  return {
    type: "RECEIVE_GET_CLINIC",
    isFetchingClinic: false,
    clinic,
  };
}

export function getClosestClinic(coordinates: Array<number>) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/get_closest_office/${coordinates[0]}/${coordinates[1]}/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestGetClinic());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetClinic(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function previousChosenClinic(previousChosenClinic: object) {
  return {
    type: "PREVIOUS_CHOSEN_CLINIC",
    previousChosenClinic,
  };
}

export function clinicSelect(selectedClinic: object) {
  return {
    type: "CLINIC_SELECTION",
    selectedClinic,
  };
}

export function getSymptomsList() {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/covid/symptom_list/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestSymptomsList());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveSymptomsList(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorSymptomsList());
      });
  };
}

function requestImmunizationList() {
  return {
    type: "REQUEST_IMMUNIZATION_LIST",
    isFetchingImmunizations: true,
  };
}

function receiveImmunizationList(immunizations: any) {
  return {
    type: "RECEIVE_IMMUNIZATION_LIST",
    isFetchingImmunizations: false,
    immunizations,
  };
}
function errorImmunizationList() {
  return {
    type: "ERROR_IMMUNIZATION_LIST",
    isFetchingImmunizations: false,
  };
}

export function getImmunizationList() {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/fluclinic/immunization-list/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestImmunizationList());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveImmunizationList(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorImmunizationList());
      });
  };
}

function requestMedicalConditionsList() {
  return {
    type: "REQUEST_MEDICAL_CONDITIONS_LIST",
    isFetchingMedicalConditions: true,
  };
}

function receiveMedicalConditionsList(medicalConditions: any) {
  return {
    type: "RECEIVE_MEDICAL_CONDITIONS_LIST",
    isFetchingMedicalConditions: false,
    medicalConditions,
  };
}
function errorMedicalConditionsList() {
  return {
    type: "ERROR_MEDICAL_CONDITIONS_LIST",
    isFetchingMedicalConditions: false,
  };
}

export function getMedicalConditionsList() {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/medical-conditions-list/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestMedicalConditionsList());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveMedicalConditionsList(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorMedicalConditionsList());
      });
  };
}

export function selectSymptom(symptomPk: number) {
  return {
    type: "SELECT_SYMPTOM",
    symptomPk,
  };
}

export function removeSymptom(symptomPk: number) {
  return {
    type: "REMOVE_SYMPTOM",
    symptomPk,
  };
}

export function selectImmunization(immunizationPk: number) {
  return {
    type: "SELECT_IMMUNIZATION",
    immunizationPk,
  };
}

export function removeImmunization(immunizationPk: number) {
  return {
    type: "REMOVE_IMMUNIZATION",
    immunizationPk,
  };
}

export function selectCondition(conditionPk: number) {
  return {
    type: "SELECT_CONDITION",
    conditionPk,
  };
}

export function removeCondition(conditionPk: number) {
  return {
    type: "REMOVE_CONDITION",
    conditionPk,
  };
}

export function setSymptomStart(start: string) {
  return {
    type: "SET_SYMPTOM_START",
    start,
  };
}

export function setInContact(contact: string) {
  return {
    type: "SET_IN_CONTACT",
    contact,
  };
}

export function setInContactDescription(description: string) {
  return {
    type: "SET_IN_CONTACT_DESCRIPTION",
    description,
  };
}

export function setAppointmentDate(date: string) {
  return {
    type: "SET_DATE",
    date,
  };
}
export function setAppointmentPK(pk: any) {
  return {
    type: "SET_APPOINTMENT_PK",
    pk,
  };
}

export function savePatientInfo(patientInfo: any) {
  return {
    type: "SET_PATIENT_INFO",
    patientInfo,
  };
}

function requestSubmitAllData() {
  return {
    type: "REQUEST_SUBMIT_ALL_DATA",
    isSubmittingAllData: true,
  };
}

function receiveSubmitAllData() {
  return {
    type: "RECEIVE_SUBMIT_ALL_DATA",
    isSubmittingAllData: false,
    hasSubmittedData: true,
  };
}

// Create User
// Create Create Appointment
// Create COVID Info
// Create COVID Symptoms
// export function createUser(
//   userInfo: any,
//   appointmentInfo: any,
//   officePk: number,
//   symptoms: Array<number | null>
// ) {
//   let config: AxiosRequestConfig = {
//     method: "post",
//     url: `${process.env.REACT_APP_DEV_API}/signup/`,
//     data: {
//       email: userInfo.email,
//       password: userInfo.password,
//       is_patient: true,
//       office: [officePk],
//       patient_info: {
//         first_name: userInfo.first_name,
//         last_name: userInfo.last_name,
//         gender: "male",
//         date_of_birth: moment(userInfo.date_of_birth).format("YYYY-MM-DD"),
//         phone: userInfo.phone,
//         ohip_num: userInfo.ohip_num,
//         ohip_vc: userInfo.ohip_vc,
//         address: userInfo.address,
//       },
//     },
//   };

//   return (dispatch: Dispatch<any>) => {
//     dispatch(requestSubmitAllData());
//     return axios(config)
//       .then((res) => res.data)
//       .then((data) => {
//         dispatch(
//           createAppointment(appointmentInfo, data.pk, officePk, symptoms)
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch(errorSubmittingData(err.response));
//       });
//   };
// }

interface AppointmentTime {
  date: string;
  time: string;
  appointmentType: string | null;
}

export function validateDatetimeAndSubmit(
  appointmentDetails: AppointmentTime,
  selectedClinic: number,
  questionnaires: Array<Appointment>
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/appointments/validate_appointment_time/`,
    data: {
      appointment_date: appointmentDetails.date,
      appointment_time: appointmentDetails.time,
      office: selectedClinic,
      spots: questionnaires.length,
    },
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestSubmitAllData());
    dispatch(requestCheckIfStillAvailable());
    return axios(config)
      .then((res) => {
        dispatch(receiveCheckIfStillAvailable());
        dispatch(
          submitQuestionnaire(
            appointmentDetails,
            selectedClinic,
            questionnaires
          )
        );
      })
      .catch((err) => {
        dispatch(errorCheckIfStillAvailable());
        dispatch(errorSubmittingData(err.response));
        // dispatch(resetDateAndTime());
      });
  };
}

export function submitQuestionnaire(
  appointmentDetails: AppointmentTime,
  selectedClinic: number,
  questionnaires: Array<Appointment>
) {
  return (dispatch: Dispatch<any>) => {
    questionnaires.forEach((questionnaire) => {
      dispatch(
        createAppointment(appointmentDetails, selectedClinic, questionnaire)
      );
    });
  };
}

export function createAppointment(
  appointmentDetails: AppointmentTime,
  selectedClinic: number,
  questionnaire: Appointment
) {
  const token = localStorage.getItem("id_token");
  let config: AxiosRequestConfig = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_create/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      event_date: moment(appointmentDetails.date).format("YYYY-MM-DD"),
      event_time: moment(appointmentDetails.time, "LT").format("HH:mm"),
      office: selectedClinic,
      patient: questionnaire.patientPk,
      booked_at: "patient",
      flu_clinic: appointmentDetails.appointmentType === "flu" ? true : false,
      dose:
        appointmentDetails.appointmentType === "vaccination"
          ? "First Dose"
          : null,
    },
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestSubmitAllData());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(setAppointmentPK(data.pk));
        dispatch(createCovidInfo(data.pk, questionnaire));

        if (questionnaire.appointment.selectedImmunizations.length > 0) {
          dispatch(createImmunizations(questionnaire, data.pk));
        }
      })
      .catch((err) => {
        dispatch(errorSubmittingData(err.response));
        console.log(err);
      });
  };
}

// export function createAppointment(
//   formData: any,
//   userPk: number,
//   officePk: number,
//   symptoms: Array<number | null>
// ) {
//   console.log(formData);
//   let config: AxiosRequestConfig = {
//     method: "post",
//     url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_create/`,
//     data: {
//       event_date: moment(formData.date).format("YYYY-MM-DD"),
//       event_time: moment(formData.time, "LT").format("HH:mm"),
//       office: officePk,
//       user: userPk,
//       booked_at: "patient",
//     },
//   };

//   return (dispatch: Dispatch<any>) => {
//     dispatch(requestSubmitAllData());
//     return axios(config)
//       .then((res) => res.data)
//       .then((data) => {
//         dispatch(createCovidInfo(data.pk, formData, symptoms));
//       })
//       .catch((err) => {
//         dispatch(errorSubmittingData(err.response));
//         console.log(err);
//       });
//   };
// }

export function createCovidInfo(
  appointmentPk: number,
  appointment: Appointment
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/covid/covid_info/`,
    data: {
      appointment: appointmentPk,
      sympton_startedfrom: appointment.appointment.start,
      contactedwith_covid: appointment.appointment.contact,
      contactedwith_description: appointment.appointment.contactDescription,
      required_testing: appointment.appointment.requiredTesting,
      required_testing_description:
        appointment.appointment.requiredTestingDescription,
      is_attending_school: appointment.appointment.schoolTesting,
      feeling_scale: appointment.appointment.feelingNumber,
    },
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        if (appointment.appointment.school) {
          dispatch(
            updatePatientProfile(
              appointment.appointment.school,
              appointment.patientPk,
              appointment.appointment.grade
            )
          );
        }

        if (appointment.appointment.studentCardNumber) {
          dispatch(
            updatePatientProfileStudent(
              appointment.patientPk,
              appointment.appointment.studentCardNumber,
              appointment.appointment.greenShieldNumber
            )
          );
        }

        if (appointment.appointment.infoLabel) {
          dispatch(
            updatePatientExtraInfo(
              appointment.patientPk,
              appointment.appointment.infoLabel,
              appointment.appointment.infoValue
            )
          );
        }

        if (appointment.appointment.selectedSymptoms.length > 0) {
          dispatch(createCovidSymptoms(appointment, data.id, appointmentPk));
        }

        if (appointment.appointment.selectedConditions.length > 0) {
          dispatch(
            createMedicalConditions(
              appointment.appointment.selectedConditions,
              appointment.patientPk
            )
          );
        }
      })
      .then((data) => {
        dispatch(createExportFile(appointmentPk));
      })
      .catch((err) => {
        dispatch(errorSubmittingData(err.response));
      });
  };
}

export function updatePatientProfileStudent(
  patientPk: number,

  studentNumber: string | null,
  greenShieldNumber: string | null
) {
  const token = localStorage.getItem("id_token");
  let config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${process.env.REACT_APP_DEV_API}/update_patient/${patientPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      student_number: studentNumber,
      greenshield_number: greenShieldNumber,
    },
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updatePatientExtraInfo(
  patientPk: number,
  infoLabel: string | null,
  infoValue: string | null
) {
  const token = localStorage.getItem("id_token");
  let config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${process.env.REACT_APP_DEV_API}/update_patient/${patientPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      extra_info_label: infoLabel,
      extra_info_value: infoValue,
    },
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updatePatientProfile(
  school: string,
  patientPk: number,
  grade: string | null
) {
  const token = localStorage.getItem("id_token");
  let config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${process.env.REACT_APP_DEV_API}/update_patient/${patientPk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      school,
      grade,
    },
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createMedicalConditions(
  selectedConditions: Array<number>,
  patientPk: number
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/patient-medical-conditions-create/`,
    data: selectedConditions.map((condition) => ({
      patient: patientPk,
      condition,
    })),
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
  };
}

export function createCovidSymptoms(
  appointment: Appointment,
  covidInfoPk: number,
  appointmentPk: number
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/covid/user_symptom_create/`,
    data: appointment.appointment.selectedSymptoms.map((symptom) => ({
      covid_info: covidInfoPk,
      symptom,
    })),
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)

      .catch((err) => {
        dispatch(errorSubmittingData(err.response));
      });
  };
}

export function createImmunizations(
  appointment: Appointment,
  appointmentPk: number
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/fluclinic/user-immunization-create/`,
    data: appointment.appointment.selectedImmunizations.map((immunization) => ({
      appointment: appointmentPk,
      immunization,
      patient: appointment.patientPk,
    })),
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .catch((err) => {
        dispatch(errorSubmittingData(err.response));
      });
  };
}

export function createExportFile(appointmentPk: number) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/appointments/save_to_file/`,
    data: {
      appointmentPk,
    },
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveSubmitAllData());
      });
  };
}

export function getNextThreeDays() {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_nextthree`,
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
  };
}

export function getFirstDay(officePk: number, date: string, spots: number) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_datetimes/?office=${officePk}&date=${date}&spots=${spots}`,
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveFirstTimes(data));
      });
  };
}

export function getSecondDay(officePk: number, date: string, spots: number) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_datetimes/?office=${officePk}&date=${date}&spots=${spots}`,
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveSecondTimes(data));
      });
  };
}

export function getThirdDay(officePk: number, date: string, spots: number) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_datetimes/?office=${officePk}&date=${date}&spots=${spots}`,
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveThirdTimes(data));
      });
  };
}

export function checkEmail(email: string) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/check-email/${email}/`,
  };

  return (dispatch: any) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => dispatch)
      .catch((err) => dispatch(receiveIsNewUser(true)));
  };
}

export function getTimesFromDate(
  officePk: number,
  date: string,
  spots: number
) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/appointment_datetimes/?office=${officePk}&date=${date}&spots=${spots}`,
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveTimes(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function checkIfStillAvailable(
  date: string,
  time: string,
  office: number
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/appointments/validate_appointment_time/`,
    data: {
      appointment_date: date,
      appointment_time: time,
      office,
    },
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestCheckIfStillAvailable());
    return axios(config)
      .then((res) => {
        dispatch(receiveCheckIfStillAvailable());
      })
      .catch((err) => {
        dispatch(errorCheckIfStillAvailable());
        dispatch(resetDateAndTime());
      });
  };
}

export function finalCheckIfStillAvailable(
  formData: any,
  userPk: number,
  officePk: number,
  symptoms: Array<number | null>
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/appointments/validate_appointment_time/`,
    data: {
      appointment_date: formData.date,
      appointment_time: formData.time,
      office: officePk,
    },
  };

  return (dispatch: Dispatch<any>) => {
    //   dispatch(requestSubmitAllData());
    //   dispatch(requestCheckIfStillAvailable());
    //   return axios(config)
    //     .then((res) => {
    //       dispatch(receiveCheckIfStillAvailable());
    //       dispatch(createAppointment(formData, userPk, officePk));
    //     })
    //     .catch((err) => {
    //       dispatch(errorCheckIfStillAvailable());
    //       dispatch(errorSubmittingData(err.response));
    //       dispatch(resetDateAndTime());
    //     });
  };
}

export function resetAllCovid() {
  return {
    type: "RESET_ALL_COVID",
  };
}

export function setAppointmentType(appointmentType: string) {
  return {
    type: "SET_APPOINTMENT_TYPE",
    appointmentType,
  };
}

function requestGetPriorityDays() {
  return {
    type: "REQUEST_GET_PRIORITY_DAYS",
    isFetchingPriorityDays: true,
  };
}

function receiveGetPriorityDays(priorityDays: Array<any>) {
  return {
    type: "RECEIVE_GET_PRIORITY_DAYS",
    priorityDays,
    isFetchingPriorityDays: false,
  };
}

function errorGetPriorityDays() {
  return {
    type: "ERROR_GET_PRIORITY_DAYS",
    isFetchingPriorityDays: false,
  };
}

export function getPriorityDays(officePk: number) {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.REACT_APP_DEV_API}/get-priority-office-days/${officePk}/`,
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestGetPriorityDays());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetPriorityDays(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorGetPriorityDays());
      });
  };
}

function requestCheckIfAlreadyBooked() {
  return {
    type: "REQUEST_CHECK_IF_ALREADY_BOOKED",
    hasAlreadyBooked: null,
  };
}

function receiveCheckIfAlreadyBooked(hasAlreadyBooked: boolean) {
  return {
    type: "RECEIVE_CHECK_IF_ALREADY_BOOKED",
    hasAlreadyBooked,
  };
}

function errorCheckIfAlreadyBooked() {
  return {
    type: "ERROR_CHECK_IF_ALREADY_BOOKED",
    hasAlreadyBooked: null,
  };
}

export function checkIfAlreadyBooked(
  date: string,
  office: number,
  patientPk: number
) {
  const token = localStorage.getItem("id_token");

  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/appointments/existing-appointments/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      date,
      office,
      patient: patientPk,
    },
  };
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestCheckIfAlreadyBooked());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveCheckIfAlreadyBooked(data.exists));
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorCheckIfAlreadyBooked());
      });
  };
}
