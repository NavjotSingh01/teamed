import axios from "axios";
import { socketIsReady, socketDisconnect } from "./socketActions";
import Video from "twilio-video";
const Chat = require("twilio-chat");

function receiveGetMediaDevices(devices) {
  return {
    type: "RECEIVE_GET_MEDIA_DEVICES",
    devices,
  };
}

function errorGetMediaDevices() {
  return {
    type: "ERROR_GET_MEDIA_DEVICES",
    mediaDeviceErrorMessage:
      "Failed to retrieve Media Devices. This could mean that you are using an unsupported browser or do not have a video device.",
  };
}

function requestChatConnection() {
  return {
    type: "REQUEST_CHAT_CONNECTION",
    isConnectingToChat: true,
    chatConnectionError: "",
  };
}

function resetRoom() {
  return {
    type: "RESET_ROOM",
    room: null,
    videoToken: null,
  };
}

function receiveChatConnection() {
  return {
    type: "RECEIVE_CHAT_CONNECTION",
    isConnectingToChat: false,
    hasConnectedToChat: true,
  };
}

function errorChatConnection(err) {
  return {
    type: "ERROR_CHAT_CONNECTION",
    isConnectingToChat: false,
    hasConnectedToChat: false,
    chatConnectionError: `${err}`,
  };
}

function requestCreateTwilioClient() {
  return {
    type: "REQUEST_CREATE_TWILIO_CLIENT",
    isCreatingClient: true,
  };
}

function receiveCreateTwilioClient(client) {
  return {
    type: "RECEIVE_CREATE_TWILIO_CLIENT",
    isCreatingClient: false,
    client: client,
  };
}

function requestGetChannelName() {
  return {
    type: "REQUEST_GET_CHANNEL_NAME",
    isFetchingChannelName: true,
  };
}

function receivedGetChannelName(name) {
  return {
    type: "RECEIVED_GET_CHANNEL_NAME",
    isFetchingChannelName: false,
    channelName: name,
  };
}

function requestJoinChannel() {
  return {
    type: "REQUEST_JOIN_CHANNEL",
    isJoiningChannel: true,
  };
}

function setWaitingList(number) {
  return {
    type: "SET_WAITING_LIST",
    number,
  };
}

export function getOldMessages(messages) {
  return {
    type: "GET_OLD_MESSAGES",
    messages: messages,
  };
}

export function setMessages(obj) {
  return {
    type: "SET_MESSAGES",
    obj: obj,
  };
}

export function setParticipant(participant) {
  return {
    type: "SET_PARTICIPANT",
    participant,
  };
}

export function removeParticipant(participant) {
  return {
    type: "REMOVE_PARTICIPANT",
    participant,
  };
}

function receiveJoinChannel(chatChannel) {
  return {
    type: "RECEIVE_JOIN_CHANNEL",
    isJoiningChannel: false,
    chatChannel: chatChannel,
  };
}

function errorJoinChannel() {
  return {
    type: "ERROR_JOIN_CHANNEL",
    isJoiningChannel: false,
    chatChannel: null,
  };
}

function receiveCreateSocketConnection(socket) {
  return {
    type: "CREATE_SOCKET_CONNECTION",
    hasCreatedSocket: true,
    socket: socket,
  };
}

function closeSocketConnection(socket) {
  return {
    type: "CLOSE_SOCKET_CONNECTION",
    hasCreatedSocket: false,
  };
}

function errorCreateSocketConnection(err) {
  return {
    type: "ERROR_CREATE_SOCKET_CONNECTION",
    errorMessage: `Unable to create socket connection: ${err}`,
  };
}

function setReadySignal() {
  return {
    type: "SET_READY_SIGNAL",
    adminIsReady: true,
  };
}

function setRemoveReadySignal() {
  return {
    type: "SET_REMOVE_READY_SIGNAL",
    adminIsReady: false,
  };
}

function requestGetVideoChatRoomToken() {
  return {
    type: "REQUEST_GET_VIDEO_CHAT_ROOM_TOKEN",
    isFetchingVideoToken: true,
  };
}

function receiveGetVideoChatRoomToken(token) {
  return {
    type: "RECEIVE_GET_VIDEO_CHAT_ROOM_TOKEN",
    isFetchingVideoToken: false,
    videoToken: token,
  };
}

function setVideoRoomAction(room) {
  return {
    type: "SET_VIDEO_ROOM",
    room,
  };
}

function createChatClient(token) {
  return new Promise((resolve, reject) => {
    resolve(Chat.Client.create(token));
  });
}

function requestGetVideoName() {
  return {
    type: "REQUEST_GET_VIDEO_NAME",
    isFetchingVideoName: true,
  };
}

function receiveGetVideoName(videoName) {
  return {
    type: "RECEIVE_GET_VIDEO_NAME",
    isFetchingVideoName: false,
    videoChannelName: videoName,
  };
}

function receiveUnconsumedMessagesCount(messages) {
  return {
    type: "RECEIVE_UNCONSUMED_MESSAGES_COUNT",
    unreadMessagesCount: messages,
  };
}

function requestGetWaitingRoomThread() {
  return {
    type: "REQUEST_GET_WAITING_ROOM_THREAD",
    waitingRoomThread: null,
    isFetchingWaitingRoomThread: true,
  };
}

function receiveGetWaitingRoomThread(thread) {
  return {
    type: "RECEIVE_GET_WAITING_ROOM_THREAD",
    waitingRoomThread: thread,
    isFetchingWaitingRoomThread: false,
  };
}

function errorGetWaitingRoomThread(err) {
  return {
    type: "ERROR_GET_WAITING_ROOM_THREAD",
    isFetchingWaitingRoomThread: false,
    threadErr: err,
  };
}

export function setNullPosition() {
  return {
    type: "SET_NULL_POSITION",
    removedFromWaitingList: true,
  };
}

export function getChatConnection(email) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/doctor_twilio_auth/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      email: email,
    },
  };
  return (dispatch) => {
    dispatch(requestChatConnection());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("chat_token", data);
        dispatch(receiveChatConnection());
      })
      .catch((err) => {
        dispatch(errorChatConnection(err));
      });
  };
}

export function getChannelName(user_pk, office_pk) {
  let token = localStorage.getItem("id_token");
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/chat/${user_pk}/${office_pk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(requestGetChannelName());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receivedGetChannelName(data.chat_name));
      });
  };
}

export function getVideoName(user_pk, office_pk) {
  let token = localStorage.getItem("id_token");
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/video-chat/${user_pk}/${office_pk}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    dispatch(requestGetVideoName());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetVideoName(data[0].chat_name));
      });
  };
}

export function createTwilioClient(user_pk, office_pk) {
  const token = localStorage.getItem("chat_token");
  return (dispatch) => {
    dispatch(requestCreateTwilioClient());
    createChatClient(token)
      .then((client) => {
        dispatch(receiveCreateTwilioClient(client));
        dispatch(getChannelName(user_pk, office_pk, client));
        dispatch(getVideoName(user_pk, office_pk));
      })
      .catch((err) => console.log(err));
  };
}

export function joinChannel(chatClient, chat_name) {
  console.log(chatClient);
  console.log(chat_name);
  return (dispatch) => {
    dispatch(requestJoinChannel());
    chatClient
      .getSubscribedChannels()
      .then((chat_room) => {
        chatClient
          .getChannelByUniqueName(chat_name)
          .then((chatChannel) => {
            if (chatChannel.state.status !== "joined") {
              chatChannel
                .join()
                .then(() => {
                  dispatch(setMessages({ body: "Joining general channel..." }));
                })
                .catch(() => Error("Could not join general channel."));
            }

            // window.addEventListener("beforeunload", () => chatChannel.leave());
            return chatChannel;
          })
          .then((chatChannel) => {
            dispatch(receiveJoinChannel(chatChannel));
            chatChannel
              .getUnconsumedMessagesCount()
              .then((messages) => {
                console.log(`messages: ${messages}`);
                dispatch(receiveUnconsumedMessagesCount(messages));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            dispatch(errorJoinChannel());
            console.log(err);

            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("grrrr");
        console.log(err.message);
      });
  };
}

export function createSocketConnection(office_slug, patientPk) {
  return (dispatch) => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_DEV_SOCKET}/office/${office_slug}/${patientPk}/`
    );
    socket.onopen = function () {
      dispatch(receiveCreateSocketConnection(socket));
      dispatch(socketIsReady());
    };

    socket.onclose = function () {
      dispatch(closeSocketConnection(socket));
      dispatch(socketDisconnect());
    };

    socket.onerror = function (err) {
      dispatch(errorCreateSocketConnection(err));
      dispatch(socketDisconnect());
    };
  };
}

export function createInboxSocketConnection(patientPk) {
  return (dispatch) => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_DEV_SOCKET}/patient/${patientPk}/`
    );
    socket.onopen = function () {
      dispatch(receiveCreateSocketConnection(socket));
      dispatch(socketIsReady());
    };

    socket.onclose = function () {
      dispatch(closeSocketConnection(socket));
      dispatch(socketDisconnect());
    };

    socket.onerror = function (err) {
      dispatch(errorCreateSocketConnection(err));
      dispatch(socketDisconnect());
    };
  };
}

export function createSocketConnectionAndEnterTriage(office_slug, patientPk) {
  return (dispatch) => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_DEV_SOCKET}/office/${office_slug}/${patientPk}/`
    );
    socket.onopen = function () {
      dispatch(receiveCreateSocketConnection(socket));
      dispatch(socketIsReady());
      socket.send(
        JSON.stringify({
          type: "JOIN_WAITING_ROOM",
          patient: patientPk,
          is_patient: true,
          office: office_slug,
        })
      );
    };

    socket.onclose = function () {
      dispatch(closeSocketConnection(socket));
      dispatch(socketDisconnect());
    };

    socket.onerror = function (err) {
      dispatch(errorCreateSocketConnection(err));
      dispatch(socketDisconnect());
    };
  };
}

export function reconnectSocketConnection(
  office_slug,
  socket_config,
  patientPk
) {
  return (dispatch) => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_DEV_SOCKET}/office/${office_slug}/${patientPk}/`
    );
    socket.onopen = function () {
      dispatch(receiveCreateSocketConnection(socket));
      socket.send(socket_config);
    };

    socket.onclose = function () {
      dispatch(closeSocketConnection(socket));
    };

    socket.onerror = function (err) {
      dispatch(errorCreateSocketConnection(err));
    };
  };
}

export function getWaitingList(number) {
  return (dispatch) => {
    dispatch(setWaitingList(number));
  };
}

export function getReadySignal() {
  return (dispatch) => {
    dispatch(setReadySignal());
  };
}

export function removeReadySignal() {
  return (dispatch) => {
    dispatch(setRemoveReadySignal());
  };
}

export function getVideoChatRoomToken(chatRoom, email) {
  const token = localStorage.getItem("id_token");

  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/video_token/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      email: email,
      chatRoom: chatRoom,
    },
  };

  return (dispatch) => {
    dispatch(requestGetVideoChatRoomToken());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetVideoChatRoomToken(data));
      });
  };
}

export function setVideoRoom(room) {
  return (dispatch) => {
    dispatch(setVideoRoomAction(room));
  };
}

export function getMediaDevices() {
  return (dispatch) => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoDevices = devices.filter(
            (item) => item.kind == "videoinput"
          );
          console.log(videoDevices);
          dispatch(receiveGetMediaDevices(devices));
        })
        .catch((err) => {
          console.log(err);
          dispatch(errorGetMediaDevices());
        });
    } else {
      dispatch(errorGetMediaDevices());
    }
  };
}

export function disconnectFromRoom(room) {
  room.disconnect();
  return (dispatch) => {
    dispatch(resetRoom());
  };
}

export function endVideoCall(videoName) {
  let token = localStorage.getItem("id_token");
  let config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV_API}/end_room_on_disconnect/`,
    data: {
      room: videoName,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    return axios(config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
}

export function resetPatient() {
  return {
    type: "RESET_PATIENT",
  };
}

export function confirmWaitingRoom(confirm) {
  return {
    type: "CONFIRM_WAITING_ROOM",
    waitingRoomConfirmation: confirm,
  };
}

export function incrementUnreadMessages() {
  return {
    type: "INCREMENT_UNREAD_MESSAGES",
  };
}

export function resetUnreadMessages() {
  return {
    type: "RESET_UNREAD_MESSAGES",
  };
}

export function getWaitingRoomThread(patientPk, officeSlug) {
  const token = localStorage.getItem("id_token");
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/waiting-thread/${patientPk}/${officeSlug}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    dispatch(requestGetWaitingRoomThread());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveGetWaitingRoomThread(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorGetWaitingRoomThread(err.response));
      });
  };
}

export function joinCall(videoChannelName, videoToken) {
  return (dispatch) => {
    console.log(videoToken);
    Video.connect(videoToken, {
      name: videoChannelName,
      _useTwilioConnection: true,
      maxAudioBitrate: 16000,
      video: {
        height: 640,
        frameRate: 24,
        width: 480,
      },
      audio: true,
      bandwidthProfile: {
        video: {
          mode: "grid",
          maxSubscriptionBitrate: 2500000,
        },
      },
      networkQuality: { local: 1, remote: 1 },
    }).then(
      (room) => {
        // attachTracks([localAudioTrack], localAudio.current);

        dispatch(setVideoRoom(room));
      },
      (error) => {
        console.log(error);
        alert("We couldn't connect you to the room.");
      }
    );
  };
}
