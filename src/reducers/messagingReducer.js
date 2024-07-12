const initialState = {
  isCreatingMessageThread: false,
  creatingMessageThreadMessage: "",
  isAddingMessageToThread: false,
  isAddingMessageToThreadMessage: "",
  isGettingMessageThreads: false,
  isGettingMessageMessage: "",
  hasCreatedMessage: false,
  messageThreads: [],
  isFetchingMessageThread: false,
  isFetchingMessageMessage: "",
  selectedThread: null,
  isRequestingUnreadMessages: false,
  unreadMessages: 0,
};

const messagingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_CREATE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isCreatingMessageThread: true,
        creatingMessageThreadMessage: "",
      });
    case "RECEIVE_CREATE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isCreatingMessageThread: false,
      });
    case "ERROR_CREATE_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isCreatingMessageThread: false,
        creatingMessageThreadMessage: action.creatingMessageThreadMessage,
      });
    case "REQUEST_ADD_MESSAGE_TO_THREAD":
      return Object.assign({}, state, {
        isAddingMessageToThread: true,
        isAddingMessageToThreadMessage: "",
      });
    case "RECEIVE_ADD_MESSAGE_TO_THREAD":
      return Object.assign({}, state, {
        isAddingMessageToThread: false,
      });
    case "ERROR_ADD_MESSAGE_TO_THREAD":
      return Object.assign({}, state, {
        isAddingMessageToThread: false,
        isAddingMessageToThreadMessage: action.isAddingMessageToThreadMessage,
      });
    case "REQUEST_GET_MESSAGE_THREADS":
      return Object.assign({}, state, {
        isGettingMessageThreads: true,
        message: "",
      });
    case "RECEIVE_GET_MESSAGE_THREADS":
      return Object.assign({}, state, {
        isGettingMessageThreads: false,
        messageThreads: action.threads,
      });
    case "ERROR_GET_MESSAGE_THREADS":
      return Object.assign({}, state, {
        isGettingMessageThreads: false,
        isGettingMessageMessage: action.message,
      });
    case "REQUEST_GET_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isFetchingMessageThread: true,
        isFetchingMessageMessage: "",
      });
    case "RECEIVE_GET_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isFetchingMessageThread: false,
        selectedThread: action.selectedThread,
      });
    case "ERROR_GET_MESSAGE_THREAD":
      return Object.assign({}, state, {
        isFetchingMessageThread: false,
        isFetchingMessageMessage: action.isFetchingMessageMessage,
      });
    case "ADD_TO_END_OF_MESSAGES":
      return Object.assign({}, state, {
        selectedThread: {
          ...state.selectedThread,
          message_set: [...state.selectedThread.message_set, action.message],
        },
      });
    case "REQUEST_UNREAD_MESSAGES":
      return Object.assign({}, state, {
        isRequestingUnreadMessages: true,
      });
    case "RECEIVE_UNREAD_MESSAGES":
      return Object.assign({}, state, {
        isRequestingUnreadMessages: false,
        unreadMessages: action.unreadMessages,
      });

    default:
      return state;
  }
};

export default messagingReducer;
