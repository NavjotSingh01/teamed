const initialState = {
  newMessagePopup: false,
  isFetchingGetPatientOffices: false,
  patientOffices: [],
  isRequestingGetAllOfficeThreads: false,
  officeThreads: [],
  isCreatingMessageThread: false,
  hasCreatedMessageThread: false,
  selectedThread: null,
  isRequestingGetOfficeMessageThread: false,
  officeThread: null,
};

const inboxReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "OPEN_NEW_MESSAGE_POPUP":
      return Object.assign({}, state, {
        newMessagePopup: action.openMessage,
      });
    case "REQUEST_GET_PATIENT_OFFICES":
      return Object.assign({}, state, {
        isFetchingGetPatientOffices: action.isFetchingGetPatientOffices,
      });
    case "RECEIVE_GET_PATIENT_OFFICES":
      return Object.assign({}, state, {
        isFetchingGetPatientOffices: action.isFetchingGetPatientOffices,
        patientOffices: action.patientOffices,
      });
    case "ERROR_GET_PATIENT_OFFICES":
      return Object.assign({}, state, {
        isFetchingGetPatientOffices: action.isFetchingGetPatientOffices,
      });
    case "REQUEST_CREATE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isCreatingMessageThread: true,
      });
    case "RECEIVE_CREATE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isCreatingMessageThread: false,
        hasCreatedMessageThread: true,
      });
    case "ERROR_CREATE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isCreatingMessageThread: false,
        hasCreatedMessageThread: false,
      });
    case "RESET_CREATE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isCreatingMessageThread: false,
        hasCreatedMessageThread: false,
      });
    case "REQUEST_GET_ALL_OFFICE_THREADS":
      return Object.assign({}, state, {
        isRequestingGetAllOfficeThreads: true,
      });
    case "RECEIVE_GET_ALL_OFFICE_THREADS":
      return Object.assign({}, state, {
        isRequestingGetAllOfficeThreads: false,
        officeThreads: action.officeThreads,
      });
    case "ERROR_GET_ALL_OFFICE_THREADS":
      return Object.assign({}, state, {
        isRequestingGetAllOfficeThreads: false,
      });
    case "REQUEST_GET_OFFICE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isRequestingGetOfficeMessageThread: true,
      });
    case "RECEIVE_GET_OFFICE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isRequestingGetOfficeMessageThread: false,
        officeThread: action.officeThread,
      });
    case "ERROR_GET_OFFICE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isRequestingGetOfficeMessageThread: true,
      });
    case "SELECT_OFFICE_THREAD":
      return Object.assign({}, state, {
        selectedThread: action.selectedThread,
      });
    case "ADD_MESSAGE_TO_THREAD":
      console.log(action.officeThread);
      return Object.assign({}, state, {
        officeThread: {
          ...action.officeThread,
          message_set: [...action.officeThread.message_set, action.message],
        },
      });

    default:
      return state;
  }
};

export default inboxReducer;
