import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentOffice } from "../actions/patientOfficeActions";
import {
  getMediaDevices,
  createSocketConnection,
} from "../actions/chatActions";
import AuthHeader from "./AuthHeader";
import { Link } from "react-router-dom";
import LinkedInPic from "../assets/images/linkedin-sales.jpg";
import Camera from "../assets/images/camera.svg";
import Chat from "../assets/images/msg-new.png";
import Bulletin from "../assets/images/buletin.svg";
import Avatar from "react-avatar";
import moment from "moment";
import is from "is_js";
import Video from "twilio-video";
import Modal from "react-modal";
import { updatePatientOHIPAddress } from "../actions/authActions";
import { BounceLoader } from "react-spinners";
import { getUnreadMessages } from "../actions/messagingActions";
import Instructions from "../assets/images/instructions.mov";
import AppointmentImage from "../assets/images/appointment.png";
import { setAppointmentType } from "../actions/covidActions";
import "../assets/styles/pages/_service-page.scss";

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

function ServiceSelection(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) => state.authenticateUser.primaryProfile);
  const socket = useSelector((state) => state.connectToChat.socket);
  useEffect(() => {
    dispatch(getMediaDevices());
    // if (!socket) {
    //   dispatch(createSocketConnection(props.office.slug, profile.pk));
    // }
    dispatch(getUnreadMessages(props.office.slug, profile.pk));
    setModal(false);
  }, [dispatch, profile, props.office.slug, socket]);

  // useEffect(() => {
  //   dispatch()
  // }, []);
  const [modalIsOpen, setModal] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);

  const mediaDeviceErrorMessage = useSelector(
    (state) => state.connectToChat.mediaDeviceErrorMessage
  );

  const isUpdatingPatient = useSelector(
    (state) => state.authenticateUser.isUpdatingPatient
  );
  const updatePatientMessage = useSelector(
    (state) => state.authenticateUser.updatePatientMessage
  );
  const unreadMessages = useSelector(
    (state) => state.messagingReducer.unreadMessages
  );

  const ohip_num = useRef(null);
  const ohip_vc = useRef(null);
  const address = useRef(null);
  const now = moment();
  console.log(props);
  return (
    <div>
      <AuthHeader />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>We require more information before your check-in.</h2>
        {/* <button onClick={() => setModal(false)}>close</button> */}
        <div className="register-form">
          <form action="">
            <div class="fild-row label">
              <label>Address</label>
              <input
                type="text"
                class="form-control"
                name="name"
                ref={address}
              />
            </div>
            <div class="fild-row">
              <div className="half">
                <label>OHIP Number</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="10 numbers"
                  ref={ohip_num}
                  maxlength="10"
                />
              </div>
              <div className="half">
                <label>OHIP Version</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="2 letters next to numbers"
                  ref={ohip_vc}
                  maxlength="2"
                />
              </div>
            </div>
            {updatePatientMessage ? (
              <p style={{ color: "red" }}>{updatePatientMessage}</p>
            ) : (
              ""
            )}
            {!isUpdatingPatient ? (
              <button
                type="submit"
                class="primary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    updatePatientOHIPAddress(
                      ohip_num.current.value,
                      ohip_vc.current.value,
                      address.current.value,
                      profile.pk
                    )
                  );
                }}
              >
                Update Info
              </button>
            ) : (
              <BounceLoader color={"#052D64"} size={50} />
            )}
          </form>
        </div>
      </Modal>

      <section class="main-bg-sectoin desktop-page less-space">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12 col-12">
              <div class="inner-desktop-content office-home-main">
                <div class="office-home-left">
                  <h1>
                    Welcome back, <br />{" "}
                    {profile.first_name && profile.first_name}!
                  </h1>
                </div>
              </div>
              {profile.office.length === 0 && (
                <div className="building-profile">
                  <div className="registration-tab">
                    <a
                      href="#"
                      title="Registration"
                      className="registration-link"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <span>Registration</span>
                    </a>
                  </div>

                  <div className="wait-info">
                    <h3>You are not part of any offices.</h3>
                  </div>
                  <p>
                    Trying to do Virtual or Inbox with your Primary Care
                    Provider? You will need to join their office.
                  </p>
                  <a
                    href="#"
                    title="Add Office"
                    className="primary-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/dashboard/my-offices`);
                    }}
                  >
                    Add Office
                  </a>
                </div>
              )}
            </div>
            <div class="col-lg-7 col-md-12 col-sm-12 col-12">
              <div class="inner-desktop-content office-home-main">
                <div class="content-wrapper office-home-right">
                  <React.Fragment>
                    <div class="row content-row">
                      <div class="col-12 col-lg-9">
                        <Link to={`/office/appointments-list/`}>
                          <div class="box-wrapper">
                            <div class="office-home-info-right active">
                              <div class="office-icons yellow-sqr">
                                <img src={AppointmentImage} alt="" />
                              </div>
                              <div class="office-home-info">
                                <h2>Appointments</h2>
                                <p>Manage your upcoming appointments.</p>
                              </div>
                              <span class="counter d-block d-md-none">
                                {unreadMessages}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div class="col-12 col-lg-9">
                        <Link to={`/office/inbox/`}>
                          <div class="box-wrapper">
                            <div class="office-home-info-right active">
                              <div class="office-icons green-sqr">
                                <img src={Chat} alt="" />
                                <span
                                  class="counter d-none d-md-block"
                                  style={{ position: "absolute", top: 0 }}
                                >
                                  {unreadMessages}
                                </span>
                              </div>
                              <div class="office-home-info">
                                <h2>Messaging</h2>
                                <p>Chat with your doctor’s</p>
                              </div>
                              <span class="counter d-block d-md-none">
                                {unreadMessages}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div class="col-12 col-lg-9">
                        <Link to="/dashboard/office-select">
                          <div class="box-wrapper">
                            <div class="office-home-info-right active">
                              <div class="office-icons yellow-sqr">
                                {" "}
                                <img src={Camera} alt="" />
                              </div>
                              <div class="office-home-info">
                                <h2>Check-in</h2>
                                <p>Join your doctor’s virtual waiting room.</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </React.Fragment>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServiceSelection;
