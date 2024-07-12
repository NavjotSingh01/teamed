const initialState = {
  videoStatus: true,
  audioStatus: true,
  videoDevice: "",
  audioDevice: "",
  openSettings: false,
  chatOpened: false,
  localVideoTrack: null,
  localAudioTrack: null,
  settingUpVideo: false,
};

const videoSettings = (state = initialState, action: any) => {
  switch (action.type) {
    case "DISABLE_OR_ENABLE_VIDEO":
      return Object.assign({}, state, {
        videoStatus: action.videoStatus,
      });
    case "DISABLE_OR_ENABLE_AUDIO":
      return Object.assign({}, state, {
        audioStatus: action.audioStatus,
      });
    case "RESET_DEVICES":
      return Object.assign({}, state, {
        localVideoTrack: null,
        localAudioTrack: null,
        settingUpVideo: false,
      });
    case "SET_VIDEO_DEVICE":
      return Object.assign({}, state, {
        videoDevice: action.videoDevice,
      });
    case "SET_AUDIO_DEVICE":
      return Object.assign({}, state, {
        audioDevice: action.audioDevice,
      });
    case "OPEN_SETTINGS":
      return Object.assign({}, state, {
        openSettings: action.opened,
      });
    case "OPEN_CHAT":
      return Object.assign({}, state, {
        chatOpened: action.chatOpened,
      });
    case "SET_DEVICES":
      return Object.assign({}, state, {
        devices: action.devices,
      });
    case "SET_VIDEO_DEVICES":
      return Object.assign({}, state, {
        videoDevices: action.devices,
      });
    case "SET_AUDIO_DEVICES":
      return Object.assign({}, state, {
        audioDevices: action.devices,
      });
    case "SET_LOCAL_VIDEO_TRACK":
      return Object.assign({}, state, {
        localVideoTrack: action.localVideoTrack,
      });
    case "SET_LOCAL_AUDIO_TRACK":
      return Object.assign({}, state, {
        localAudioTrack: action.localAudioTrack,
      });
    case "SET_ENABLED_PERMISSIONS":
      return Object.assign({}, state, {
        hasEnabledPermissions: action.enabledPermissions,
      });
    case "SET_ENABLED_PERMISSIONS":
      return Object.assign({}, state, {
        hasEnabledPermissions: action.enabledPermissions,
      });
    case "REQUEST_VALIDATING_OFFICE":
      return Object.assign({}, state, {
        isFetchingOffice: true,
        validatingOfficeError: "",
      });
    case "RECEIVE_VALIDATING_OFFICE":
      return Object.assign({}, state, {
        isFetchingOffice: false,
        officeName: action.officeName,
        officePk: action.officePk,
        officeSlug: action.slug,
      });
    case "ERROR_VALIDATING_OFFICE":
      return Object.assign({}, state, {
        isFetchingOffice: false,
        validatingOfficeError: "The link you entered isn't valid.",
      });
    // case "RECEIVE_GET_WAITING_ROOM_THREAD":
    //   return Object.assign({}, state, {
    //     thread: action.waitingRoomThread,
    //   });
    default:
      return state;
  }
};

export default videoSettings;
