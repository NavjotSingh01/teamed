import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  connectToRoom,
  participantConnected,
  participantDisconnected,
  setDominantSpeaker,
} from "../../actions/videoCallActions";
import { LocalParticipant, Participant, RemoteParticipant } from "twilio-video";
import { VideoCallRight } from "./VideoCallRight";
import { VideoSettings } from "./VideoSettings";
import {
  setOpenSettings,
  stopVideoAndAudio,
} from "../../actions/videoSettings";
import { DominantSpeaker } from "./Participants/DominantSpeaker";
import Modal from "react-modal";
import { disconnectFromRoom, endVideoCall } from "../../actions/chatActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const VideoCall = (props: any) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initialOpen, setInitialOpen] = useState<boolean>(true);
  const localParticipant = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.localParticipant
  );
  const participants = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.participants
  );

  const room = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.room
  );
  const dominantSpeaker = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.dominantSpeaker
  );

  const localVideoTrack = useSelector(
    (state: RootStateOrAny) => state.videoSettings.localVideoTrack
  );
  const videoChannelName = useSelector(
    (state: RootStateOrAny) => state.connectToChat.videoChannelName
  );
  const socket = useSelector(
    (state: RootStateOrAny) => state.connectToChat.socket
  );

  const localAudioTrack = useSelector(
    (state: RootStateOrAny) => state.videoSettings.localAudioTrack
  );

  const openSettings = useSelector(
    (state: RootStateOrAny) => state.videoSettings.openSettings
  );

  const history = useHistory();
  const participantDisconnectListener = (participant: RemoteParticipant) => {
    dispatch(participantDisconnected(participant));
    console.log(dominantSpeaker);
  };

  useEffect(() => {
    if (props.videoToken) {
      dispatch(
        connectToRoom(
          props.videoToken,
          videoChannelName,
          localVideoTrack,
          localAudioTrack
        )
      );
    }
  }, [props.videoToken]);

  useEffect(() => {
    if (room) {
      room.on("participantConnected", (participant: RemoteParticipant) => {
        console.log("hi there");
        dispatch(participantConnected(participant));
      });

      room.on("dominantSpeakerChanged", (participant: RemoteParticipant) => {
        if (participant) {
          dispatch(setDominantSpeaker(participant));
        }
      });

      // room.on("trackDisabled", participantConnected);

      room.on("participantDisconnected", participantDisconnectListener);

      room.participants.forEach((participant: RemoteParticipant) => {
        console.log("whats up");
        dispatch(participantConnected(participant));
      });

      window.addEventListener("beforeunload", () => {
        room.disconnect();
      });

      return () => {
        room.disconnect();
      };
    }
  }, [room]);

  useEffect(() => {
    if (participants && dominantSpeaker) {
      if (
        participants.some(
          (participant: Participant) => participant.sid === dominantSpeaker.sid
        )
      ) {
        return;
      } else {
        dispatch(setDominantSpeaker(null));
      }
    }
  }, [participants, dominantSpeaker]);

  useEffect(() => {
    const disconnectedEventListener = (participant: Participant) => {
      dispatch(endVideoCall(videoChannelName));
    };

    if (localParticipant && videoChannelName) {
      localParticipant.on("disconnected", disconnectedEventListener);
      return () => {
        localParticipant.removeListener(
          "disconnected",
          disconnectedEventListener
        );
      };
    }
  }, [localParticipant, videoChannelName]);

  return (
    <div className="call-main d-flex">
      <Modal isOpen={initialOpen} style={customStyles} contentLabel="Invite">
        <h2 className="modal-title">You are currently in the Waiting Queue.</h2>
        <p style={{ textAlign: "center" }}>
          Please stay on this page and someone will be with you shortly.
        </p>
        <div className="button-container">
          <button
            className="accept-button"
            onClick={() => {
              setInitialOpen(false);
            }}
          >
            Ok
          </button>
        </div>
      </Modal>
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Invite">
        <h2 className="modal-title">
          Are you sure you want to leave the call?
        </h2>
        <div className="button-container">
          <button
            className="decline-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Go Back
          </button>
          <button
            className="accept-button"
            onClick={() => {
              setIsOpen(false);
              room.disconnect();
              socket.close();
              dispatch(
                stopVideoAndAudio(
                  localParticipant,
                  localVideoTrack,
                  localAudioTrack
                )
              );
              window.location.reload();
            }}
          >
            Accept
          </button>
        </div>
      </Modal>
      <div className="call-left gradient-bg">
        <div className="call-img inthis-call-img">
          {dominantSpeaker ? (
            <DominantSpeaker participant={dominantSpeaker} isLocal={false} />
          ) : (
            ""
          )}
        </div>
        <div className="call-options-main">
          <div className="volume-icon"></div>
          <ul>
            <li>
              {" "}
              <a
                href="#"
                title=""
                className="end-call call-option-img d-none d-md-block"
                onClick={(e) => {
                  e.preventDefault();

                  setIsOpen(true);
                }}
              ></a>
            </li>
          </ul>
          <div className="caller-main d-none d-md-block">
            {/* <img src="images/version4-images/caller.svg" alt="" /> */}
          </div>
          <div className="call-settings d-none d-md-block">
            {openSettings ? <VideoSettings /> : ""}
            <a
              href="#"
              title=""
              className="setting"
              style={{ float: "right" }}
              onClick={(e) => {
                dispatch(setOpenSettings(!openSettings));
              }}
            ></a>
            <div className="setting-info">Joining call with audio</div>
          </div>
        </div>
      </div>
      <VideoCallRight setIsOpen={setIsOpen} />
    </div>
  );
};
