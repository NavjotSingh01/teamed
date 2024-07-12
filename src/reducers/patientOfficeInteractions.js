const initialState = {
  officeHasLoaded: false,
  isFetchingOffice: false,
  waitingPosition: 0,
  waitingQueue: 0,
  office: {},
  isFetchingSymptoms: false,
  symptoms: [],
  isCreatingTriage: false,
  hasCreatedTriage: false,
  fetchingTriageQuestions: false,
  triageQuestions: {},
  isFetchingAppointments: false,
  appointments: [],
  isDeletingAppointment: false,
  hasDeletedAppointment: false,
  appointmentPk: null,
  selectedAppointment: null,
  isFetchingDeletedAppointments: false,
  deletedAppointments: [],
  selectedDeletedAppointment: null,
  myOffices: false,
};

const patientOfficeInteractions = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_APPOINTMENT_PK":
      return Object.assign({}, state, {
        appointmentPk: action.appointmentPk,
      });
    case "RESET_APPOINTMENT_PK":
      return Object.assign({}, state, {
        appointmentPk: null,
      });
    case "SET_WAITING_LIST":
      return Object.assign({}, state, {
        waitingQueue: action.number,
      });
    case "SET_WAITING_POSITION":
      return Object.assign({}, state, {
        waitingPosition: action.number,
      });
    case "REQUEST_GET_SYMPTOMS":
      return Object.assign({}, state, {
        isFetchingSymptoms: true,
      });
    case "RECEIVE_GET_SYMPTOMS":
      return Object.assign({}, state, {
        isFetchingSymptoms: false,
        symptoms: action.symptoms,
      });
    case "REQUEST_OFFICE":
      return Object.assign({}, state, {
        isFetchingOffice: true,
      });
    case "RECEIVE_OFFICE":
      return Object.assign({}, state, {
        isFetchingOffice: false,
        officeHasLoaded: true,
        office: action.office,
      });
    case "REQUEST_CREATE_TRIAGE":
      return Object.assign({}, state, {
        isCreatingTriage: true,
      });
    case "RECEIVE_CREATE_TRIAGE":
      return Object.assign({}, state, {
        isCreatingTriage: false,
        hasCreatedTriage: true,
      });
    case "REQUEST_GET_TRIAGE_QUESTIONS":
      return Object.assign({}, state, {
        fetchingTriageQuestions: true,
      });
    case "REQUEST_GET_PATIENT_APPOINTMENTS":
      return Object.assign({}, state, {
        isFetchingAppointments: true,
      });
    case "RECEIVE_GET_PATIENT_APPOINTMENTS":
      return Object.assign({}, state, {
        isFetchingAppointments: false,
        appointments: action.appointments,
      });
    case "ERROR_GET_PATIENT_APPOINTMENTS":
      return Object.assign({}, state, {
        isFetchingAppointments: false,
      });
    case "REQUEST_DELETE_APPOINTMENT":
      return Object.assign({}, state, {
        isDeletingAppointment: true,
        hasDeletedAppointment: false,
      });
    case "RECEIVE_DELETE_APPOINTMENT":
      return Object.assign({}, state, {
        isDeletingAppointment: false,
        hasDeletedAppointment: true,
      });
    case "RESET_DELETE_APPOINTMENT":
      return Object.assign({}, state, {
        isDeletingAppointment: false,
        hasDeletedAppointment: false,
      });
    case "SELECT_APPOINTMENT":
      return Object.assign({}, state, {
        selectedAppointment: action.selectedAppointment,
      });

    case "SELECT_DELETED_APPOINTMENT":
      return Object.assign({}, state, {
        selectedDeletedAppointment: action.selectedDeletedAppointment,
      });

    case "REQUEST_GET_PATIENT_DELETED_APPOINTMENTS":
      return Object.assign({}, state, {
        isFetchingDeletedAppointments: true,
      });
    case "RECEIVE_GET_PATIENT_DELETED_APPOINTMENTS":
      return Object.assign({}, state, {
        isFetchingDeletedAppointments: false,
        deletedAppointments: action.deletedAppointments,
      });
    case "ERROR_GET_PATIENT_DELETED_APPOINTMENTS":
      return Object.assign({}, state, {
        isFetchingDeletedAppointments: false,
      });
    case "RECEIVE_GET_TRIAGE_QUESTIONS":
      return Object.assign({}, state, {
        fetchingTriageQuestions: false,
        triageQuestions: action.triageQuestions,
      });
    case "MY_OFFICES_TOGGLE":
      return Object.assign({}, state, {
        myOffices: action.myOffices,
      });
    case "MY_OFFICES_TOGGLE":
      return Object.assign({}, state, {
        myOffices: action.myOffices,
      });
    case "RESET_TRIAGE":
      return Object.assign({}, state, {
        hasCreatedTriage: false,
        waitingPosition: 0,
        waitingQueue: 0,
        office: {},
        isFetchingSymptoms: false,
        symptoms: [],
        isCreatingTriage: false,
        hasCreatedTriage: false,
      });
    default:
      return state;
  }
};

export default patientOfficeInteractions;
