export function socketIsReady() {
  return {
    type: "SOCKET_READY",
    socketStatus: "connected",
  };
}

export function socketDisconnect() {
  return {
    type: "SOCKET_DISCONNECT",
    socketStatus: "disconnected",
  };
}

// This is activated when passing triage. This is for when a patient disconnects from socket and wants to bypass Triage
export function socketPastTriage() {
  return {
    type: "SOCKET_PAST_TRIAGE",
    pastTriage: true,
  };
}

export function resetSocketPastTriage() {
  return {
    type: "RESET_SOCKET_PAST_TRIAGE",
    pastTriage: false,
  };
}
