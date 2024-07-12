export function setLocalAudioTrack(localAudioTrack) {
  return {
    type: "SET_LOCAL_AUDIO_TRACK",
    localAudioTrack,
  };
}

export function setupVideoDevices() {
  return {
    type: "SETUP_VIDEO_DEVICES",
    errorMessage: "",
  };
}

export function failedSetupVideoDevices(err) {
  return {
    type: "FAILED_SETUP_VIDEO_DEVICES",
    errorMessage: err,
  };
}

export function setupVideoDevicesFinished() {
  return {
    type: "SETUP_VIDEO_DEVICES_FINISHED",
  };
}

export function resetDevices() {
  return {
    type: "RESET_DEVICES",
  };
}
