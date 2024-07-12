const initialState = {
  selectedConditions: [],
  isFetchingCoordinates: false,
  coordinates: null,
  placeName: "",
  isSearchingLocations: false,
  locations: null,
  isFetchingClinics: false,
  clinics: null,
  clinic: null,
  selectedClinic: null,
  isFetchingSymptoms: false,
  isFetchingImmunizations: false,
  symptoms: [],
  immunizations: [],
  medicalConditions: [],
  selectedSymptoms: [],
  selectedImmunizations: [],
  start: null,
  date: null,
  time: null,
  newUser: null,
  profileData: {},
  isSubmittingAllData: false,
  hasSubmittedData: false,
  profileComplete: false,
  threeDays: [],
  firstTimes: [],
  secondTimes: [],
  thirdTimes: [],
  times: [],
  requiredTesting: null,
  requiredTestingDescription: "",
  schoolTesting: null,
  school: "",
  schoolTestingDescription: "",
  symptomatic: null,
  isFetchingMedicalConditions: false,
  feelingNumber: null,
  questionnaireResponses: [],
  checkingAvailability: false,
  isAvailable: true,
  contact: "NO",
  appointmentType: null,
  isFetchingPriorityDays: false,
  priorityDays: [],
  displayAssessment: false,
  hasAlreadyBooked: null,
  previousChosenClinic: null,
  grade: null,
  greenShieldNumber: null,
  studentCardNumber: null,
  appointmentPk: null,
  infoValue: null,
  infoLabel: null,
};

const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "RESET_CHECK_IF_STILL_AVAILABLE":
      return Object.assign({}, state, {
        isAvailable: true,
      });
    case "PREVIOUS_CHOSEN_CLINIC":
      return Object.assign({}, state, {
        previousChosenClinic: action.previousChosenClinic,
      });
    case "REQUEST_CHECK_IF_ALREADY_BOOKED":
      return Object.assign({}, state, {
        hasAlreadyBooked: null,
      });
    case "RECEIVE_CHECK_IF_ALREADY_BOOKED":
      return Object.assign({}, state, {
        hasAlreadyBooked: action.hasAlreadyBooked,
      });
    case "ERROR_CHECK_IF_ALREADY_BOOKED":
      return Object.assign({}, state, {
        hasAlreadyBooked: null,
      });
    case "DISPLAY_ASSESSMENT":
      return Object.assign({}, state, {
        displayAssessment: true,
      });
    case "REQUEST_GET_PRIORITY_DAYS":
      return Object.assign({}, state, {
        isFetchingPriorityDays: true,
      });
    case "RECEIVE_GET_PRIORITY_DAYS":
      return Object.assign({}, state, {
        priorityDays: action.priorityDays,
        isFetchingPriorityDays: false,
      });
    case "ERROR_GET_PRIORITY_DAYS":
      return Object.assign({}, state, {
        isFetchingPriorityDays: false,
      });
    case "SET_APPOINTMENT_TYPE":
      return Object.assign({}, state, {
        appointmentType: action.appointmentType,
      });
    case "SET_SYMPTOMATIC":
      return Object.assign({}, state, {
        symptomatic: action.symptomatic,
      });
    case "SET_REQUIRED_TESTING":
      return Object.assign({}, state, {
        requiredTesting: action.requiredTesting,
      });
    case "SET_REQUIRED_TESTING_DESCRIPTION":
      return Object.assign({}, state, {
        requiredTestingDescription: action.requiredTestingDescription,
      });
    case "SET_SCHOOL_TESTING":
      return Object.assign({}, state, {
        schoolTesting: action.schoolTesting,
      });
    case "SET_SCHOOL_TESTING_DESCRIPTION":
      return Object.assign({}, state, {
        schoolTestingDescription: action.schoolTestingDescription,
      });
    case "SET_GRADE":
      return Object.assign({}, state, {
        grade: action.grade,
      });
    case "SET_SCHOOL_TESTING_SCHOOL":
      return Object.assign({}, state, {
        school: action.school,
      });
    case "SET_STUDENT_CARD_NUMBER":
      return Object.assign({}, state, {
        studentCardNumber: action.studentCardNumber,
      });
    case "SET_GREEN_SHIELD_NUMBER":
      return Object.assign({}, state, {
        greenShieldNumber: action.greenShieldNumber,
      });
    case "SET_APPOINTMENT_PK":
      return Object.assign({}, state, {
        appointmentPk: action.pk,
      });
    case "RESET_DATE_AND_TIME":
      return Object.assign({}, state, {
        date: null,
        time: null,
      });
    case "REQUEST_CHECK_IF_STILL_AVAILABLE":
      return Object.assign({}, state, {
        checkingAvailability: true,
      });
    case "RECEIVE_CHECK_IF_STILL_AVAILABLE":
      return Object.assign({}, state, {
        checkingAvailability: false,
        isAvailable: true,
      });
    case "ERROR_CHECK_IF_STILL_AVAILABLE":
      return Object.assign({}, state, {
        checkingAvailability: false,
        isAvailable: false,
      });
    case "RECEIVE_TIMES":
      return Object.assign({}, state, {
        times: action.times,
      });
    case "REQUEST_SUBMIT_ALL_DATA":
      return Object.assign({}, state, {
        isSubmittingAllData: action.isSubmittingAllData,
      });
    case "RECEIVE_FIRST_TIMES":
      return Object.assign({}, state, {
        firstTimes: action.firstTimes,
      });
    case "RECEIVE_SECOND_TIMES":
      return Object.assign({}, state, {
        secondTimes: action.secondTimes,
      });
    case "RECEIVE_THIRD_TIMES":
      return Object.assign({}, state, {
        thirdTimes: action.thirdTimes,
      });
    case "SET_NEXT_THREE_DAYS":
      return Object.assign({}, state, {
        threeDays: action.threeDays,
      });
    case "RECEIVE_SUBMIT_ALL_DATA":
      return Object.assign({}, state, {
        isSubmittingAllData: action.isSubmittingAllData,
        hasSubmittedData: action.hasSubmittedData,
      });
    case "ERROR_SUBMITTING_DATA":
      return Object.assign({}, state, {
        isSubmittingAllData: false,
      });
    case "RECEIVE_IS_NEW_USER":
      return Object.assign({}, state, {
        newUser: action.newUser,
      });
    case "SET_PROFILE_DATA":
      return Object.assign({}, state, {
        profileData: action.profileData,
        profileComplete: true,
      });
    case "REQUEST_GET_COORDINATES":
      return Object.assign({}, state, {
        isFetchingCoordinates: true,
      });
    case "RECEIVE_GET_COORDINATES":
      return Object.assign({}, state, {
        isFetchingCoordinates: false,
        coordinates: action.coordinates,
        placeName: action.placeName,
      });
    case "ERROR_GET_COORDINATES":
      return Object.assign({}, state, {
        isFetchingCoordinates: false,
        getCoordinatesError: action.getCoordinatesError,
      });
    case "REQUEST_SEARCH_LOCATION":
      return Object.assign({}, state, {
        isSearchingLocations: true,
      });
    case "RECEIVE_SEARCH_LOCATION":
      return Object.assign({}, state, {
        isSearchingLocations: false,
        locations: action.locations,
      });
    case "ERROR_SEARCH_LOCATION":
      return Object.assign({}, state, {
        isSearchingLocations: false,
        searchError: action.searchError,
      });
    case "REQUEST_GET_CLINICS":
      return Object.assign({}, state, {
        isFetchingClinics: true,
      });
    case "RECEIVE_GET_CLINICS":
      return Object.assign({}, state, {
        isFetchingClinics: false,
        clinics: action.clinics,
      });
    case "REQUEST_GET_CLINIC":
      return Object.assign({}, state, {
        isFetchingClinic: true,
      });
    case "RECEIVE_GET_CLINIC":
      return Object.assign({}, state, {
        isFetchingClinic: false,
        clinic: action.clinic[0],
      });
    case "CLINIC_SELECTION":
      return Object.assign({}, state, {
        selectedClinic: action.selectedClinic,
      });
    case "REQUEST_SYMPTOMS_LIST":
      return Object.assign({}, state, {
        isFetchingSymptoms: true,
      });
    case "RECEIVE_SYMPTOMS_LIST":
      return Object.assign({}, state, {
        isFetchingSymptoms: false,
        symptoms: action.symptoms,
      });
    case "ERROR_SYMPTOMS_LIST":
      return Object.assign({}, state, {
        isFetchingSymptoms: false,
      });
    case "REQUEST_IMMUNIZATION_LIST":
      return Object.assign({}, state, {
        isFetchingImmunizations: true,
      });
    case "RECEIVE_IMMUNIZATION_LIST":
      return Object.assign({}, state, {
        isFetchingImmunizations: false,
        immunizations: action.immunizations,
      });
    case "ERROR_IMMUNIZATION_LIST":
      return Object.assign({}, state, {
        isFetchingImmunizations: false,
      });
    case "REQUEST_MEDICAL_CONDITIONS_LIST":
      return Object.assign({}, state, {
        isFetchingMedicalConditions: true,
      });
    case "RECEIVE_MEDICAL_CONDITIONS_LIST":
      return Object.assign({}, state, {
        isFetchingMedicalConditions: false,
        medicalConditions: action.medicalConditions,
      });
    case "ERROR_MEDICAL_CONDITIONS_LIST":
      return Object.assign({}, state, {
        isFetchingMedicalConditions: false,
      });
    case "SELECT_SYMPTOM":
      return Object.assign({}, state, {
        selectedSymptoms: [...state.selectedSymptoms, action.symptomPk],
      });
    case "REMOVE_SYMPTOM":
      return Object.assign({}, state, {
        selectedSymptoms: state.selectedSymptoms.filter(
          (symptom: number) => symptom !== action.symptomPk
        ),
      });
    case "SELECT_IMMUNIZATION":
      return Object.assign({}, state, {
        selectedImmunizations: [
          ...state.selectedImmunizations,
          action.immunizationPk,
        ],
      });
    case "REMOVE_IMMUNIZATION":
      return Object.assign({}, state, {
        selectedImmunizations: state.selectedImmunizations.filter(
          (immunization: number) => immunization !== action.immunizationPk
        ),
      });
    case "SAVE_QUESTIONNAIRE_INSTANCE":
      return Object.assign({}, state, {
        questionnaireResponses: [
          ...state.questionnaireResponses,
          action.appointmentInstance,
        ],
      });

    case "SELECT_CONDITION":
      return Object.assign({}, state, {
        selectedConditions: [...state.selectedConditions, action.conditionPk],
      });
    case "REMOVE_CONDITION":
      return Object.assign({}, state, {
        selectedConditions: state.selectedConditions.filter(
          (condition: number) => condition !== action.conditionPk
        ),
      });
    case "SET_SYMPTOM_START":
      return Object.assign({}, state, {
        start: action.start,
      });
    case "SET_DATE":
      return Object.assign({}, state, {
        date: action.date,
      });
    case "SET_APPOINTMENT_TIME":
      return Object.assign({}, state, {
        time: action.time,
      });
    case "SET_IN_CONTACT":
      return Object.assign({}, state, {
        contact: action.contact,
      });
    case "SET_IN_CONTACT_DESCRIPTION":
      return Object.assign({}, state, {
        description: action.description,
      });
    case "SET_FEELING_NUMBER":
      return Object.assign({}, state, {
        feelingNumber: action.feelingNumber,
      });
    case "SET_INFO_LABEL":
      return Object.assign({}, state, {
        infoLabel: action.infoLabel,
      });
    case "SET_INFO_VALUE":
      return Object.assign({}, state, {
        infoValue: action.infoValue,
      });
    case "RESET_QUESTIONNAIRE":
      return Object.assign({}, state, {
        contact: "YES",
        contactDescription: "",
        description: "",
        requiredTesting: null,
        requiredTestingDescription: "",
        schoolTesting: null,
        schoolTestingDescription: "",
        school: "",
        symptomatic: null,
        selectedSymptoms: [],
        selectedConditions: [],
        feelingNumber: null,
        start: null,
      });
    case "RESET_ALL_COVID":
      return Object.assign({}, state, {
        selectedConditions: [],
        isFetchingCoordinates: false,
        coordinates: null,
        placeName: "",
        isSearchingLocations: false,
        locations: null,
        isFetchingClinics: false,
        clinics: null,
        clinic: null,
        selectedClinic: null,
        isFetchingSymptoms: false,
        isFetchingImmunizations: false,
        symptoms: [],
        immunizations: [],
        medicalConditions: [],
        selectedSymptoms: [],
        selectedImmunizations: [],
        start: null,
        date: null,
        time: null,
        newUser: null,
        profileData: {},
        isSubmittingAllData: false,
        hasSubmittedData: false,
        profileComplete: false,
        threeDays: [],
        firstTimes: [],
        secondTimes: [],
        thirdTimes: [],
        times: [],
        requiredTesting: null,
        requiredTestingDescription: "",
        schoolTesting: null,
        school: "",
        schoolTestingDescription: "",
        symptomatic: null,
        isFetchingMedicalConditions: false,
        feelingNumber: null,
        questionnaireResponses: [],
        checkingAvailability: false,
        isAvailable: true,
        contact: "NO",
        appointmentType: null,
        isFetchingPriorityDays: false,
        priorityDays: [],
        displayAssessment: false,
        hasAlreadyBooked: null,
        previousChosenClinic: null,
        grade: null,
        greenShieldNumber: null,
        studentCardNumber: null,
        appointmentPk: null,
      });
    default:
      return state;
  }
};

export default mainReducer;
