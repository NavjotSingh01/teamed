import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import pollAudioLevel from "../utils/pollAudio";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxHeight: "100vh",
    marginRight: "-50%",
    overflowY: "auto",
    transform: "translate(-50%, -50%)",
  },
};

function VideoAudioTest(props) {
  const videoPreview = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);
  const attachTracks = (tracks, container) => {
    tracks.forEach(function (track) {
      if (track) {
        console.log("APPEND TRACK");
        container.appendChild(track.attach());
      }
    });
  };

  const detachTracks = (tracks) => {
    tracks.forEach(function (track) {
      if (track) {
        track.detach().forEach(function (detachedElement) {
          detachedElement.remove();
        });
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

  // pollAudioLevel(props.localAudioTrack, (level) => {
  //   console.log(level);
  // });

  useEffect(() => {
    attachTracks([props.localVideoTrack], videoPreview.current);

    return () => detachTracks([props.localVideoTrack])
  }, []);

  return (
    <div class="container">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="help-box">
          <h2>Can't see video? Here are some common troubleshooting tips.</h2>
          <ul>
            <li>
              <b>Have you enabled permissions?</b>
            </li>
            <li>
              <b>Is there an application that is currently using your video?</b>{" "}
              Corigan requires your camera and audio to be used at all times
              when entering the waiting room.
            </li>
            <li>
              <b>
                Is your webcam plugged in and working with other applications?
              </b>{" "}
              Sometimes the webcam isn't recognized by the Operating System that
              you are using.
            </li>
            <li>
              <b>Try resetting your device.</b>Resetting your device can
              sometimes cause your webcam to be recognized.
            </li>
          </ul>
          <div class="next-step text-right">
            <a
              href="#"
              title="next step"
              class="primary-btn small d-none d-md-block"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              Close
            </a>
          </div>
        </div>
      </Modal>
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <div class="appointment-box">
            <div class="triage-details">
              <h2>Are you able to see yourself?</h2>
              <div id="video-preview" ref={videoPreview}></div>
            </div>
            <div>
              <button
                class="primary-btn small small-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
              >
                No
              </button>
              <button
                class="primary-btn small small-button"
                onClick={(e) => {
                  e.preventDefault();
                  props.setStep(2);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoAudioTest;
