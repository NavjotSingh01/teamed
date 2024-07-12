const initialState = {
  settingUpVideo: false,
  errorMessage: "",
};

const videoAudio = (state = initialState, action) => {
  switch (action.type) {
    case "SETUP_VIDEO_DEVICES":
      return Object.assign({}, state, {
        settingUpVideo: true,
      });
    case "SETUP_VIDEO_DEVICES":
      return Object.assign({}, state, {
        settingUpVideo: false,
      });
    case "FAILED_SETUP_VIDEO_DEVICES":
      return Object.assign({}, state, {
        settingUpVideo: false,
        errorMessage: action.errorMessage,
      });

    default:
      return state;
  }
};

export default videoAudio;
