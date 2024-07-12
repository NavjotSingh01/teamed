import moment from "moment";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserProfile, getOfficeRequests } from "../actions/authActions";
import { getDoctors } from "../actions/patientActions";
import Flower from "../assets/images/flower.png";
import LeavesMobile from "../assets/images/leaves-mobile.svg";
import Modal from "react-modal";
import Instructions from "../assets/images/instructions.mov";
import AuthHeader from "../components/AuthHeader";
import { setAppointmentType } from "../actions/covidActions";

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

function Dashboard() {
  const getGreetingTime = (m) => {
    var g = null; //return g

    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "afternoon";
    } else if (currentHour >= split_evening) {
      g = "evening";
    } else {
      g = "morning";
    }

    return g;
  };
  const primaryProfile = useSelector(
    (state) => state.authenticateUser.primaryProfile
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [greeting, setGreeting] = useState("");
  const profileReceived = useSelector(
    (state) => state.authenticateUser.profileReceived
  );
  const profile = useSelector((state) => state.authenticateUser.profile);
  const officeRequests = useSelector(
    (state) => state.authenticateUser.officeRequests
  );

  const now = moment();
  useEffect(() => {
    if (!primaryProfile) {
      history.push("/patient-select");
    }
  }, [history, primaryProfile]);
  useEffect(() => {
    setGreeting(getGreetingTime(moment(new Date())));
    dispatch(getUserProfile());
    dispatch(getDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      dispatch(getOfficeRequests(profile.pk));
    }
  }, [dispatch, firstRender, profile]);

  useEffect(() => {
    setFirstRender(true);
    if (profile) {
      const pingProfile = setInterval(() => {
        dispatch(getUserProfile());
      }, 2500);

      return () => clearInterval(pingProfile);
    }
  }, [dispatch, profile]);

  const isFetching = useSelector((state) => state.authenticateUser.isFetching);

  const email = useSelector((state) => state.authenticateUser.email);

  const isAuthenticated = useSelector(
    (state) => state.authenticateUser.isAuthenticated
  );
  const hasReceivedProfile = useSelector(
    (state) => state.authenticateUser.profileReceived
  );

  return profileReceived ? (
    <div>
      <AuthHeader />
      <section class="main-bg-sectoin desktop-page">
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={() => setIsOpen(false)}
        >
          <h1>This office is currently closed.</h1>
          <h3>
            ...but you can still get access to care! Please follow instructions
            to find out how.
          </h3>
          <video
            src={Instructions}
            muted
            autoPlay
            style={{ width: "100%", marginTop: "30px" }}
          ></video>
        </Modal>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div class="inner-desktop-content">
                <div class="goodmorning-text">
                  <h1>
                    Good {greeting}, {primaryProfile.first_name}!
                  </h1>
                  <h2 class="d-none d-md-block">
                    Which office would you like to visit?
                  </h2>
                </div>
                <div class="content-wrapper" style={{ width: "100%" }}>
                  <div class="row content-row" style={{ width: "100%" }}>
                    <button
                      className="covid-19-button"
                      onClick={(e) => {
                        dispatch(setAppointmentType("covid"));
                        history.push("/covid");
                      }}
                    >
                      Book your COVID-19 Test Here {">"}
                    </button>
                    <button
                      className="covid-19-button"
                      onClick={(e) => {
                        dispatch(setAppointmentType("flu"));
                        history.push("/covid");
                      }}
                    >
                      Book your Flu Shot Here {">"}
                    </button>
                    <button
                      className="covid-19-button"
                      onClick={(e) => {
                        dispatch(setAppointmentType("immunization"));
                        history.push("/covid");
                      }}
                    >
                      Book your Grade 7 Immunizations Here {">"}
                    </button>
                    {officeRequests
                      ? officeRequests.map((officeRequest) =>
                          officeRequest.office ? (
                            <div class="col-6">
                              <div
                                class="box-wrapper"
                                style={{ opacity: "0.6" }}
                              >
                                <div class="box-img">
                                  <Avatar
                                    name={officeRequest.office.name}
                                    size="100%"
                                    round={true}
                                  />
                                </div>
                                <h2>{officeRequest.office.name}</h2>
                                <p>
                                  Your request is still under review from the
                                  doctor's office.
                                </p>
                                <small></small>
                              </div>
                            </div>
                          ) : (
                            ""
                          )
                        )
                      : ""}
                    {primaryProfile.office
                      .filter((o) => o.pk !== 107)
                      .map((office) => (
                        <div class="col-6">
                          <Link
                            to={{
                              pathname: `/office/${office.slug}`,
                              currentOffice: office.slug,
                            }}
                          >
                            <div class="box-wrapper">
                              <div class="box-img">
                                <Avatar
                                  name={office.name}
                                  size="100%"
                                  round={true}
                                />
                                {!office.is_open ? (
                                  <span class="dots not-open"></span>
                                ) : now.isBetween(
                                    moment(office.opened_at, "HH:mm"),
                                    moment(office.closed_at, "HH:mm")
                                  ) ? (
                                  <span class="dots"></span>
                                ) : (
                                  <span class="dots not-open"></span>
                                )}
                              </div>
                              <h2>{office.name}</h2>
                              <small></small>
                            </div>
                          </Link>
                        </div>
                      ))}
                    <div class="col-6">
                      <Link to={`/dashboard/add-office`}>
                        <div class="box-wrapper add-new-office text-center">
                          <span class="circle">+</span>
                          <div class="d-none d-lg-block">
                            <h2>
                              Add New
                              <br />
                              Office
                            </h2>
                          </div>
                          <div class="d-block d-lg-none">
                            <h2>join an Office</h2>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="img-wrppaer">
          <img src={Flower} class="flower-img" alt="flower" />
        </div>
        <div class="mobile-leaves">
          <img src={LeavesMobile} alt="" />
        </div>
      </section>
      {/*  */}
    </div>
  ) : (
    "LOADING"
  );
}

export default Dashboard;
