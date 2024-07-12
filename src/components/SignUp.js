import React, { useRef, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpUser, receiveSignupError } from "../actions/authActions";
import { getDoctors } from "../actions/patientActions";
import Header from "./Header";
import Man from "../assets/images/man.svg";
import LeavesMobile from "../assets/images/leaves-mobile.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Select from "react-select";
import { BounceLoader } from "react-spinners";
import makeAnimated from "react-select/animated";
import Modal from "react-modal";
import InputMask from "react-input-mask";
import PrivacyPolicy from "./privacyPolicy";
import "react-datepicker/dist/react-datepicker.css";

function SignUp() {
  const authed = useSelector((state) => state.authenticateUser.isAuthenticated);
  const [gender, setGender] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showOHIP, setShowOHIP] = useState(true);

  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  // Refs
  const selectedDoctor = useRef(null);
  const preferredName = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const ohip_num = useRef(null);
  const ohip_vc = useRef(null);
  const address = useRef(null);
  const city = useRef(null);
  const dob = useRef(null);
  const postal_code = useRef(null);
  const doctor = useRef(null);

  const phone = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);

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

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  // State variables
  const isFetching = useSelector((state) => state.authenticateUser.isFetching);
  const isAuthenticated = useSelector(
    (state) => state.authenticateUser.isAuthenticated
  );
  const signUpErrorMessage = useSelector(
    (state) => state.authenticateUser.signUpErrorMessage
  );
  const hasSignedUp = useSelector(
    (state) => state.authenticateUser.hasSignedUp
  );
  const patientInteractions = useSelector((state) => state.patientInteractions);

  const [office, setOffice] = useState();

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  return (
    <div>
      <Header />
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
      >
        <PrivacyPolicy />
        <button
          class="primary-btn"
          style={{
            float: "left",
            maxWidth: "100px",
            marginRight: "20px",
            fontSize: "16px",
            height: "50px",
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          class="primary-btn"
          style={{
            float: "left",
            maxWidth: "100px",
            fontSize: "16px",
            height: "50px",
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            setHasAcceptedTerms(true);
            dispatch(
              signUpUser({
                email: email.current.value,
                password: password.current.value,
                preferred_name: preferredName.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                gender: gender,
                date_of_birth: dob.current.value,
                phone: phone.current.value,

                ohip_num: ohip_num.current ? ohip_num.current.value : null,
                ohip_vc: ohip_vc.current ? ohip_vc.current.value : null,
                address: address.current.value,
                city: city.current.value,
                postal_code: postal_code.current.value,
                doctor: doctor.current.value,
              })
            );
          }}
        >
          I Accept
        </button>
      </Modal>
      <section class="main-bg-sectoin landing-page registration-page">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12 col-12">
              <h1 className="text-center">Register</h1>
              <div class="account-sign-register text-center">
                Already have an account? <Link to={"/login"}>Sign In</Link>
              </div>
              <div class="register-form">
                <form>
                  <div class="fild-row">
                    <div class="drop-down">
                      <div class="selected">
                        {/* {!patientInteractions.isFetching ? (
                          <Select
                            options={patientInteractions.offices.map(
                              (office) => ({
                                value: office.pk,
                                label: office.name,
                              })
                            )}
                            components={animatedComponents}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select your Doctors Office..."
                            onChange={(option) => {
                              setOffice(option.value);
                            }}
                          />
                        ) : (
                          <BounceLoader color={"#052D64"} size={50} />
                        )} */}
                        {/* <select name="doctor" id="" ref={selectedDoctor}>
                          <option value="">Please select your Doctor</option>
                          {!patientInteractions.isFetching
                            ? patientInteractions.offices.map(office => (
                                <option value={office.pk}>{office.name}</option>
                              ))
                            : ""}
                        </select> */}
                      </div>
                    </div>
                  </div>
                  <div class="fild-row label">
                    <label>Preferred Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="preferred_name"
                      ref={preferredName}
                    />
                  </div>
                  <div class="fild-row">
                    <div className="half">
                      <input
                        type="text"
                        class="form-control"
                        name="first_name"
                        ref={firstName}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="half">
                      <input
                        type="text"
                        class="form-control"
                        name="last_name"
                        ref={lastName}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div class="fild-row">
                    <Select
                      options={[
                        {
                          value: "male",
                          label: "Male",
                        },
                        {
                          value: "female",
                          label: "Female",
                        },
                        {
                          value: "other",
                          label: "Other",
                        },
                        {
                          value: "prefer not to say",
                          label: "Prefer Not to Say",
                        },
                      ]}
                      components={animatedComponents}
                      className="react-select-container form-control"
                      classNamePrefix="react-select"
                      placeholder="Gender"
                      required
                      onChange={(option) => {
                        setGender(option.value);
                      }}
                      id="gender-input"
                    />
                  </div>
                  <div class="fild-row label">
                    <label style={{ position: "absolute", zIndex: "1" }}>
                      Date of Birth
                    </label>
                    <InputMask
                      name="date_of_birth"
                      placeholder="yyyy/mm/dd"
                      className="form-control"
                      mask="9999-99-99"
                      ref={dob}
                    />
                  </div>
                  <div class="fild-row">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Email Address"
                      ref={email}
                    />
                  </div>
                  <div class="fild-row label">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      placeholder="(519) 555 - 5555"
                      ref={phone}
                    />
                  </div>
                  <div class="fild-row label">
                    <label>Address</label>
                    <input
                      type="text"
                      class="form-control"
                      name="address"
                      placeholder="Your address"
                      ref={address}
                    />
                  </div>
                  <div class="fild-row label">
                    <label>City</label>
                    <input
                      type="text"
                      class="form-control"
                      name="city"
                      placeholder="City"
                      ref={city}
                    />
                  </div>
                  <div class="fild-row label">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      class="form-control"
                      name="postal_code"
                      placeholder="Postal Code"
                      ref={postal_code}
                      maxLength={8}
                    />
                  </div>
                  <div className="fild-row label form-control show-ohip">
                    <p style={{ marginBottom: "5px" }}>
                      Do you have an OHIP Card?
                    </p>
                    <div className="labels">
                      <input
                        id="yes"
                        type="radio"
                        name="ohipCard"
                        value="yes"
                        defaultChecked={showOHIP === true}
                      />
                      <label htmlFor="yes" onClick={() => setShowOHIP(true)}>
                        Yes
                      </label>
                    </div>
                    <div className="labels">
                      <input
                        id="no"
                        type="radio"
                        name="ohipCard"
                        value="no"
                        defaultChecked={showOHIP === false}
                      />
                      <label
                        htmlFor="no"
                        onClick={() => {
                          setShowOHIP(false);
                        }}
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div class="fild-row">
                    {showOHIP ? (
                      <React.Fragment>
                        <div className="half">
                          <label>Health Card Number</label>
                          <input
                            type="text"
                            class="form-control"
                            name="ohip_num"
                            ref={ohip_num}
                            placeholder="10 numbers"
                            maxlength="10"
                          />
                        </div>
                        <div className="half">
                          <label>Health Card Version</label>
                          <input
                            type="text"
                            class="form-control"
                            name="ohip_vc"
                            ref={ohip_vc}
                            placeholder="2 Letters"
                            maxlength="2"
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      <p>
                        Please note that most offices will require an OHIP Card
                        to proceed. Only say no if you do not physically have an
                        OHIP Card.
                      </p>
                    )}
                  </div>
                  <div class="fild-row">
                    <label>Your Primary Care (Doctor)</label>
                    <input
                      type="text"
                      class="form-control"
                      name="doctor"
                      ref={doctor}
                      placeholder="Your Doctor"
                    />
                  </div>
                  <div class="fild-row">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Create Password"
                      ref={password}
                    />
                  </div>
                  <div class="fild-row">
                    <input
                      type="password"
                      class="form-control"
                      name="repeatPassword"
                      placeholder="Confirm Password"
                      ref={password2}
                    />
                  </div>

                  {signUpErrorMessage ? (
                    <p className="error-message text-center">
                      {signUpErrorMessage}
                    </p>
                  ) : (
                    ""
                  )}
                  <div class="fild-row">
                    {!isFetching ? (
                      <button
                        type="submit"
                        class="primary-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            password.current.value !== password2.current.value
                          ) {
                            dispatch(
                              receiveSignupError("Passwords do not match.")
                            );
                          } else if (
                            !firstName.current.value ||
                            !lastName.current.value
                          ) {
                            dispatch(
                              receiveSignupError(
                                "First Name and Last Name are required"
                              )
                            );
                          } else if (
                            !city.current.value &&
                            !address.current.value
                          ) {
                            dispatch(
                              receiveSignupError("City and Address is required")
                            );
                          } else if (!gender) {
                            dispatch(receiveSignupError("Gender is required"));
                          } else if (showOHIP && !ohip_num.current.value) {
                            if (
                              ohip_num.current.value.length !== 10 ||
                              ohip_vc.current.value.length !== 2
                            ) {
                              dispatch(
                                receiveSignupError(
                                  "Your health card number wasn't inserted correctly. Please make sure you include all 10 numbers and the 2 letters."
                                )
                              );
                            } else {
                              dispatch(
                                receiveSignupError(
                                  "Please enter your health card number."
                                )
                              );
                            }
                          } else {
                            setIsOpen(true);
                          }
                        }}
                      >
                        Register Now
                      </button>
                    ) : (
                      <BounceLoader color={"#052D64"} size={50} />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="img-wrppaer full-img">
          <img src={Man} class="man-img" alt="man" />
        </div>
        <div class="mobile-leaves">
          <img src={LeavesMobile} alt="" />
        </div>
      </section>
      {authed ? <Redirect to="/patient-select" /> : ""}
      {hasSignedUp ? <Redirect to="/login" /> : ""}
    </div>
  );
}

export default SignUp;
