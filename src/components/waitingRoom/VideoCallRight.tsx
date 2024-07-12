import React,{useState} from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { RemoteParticipant } from "twilio-video";
import { ParticipantVoice } from "./Participants/ParticipantVoice";
import { LocalParticipant } from "./Participants/LocalParticipant";
import { setRightTab } from "../../actions/videoCallActions";
import { isMobile, isBrowser } from "react-device-detect";
import {
  setVideoEnabled,
  setVideoDisabled,
  setAudioEnabled,
  setAudioDisabled,
  setOpenSettings,
} from "../../actions/videoSettings";
import { Participant } from "./Participants/Participant";
import { InCallChat } from "./InCallChat";
import { VideoSettings } from "./VideoSettings";

export const VideoCallRight = (props: any) => {
  const localParticipant = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.localParticipant
  );
  const localVideoTrack = useSelector(
    (state: RootStateOrAny) => state.videoSettings.localVideoTrack
  );
  const localAudioTrack = useSelector(
    (state: RootStateOrAny) => state.videoSettings.localAudioTrack
  );
  const participants = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.participants
  );
  const rightTab = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.rightTab
  );
  const videoStatus = useSelector(
    (state: RootStateOrAny) => state.videoSettings.videoStatus
  );
  const audioStatus = useSelector(
    (state: RootStateOrAny) => state.videoSettings.audioStatus
  );
  const videoDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.videoDevice
  );
  const audioDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.audioDevice
  );

  const dispatch = useDispatch();
  const openSettings = useSelector(
    (state: RootStateOrAny) => state.videoSettings.openSettings
  );
  const room = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.room
  );


  return (
    <div className="call-right">
      {participants
        ? participants.map((participant: RemoteParticipant) => (
            <ParticipantVoice participant={participant} />
          ))
        : ""}
      <div className="call-info-tabs">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a
              className={`nav-link ${rightTab === "chat" ? "active" : ""}`}
              href="#chat"
              role="tab"
              data-toggle="tab"
              onClick={(e) => {
                dispatch(setRightTab("chat"));
              }}
            >
              <span>Office Chat</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${rightTab === "call" ? "active" : ""}`}
              href="#call"
              role="tab"
              data-toggle="tab"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setRightTab("call"));
              }}
            >
              In this call
            </a>
          </li>
        </ul>
        <div className="custom-scrl-content mCustomScrollbar">
          {rightTab === "call" ? (
            <div className="tab-content">
              <div
                role="tabpanel"
                className={`tab-pane fade in active ${
                  isMobile ? "call-mobile" : ""
                }`}
                id="call"
              >
                {localParticipant ? (
                  <LocalParticipant
                    key={localParticipant.sid}
                    participant={localParticipant}
                    isLocal={true}
                  />
                ) : (
                  ""
                )}
                {participants && props.dominantSpeaker
                  ? participants.map((participant: any) => (
                      <Participant
                        key={participant.sid}
                        participant={participant}
                        isLocal={false}
                      />
                    ))
                  : participants && !props.dominantSpeaker
                  ? participants.map((participant: any) => (
                      <Participant
                        key={participant.sid}
                        participant={participant}
                        isLocal={false}
                      />
                    ))
                  : ""}
              </div>
            </div>
          ) : (
            <InCallChat />
          )}
        </div>
        <div className="d-block d-md-none mobile-calls-main">
          <div className="mobile-calls">
            {/* <img src="images/version4-images/mobile-call-img.png" alt="" /> */}
            <div className="call-options-main mute-unmute mute-unmute-video">
              <ul>
                <li style={{ marginRight: "50px" }}>
                  {!videoStatus ? (
                    <a
                      href="#"
                      title=""
                      className="video-mute video-m"
                      onClick={(e) => {
                        e.preventDefault();
                        room.localParticipant.videoTracks.forEach(
                          (publication: any) => {
                            publication.track.enable();
                          }
                        );
                        dispatch(
                          setVideoEnabled(videoDevice, room.localParticipant)
                        );
                      }}
                    ></a>
                  ) : (
                    <a
                      href="#"
                      title=""
                      className="video-unmute video-m"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(localVideoTrack);
                        dispatch(
                          setVideoDisabled([localVideoTrack], localParticipant)
                        );

                        room.localParticipant.videoTracks.forEach(
                          (publication: any) => {
                            publication.track.disable();
                          }
                        );
                      }}
                    ></a>
                  )}
                </li>
                <li style={{ marginRight: "50px" }}>
                  {!audioStatus ? (
                    <a
                      href="#"
                      title=""
                      className="speaker-mute speaker"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          setAudioEnabled(audioDevice, room.localParticipant)
                        );
                      }}
                    ></a>
                  ) : (
                    <a
                      href="#"
                      title=""
                      className="speaker-unmute speaker"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          setAudioDisabled(
                            [localAudioTrack],
                            room.localParticipant
                          )
                        );
                      }}
                    ></a>
                  )}
                </li>
                <li className="d-md-none">
                  <div className="call-settings">
                    {openSettings ? <VideoSettings /> : ""}
                    <a
                      href="#"
                      title=""
                      className="setting"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setOpenSettings(!openSettings));
                      }}
                    ></a>
                    <div className="setting-info">Joining call with audio</div>
                  </div>
                </li>
                <li>
                  {" "}
                  <a
                    href="#"
                    title=""
                    className="end-call call-option-img"
                    onClick={(e) => {
                      props.setIsOpen(true);
                    }}
                  ></a>
                </li>
              </ul>
              <div className="call-settings d-none d-md-block">
                <a href="#" title="" className="setting"></a>
                <div className="setting-info">Joining call with audio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
