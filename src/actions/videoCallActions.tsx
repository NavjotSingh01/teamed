import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "redux";
import { isMobile, isBrowser } from "react-device-detect";
import Video, {
  LocalAudioTrack,
  LocalVideoTrack,
  Room,
  LocalParticipant,
  RemoteParticipant,
} from "twilio-video";

export function setRightTab(rightTab: string) {
  return {
    type: "SET_RIGHT_TAB",
    rightTab,
  };
}

function requestGetVideoToken() {
  return {
    type: "REQUEST_GET_VIDEO_TOKEN",
    isFetchingVideoToken: true,
  };
}

function receiveGetVideoToken(token: string) {
  return {
    type: "RECEIVE_GET_VIDEO_TOKEN",
    isFetchingVideoToken: false,
    videoToken: token,
  };
}

function errorGetVideoToken() {
  return {
    type: "ERROR_GET_VIDEO_TOKEN",
    isFetchingVideoToken: false,
    errorMessage:
      "Could not receive Video Token. Please refresh your browser and try again.",
  };
}

function setVideoRoom(room: Room) {
  return {
    type: "SET_VIDEO_ROOM",
    room,
  };
}

function setLocalParticipant(localParticipant: LocalParticipant) {
  return {
    type: "SET_LOCAL_PARTICIPANT",
    localParticipant,
  };
}

export function participantConnected(participant: RemoteParticipant) {
  return {
    type: "PARTICIPANT_CONNECTED",
    participant,
  };
}

export function participantDisconnected(participant: RemoteParticipant) {
  return {
    type: "PARTICIPANT_DISCONNECTED",
    participant,
  };
}

export function setDominantSpeaker(participant: RemoteParticipant | null) {
  return {
    type: "SET_DOMINANT_SPEAKER",
    dominantSpeaker: participant,
  };
}

export function getVideoToken(
  email: string,
  fullName: string,
  roomName: string
) {
  let config: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_DEV_API}/meet/video-token/`,
    data: {
      email,
      fullName,
      chatRoom: roomName,
    },
  };

  return (dispatch: Dispatch<any>) => {
    dispatch(requestGetVideoToken());
    return axios(config)
      .then((res) => res.data)
      .then((data) => dispatch(receiveGetVideoToken(data)))
      .catch((err) => console.log(err));
  };
}

export function connectToRoom(
  videoToken: string,
  roomName: string,
  localVideoTrack: LocalVideoTrack,
  localAudioTrack: LocalAudioTrack
) {
  return async (dispatch: Dispatch<any>) => {
    let room: any = null;
    let tracks: Array<LocalVideoTrack | LocalAudioTrack> = [];

    if (localVideoTrack && localAudioTrack) {
      tracks = [localVideoTrack, localAudioTrack];
    } else if (localVideoTrack) {
      tracks = [localVideoTrack];
    } else if (localAudioTrack) {
      tracks = [localAudioTrack];
    }
    if (isBrowser) {
      try {
        room = await Video.connect(videoToken, {
          name: roomName,
          dominantSpeaker: true,
          bandwidthProfile: {
            video: {
              mode: "collaboration",
              maxSubscriptionBitrate: 2500000,
              dominantSpeakerPriority: "standard",
              renderDimensions: {
                high: { height: 1080, width: 1920 },
                standard: { height: 720, width: 1280 },
                low: { height: 176, width: 144 },
              },
            },
          },
          networkQuality: { local: 1, remote: 1 },
          video: {
            frameRate: 24,
          },
          tracks,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        room = await Video.connect(videoToken, {
          name: roomName,
          dominantSpeaker: true,
          // logLevel: "debug",
          bandwidthProfile: {
            video: {
              mode: "collaboration",
              maxSubscriptionBitrate: 2500000,
              dominantSpeakerPriority: "standard",
            },
          },
          networkQuality: { local: 1, remote: 1 },
          video: {
            frameRate: 24,
            height: 480,
            width: 640,
          },
          tracks,
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Room connected

    dispatch(setVideoRoom(room));

    dispatch(setLocalParticipant(room.localParticipant));
  };
}
