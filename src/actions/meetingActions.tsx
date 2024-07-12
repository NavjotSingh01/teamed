import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "redux";
import Video, { LocalVideoTrack, LocalAudioTrack } from "twilio-video";
import {
  setVideoDevice,
  setAudioDevice,
  setLocalVideoTrack,
} from "./videoSettings";

function setDevices(devices: Array<MediaDeviceInfo>) {
  return {
    type: "SET_DEVICES",
    devices,
  };
}

function receiveGetWaitingRoomThread(thread: string) {
  return {
    type: "RECEIVE_GET_WAITING_ROOM_THREAD",
    waitingRoomThread: thread,
  };
}

function setVideoDevices(devices: Array<MediaDeviceInfo>) {
  return {
    type: "SET_VIDEO_DEVICES",
    devices,
  };
}

function setAudioDevices(devices: Array<MediaDeviceInfo>) {
  return {
    type: "SET_AUDIO_DEVICES",
    devices,
  };
}

export function setLocalAudioTrack(localAudioTrack: LocalAudioTrack | null) {
  return {
    type: "SET_LOCAL_AUDIO_TRACK",
    localAudioTrack,
  };
}

function setEnabledPermissions(enabledPermissions: boolean) {
  return {
    type: "SET_ENABLED_PERMISSIONS",
    enabledPermissions,
  };
}

function requestValidatingOffice() {
  return {
    type: "REQUEST_VALIDATING_OFFICE",
    isFetchingOffice: true,
    validatingOfficeError: "",
  };
}

function receiveValidatingOffice(
  officeName: string,
  officePk: number,
  slug: string
) {
  return {
    type: "RECEIVE_VALIDATING_OFFICE",
    isFetchingOffice: false,
    officeName,
    officePk,
    slug,
  };
}

function errorValidatingOffice() {
  return {
    type: "ERROR_VALIDATING_OFFICE",
    isFetchingOffice: false,
    validatingOfficeError: "The link you entered isn't valid.",
  };
}

export function enableVideoAndAudioPermissions() {
  return async (dispatch: Dispatch<any>) => {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const devices = await navigator.mediaDevices.enumerateDevices();
    dispatch(setDevices(devices));
    dispatch(
      setVideoDevices(
        devices.filter(
          (device: MediaDeviceInfo) => device.kind === "videoinput"
        )
      )
    );
    dispatch(
      setAudioDevices(
        devices.filter(
          (device: MediaDeviceInfo) => device.kind === "audioinput"
        )
      )
    );

    const videoDevice = devices.filter(
      (device: any) => device.kind === "videoinput"
    )[0].deviceId;

    const audioDevice = devices.filter(
      (device: any) => device.kind === "audioinput"
    )[0].deviceId;

    dispatch(createLocalTracks(videoDevice, audioDevice));
  };
}

function createLocalTracks(videoId: string, audioId: string) {
  return async (dispatch: Dispatch) => {
    const localVideoTrack = await Video.createLocalVideoTrack({
      deviceId: {
        exact: videoId,
      },
    });

    dispatch(setLocalVideoTrack(localVideoTrack));

    const localAudioTrack = await Video.createLocalAudioTrack({
      deviceId: {
        exact: audioId,
      },
    });

    dispatch(setLocalAudioTrack(localAudioTrack));
    dispatch(setVideoDevice(videoId));
    dispatch(setAudioDevice(audioId));

    dispatch(setEnabledPermissions(true));
  };
}

export function validateOfficeSlug(officeSlug: string) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/office_slug/${officeSlug}`,
  };

  return (dispatch: Dispatch) => {
    dispatch(requestValidatingOffice());
    return axios(config)
      .then((res) => res.data)
      .then((data) => {
        dispatch(receiveValidatingOffice(data.name, data.pk, data.slug));
      })
      .catch((err) => {
        dispatch(errorValidatingOffice());
      });
  };
}

export function getWaitingRoomThread(patientPk: number, officeSlug: string) {
  let config: AxiosRequestConfig = {
    method: "get",
    url: `${process.env.REACT_APP_DEV_API}/appointments/guest-waiting-thread/${patientPk}/${officeSlug}/`,
  };

  return (dispatch: Dispatch<any>) => {
    return axios(config)
      .then((res) => res.data)
      .then((data) => dispatch(receiveGetWaitingRoomThread(data)));
  };
}
