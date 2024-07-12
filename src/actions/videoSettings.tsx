import { Dispatch } from "redux";
import {
  attachTracks,
  detachTracks,
  stopTracks,
} from "../utils/trackFunctions";
import Video, {
  LocalVideoTrack,
  LocalAudioTrack,
  LocalParticipant,
  Track,
} from "twilio-video";

export function setLocalVideoTrack(localVideoTrack: LocalVideoTrack | null) {
  return {
    type: "SET_LOCAL_VIDEO_TRACK",
    localVideoTrack,
  };
}

export function setLocalAudioTrack(localAudioTrack: LocalAudioTrack | null) {
  return {
    type: "SET_LOCAL_AUDIO_TRACK",
    localAudioTrack,
  };
}

function disableOrEnableVideo(status: boolean) {
  return {
    type: "DISABLE_OR_ENABLE_VIDEO",
    videoStatus: status,
  };
}

function disableOrEnableAudio(status: boolean) {
  return {
    type: "DISABLE_OR_ENABLE_AUDIO",
    audioStatus: status,
  };
}

export function setVideoDevice(device: string) {
  return {
    type: "SET_VIDEO_DEVICE",
    videoDevice: device,
  };
}

export function setAudioDevice(device: string) {
  return {
    type: "SET_AUDIO_DEVICE",
    audioDevice: device,
  };
}

export function setOpenSettings(opened: boolean) {
  return {
    type: "OPEN_SETTINGS",
    opened,
  };
}

export function setOpenChat(chatOpened: boolean) {
  return {
    type: "OPEN_CHAT",
    chatOpened,
  };
}
export function resetTracks() {
  return {
    type: "RESET_TRACKS",
  };
}

export function setVideoDisabled(
  localTracks: Array<LocalVideoTrack>,
  localParticipant?: LocalParticipant
) {
  return (dispatch: Dispatch) => {
    detachTracks(localTracks);
    stopTracks(localTracks);
    dispatch(disableOrEnableVideo(false));
    dispatch(setLocalVideoTrack(null));

    if (localParticipant) {
      console.log(localParticipant);
      localTracks.forEach((track: any) => {
        localParticipant.unpublishTrack(track);
      });
    }
  };
}

export function setVideoEnabled(
  selectVideoDevice: string,
  localParticipant?: LocalParticipant
) {
  return async (dispatch: Dispatch) => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    console.log(localParticipant);
    const localVideoTrack = await Video.createLocalVideoTrack({
      deviceId: {
        exact: selectVideoDevice,
      },
    });

    dispatch(setLocalVideoTrack(localVideoTrack));

    dispatch(disableOrEnableVideo(true));
    if (localParticipant) {
      console.log(localParticipant);
      localParticipant.publishTrack(localVideoTrack);
    }
  };
}

export function setAudioDisabled(
  localTracks: Array<LocalAudioTrack>,
  localParticipant?: LocalParticipant
) {
  return (dispatch: Dispatch) => {
    detachTracks(localTracks);
    stopTracks(localTracks);
    dispatch(disableOrEnableAudio(false));
    dispatch(setLocalAudioTrack(null));
    if (localParticipant) {
      localParticipant.unpublishTracks(localTracks);
    }
  };
}

export function setAudioEnabled(
  selectAudioDevice: string,
  localParticipant?: LocalParticipant
) {
  return async (dispatch: Dispatch) => {
    const localAudioTrack = await Video.createLocalAudioTrack({
      deviceId: {
        exact: selectAudioDevice,
      },
    });

    dispatch(setLocalAudioTrack(localAudioTrack));

    dispatch(disableOrEnableAudio(true));
    if (localParticipant) {
      console.log("publish!");
      localParticipant.publishTrack(localAudioTrack);
    }
  };
}

export function stopVideoAndAudio(
  localParticipant: LocalParticipant,
  localVideoTrack: LocalVideoTrack,
  localAudioTrack: LocalAudioTrack
) {
  return (dispatch: Dispatch<any>) => {
    detachTracks([localVideoTrack, localAudioTrack]);
    stopTracks([localVideoTrack, localAudioTrack]);

    localParticipant.unpublishTracks([localVideoTrack, localAudioTrack]);
    dispatch(resetTracks());
  };
}

export function changeVideoInput(
  deviceId: string,
  localVideoTrack: LocalVideoTrack,
  localParticipant?: LocalParticipant
) {
  return async (dispatch: Dispatch) => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    detachTracks([localVideoTrack]);
    stopTracks([localVideoTrack]);

    if (localParticipant) {
      localParticipant.unpublishTracks([localVideoTrack]);
    }

    const createdTrack = await Video.createLocalVideoTrack({
      deviceId: {
        exact: deviceId,
      },
    });

    dispatch(setLocalVideoTrack(createdTrack));
    dispatch(setVideoDevice(deviceId));
    if (localParticipant) {
      console.log(localParticipant);
      localParticipant.publishTrack(createdTrack);
    }
  };
}

export function changeAudioInput(
  deviceId: string,
  localAudioTrack: LocalAudioTrack,
  localParticipant?: LocalParticipant
) {
  return async (dispatch: Dispatch) => {
    detachTracks([localAudioTrack]);
    stopTracks([localAudioTrack]);

    if (localParticipant) {
      localParticipant.unpublishTracks([localAudioTrack]);
    }

    const createdTrack = await Video.createLocalAudioTrack({
      deviceId: {
        exact: deviceId,
      },
    });

    dispatch(setLocalAudioTrack(createdTrack));
    dispatch(setAudioDevice(deviceId));
    if (localParticipant) {
      localParticipant.publishTrack(createdTrack);
    }
  };
}
