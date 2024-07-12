import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Oval from "../../assets/images/Oval.png";
import { resetTriage } from "../../actions/patientOfficeActions";
import {
  getWaitingList,
  getReadySignal,
  removeReadySignal,
  setNullPosition,
  confirmWaitingRoom,
  createSocketConnection,
  reconnectSocketConnection,
  joinCall,
} from "../../actions/chatActions";
import { isMobile, isMobileOnly } from "react-device-detect";
import { Link, Redirect } from "react-router-dom";
import Avatar from "react-avatar";
import Ready from "../../assets/images/ready.mp3";
import { resetDevices } from "../../actions/videoAudioActions";
import { resetSocketPastTriage } from "../../actions/socketActions";
import MobileVideoCall from "./MobileVideoCall";

function WaitingIndicator(props) {
  let audio = new Audio(Ready);
  const adminIsReady = useSelector((state) => state.connectToChat.adminIsReady);
  const removedFromWaitingList = useSelector(
    (state) => state.connectToChat.removedFromWaitingList
  );

  const room = useSelector((state) => state.connectToChat.videoRoom);
  const waitingRoomConfirmation = useSelector(
    (state) => state.connectToChat.waitingRoomConfirmation
  );
  const dispatch = useDispatch();
  const videoToken = useSelector((state) => state.connectToChat.videoToken);
  const chatName = useSelector((state) => state.connectToChat.channelName);
  const videoChannelName = useSelector(
    (state) => state.connectToChat.videoChannelName
  );
  const socket = useSelector((state) => state.connectToChat.socket);
  const office = useSelector((state) => state.patientOfficeInteractions.office);
  useEffect(() => {
    console.log(props.profile.pk);

    socket.send(
      JSON.stringify({
        type: "JOIN_WAITING_ROOM",
        patient: props.profile.pk,
        is_patient: true,
        office: office.slug,
      })
    );
  }, []);

  useEffect(() => {
    if (isMobile) {
      console.log("is mobile");
      if (videoToken) {
        dispatch(joinCall(videoChannelName, videoToken));
      }
    }
  }, [videoToken]);

  socket.onmessage = (e) => {
    const response_data = JSON.parse(e.data);
    if (response_data.type == "user_list") {
      dispatch(getWaitingList(response_data.users));
    } else if (response_data.type == "admin_join_active_call") {
      if (response_data.active_call === props.profile.pk) {
        // audio.play();
        console.log("joining room nopw");
      } else {
        return;
      }
    } else if (response_data.type == "admin_remove_active_call") {
      if (response_data.active_call === props.profile.pk) {
        dispatch(removeReadySignal());
      } else {
        return;
      }
    } else if (response_data.type == "confirm_waiting") {
      dispatch(confirmWaitingRoom(response_data.confirm_waiting));
    } else if (response_data.type == "position") {
      if (response_data.position === null) {
        dispatch(setNullPosition());
      } else {
        return;
      }
    } else {
      return;
    }
  };

  return socket.readyState === 1 ? (
    <div class="waiting-room-left">
      <div class="cancel-wrapper d-none d-md-block">
        <Link
          to={"/dashboard"}
          onClick={() => {
            socket.close();
            dispatch(resetTriage());
            dispatch(resetDevices());
            dispatch(resetSocketPastTriage());
          }}
        >
          <i
            class="fas fa-chevron-circle-left arrow_icon"
            aria-hidden="true"
          ></i>{" "}
          Exit Appointment
        </Link>
      </div>
      <div class="cancel-wrapper d-block d-md-none">
        <Link
          to="/dashboard/"
          onClick={() => {
            socket.close();
            dispatch(resetTriage());
            dispatch(resetDevices());
            dispatch(resetSocketPastTriage());
          }}
        >
          <i
            class="fas fa-chevron-circle-left arrow_icon"
            aria-hidden="true"
          ></i>{" "}
          Exit
        </Link>
      </div>
      <div class="box-img">
        <Avatar name={props.office.name} size="100%" round={true} />

        <span class="dots orange"></span>
      </div>
      {waitingRoomConfirmation ? (
        !removedFromWaitingList ? (
          !room ? (
            <div class="name-designation">
              <h1>
                Waiting for
                <br /> {props.office.name}
              </h1>
              <div class="d-none d-md-block">
                <h2>
                  You will be connected shortly. Please
                  <br /> stay on this screen.
                </h2>
              </div>
              <div class="d-block d-md-none">
                <h2>Please do not leave this screen.</h2>
              </div>
            </div>
          ) : (
            <div class="name-designation">
              <h1>
                {props.office.name}
                <br /> is ready for you.
              </h1>
              <div class="d-none d-md-block">
                <h2>
                  Ready to start your
                  <br /> appointment?
                </h2>
              </div>
              <div class="d-block d-md-none">
                <h2>Please click Join Call.</h2>
              </div>
              <div class="waiting-img waiting-ready-mobile d-block d-md-none">
                {/* <img src="images/user-big.png" alt="" /> */}
              </div>
              <div className="d-block d-md-none">
                {/* Mobile */}
                <Link
                  to={{
                    pathname: `/office/${props.office.slug}/mobile-video-call/`,
                    videoSettings: {
                      videoToken: videoToken,
                      videoRoomName: videoChannelName,
                    },
                  }}
                  className="primary-btn"
                >
                  Join Call
                </Link>
                {isMobileOnly ? (
                  <Redirect
                    to={{
                      pathname: `/office/${props.office.slug}/video-call/`,
                      videoSettings: {
                        videoToken: videoToken,
                        videoRoomName: videoChannelName,
                        localVideoTrack: props.localVideoTrack,
                        localAudioTrack: props.localAudioTrack,
                        audioDeviceId: props.audioDeviceId,
                        videoDeviceId: props.videoDeviceId,
                      },
                    }}
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: `/office/${props.office.slug}/video-call/`,
                      videoSettings: {
                        videoToken: videoToken,
                        videoRoomName: videoChannelName,
                        localVideoTrack: props.localVideoTrack,
                        localAudioTrack: props.localAudioTrack,
                        audioDeviceId: props.audioDeviceId,
                        videoDeviceId: props.videoDeviceId,
                      },
                    }}
                  />
                )}
              </div>
              <div className="d-none d-md-block">
                {/* <Redirect
                  to={{
                    pathname: `/office/${props.office.slug}/video-call/`,
                    videoSettings: {
                      videoToken: videoToken,
                      videoRoomName: videoChannelName,
                    },
                  }}
                /> */}
                {/* <Link
                  to={{
                    pathname: `/office/${props.office.slug}/video-call/`,
                    videoSettings: {
                      videoToken: videoToken,
                      videoRoomName: videoChannelName,
                      localVideoTrack: props.localVideoTrack,
                      localAudioTrack: props.localAudioTrack,
                      audioDeviceId: props.audioDeviceId,
                      videoDeviceId: props.videoDeviceId,
                    },
                  }}
                  className="primary-btn"
                >
                  Join Call
                </Link> */}
              </div>
            </div>
          )
        ) : (
          <div class="name-designation">
            <h1>
              You have been removed from the waiting list.
              <br /> {props.office.name}
            </h1>
            <div class="d-none d-md-block">
              <h2>
                If you think this is a mistake, please call and let us know.
              </h2>
            </div>
            <div class="d-block d-md-none">
              <h2>
                If you think this is a mistake, please call and let us know.
              </h2>
            </div>
          </div>
        )
      ) : (
        <div class="name-designation">
          <h1>
            We couldn't connect you to the Waiting Room.
            <br /> {props.office.name}
          </h1>
          <div class="d-none d-md-block">
            <button
              className="primary-btn"
              onClick={() => {
                dispatch(createSocketConnection(props.office.slug));
                socket.send(
                  JSON.stringify({
                    type: "JOIN_WAITING_ROOM",
                    patient: props.profile.pk,
                    is_patient: true,
                    office: office.slug,
                  })
                );
              }}
            >
              Reconnect to waiting room
            </button>
          </div>
          <div class="d-block d-md-none">
            <button
              className="primary-btn"
              onClick={() => {
                dispatch(createSocketConnection(props.office.slug));
                socket.send(
                  JSON.stringify({
                    type: "JOIN_WAITING_ROOM",
                    patient: props.profile.pk,
                    is_patient: true,
                    office: office.slug,
                  })
                );
              }}
            >
              Reconnect to waiting room
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div class="name-designation">
      <h1>
        We couldn't connect you to the Waiting Room.
        <br /> {props.office.name}
      </h1>
      <div class="d-none d-md-block">
        <button
          className="primary-btn"
          onClick={() => {
            const socket_config = JSON.stringify({
              type: "JOIN_WAITING_ROOM",
              patient: props.profile.pk,
              is_patient: true,
              office: office.slug,
            });

            dispatch(
              reconnectSocketConnection(
                props.office.slug,
                socket_config,
                props.profile.pk
              )
            );
          }}
        >
          Reconnect to waiting room
        </button>
      </div>
      <div class="d-block d-md-none">
        <button
          className="primary-btn"
          onClick={() => {
            const socket_config = JSON.stringify({
              type: "JOIN_WAITING_ROOM",
              patient: props.profile.pk,
              is_patient: true,
              office: office.slug,
            });

            dispatch(
              reconnectSocketConnection(
                props.office.slug,
                socket_config,
                props.profile.pk
              )
            );
          }}
        >
          Reconnect to waiting room
        </button>
      </div>
    </div>
  );
}

export default WaitingIndicator;
