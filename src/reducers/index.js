import connectToChat from "./connectToChat";
import authenticateUser from "./authenticateUser";
import patientInteractions from "./patientInteractions";
import patientOfficeInteractions from "./patientOfficeInteractions";
import videoAudio from "./videoAudio";
import messagingReducer from "./messagingReducer";
import socketStatus from "./socketStatus";
import mainReducer from "./mainReducer";
import videoSettings from "./videoSettings";
import videoCallReducer from "./videoCallReducer";
import inboxReducer from "./inboxReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  connectToChat,
  patientInteractions,
  authenticateUser,
  patientOfficeInteractions,
  videoAudio,
  messagingReducer,
  socketStatus,
  mainReducer,
  videoSettings,
  videoCallReducer,
  inboxReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
