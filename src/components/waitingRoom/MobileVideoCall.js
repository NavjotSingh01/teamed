import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Video, { createLocalVideoTrack } from "twilio-video";
import AuthHeader from "../AuthHeader";
import { Redirect, Link } from "react-router-dom";
import {
  setVideoRoom,
  setParticipant,
  removeParticipant,
  disconnectFromRoom,
  resetPatient,
  endVideoCall,
} from "../../actions/chatActions";
import { resetTriage } from "../../actions/patientOfficeActions";
import Participant from "./Participant";
import Chat from "./Chat";
import MobileChat from "./MobileChat";
import { resetDevices } from "../../actions/videoAudioActions";
import Settings from "../../assets/images/setting.png";
import Flip from "../../assets/images/flip.svg";
import Msg from "../../assets/images/msg.png";
import CloseMobile from "../../assets/images/close-mobile.png";
import { isMobile } from "react-device-detect";
import { setOpenSettings } from "../../actions/videoSettings";
import { VideoSettings } from "./VideoSettings";

function MobileVideoCall(props) {
  const [mobileTab, setMobileTab] = useState("");
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.connectToChat.participants);
  const room = useSelector((state) => state.connectToChat.videoRoom);
  const chatChannel = useSelector((state) => state.connectToChat.chatChannel);
  const currentPatient = useSelector((state) => state.authenticateUser.profile);
  const removedFromWaitingList = useSelector(
    (state) => state.connectToChat.removedFromWaitingList
  );
  const devices = useSelector((state) => state.connectToChat.devices);
  const [deviceNum, setDeviceNum] = useState(0);
  const localVideo = useRef(null);
  const localAudio = useRef(null);
  const videoChannelName = useSelector(
    (state) => state.connectToChat.videoChannelName
  );
  const unreadMessagesCount = useSelector(
    (state) => state.connectToChat.unreadMessagesCount
  );
  const socket = useSelector((state) => state.connectToChat.socket);
  const localVideoTrack = useSelector(
    (state) => state.videoAudio.localVideoTrack
  );
  const localAudioTrack = useSelector(
    (state) => state.videoAudio.localAudioTrack
  );

  const openSettings = useSelector((state) => state.videoSettings.openSettings);

  useEffect(() => {
    const participantConnected = (participant) => {
      dispatch(setParticipant(participant));
    };

    const participantDisconnected = (participant) => {
      dispatch(removeParticipant(participant));
    };
    console.log(videoChannelName);

    // attachTracks([localAudioTrack], localAudio.current);

    dispatch(setVideoRoom(room));
    room.participants.forEach(participantConnected);
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);

    attachTracks(
      [room.localParticipant.videoTracks.values().next().value.track],
      localVideo.current
    );
    room.on("disconnect", (room) => {
      room.participants.forEach((participant) => {
        participant.tracks.forEach((publication) => {
          const attachedElements = publication.track.detach();
          attachedElements.forEach((element) => element.remove());
        });
      });
      room.localParticipant.tracks.forEach((track) => {
        track.stop();
      });
    });
  }, []);

  if (isMobile) {
    document.addEventListener("visibilitychange", async () => {
      if (document.visibilityState === "hidden") {
        room.localParticipant.videoTracks.values().next().value.track.stop();
        room.localParticipant.unpublishTrack(
          room.localParticipant.videoTracks.values().next().value.track
        );
      } else {
        const videoTrack = await createLocalVideoTrack();
        await room.localParticipant.publishTrack(videoTrack);
      }
    });
  }

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  const detachTracks = (tracks) => {
    tracks.forEach(function (track) {
      if (track) {
        track.detach().forEach(function (detachedElement) {
          detachedElement.remove();
        });
      }
    });
  };

  const attachTracks = (tracks, container) => {
    tracks.forEach(function (track) {
      if (track) {
        console.log(track);

        container.appendChild(track.attach());
      }
    });
  };

  const stopTracks = (tracks) => {
    tracks.forEach(function (track) {
      if (track) {
        track.stop();
      }
    });
  };

  const changeCamera = (num, room, devices) => {
    navigator.mediaDevices.enumerateDevices((devices) => {
      console.log(devices);
    });
    Video.createLocalVideoTrack({
      facingMode: num == 0 ? "environment" : "user",
    })
      .then((localVideoTrack) => {
        const tracks = Array.from(
          room.localParticipant.videoTracks.values()
        ).map((trackPublication) => {
          return trackPublication.track;
        });
        room.localParticipant.unpublishTracks(tracks);
        detachTracks(tracks);
        stopTracks(tracks);
        room.localParticipant.publishTrack(localVideoTrack);
        attachTracks([localVideoTrack], localVideo.current);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopVideos = (room) => {
    const tracks = Array.from(room.localParticipant.videoTracks.values()).map(
      (trackPublication) => {
        return trackPublication.track;
      }
    );
    console.log(tracks);
    room.localParticipant.unpublishTracks(tracks);
    detachTracks(tracks);
    stopTracks(tracks);
  };

  return (
    <div>
      <AuthHeader />
      <section class="main-bg-sectoin desktop-page waiting-room-main">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-xl-4 col-md-4 no-padding d-none d-md-block">
              <div
                class="cancel-wrapper d-none d-md-block"
                style={{ position: "absolute", top: "-5%" }}
              >
                <Link
                  to={"/dashboard"}
                  onClick={() => {
                    socket.close();
                    room.disconnect();
                    dispatch(resetPatient());
                    dispatch(resetTriage());
                    dispatch(resetDevices());
                  }}
                >
                  <i
                    class="fas fa-chevron-circle-left arrow_icon"
                    aria-hidden="true"
                  ></i>{" "}
                  Exit Appointment
                </Link>
              </div>
              {removedFromWaitingList ? (
                <p>
                  You have been removed from the waiting list. If you think this
                  was an error, please call our office or rejoin and use the
                  chat.
                </p>
              ) : (
                ""
              )}
            </div>
            <div class="col-lg-8 col-xl-8 col-md-12 no-padding d-none d-md-block">
              <div class="d-flex">
                <div class="incall-middle d-none d-lg-block">
                  {remoteParticipants}
                </div>
                <div class="incall-middle d-block d-lg-none">
                  {/* <img src="images/incall-chat-tablet.png" alt="" /> */}
                  <div className="ipad-video" style={{ position: "relative" }}>
                    {remoteParticipants}
                    {room ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "5%",
                          width: "21%",
                        }}
                      >
                        <Participant
                          key={room.localParticipant.sid}
                          participant={room.localParticipant}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {chatChannel ? (
                  <Chat channel={chatChannel} profile={currentPatient} />
                ) : (
                  "Loading Chat"
                )}
              </div>
              {/* <div class="video-setting">
                <h2>Video Settings</h2>
                <div class="source-main">
                  <div class="source left-s">
                    <h4>Video Source</h4>
                    <select
                      onChange={(e) =>
                        changeVideoInput(e.target.value, localVideoTrack)
                      }
                      defaultValue={props.location.videoSettings.videoDeviceId}
                    >
                      {devices
                        .filter((device) => device.kind == "videoinput")
                        .map((device) => (
                          <option>{device.label} </option>
                        ))}
                    </select>
                    <div class="player">
                      <div class="vol-info">
                        <h4>Volume</h4>
                        <a
                          href="#"
                          title="speaker"
                          class="speaker-vol"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <span>Speaker Test</span>
                        </a>
                      </div>
                      <div class="volume-bar">
                        <input type="range" />
                        <div class="vol-range">
                          <span class="vol">0</span>
                          <span class="vol">100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="source right-s">
                    <h4>Audio Source</h4>
                    <select
                      onChange={(e) =>
                        changeAudioInput(e.target.value, localAudioTrack, room)
                      }
                      defaultValue={props.location.videoSettings.audioDeviceId}
                    >
                      {devices
                        .filter((device) => device.kind == "audioinput")
                        .map((device) => (
                          <option value={device.deviceId}>
                            {device.label}{" "}
                          </option>
                        ))}
                    </select>
                    <div class="player">
                      <div class="vol-info">
                        <h4>Microphone Level</h4>
                        <a href="#" title="speaker" class="micro-vol"></a>
                      </div>
                      <div class="volume-bar microphone-l">
                        <div class="vol-range">
                          <span class="vol">0</span>
                          <span class="vol">100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <VideoSettings /> */}
            </div>
          </div>
        </div>
        <div class="incall-mobile d-block d-md-none" style={{ height: "85vh" }}>
          {removedFromWaitingList ? (
            <p>
              You have been removed from the waiting list. If you think this was
              an error, please call our office or rejoin and use the chat.
            </p>
          ) : (
            ""
          )}
          {room ? (
            <div className="videos">
              {remoteParticipants}
              {/* {room ? changeCamera(0, room) : ""} */}
              <div className="localVideoDiv" ref={localVideo}>
                {/* <video
                autoPlay={true}
                style={{
                  width: "40%",
                  bottom: "14%",
                  right: "5%",
                  position: "absolute",
                }}
              ></video> */}
              </div>
              <div ref={localAudio}></div>

              {/* {room ? (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
            ) : (
              ""
            )} */}
            </div>
          ) : (
            <div>Connecting to Chat</div>
          )}
          {mobileTab === "chat" ? (
            <div class="waiting-content incall-chat">
              <div class="waiting-content">
                <MobileChat
                  channel={chatChannel}
                  profile={currentPatient}
                  setMobileTab={setMobileTab}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {!mobileTab ? (
            <div class="tabbing-sec">
              <ul
                class="nav nav-tabs justify-content-center"
                id="myTab"
                role="tablist"
              >
                <li class="nav-item setting-tab">
                  <Link
                    to={"/dashboard"}
                    className="nav-link close-links"
                    onClick={() => {
                      const tracks = Array.from(
                        room.localParticipant.videoTracks.values()
                      ).map((trackPublication) => {
                        return trackPublication.track;
                      });
                      room.localParticipant.unpublishTracks(tracks);
                      detachTracks(tracks);
                      stopTracks(tracks);
                      // dispatch(endVideoCall(videoChannelName));
                      socket.close();
                      room.disconnect();
                      dispatch(resetPatient());
                      dispatch(resetTriage());
                    }}
                  >
                    <img src={CloseMobile} alt="" />
                  </Link>
                </li>
                {/* <li class="nav-item setting-tab">
                  <a
                    class="nav-link active"
                    id="setting-tab"
                    data-toggle="tab"
                    href="#setting"
                    role="tab"
                    aria-controls="setting"
                    aria-selected="true"
                  >
                    <img src={Settings} alt="" />
                  </a>
                  <span class="o-tooltip">&nbsp;</span>
                  <div class="tooltips">
                    flip your Camera on your mobile device.
                  </div>
                </li> */}
                <li
                  class="nav-item flip-tab"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setOpenSettings(!openSettings));
                  }}
                >
                  {openSettings ? <VideoSettings /> : ""}
                  <a
                    class="nav-link"
                    id="flip-tab"
                    data-toggle="tab"
                    href="#flip"
                    role="tab"
                    aria-controls="flip"
                    aria-selected="false"
                  >
                    <img src={Flip} alt="" />
                  </a>
                  <span class="o-tooltip">&nbsp;</span>
                  <div class="tooltips">adjust setting for audio and video</div>
                </li>
                <li
                  class="nav-item msg-tab"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileTab("chat");
                    console.log("message");
                  }}
                >
                  <a
                    class="nav-link"
                    id="msg-tab"
                    data-toggle="tab"
                    href="#msg"
                    role="tab"
                    aria-controls="msg"
                    aria-selected="false"
                  >
                    <img src={Msg} alt="" />
                    {unreadMessagesCount ? (
                      <span class="notifc">{unreadMessagesCount}</span>
                    ) : (
                      ""
                    )}
                  </a>
                  <span class="o-tooltip">&nbsp;</span>
                  <div class="tooltips">
                    chat with nurse or reception to make sure you're all set
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
}

export default MobileVideoCall;
