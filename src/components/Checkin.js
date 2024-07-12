import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSymptoms, createTriage } from "../actions/patientOfficeActions";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import Flower from "../assets/images/flower.png";
import { BounceLoader } from "react-spinners";
import { getTriageQuestions } from "../actions/patientOfficeActions";
import {
  createTwilioClient,
  createSocketConnection,
  getMediaDevices,
  getVideoName,
  getChatConnection,
} from "../actions/chatActions";
import Video from "twilio-video";
import {
  setLocalAudioTrack,
  setLocalVideoTrack,
  setupVideoDevices,
  setupVideoDevicesFinished,
  failedSetupVideoDevices,
} from "../actions/videoAudioActions";
import VideoAudioTest from "./VideoTest";
import AudioTest from "./AudioTest";
import { enableVideoAndAudioPermissions } from "../actions/meetingActions";

function CheckIn(props) {
  const [step, setStep] = useState(0);
  const [symptomId, addSymptom] = useState([]);
  const [characters, setCharacters] = useState(0);
  const details = useRef(null);
  const authenticateUser = useSelector((state) => state.authenticateUser);
  const isCreatingTriage = useSelector(
    (state) => state.patientOfficeInteractions.isCreatingTriage
  );
  const dispatch = useDispatch();

  const localVideoTrack = useSelector(
    (state) => state.videoSettings.localVideoTrack
  );
  const localAudioTrack = useSelector(
    (state) => state.videoSettings.localAudioTrack
  );
  const primaryProfile = useSelector(
    (state) => state.authenticateUser.primaryProfile
  );
  const socket = useSelector((state) => state.connectToChat.socket);

  const office = useSelector((state) => state.patientOfficeInteractions.office);

  useEffect(() => {
    if (primaryProfile) {
      dispatch(getChatConnection(primaryProfile.user.email));
    }
  }, [primaryProfile]);

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage =
        "Are you sure you want to leave? Leaving will require you to restart the questionnaire.";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  }, []);

  useEffect(() => {
    dispatch(getMediaDevices());
    if (!socket) {
      dispatch(createSocketConnection(office.slug, primaryProfile.pk));
    }
  }, [dispatch, office.slug, socket]);

  useEffect(() => {
    dispatch(getSymptoms());
    // Get chat information before they get to the required screen
    dispatch(getVideoName(authenticateUser.primaryProfile.pk, props.office.pk));
    dispatch(
      createTriage(
        "N/A",
        null,
        authenticateUser.primaryProfile.pk,
        props.office.pk
      )
    );
  }, []);
  const patientOffice = useSelector((state) => state.patientOfficeInteractions);
  const settingUpVideo = useSelector(
    (state) => state.videoAudio.settingUpVideo
  );
  const hasCreatedTriage = patientOffice.hasCreatedTriage;
  const sectionClass =
    step == 0 ? "triage-appoint-page" : step == 1 ? "triage-symptoms-page" : "";

  const [isAllowed, setIsAllowed] = useState(false);
  const errorMessage = useSelector((state) => state.videoAudio.errorMessage);
  // const [errorMessage, setErrorMessage] = useState("");

  const videoPreview = useRef();

  const hasEnabledPermissions = useSelector(
    (state) => state.videoSettings.hasEnabledPermissions
  );

  return (
    <div>
      <AuthHeader />
      <section
        className={`main-bg-sectoin desktop-page less-space ${sectionClass}`}
      >
        {step == 0 ? (
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="inner-desktop-content office-home-main">
                  <div class="triage-app-left">
                    <div class="cancel-wrapper">
                      <Link
                        to={`/office`}
                        className="d-none d-md-block"
                      >
                        <i
                          class="fas fa-chevron-circle-left arrow_icon"
                          aria-hidden="true"
                        ></i>{" "}
                        back
                      </Link>
                      <Link
                        to={`/office/${props.office.slug}`}
                        className="d-block d-md-none"
                      >
                        <i
                          class="fas fa-chevron-circle-left arrow_icon"
                          aria-hidden="true"
                        ></i>{" "}
                        home
                      </Link>
                    </div>
                    <h1>
                      Please enable your camera and microphone permissions.
                    </h1>
                  </div>
                  <div class="content-wrapper triage-app-right">
                    <div class="row">
                      <div class="col-lg-12 col-md-12">
                        <div class="appointment-box">
                          <div class="walkin-appointment">
                            <p>{errorMessage ? errorMessage : ""}</p>
                            {!settingUpVideo ? (
                              <div>
                                <a
                                  href="#"
                                  title="Walk-in Appointment"
                                  class="primary-btn d-none d-md-block"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(enableVideoAndAudioPermissions());
                                  }}
                                >
                                  Enable Video and Audio Permission
                                </a>
                                <a
                                  href="#"
                                  title="Walk-in Appointment"
                                  class="primary-btn d-block d-md-none"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // dispatch(setupVideoDevices());
                                    dispatch(enableVideoAndAudioPermissions());
                                  }}
                                >
                                  Enable Video and Audio Permission
                                </a>
                              </div>
                            ) : (
                              <BounceLoader color={"#052D64"} size={50} />
                            )}
                          </div>
                        </div>
                        {hasEnabledPermissions ? (
                          <div>
                            <div class="next-step text-right d-none d-md-block">
                              {/* <Redirect
                                to={`/office/${props.office.slug}/waiting-room`}
                                className="primary-btn small"
                              /> */}
                              {setStep(1)}
                            </div>
                            <div class="next-step text-right d-block d-md-none">
                              <Link
                                to={`/office/${props.office.slug}/waiting-room`}
                                className="primary-btn small"
                              >
                                Enter Waiting Room
                              </Link>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : step === 1 ? (
          <VideoAudioTest
            localVideoTrack={localVideoTrack}
            localAudioTrack={localAudioTrack}
            setStep={setStep}
          />
        ) : step === 2 ? (
          <AudioTest localAudioTrack={localAudioTrack} setStep={setStep} />
        ) : step === 3 ? (
          <Redirect
            to={`/office/${props.office.slug}/video-call`}
            className="primary-btn small"
          />
        ) : (
          ""
        )}
        <div class="img-wrppaer">
          <img src={Flower} class="flower-img" alt="flower" />
        </div>
      </section>
    </div>
  );
}

export default CheckIn;
