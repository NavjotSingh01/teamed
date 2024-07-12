const initialState = {
  isFetchingVideoToken: false,
  videoToken: null,
  errorMessage: "",
  participants: [],
  room: null,
  localParticipant: null,
  dominantSpeaker: null,
  rightTab: "call",
};

const videoCallReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "REQUEST_GET_VIDEO_TOKEN":
      return Object.assign({}, state, {
        isFetchingVideoToken: true,
      });

    case "RECEIVE_GET_VIDEO_TOKEN":
      return Object.assign({}, state, {
        isFetchingVideoToken: false,
        videoToken: action.videoToken,
      });
    case "ERROR_GET_VIDEO_TOKEN":
      return Object.assign({}, state, {
        isFetchingVideoToken: false,
        errorMessage:
          "Could not receive Video Token. Please refresh your browser and try again.",
      });
    case "SET_VIDEO_ROOM":
      return Object.assign({}, state, {
        room: action.room,
      });
    case "SET_LOCAL_PARTICIPANT":
      return Object.assign({}, state, {
        localParticipant: action.localParticipant,
      });
    case "SET_DOMINANT_SPEAKER":
      return Object.assign({}, state, {
        dominantSpeaker: action.dominantSpeaker,
      });
    case "SET_RIGHT_TAB":
      return Object.assign({}, state, {
        rightTab: action.rightTab,
      });
    case "PARTICIPANT_CONNECTED":
      return Object.assign({}, state, {
        participants: [...state.participants, action.participant],
      });
    case "PARTICIPANT_DISCONNECTED":
      return Object.assign({}, state, {
        participants: state.participants.filter(
          (participant) => participant != action.participant
        ),
      });
    case "RECEIVE_VIDEO_ROOM":
      return Object.assign({}, state, {
        videoRoomName: action.videoRoomName,
      });
    default:
      return state;
  }
};

export default videoCallReducer;
