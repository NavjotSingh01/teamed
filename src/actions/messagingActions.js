import axios from "axios";

function requestCreateMessageThread() {
  return {
    type: "REQUEST_CREATE_MESSAGE_THREAD",
    isCreatingMessageThread: true,
    creatingMessageThreadMessage: "",
  };
}

function receiveCreateMessageThread() {
  return {
    type: "RECEIVE_CREATE_MESSAGE_THREAD",
    isCreatingMessageThread: false,
  };
}

function errorCreateMessageThread(err) {
  return {
    type: "ERROR_CREATE_MESSAGE_THREAD",
    isCreatingMessageThread: false,
    creatingMessageThreadMessage: `${err}`,
  };
}

function requestAddMessageToThread() {
  return {
    type: "REQUEST_ADD_MESSAGE_TO_THREAD",
    isAddingMessageToThread: true,
    isAddingMessageToThreadMessage: "",
  };
}

function receiveAddMessageToThread() {
  return {
    type: "RECEIVE_ADD_MESSAGE_TO_THREAD",
    isAddingMessageToThread: false,
  };
}
function errorAddMessageToThread(err) {
  return {
    type: "ERROR_ADD_MESSAGE_TO_THREAD",
    isAddingMessageToThread: false,
    isAddingMessageToThreadMessage: `${err}`,
  };
}

function requestGetMessageThreads() {
  return {
    type: "REQUEST_GET_MESSAGE_THREADS",
    isGettingMessageThreads: true,
    message: "",
  };
}

function receiveGetMessageThreads(threads) {
  return {
    type: "RECEIVE_GET_MESSAGE_THREADS",
    isGettingMessageThreads: false,
    threads,
  };
}

function errorReceiveGetMessageThreads(err) {
  return {
    type: "ERROR_GET_MESSAGE_THREADS",
    isGettingMessageThreads: false,
    message: `${err}`,
  };
}

function requestGetMessageThread() {
  return {
    type: "REQUEST_GET_MESSAGE_THREAD",
    isFetchingMessageThread: true,
    isFetchingMessageMessage: "",
  };
}

function receiveGetMessageThread(thread) {
  return {
    type: "RECEIVE_GET_MESSAGE_THREAD",
    isFetchingMessageThread: false,
    selectedThread: thread,
  };
}

function errorGetMessageThread(err) {
  return {
    type: "ERROR_GET_MESSAGE_THREAD",
    isFetchingMessageThread: false,
    isFetchingMessageMessage: `${err.response}`,
  };
}

function requestUnreadMessages() {
  return {
    type: "REQUEST_UNREAD_MESSAGES",
    isRequestingUnreadMessages: true,
  };
}

function receiveUnreadMessages(data) {
  return {
    type: "RECEIVE_UNREAD_MESSAGES",
    isRequestingUnreadMessages: false,
    unreadMessages: data,
  };
}

export function createMessageThread(
  subject,
  message,
  patient_id,
  office_id,
  user_id,
  office_slug
) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/messaging/create_message_thread/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      subject,
      patient: patient_id,
      office: office_id,
    },
  };
  return (dispatch) => {
    dispatch(requestCreateMessageThread());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveCreateMessageThread());
        dispatch(
          addMessageToThread(message, user_id, data.pk, patient_id, office_slug)
        );
      })
      .catch((err) => {
        dispatch(errorCreateMessageThread(err.response));
      });
  };
}

export function addMessageToThread(
  message,
  userId,
  messageThreadId,
  patientPk,
  office_slug,
  created
) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/messaging/add_message/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      message_thread: messageThreadId,
      sent_by: userId,
      message,
    },
  };

  return (dispatch) => {
    dispatch(requestAddMessageToThread());
    axios(config)
      .then((res) => {
        dispatch(receiveAddMessageToThread());
        if (created) {
          dispatch(getMessageThreads(patientPk, office_slug));
        } else {
          dispatch(getMessageThread(messageThreadId));
        }
      })
      .catch((err) => {
        dispatch(errorAddMessageToThread(err.response));
      });
  };
}

function addMessageToEnd(message) {
  return {
    type: "ADD_TO_END_OF_MESSAGES",
    message,
  };
}

export function getMessageThreads(patientPk, officeSlug) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/messaging/list_threads/${patientPk}/${officeSlug}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestGetMessageThreads());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetMessageThreads(data));
      })
      .catch((err) => {
        dispatch(errorReceiveGetMessageThreads(err.response));
      });
  };
}

export function getMessageThread(threadId) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/messaging/message_thread/${threadId}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestGetMessageThread());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetMessageThread(data));
      })
      .catch((err) => {
        dispatch(errorGetMessageThread(err.response));
      });
  };
}

export function updateReadStatus(
  selectedThread,
  status,
  patientPk,
  officeSlug
) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "patch",
    url: `${process.env.REACT_APP_DEV_API}/messaging/message_thread_update/${selectedThread}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      patient_read: true,
    },
  };

  return (dispatch) => {
    axios(config).then((res) => {
      //removed re-calling of getMessageThreads, as getMessageThreads is called when the "Messaging" service is clicked
    });
  };
}

export function getUnreadMessages(office, profile) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/messaging/unread_messages/${profile}/`, //Changed URL as inbox no longer relies on Office
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestUnreadMessages());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveUnreadMessages(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
