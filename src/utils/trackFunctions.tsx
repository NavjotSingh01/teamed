import { LocalTrack, LocalVideoTrack, LocalAudioTrack } from "twilio-video";

export const attachTracks = (
  tracks: Array<LocalVideoTrack | LocalAudioTrack>,
  container: any
) => {
  tracks.forEach(function (track: LocalVideoTrack | LocalAudioTrack) {
    if (track) {
      container.appendChild(track.attach());
    }
  });
};

export const detachTracks = (
  tracks: Array<LocalVideoTrack | LocalAudioTrack>
) => {
  tracks.forEach(function (track: any) {
    if (track) {
      track.detach().forEach(function (detachedElement: any) {
        detachedElement.remove();
      });
    }
  });
};

export const stopTracks = (
  tracks: Array<LocalVideoTrack | LocalAudioTrack>
) => {
  tracks.forEach(function (track: any) {
    if (track) {
      track.stop();
      console.log("stop track");
    }
  });
};
