const initialState = {
  offices: [],
  receivedOffices: false,
  isFetching: false,
  isCreatingRequest: false,
  hasCreatedRequest: false,
  createOfficeErrorMessage: "",
};

const patientInteractions = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_OFFICES":
      return Object.assign({}, state, {
        isFetching: true,
        receivedOffices: false,
        offices: [],
        hasCreatedRequest: false,
      });
    case "RECEIVE_OFFICES":
      return Object.assign({}, state, {
        isFetching: false,
        receivedOffices: true,
        offices: action.offices,
      });
    case "REQUEST_OFFICE_SUBMIT":
      return Object.assign({}, state, {
        isSubmitting: true,
        receivedOffices: true,
      });
    case "RECEIVE_OFFICE_SUBMIT":
      return Object.assign({}, state, {
        isSubmitting: false,
        profile: action.profile,
      });
    case "REQUEST_CREATE_OFFICE_REQUEST":
      return Object.assign({}, state, {
        isCreatingRequest: true,
        hasCreatedRequest: false,
        createOfficeErrorMessage: "",
      });
    case "RECEIVE_CREATE_OFFICE_REQUEST":
      return Object.assign({}, state, {
        isCreatingRequest: false,
        hasCreatedRequest: true,
      });
    case "ERROR_CREATE_OFFICE_REQUEST":
      return Object.assign({}, state, {
        isCreatingRequest: false,
        hasCreatedRequest: true,
        createOfficeErrorMessage: action.createOfficeErrorMessage,
      });

    default:
      return state;
  }
};

export default patientInteractions;
