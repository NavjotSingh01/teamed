import React from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  changeVideoInput,
  changeAudioInput,
} from "../../actions/videoSettings";

export const VideoSettings = () => {
  const dispatch = useDispatch();
  const localVideoTrack = useSelector(
    (state: RootStateOrAny) => state.mainReducer.localVideoTrack
  );
  const localAudioTrack = useSelector(
    (state: RootStateOrAny) => state.mainReducer.localAudioTrack
  );
  const videoDevices = useSelector(
    (state: RootStateOrAny) => state.mainReducer.videoDevices
  );
  const audioDevices = useSelector(
    (state: RootStateOrAny) => state.mainReducer.audioDevices
  );
  const videoDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.videoDevice
  );
  const audioDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.audioDevice
  );

  return (
    <div className="video-settings-bubble">
      <div className="video-settings-bubble-container">
        <h3>Video Settings</h3>

        <div className="form-group">
          <label htmlFor="video">Video Source</label>
          <select
            name="video"
            defaultValue={videoDevice}
            onChange={(e) => {
              dispatch(changeVideoInput(e.target.value, localVideoTrack));
            }}
          >
            {videoDevices
              ? videoDevices.map((device: MediaDeviceInfo) => (
                  <option value={device.deviceId}>{device.label}</option>
                ))
              : ""}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="audio">Audio Source</label>
          <select
            name="audio"
            defaultValue={audioDevice}
            onChange={(e) => {
              dispatch(changeAudioInput(e.target.value, localAudioTrack));
            }}
          >
            {audioDevices
              ? audioDevices.map((device: MediaDeviceInfo) => (
                  <option value={device.deviceId}>{device.label}</option>
                ))
              : ""}
          </select>
        </div>
      </div>
    </div>
  );
};
