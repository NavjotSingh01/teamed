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

function AudioTest(props) {
  const videoPreview = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [canHear, setCanHear] = useState(true);
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

  pollAudioLevel(props.localAudioTrack, (level) => {
    if (level > 1) {
      setCanHear(true);
    }
  });

  //   useEffect(() => {
  //     attachTracks([props.localVideoTrack], videoPreview.current);
  //   }, []);

  return (
    <div class="container">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="help-box">
          <h2>Can't detect audio? Here are some common tips.</h2>
          <ul>
            <li>
              <b>Have you enabled permissions?</b>
            </li>
            <li>
              <b>On Safari using an iPad or iPhone?</b> Safari won't enable
              audio if you have used audio while Safari has been open. To fix
              this, please exit Safari and restart the application.
            </li>
            <li>
              <b>Is your mic muted?</b> Your mic may be muted by either your
              operating system or a hardware setting on your microphone
            </li>
            <li>
              <b>Is your mic plugged in and working with other applications?</b>{" "}
              Sometimes the mic isn't recognized by the Operating System that
              you are using.
            </li>
            <li>
              <b>Try resetting your device.</b>Resetting your device can
              sometimes cause your mic to be recognized.
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

      <div class="content-wrapper triage-app-right">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="appointment-box">
              <div class="triage-details">
                <h2>Speak to see if we can hear you.</h2>
                <p>
                  {!canHear
                    ? "We can't hear you."
                    : "We can hear you loud and clear."}
                </p>
              </div>
              <div>
                {canHear ? (
                  <div style={{ width: "100%" }}>
                    <button
                      href="#"
                      title="next step"
                      class="primary-btn small d-md-block"
                      style={{ marginRight: "15px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        props.setStep(3);
                      }}
                    >
                      Enter
                    </button>
                  </div>
                ) : (
                  <div className="" style={{ width: "100%" }}>
                    <a
                      href="#"
                      title="next step"
                      class="primary-btn small  d-md-block"
                      style={{ marginRight: "15px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(true);
                      }}
                    >
                      Help
                    </a>
                    <a
                      href="#"
                      title="continue"
                      class="primary-btn small d-block "
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(true);
                      }}
                    >
                      Help
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioTest;
