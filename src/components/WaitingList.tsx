import React from "react";
import AuthHeader from "./AuthHeader";
import settingsIcon from "../assets/images/setting-icon.svg";
import msgIcon from "../assets/images/msg-icon.svg";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import { setOpenSettings } from "../actions/videoSettings";

import { VideoSettings } from "./VideoSettings/VideoSettings";

export const WaitingList = (props: any) => {
  const dispatch = useDispatch();

  const videoStatus = useSelector(
    (state: RootStateOrAny) => state.videoSettings.videoStatus
  );
  const audioStatus = useSelector(
    (state: RootStateOrAny) => state.videoSettings.audioStatus
  );

  const localVideoTrack = useSelector(
    (state: RootStateOrAny) => state.mainReducer.localVideoTrack
  );

  const localAudioTrack = useSelector(
    (state: RootStateOrAny) => state.mainReducer.localAudioTrack
  );

  const audioDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.audioDevice
  );

  const videoDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.videoDevice
  );

  const openSettings = useSelector(
    (state: RootStateOrAny) => state.videoSettings.openSettings
  );

  const chatOpened = useSelector(
    (state: RootStateOrAny) => state.videoSettings.chatOpened
  );

  return (
    <React.Fragment>
      <AuthHeader />
      <section className="waiting-room">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="doc-details d-flex flex-column align-items-center">
                <figure className="rounded-circle">
                  <img src="images/waiting-profile.jpg" alt="img" />
                </figure>
                <h1>
                  Waiting for <span>{props.office.name}</span>
                </h1>
                <p>Please do not exit this screen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bottom-btn">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="b-wrapper">
                <div className="left">
                  <a
                    href="#"
                    className="primary-btn orange d-only-desk"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    exit appointment
                  </a>
                  <a href="#" className="primary-btn orange d-mobile m-btn">
                    exit
                  </a>
                </div>
                <div className="right">
                  <div className="relative-icon">
                    {openSettings ? <VideoSettings /> : ""}
                    <a
                      href="#"
                      title="setting"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setOpenSettings(!openSettings));
                      }}
                    >
                      <img
                        src={settingsIcon}
                        alt="setting"
                        data-toggle="modal"
                        data-target="#setting-popup"
                      />
                    </a>
                  </div>
                  <div className="relative-icon">
                    <a
                      href="#"
                      title="New Message"
                      data-toggle="modal"
                      className="chat-icon"
                      data-target="#new-message-modal"
                    >
                      <img src={msgIcon} alt="msg" />
                      <span className="msg-note"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
