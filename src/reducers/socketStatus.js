const initialState = {
  socketStatus: "disconnected",
  pastTriage: false,
};

const socketStatus = (state = initialState, action) => {
  switch (action.type) {
    case "SOCKET_READY":
      return Object.assign({}, state, {
        socketStatus: "connected",
      });
    case "SOCKET_DISCONNECT":
      return Object.assign({}, state, {
        socketStatus: "disconnected",
      });
    case "SOCKET_PAST_TRIAGE":
      return Object.assign({}, state, {
        pastTriage: true,
      });
    case "RESET_SOCKET_PAST_TRIAGE":
      return Object.assign({}, state, {
        pastTriage: false,
      });
    default:
      return state;
  }
};

export default socketStatus;
