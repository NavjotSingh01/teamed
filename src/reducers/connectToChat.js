import { Media } from "twilio-chat/lib/media";

const initialState = {
  isConnectingToChat: false,
  hasConnectedToChat: false,
  isCreatingClient: false,
  client: null,
  isFetchingChannelName: false,
  channelName: null,
  isJoiningChannel: false,
  hasJoinedChannel: false,
  chatChannel: null,
  messages: [],
  hasCreatedSocket: false,
  socket: null,
  waitingQueue: 0,
  adminIsReady: false,
  isFetchingVideoToken: false,
  videoToken: null,
  videoRoom: null,
  participants: [],
  removedFromWaitingList: false,
  devices: null,
  isFetchingVideoName: false,
  videoChannelName: null,
  mediaDeviceErrorMessage: "",
  waitingRoomConfirmation: false,
  chatConnectionError: "",
  joinChatErrorMessage: "",
  unreadMessagesCount: 0,
  waitingRoomThread: null,
  isFetchingWaitingRoomThread: false,
  theadErr: "",
};

const connectToChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_CHAT_CONNECTION":
      return Object.assign({}, state, {
        isConnectingToChat: true,
        chatConnectionError: "",
      });
    case "RECEIVE_CHAT_CONNECTION":
      return Object.assign({}, state, {
        isConnectingToChat: false,
        hasConnectedToChat: true,
      });
    case "ERROR_CHAT_CONNECTION":
      return Object.assign({}, state, {
        isConnectingToChat: false,
        hasConnectedToChat: false,
        chatConnectionError: action.chatConnectionError,
      });
    case "REQUEST_CREATE_TWILIO_CLIENT":
      return Object.assign({}, state, {
        isCreatingClient: true,
      });
    case "RECEIVE_CREATE_TWILIO_CLIENT":
      return Object.assign({}, state, {
        isCreatingClient: false,
        client: action.client,
      });
    case "REQUEST_GET_CHANNEL_NAME":
      return Object.assign({}, state, {
        isFetchingChannelName: true,
      });
    case "RECEIVED_GET_CHANNEL_NAME":
      return Object.assign({}, state, {
        isFetchingChannelName: false,
        channelName: action.channelName,
      });
    case "REQUEST_JOIN_CHANNEL":
      return Object.assign({}, state, {
        isJoiningChannel: true,
        removedFromWaitingList: false,
        joinChatErrorMessage: "",
      });
    case "RECEIVE_JOIN_CHANNEL":
      return Object.assign({}, state, {
        isJoiningChannel: false,
        hasJoinedChannel: true,
        chatChannel: action.chatChannel,
      });
    case "ERROR_JOIN_CHANNEL":
      return Object.assign({}, state, {
        isJoiningChannel: false,
        hasJoinedChannel: false,
        joinChatErrorMessage: "Couldn't connect to chat.",
      });
    case "SET_MESSAGES":
      return Object.assign({}, state, {
        messages: [...state.messages, action.obj],
      });
    case "SET_PARTICIPANT":
      return Object.assign({}, state, {
        participants: [...state.participants, action.participant],
      });
    case "REMOVE_PARTICIPANT":
      return Object.assign({}, state, {
        participants: [
          ...state.participants.filter(
            (element) => element !== action.participant
          ),
        ],
      });
    case "RESET_MESSAGES":
      return Object.assign({}, state, {
        messages: [],
      });
    case "GET_OLD_MESSAGES":
      return Object.assign({}, state, {
        messages: action.messages,
      });
    case "CREATE_SOCKET_CONNECTION":
      return Object.assign({}, state, {
        hasCreatedSocket: true,
        socket: action.socket,
      });
    case "CLOSE_SOCKET_CONNECTION":
      return Object.assign({}, state, {
        hasCreateSocket: false,
      });
    case "ERROR_CREATE_SOCKET_CONNECTION":
      alert(
        "There was an error connecting to the virtual office. Please check your connection or if anything is blocking your connection (VPN, Blockers, etc)"
      );
      return Object.assign({}, state, {
        hasCreatedSocket: false,
        errorMessage: action.errorMessage,
      });
    case "SET_WAITING_LIST":
      return Object.assign({}, state, {
        waitingQueue: action.number,
      });
    case "SET_READY_SIGNAL":
      return Object.assign({}, state, {
        adminIsReady: true,
      });
    case "SET_REMOVE_READY_SIGNAL":
      return Object.assign({}, state, {
        adminIsReady: false,
      });
    case "REQUEST_GET_VIDEO_CHAT_ROOM_TOKEN":
      return Object.assign({}, state, {
        isFetchingVideoToken: true,
      });
    case "RECEIVE_GET_VIDEO_CHAT_ROOM_TOKEN":
      return Object.assign({}, state, {
        isFetchingVideoToken: false,
        videoToken: action.videoToken,
      });
    // case "SET_VIDEO_ROOM":
    //   return Object.assign({}, state, {
    //     videoRoom: action.room,
    //   });
    case "SET_NULL_POSITION":
      return Object.assign({}, state, {
        removedFromWaitingList: true,
      });
    case "RECEIVE_GET_MEDIA_DEVICES":
      return Object.assign({}, state, {
        devices: action.devices,
      });
    case "ERROR_GET_MEDIA_DEVICES":
      return Object.assign({}, state, {
        mediaDeviceErrorMessage: action.mediaDeviceErrorMessage,
      });
    case "RESET_ROOM":
      return Object.assign({}, state, {
        videoRoom: null,
        videoToken: null,
      });
    case "REQUEST_GET_VIDEO_NAME":
      return Object.assign({}, state, {
        isFetchingVideoName: true,
      });
    case "RECEIVE_GET_VIDEO_NAME":
      return Object.assign({}, state, {
        isFetchingVideoName: false,
        videoChannelName: action.videoChannelName,
      });
    case "CONFIRM_WAITING_ROOM":
      return Object.assign({}, state, {
        waitingRoomConfirmation: action.waitingRoomConfirmation,
      });
    case "RECEIVE_UNCONSUMED_MESSAGES_COUNT":
      return Object.assign({}, state, {
        unreadMessagesCount: action.unreadMessagesCount,
      });
    case "INCREMENT_UNREAD_MESSAGES":
      return Object.assign({}, state, {
        unreadMessagesCount: state.unreadMessagesCount + 1,
      });
    case "RESET_UNREAD_MESSAGES":
      return Object.assign({}, state, {
        unreadMessagesCount: 0,
      });
    case "REQUEST_GET_WAITING_ROOM_THREAD":
      return Object.assign({}, state, {
        isFetchingWaitingRoomThread: true,
        theadErr: "",
      });
    case "RECEIVE_GET_WAITING_ROOM_THREAD":
      return Object.assign({}, state, {
        waitingRoomThread: action.waitingRoomThread,
        isFetchingWaitingRoomThread: false,
      });
    case "ERROR_GET_WAITING_ROOM_THREAD":
      return Object.assign({}, state, {
        isFetchingWaitingRoomThread: false,
        threadErr: action.threadErr,
      });

    case "RESET_PATIENT":
      return Object.assign({}, state, {
        isConnectingToChat: false,
        hasConnectedToChat: false,
        isCreatingClient: false,
        client: null,
        isFetchingChannelName: false,
        channelName: null,
        isJoiningChannel: false,
        hasJoinedChannel: false,
        chatChannel: null,
        messages: [],
        hasCreatedSocket: false,
        socket: null,
        waitingQueue: 0,
        adminIsReady: false,
        isFetchingVideoToken: false,
        videoToken: null,
        videoRoom: null,
        participants: [],
        removedFromWaitingList: false,
        devices: null,
        isFetchingVideoName: false,
        videoChannelName: null,
        waitingRoomConfirmation: false,
        chatConnectionError: "",
        joinChatErrorMessage: "",
        unreadMessagesCount: 0,
      });
    default:
      return state;
  }
};

export default connectToChatReducer;
